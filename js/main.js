/* ===== Navegación auxiliar por botones que cambian hash ===== */
function goto(id) { location.hash = id; }

/* ===== Descargar archivos ===== */
function descargar(nombre){
  const a=document.createElement('a');
  a.href=`docs/${encodeURIComponent(nombre)}`;
  a.download=nombre;
  a.style.display='none';
  document.body.appendChild(a);
  a.click(); document.body.removeChild(a);
}

/* ===== Fondo animado (Canvas) — твоя версия ===== */
const canvas=document.getElementById('bg');
const ctx=canvas.getContext('2d',{alpha:true});
let w,h,dpr;

const BLOBS=7;
const blobs=Array.from({length:BLOBS}).map(()=>({
  nx:Math.random(), ny:Math.random(),
  rRatio:0.18+Math.random()*0.22,
  spx:0.0003+Math.random()*0.0007,
  spy:0.0003+Math.random()*0.0007,
  a:0.18+Math.random()*0.15,
  hue:350+Math.random()*20,
  phase:Math.random()*Math.PI*2
}));

function resize(){
  dpr=Math.max(1,Math.min(window.devicePixelRatio||1,2));
  w=canvas.width=Math.floor(window.innerWidth*dpr);
  h=canvas.height=Math.floor(window.innerHeight*dpr);
  canvas.style.width=window.innerWidth+'px';
  canvas.style.height=window.innerHeight+'px';
  blobs.forEach(b=>{ b.x0=b.nx*w; b.y0=b.ny*h; b.r=Math.min(w,h)*b.rRatio; });
}
window.addEventListener('resize',resize,{passive:true});
resize();

function baseGradient(t){
  const g=ctx.createLinearGradient(0,0,w,h);
  const sh=Math.sin(t*0.0002)*10;
  g.addColorStop(0,`hsl(${350+sh},68%,32%)`);
  g.addColorStop(1,`hsl(${3+sh},70%,48%)`);
  return g;
}
const pmod=(v,m)=>((v%m)+m)%m;

function tick(ts){
  requestAnimationFrame(tick);
  ctx.globalCompositeOperation='source-over';
  ctx.fillStyle=baseGradient(ts);
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle='rgba(0,0,0,0.08)';
  ctx.fillRect(0,0,w,h);
  ctx.globalCompositeOperation='lighter';
  blobs.forEach((b,i)=>{
    const t=ts+i*1000;
    const x=b.x0+Math.sin(t*b.spx+b.phase)*(w*0.25);
    const y=b.y0+Math.cos(t*b.spy+b.phase)*(h*0.25);
    const xp=pmod(x,w), yp=pmod(y,h);
    const g=ctx.createRadialGradient(xp,yp,0,xp,yp,b.r);
    const hueShift=Math.sin(t*0.0003+b.phase)*15;
    const c=`hsla(${b.hue+hueShift},70%,60%,${b.a})`;
    g.addColorStop(0,c); g.addColorStop(1,'hsla(0,0%,0%,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(xp,yp,b.r,0,Math.PI*2); ctx.fill();
  });
  ctx.globalCompositeOperation='multiply';
  const v=ctx.createRadialGradient(w*0.5,h*0.5,Math.min(w,h)*0.3,w*0.5,h*0.5,Math.max(w,h)*0.7);
  v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(0,0,0,0.22)');
  ctx.fillStyle=v; ctx.fillRect(0,0,w,h);
  ctx.globalCompositeOperation='source-over';
}
requestAnimationFrame(tick);
