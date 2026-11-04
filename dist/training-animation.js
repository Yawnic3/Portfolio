(()=>{
const panel=document.querySelector('#training-animation'),button=document.querySelector('#pause-training');if(!panel||!button)return;
let paused=matchMedia('(prefers-reduced-motion: reduce)').matches,elapsed=0,last=0;
const legs=[panel.querySelector('.runner-leg-one path'),panel.querySelector('.runner-leg-two path')],arms=[panel.querySelector('.runner-arm-one path'),panel.querySelector('.runner-arm-two path')];
function sync(){panel.classList.toggle('animation-paused',paused);button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'Play animation':'Pause animation'}button.addEventListener('click',()=>{paused=!paused;sync()});sync();
function limb(hx,hy,fx,fy,length,bend){const dx=fx-hx,dy=fy-hy,d=Math.max(.01,Math.hypot(dx,dy)),reach=Math.min(d,length*1.99),mid=reach/2,offset=Math.sqrt(Math.max(0,length*length-mid*mid));return[hx+dx/d*mid+dy/d*offset*bend,hy+dy/d*mid-dx/d*offset*bend]}
const stride=[
[263,191,277,239],[252,199,251,246],[232,198,215,242],[214,185,188,218],
[220,175,201,197],[245,169,222,194],[265,172,245,207],[271,182,266,227]
];
function pose(t){for(let i=0;i<2;i++){const phase=(t+i*.5)%1,step=phase*stride.length,k=Math.floor(step),q=step-k,a=stride[k],b=stride[(k+1)%stride.length],v=a.map((n,index)=>n+(b[index]-n)*q);const [kx,ky,x,y]=v;legs[i].setAttribute('d','M239 151 L'+kx+' '+ky+' L'+x+' '+y+' l12 2');
const swing=Math.sin((t+i*.5)*Math.PI*2),ex=250-24*swing,ey=131;arms[i].setAttribute('d','M250 108 L'+ex+' '+ey+' L'+(ex+21)+' '+(ey-20));
}}
pose(.08);function frame(now){if(last&&!paused)elapsed+=Math.min(now-last,40);last=now;if(!paused)pose((elapsed/680)%1);requestAnimationFrame(frame)}requestAnimationFrame(frame);
})();
