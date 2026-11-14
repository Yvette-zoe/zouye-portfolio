function initFluidReveal(hero) {
  const media = matchMedia('(min-width: 992px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (!hero || !media.matches) return;
  const canvas = hero.querySelector('.reel-fluid-mask');
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false });
  if (!gl || !gl.getExtension('EXT_color_buffer_float')) return;
  const linear = gl.getExtension('OES_texture_float_linear') ? gl.LINEAR : gl.NEAREST;
  const vertex = `#version 300 es
    in vec2 position;
    out vec2 uv;
    void main() { uv = position * .5 + .5; gl_Position = vec4(position, 0., 1.); }
  `;
  const header = `#version 300 es
    precision highp float;
    in vec2 uv;
    out vec4 outputColor;
    uniform sampler2D field;
  `;
  const noise = `
    float randomValue(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    float smoothNoise(vec2 p) {
      vec2 cell = floor(p), f = fract(p);
      f = f * f * (3. - 2. * f);
      return mix(mix(randomValue(cell), randomValue(cell + vec2(1, 0)), f.x),
        mix(randomValue(cell + vec2(0, 1)), randomValue(cell + vec2(1, 1)), f.x), f.y);
    }
    float turbulence(vec2 p) {
      return .55 * smoothNoise(p) + .3 * smoothNoise(p * 2.6) + .15 * smoothNoise(p * 6.3);
    }
  `;

  function program(fragment) {
    const shaders = [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, header + fragment]].map(([kind, source]) => {
      const shader = gl.createShader(kind);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    });
    const handle = gl.createProgram();
    shaders.forEach(shader => gl.attachShader(handle, shader));
    gl.bindAttribLocation(handle, 0, 'position');
    gl.linkProgram(handle);
    shaders.forEach(shader => gl.deleteShader(shader));
    if (!gl.getProgramParameter(handle, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(handle));
    return { handle, uniform: name => gl.getUniformLocation(handle, name) };
  }

  let brush, evolution, display;
  try {
    brush = program(`
      uniform vec2 point;
      uniform vec2 velocity;
      uniform float aspect;
      void main() {
        vec2 delta = uv - point;
        delta.x *= aspect;
        float weight = exp(-dot(delta, delta) / .004);
        vec3 old = texture(field, uv).rgb;
        outputColor = vec4(old.r + weight * 3.5,
          mix(old.gb, velocity, clamp(weight * 3.5, 0., 1.)), 1.);
      }
    `);
    evolution = program(noise + `
      uniform vec2 pixel;
      uniform float dt;
      uniform float time;
      void main() {
        vec2 departure = uv - texture(field, uv).gb * dt;
        vec3 center = texture(field, departure).rgb;
        float clock = time * .3;
        vec2 warp = (vec2(turbulence(uv * 11. + clock),
          turbulence(uv * 11. + 37.2 - clock)) - .5) * 5.2 * pixel;
        vec3 average = (texture(field, departure + vec2(pixel.x, 0) + warp).rgb
          + texture(field, departure - vec2(pixel.x, 0) + warp).rgb
          + texture(field, departure + vec2(0, pixel.y) + warp).rgb
          + texture(field, departure - vec2(0, pixel.y) + warp).rgb) * .25;
        float density = mix(center.r, average.r, .79);
        vec2 velocity = mix(center.gb, average.gb, .395);
        float grain = turbulence(uv * 15. + 5.1 + clock * .6);
        density /= 1. + (1.5 + 1.05 * (grain - .5) * 2.) * dt;
        velocity /= 1. + 3. * dt;
        outputColor = vec4(max(0., density), velocity, 1.);
      }
    `);
    display = program(noise + `
      uniform float time;
      void main() {
        float fade = .18 * (.35 + turbulence(vec2(uv.x * 9., time * .25)) * 1.3);
        float density = texture(field, uv).r * smoothstep(0., fade, uv.y);
        outputColor = vec4(vec3(1.), 1. - smoothstep(.39, .4, density));
      }
    `);
  } catch (error) {
    console.warn('Fluid reveal unavailable:', error);
    return;
  }

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  let read, write, width, height;
  let frame = 0, visible = true, lastTime = 0;
  const pointer = { x: .5, y: .5, previousX: .5, previousY: .5, vx: 0, vy: 0, moved: false, ready: false, time: 0 };

  function target() {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error('Unsupported fluid framebuffer');
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return { texture, framebuffer };
  }

  function draw(pass, destination) {
    gl.useProgram(pass.handle);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, read.texture);
    gl.uniform1i(pass.uniform('field'), 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, destination ? destination.framebuffer : null);
    gl.viewport(0, 0, destination ? width : canvas.width, destination ? height : canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (destination) [read, write] = [write, read];
  }

  function resize() {
    canvas.width = Math.round(hero.clientWidth);
    canvas.height = Math.round(hero.clientHeight);
    const aspect = canvas.width / canvas.height;
    width = aspect >= 1 ? Math.min(1440, Math.round(512 * aspect)) : 512;
    height = aspect >= 1 ? 512 : Math.min(1440, Math.round(512 / aspect));
    [read, write].filter(Boolean).forEach(item => {
      gl.deleteTexture(item.texture);
      gl.deleteFramebuffer(item.framebuffer);
    });
    try {
      read = target(); write = target();
      gl.useProgram(display.handle);
      draw(display, null);
      hero.classList.add('has-fluid-mask');
    } catch (error) {
      hero.classList.remove('has-fluid-mask');
      visible = false;
    }
    pointer.ready = false;
  }

  function tick(now) {
    frame = 0;
    if (!visible || document.hidden || !media.matches) return;
    const dt = Math.min((now - lastTime) / 1000, .033);
    lastTime = now;
    if (pointer.moved) {
      const aspect = canvas.width / canvas.height;
      const distance = Math.hypot((pointer.x - pointer.previousX) * aspect, pointer.y - pointer.previousY);
      const count = Math.max(1, Math.ceil(distance / (.4 * Math.sqrt(.004))));
      gl.useProgram(brush.handle);
      gl.uniform1f(brush.uniform('aspect'), aspect);
      gl.uniform2f(brush.uniform('velocity'), pointer.vx, pointer.vy);
      for (let i = 0; i < count; i++) {
        const fraction = count === 1 ? 1 : i / (count - 1);
        gl.uniform2f(brush.uniform('point'), pointer.previousX + (pointer.x - pointer.previousX) * fraction,
          pointer.previousY + (pointer.y - pointer.previousY) * fraction);
        draw(brush, write);
      }
      pointer.moved = false;
    }
    gl.useProgram(evolution.handle);
    gl.uniform2f(evolution.uniform('pixel'), 1 / width, 1 / height);
    gl.uniform1f(evolution.uniform('dt'), dt);
    gl.uniform1f(evolution.uniform('time'), now / 1000);
    draw(evolution, write);
    gl.useProgram(display.handle);
    gl.uniform1f(display.uniform('time'), now / 1000);
    draw(display, null);
    frame = requestAnimationFrame(tick);
  }

  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || !media.matches) return;
    const bounds = hero.getBoundingClientRect();
    const now = performance.now(), dt = Math.max((now - pointer.time) / 1000, .004);
    const x = (event.clientX - bounds.left) / bounds.width, y = 1 - (event.clientY - bounds.top) / bounds.height;
    pointer.previousX = pointer.ready ? pointer.x : x;
    pointer.previousY = pointer.ready ? pointer.y : y;
    pointer.vx = Math.max(-4, Math.min(4, (x - pointer.previousX) / dt)) * 1.6;
    pointer.vy = Math.max(-4, Math.min(4, (y - pointer.previousY) / dt)) * 1.6;
    Object.assign(pointer, { x, y, moved: true, ready: true, time: now });
  });
  hero.addEventListener('pointerleave', () => { pointer.ready = false; });
  function sync() {
    cancelAnimationFrame(frame);
    hero.classList.toggle('has-fluid-mask', media.matches);
    if (visible && !document.hidden && media.matches) {
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  resize();
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; pointer.ready = false; sync(); }).observe(hero);
  document.addEventListener('visibilitychange', sync);
  media.addEventListener('change', sync);
}
