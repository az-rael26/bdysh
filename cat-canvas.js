/* Canvas artwork is adapted directly from the uploaded
   sitting-orange-cat-refined(1).html. Its pixel map, colors,
   blinking-eyes and flexible tail algorithm are preserved. */
(() => {
  'use strict';
  const PIXELS = [
  ".....XXX.........XXX..........",
  "...XXXXXXX.....XXXXXXX........",
  "...XXXXXXX.....XXXXXXX........",
  "...XXooOOX.....XOooOXX........",
  "...XXooPPX.....XOooOXX........",
  "...XXOPPPX.....XOPPOXX........",
  "...XOOOOOOOOOOOOOOOOOO........",
  "...XOOOOOOOOOOOOOOOOOO........",
  "..XXOOOOOOOOOoooOOOOOOXX.BBBB.",
  "..XXCCCOOOOOOoooOOOOOOXX.BBBB.",
  "..XoCCCoOOOOooooooCCCooXXXooX.",
  "..XoCCCNXoooooooNXCCCooXOXooX.",
  ".XoooCCXXCCoCCCCXXooooooXXooX.",
  ".XoooCCXXCWWCCWCXXooooooXOO...",
  ".XoooCCXXCCoCCCCXXOOOoooXDD...",
  ".XoPPPPppCCCPPCCCCOPPPPoXDD...",
  ".XXPPPPppCCBCCBCCCOPPPPBXDD...",
  "..XBBBCCCCCCCCCCCCOOOOXXXOO...",
  ".XXXCCCXOCCCCCCCCCCCCXXXXOO...",
  "......XXOCCCCpppppCCOOOXXDO...",
  "......XXOCCCCpppppCCODDDXDO...",
  "......XXOCCCCpppppCCODDDXDO...",
  "......XXOCCCCpppppCCODDDXOO...",
  "......XXOCCCCpppppCCODDDXXX...",
  "......XXOCppCpooooooODDDX.....",
  "......XXooppCpoppooooDDDX.....",
  "......XXooppCCoppooooDDDX.....",
  "......XXooppCCoppooooOOXX.....",
  "......XXoooXXXXXXooooXXXX.....",
  "......XXXXXXXXXXXXXXXXXXX....."
];
  const COLORS = {
  "X": "#2f2023",
  "C": "#fff1d4",
  "O": "#f49b58",
  "o": "#ffbb7c",
  "p": "#ffd6b1",
  "D": "#d77448",
  "P": "#f294af",
  "B": "#513027",
  "W": "#fff9e9",
  "N": "#63452b"
};
  const W = PIXELS[0].length, H = PIXELS.length;
  const instanceIds = ['frontMochi', 'galleryMochi'];
  const cats = instanceIds.map(id => {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    canvas.width = W + 20;
    canvas.height = H + 22;
    const ctx = canvas.getContext('2d', { alpha:true });
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = false;
    const item = {canvas,ctx,heartUntil:0};
    // Original uploaded behavior: tap either cat to show a tiny pixel heart.
    canvas.addEventListener('pointerdown', () => item.heartUntil = performance.now() + 1000);
    return item;
  }).filter(Boolean);

  function eyePixel(x,y,ch,blink) {
    const isEye = (x===7 || x===8 || x===16 || x===17) && y>=11 && y<=14;
    if (!isEye || !blink) return ch;
    if (blink===1) return y===11 ? 'C' : ch;
    return y===13 ? ch : 'C';
  }
  function tailShift(y,t) {
    const influence = Math.max(0, Math.min(1, (23-y)/15));
    return Math.round(Math.sin(t*2.55) * 2 * influence);
  }
  const heartRows = ['.RR.RR.','RRRRRRR','RRRRRRR','.RRRRR.','..RRR..','...R...'];
  function pixel(ctx,x,y,ch) {
    if (!COLORS[ch]) return;
    ctx.fillStyle=COLORS[ch];
    ctx.fillRect(x,y,1,1);
  }
  function drawOne(item,now,t,blink) {
    const {ctx,canvas} = item;
    const ox=9,oy=13;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let y=8;y<=23;y++) for(let x=25;x<W;x++) {
      const ch=PIXELS[y][x];
      if (ch!=='.') pixel(ctx,ox+x+tailShift(y,t),oy+y,ch);
    }
    for(let y=0;y<H;y++) for(let x=0;x<PIXELS[y].length;x++) {
      if(y>=8 && y<=23 && x>=25) continue;
      const ch=eyePixel(x,y,PIXELS[y][x],blink);
      if(ch!=='.') pixel(ctx,ox+x,oy+y,ch);
    }
    if(now<item.heartUntil) {
      ctx.fillStyle='#f294af';
      heartRows.forEach((row,j) => [...row].forEach((ch,i) => {
        if(ch==='R') ctx.fillRect(ox+19+i,oy-7+j,1,1);
      }));
    }
  }
  let raf;
  function frame(now) {
    const t=now/1000;
    const loop=t%4.6;
    const blink=(loop>4.34 && loop<4.41)||(loop>4.52 && loop<4.59) ? 1
               : (loop>=4.41 && loop<=4.52 ? 2 : 0);
    cats.forEach(cat=>drawOne(cat,now,t,blink));
    raf=requestAnimationFrame(frame);
  }
  frame(performance.now());
  window.MochiCanvas={heart(id){const cat=cats.find(v=>v.canvas.id===id);if(cat)cat.heartUntil=performance.now()+1000;}};
})();
