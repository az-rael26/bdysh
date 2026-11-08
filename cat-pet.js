/* MOCHI — one touch-friendly pet on the front page + one wandering cameo per gallery photo.
   No Pet / Feed / Play buttons: pet by rubbing, feed/play by dragging physical objects. */
(() => {
  'use strict';
  const STORAGE_KEY = 'birthday-pixel-cat-affection-v1';
  const $ = (id) => document.getElementById(id);
  const homeCanvas = $('home-cat');
  const wanderCanvas = $('wander-cat');
  const homeContext = homeCanvas.getContext('2d');
  const wanderContext = wanderCanvas.getContext('2d');
  const catZone = $('cat-zone');
  const ghost = $('drag-ghost');
  const feedback = $('pet-feedback');
  const wanderButton = $('wandering-mochi');
  const butterfly = $('wander-butterfly');
  const wanderStage = $('wandering-stage');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let affection = 15;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (existing && Number.isFinite(existing.affection)) affection = clamp(existing.affection, 0, 100);
  } catch (_) { /* Browser may block local storage. */ }
  let mode = 'loaf';
  let modeDeadline = 0;
  let gaze = 0;
  let heldItem = null;
  let drag = null;
  let stroke = null;
  let lastPetAt = 0;
  let scene = null;
  let lastScene = -1;
  let lastFrame = 0;

  // Keep Mochi's subtle bond-based facial reactions without a visible affection bar.
  function saveBond() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ affection })); } catch (_) {}
  }
  function hearts() {
    if (reduced.matches) return;
    const layer = $('feeding-particles');
    const rect = homeCanvas.getBoundingClientRect();
    const zone = catZone.getBoundingClientRect();
    for (let n = 0; n < 4; n++) {
      const h = document.createElement('span');
      h.className = 'food-heart';
      h.style.left = `${rect.left - zone.left + rect.width * (.29 + .13 * n)}px`;
      h.style.top = `${rect.top - zone.top + rect.height * (.30 - .05 * (n % 2))}px`;
      h.style.animationDelay = `${n * .14}s`;
      layer.appendChild(h);
      h.addEventListener('animationend', () => h.remove(), { once: true });
    }
  }
  function perform(kind) {
    heldItem = null;
    document.querySelectorAll('.pet-item').forEach(x => x.classList.remove('is-selected'));
    catZone.classList.remove('drop-ready', 'drop-aim', 'is-happy', 'is-playing', 'is-eating');
    mode = kind === 'kibble' ? 'eat' : kind === 'ball' ? 'play' : 'happy';
    modeDeadline = performance.now() + (kind === 'ball' ? 1800 : 1450);
    affection = clamp(affection + (kind === 'kibble' ? 10 : kind === 'ball' ? 12 : 7), 0, 100);
    if (kind === 'pet') {
      feedback.textContent = 'Mochi leans into your hand and purrs!';
      catZone.classList.add('is-happy');
      hearts();
    } else if (kind === 'kibble') {
      feedback.textContent = 'Crunch crunch! Mochi loves the kibbles.';
      catZone.classList.add('is-eating');
      hearts();
    } else {
      feedback.textContent = 'Mochi watches the ball, then leaps after it!';
      catZone.classList.add('is-playing');
      const ball = $('play-ball');
      ball.classList.remove('bouncing');
      void ball.offsetWidth;
      if (!reduced.matches) ball.classList.add('bouncing');
    }
    saveBond();
    setTimeout(() => {
      if (performance.now() >= modeDeadline - 80) {
        mode = 'loaf';
        catZone.classList.remove('is-happy', 'is-eating', 'is-playing');
        gaze = 0;
      }
    }, 1900);
  }

  // RUB its head, not just one click. Allow taps on the cat after choosing a tool.
  homeCanvas.addEventListener('pointerdown', (e) => {
    if (heldItem) { perform(heldItem); e.preventDefault(); return; }
    const r = homeCanvas.getBoundingClientRect();
    if (e.clientY > r.top + r.height * .69) return;
    stroke = { id: e.pointerId, x: e.clientX, y: e.clientY, distance: 0 };
    homeCanvas.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  homeCanvas.addEventListener('pointermove', (e) => {
    if (!stroke || e.pointerId !== stroke.id) return;
    const rect = homeCanvas.getBoundingClientRect();
    if (e.clientY > rect.top + rect.height * .72) return;
    stroke.distance += Math.hypot(e.clientX - stroke.x, e.clientY - stroke.y);
    stroke.x = e.clientX; stroke.y = e.clientY;
    if (stroke.distance >= 47 && performance.now() - lastPetAt > 650) {
      lastPetAt = performance.now();
      stroke.distance = 0;
      perform('pet');
    }
  });
  function finishStroke() { stroke = null; }
  homeCanvas.addEventListener('pointerup', finishStroke);
  homeCanvas.addEventListener('pointercancel', finishStroke);
  homeCanvas.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();perform(heldItem || 'pet');
  });

  // Pointer Events instead of HTML5 drag/drop: works on touch screens too.
  document.querySelectorAll('.pet-item').forEach((button) => {
    button.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      drag = { pointerId: e.pointerId, source:button, kind:button.dataset.item, x:e.clientX, y:e.clientY, moved:false };
      button.setPointerCapture(e.pointerId);
      ghost.replaceChildren(button.querySelector('svg').cloneNode(true));
      ghost.classList.add('is-dragging');
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
      catZone.classList.add('drop-ready');
      e.preventDefault();
    });
    button.addEventListener('pointermove', (e) => {
      if (!drag || drag.pointerId !== e.pointerId) return;
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
      drag.moved ||= Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 12;
      const rect = homeCanvas.getBoundingClientRect();
      gaze = drag.kind === 'ball' ? clamp((e.clientX - (rect.left + rect.width/2)) / 75, -1, 1) : 0;
      const hit = e.clientX >= rect.left - 15 && e.clientX <= rect.right + 15 &&
                  e.clientY >= rect.top - 15 && e.clientY <= rect.bottom + 15;
      catZone.classList.toggle('drop-aim', hit);
    });
    function release(e) {
      if (!drag || drag.pointerId !== e.pointerId) return;
      const {kind, moved} = drag;
      const rect = homeCanvas.getBoundingClientRect();
      const dropped = moved && e.clientX >= rect.left - 15 && e.clientX <= rect.right + 15 &&
                      e.clientY >= rect.top - 15 && e.clientY <= rect.bottom + 15;
      drag = null;
      ghost.classList.remove('is-dragging');
      catZone.classList.remove('drop-ready','drop-aim');
      gaze = 0;
      if (dropped) perform(kind);
      else if (!moved) {
        heldItem = kind;
        document.querySelectorAll('.pet-item').forEach(x => x.classList.toggle('is-selected', x.dataset.item === kind));
        feedback.textContent = kind === 'kibble' ? 'Kibbles selected! Now tap Mochi.' : 'Ball selected! Now tap Mochi.';
      } else feedback.textContent = 'Drop the item on Mochi to interact!';
    }
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', () => {
      drag=null;ghost.classList.remove('is-dragging');catZone.classList.remove('drop-ready','drop-aim');gaze=0;
    });
    button.addEventListener('click', (e) => {
      // Keyboard-triggered click uses detail=0; mouse and touch use Pointer Events above.
      if (e.detail !== 0) return;
      heldItem = button.dataset.item;
      document.querySelectorAll('.pet-item').forEach(x => x.classList.toggle('is-selected', x === button));
      feedback.textContent = `Now focus Mochi and press Enter to give ${heldItem === 'kibble' ? 'the kibbles' : 'the ball'}.`;
    });
  });

  // Pixel sprite painter, no images/libraries necessary. All shapes are chunky pixel rectangles.
  const C = {line:'#554A6D',fur:'#C6B3DA',shade:'#A48DBC',light:'#EDE1F1',pink:'#D88FAE',eye:'#493D5E',nose:'#B16B91',cream:'#FDF1E2'};
  function draw(ctx, pose, t, look=0, closeBond=0) {
    ctx.clearRect(0,0,72,72);
    const q = (x,y,w,h,color) => {ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
    const bob = pose === 'walk' || pose === 'chase' || pose === 'play' ? Math.round(Math.sin(t/105)*2) : 0;
    const wag = Math.round(Math.sin(t/260)*3);
    ctx.save();ctx.translate(0,bob);
    // Loaf tail hangs over its side, swishing softly.
    q(51,46,12,6,C.line);q(58,43+wag,7,15,C.line);q(62,53+wag,6,7,C.line);
    q(54,46,8,5,C.shade);q(60,45+wag,4,11,C.shade);
    // Fluffy loaf body (walking changes the paws to alternating steps).
    if (pose === 'lost' || pose === 'sit') {
      q(22,34,31,30,C.line);q(24,36,27,27,C.fur);q(27,52,21,7,C.light);
      q(20,59,13,7,C.line);q(43,59,13,7,C.line);q(22,60,9,4,C.light);q(45,60,9,4,C.light);
    } else {
      q(14,38,44,23,C.line);q(17,35,38,26,C.fur);q(20,45,33,12,C.light);
      if (pose === 'walk' || pose === 'chase' || pose === 'play') {
        const step = Math.sin(t/120)>0?3:0;
        q(17,58,11,5+step,C.line);q(43,58,11,8-step,C.line);
        q(19,59,8,4+step,C.light);q(45,59,8,6-step,C.light);
      } else {
        q(19,57,13,7,C.line);q(40,57,14,7,C.line);
        q(21,58,10,5,C.light);q(42,58,11,5,C.light);
      }
    }
    // Head moves slightly to follow the dragged BALL.
    ctx.save();ctx.translate(Math.round(look*3),0);
    q(14,14,13,20,C.line);q(44,14,13,20,C.line);
    q(17,10,10,22,C.line);q(44,10,10,22,C.line);
    q(19,15,7,15,C.fur);q(46,15,7,15,C.fur);
    q(21,17,5,8,C.pink);q(46,17,5,8,C.pink);
    q(15,25,42,22,C.line);q(19,20,34,29,C.line);
    q(17,26,38,21,C.fur);q(21,23,30,25,C.fur);
    q(24,23,15,7,C.light);q(25,46,22,3,C.shade);
    const blinking = pose === 'lick' || pose === 'eat' || pose === 'happy' || (t % 5000 > 4860);
    if (blinking) {q(24,35,9,2,C.eye);q(40,35,9,2,C.eye);}
    else {
      const eyeShift=Math.round(look*2);
      q(26+eyeShift,33,4,8,C.eye);q(43+eyeShift,33,4,8,C.eye);
      q(27+eyeShift,34,1,2,C.cream);q(44+eyeShift,34,1,2,C.cream);
    }
    q(20,40,6,3,closeBond>50?C.pink:'#DFBDCC');q(48,40,6,3,closeBond>50?C.pink:'#DFBDCC');
    q(35,41,4,3,C.nose);q(36,44,2,3,C.eye);
    if (pose === 'lost') {q(34,49,7,2,C.eye);q(31,35,3,1,C.eye);q(48,35,3,1,C.eye);}
    else if (pose === 'eat') {q(34,47,6,5,C.eye);q(35,49,4,3,C.pink);}
    else {q(31,47,5,2,C.eye);q(39,47,5,2,C.eye);}
    q(13,39,6,1,C.line);q(14,43,6,1,C.line);q(54,39,6,1,C.line);q(53,43,6,1,C.line);
    ctx.restore();
    if (pose === 'lick') {
      q(47,42,11,14,C.line);q(49,42,7,13,C.light);
      q(43,46,7,4,C.pink);
    }
    if (pose === 'eat') {
      const bite=Math.round((t%400)/110);
      q(34+bite,55,8,5,'#AB7E5D');q(35+bite,56,4,2,'#E8C99D');
    }
    ctx.restore();
  }

  // True SIDE-PROFILE pixel cat used whenever Mochi WALKS, CHASES,
  // or stops to lick a paw. This avoids front-facing sliding sprites.
  // The direction is mirrored so Mochi always looks where he is going.
  function drawSide(ctx, pose, t, direction=1) {
    ctx.clearRect(0,0,72,72);
    const p=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
    const stepping=pose==='walk'||pose==='chase';
    const bounce=stepping ? Math.round(Math.sin(t/95)*2):0;
    const stride=stepping ? Math.round(Math.sin(t/120)*3):0;
    const tailWag=Math.round(Math.sin(t/225)*3);
    ctx.save();
    if(direction<0){ctx.translate(72,0);ctx.scale(-1,1);}
    ctx.translate(0,bounce);
    // Tail extends behind the cat (to the left in this right-facing sprite).
    p(8,39+tailWag,7,13,C.line);
    p(5,33+tailWag,7,11,C.line);
    p(9,41+tailWag,4,10,C.shade);
    // Long body: recognizably side-on, not the loaf's frontal square face.
    p(17,35,35,22,C.line);p(19,32,33,25,C.fur);
    p(23,40,23,13,C.light);p(21,53,29,5,C.shade);
    // Four legs, with alternating stepping feet when walking/chasing.
    p(20,52,8,13+Math.max(0,stride),C.line);
    p(23,54,5,9+Math.max(0,stride),C.light);
    p(42,52,8,13+Math.max(0,-stride),C.line);
    p(44,54,5,9+Math.max(0,-stride),C.light);
    p(18,63+Math.max(0,stride),13,4,C.line);
    p(42,63+Math.max(0,-stride),13,4,C.line);
    // Ears and side-view head, single visible eye and a protruding muzzle.
    p(42,18,9,17,C.line);p(55,15,8,19,C.line);
    p(45,22,5,10,C.pink);p(57,20,4,11,C.pink);
    p(40,27,22,26,C.line);p(44,25,17,25,C.fur);
    p(59,34,8,13,C.fur);p(63,43,6,5,C.light);
    p(54,34,5,7,C.eye);p(55,35,2,2,C.cream);
    p(65,42,5,3,C.nose);p(64,48,4,2,C.eye);
    p(63,49,7,1,C.line);p(62,52,7,1,C.line);
    // Raise the near paw to the face and show a little tongue while licking.
    if(pose==='lick'){
      p(47,45,10,13,C.line);p(49,45,7,11,C.light);
      p(57,44,7,4,C.pink);p(55,37,4,2,C.eye);
    }
    ctx.restore();
  }

  // Per photo: ONE Mochi, randomly placed in one of three scenarios.
  // 1: loaf + tail wag. 2: loaf -> walk -> stop and lick paw.
  // 3: loaf -> chase butterfly -> butterfly vanishes -> lost sit.
  function changeWanderScene() {
    const choices=[0,1,2].filter(n => n !== lastScene);
    const id=choices[Math.floor(Math.random()*choices.length)];
    lastScene=id;
    scene={id,start:performance.now()};
    wanderButton.className='wandering-mochi '+['loc-top','loc-left','loc-right'][id];
    wanderButton.style.transform='translateX(0px)';
    wanderButton.setAttribute('aria-label',[
      'Mochi is loafing on the photo frame and swishing his tail. Tap to change his scene.',
      'Mochi walks to the left, then stops and licks his paw. Tap to change his scene.',
      'Mochi chases a butterfly to the right, then sits looking lost. Tap to change his scene.'
    ][id]);
    butterfly.style.opacity='0';
  }
  wanderButton.addEventListener('click',changeWanderScene);
  // ONE new random cat per photo. Opening the gallery also selects one scene.
  window.addEventListener('mochi-photo-changed', e => {
    if (e.detail.expanded) changeWanderScene();
  });
  window.addEventListener('mochi-gallery-toggle', e => {
    if (!e.detail.open) butterfly.style.opacity='0';
  });
  const lerp=(a,b,x)=>a+(b-a)*x;
  function drawWander(now) {
    if (!scene || !$('site-shell').classList.contains('is-expanded') || !$('memory-modal').hidden) return;
    const elapsed=reduced.matches ? 6 : (now-scene.start)/1000;
    let pose='loaf', dx=0, butterflyVisible=false, direction=1;
    // Keep the walk/chase within the approved border positions, not over photos.
    const travel=window.innerWidth<=430?22:window.innerWidth<=700?36:55;
    if(scene.id===1){
      direction=-1;
      if(elapsed>=1.1 && elapsed<4.6){
        pose='walk';dx=lerp(0,-travel,(elapsed-1.1)/3.5);
      } else if(elapsed>=4.6){pose='lick';dx=-travel;}
    } else if(scene.id===2){
      direction=1;
      if(elapsed>=.9 && elapsed<4.4){
        pose='chase';dx=lerp(0,travel,(elapsed-.9)/3.5);
        butterflyVisible=true;
      } else if(elapsed>=4.4){pose='lost';dx=travel;}
    }
    wanderButton.style.transform=`translateX(${dx.toFixed(1)}px)`;
    if(pose==='walk'||pose==='chase'||pose==='lick')
      drawSide(wanderContext,pose,now,direction);
    else draw(wanderContext,pose,now,pose==='lost'?1:0,affection);
    if(butterflyVisible){
      const a=wanderButton.getBoundingClientRect();
      const b=wanderStage.getBoundingClientRect();
      butterfly.style.left=`${a.right-b.left-6+Math.sin(now/155)*7}px`;
      butterfly.style.top=`${a.top-b.top+4+Math.cos(now/210)*9}px`;
      butterfly.style.opacity='1';
    } else butterfly.style.opacity='0';
  }
  function loop(t) {
    requestAnimationFrame(loop);
    if (document.hidden || t-lastFrame < (reduced.matches?220:70)) return;
    lastFrame=t;
    if (modeDeadline && t>modeDeadline) {mode='loaf';modeDeadline=0;}
    draw(homeContext, mode, t, gaze, affection);
    drawWander(t);
  }
  saveBond();
  draw(homeContext,'loaf',0,0,affection);
  requestAnimationFrame(loop);
})();
