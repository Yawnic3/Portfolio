(()=>{
const panel=document.querySelector('#training-animation'),button=document.querySelector('#pause-training');if(!panel||!button)return;
let paused=matchMedia('(prefers-reduced-motion: reduce)').matches,elapsed=0,last=0;
const legs=[panel.querySelector('.runner-leg-one path'),panel.querySelector('.runner-leg-two path')],arms=[panel.querySelector('.runner-arm-one path'),panel.querySelector('.runner-arm-two path')];
function sync(){panel.classList.toggle('animation-paused',paused);button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'Play animation':'Pause animation'}button.addEventListener('click',()=>{paused=!paused;sync()});sync();
function limb(hx,hy,fx,fy,length,bend){const dx=fx-hx,dy=fy-hy,d=Math.max(.01,Math.hypot(dx,dy)),reach=Math.min(d,length*1.99),mid=reach/2,offset=Math.sqrt(Math.max(0,length*length-mid*mid));return[hx+dx/d*mid+dy/d*offset*bend,hy+dy/d*mid-dx/d*offset*bend]}
function pose(t){const bob=-3*Math.cos(t*Math.PI*4);for(let i=0;i<2;i++){const p=(t+i*.5)%1;let x,y;
if(p<.45){const q=p/.45;x=281-88*q;y=246;}else{const q=(p-.45)/.55;x=193+88*(q*q*(3-2*q));y=246-62*Math.sin(Math.PI*q);}
const hipX=239,hipY=151+bob,[kx,ky]=limb(hipX,hipY,x,y,53,1);legs[i].setAttribute('d','M'+hipX+' '+hipY+' L'+kx+' '+ky+' L'+x+' '+y+' l14 -2');
const a=Math.sin((t+i*.5)*Math.PI*2),sx=250,sy=108+bob,ex=sx-26*a,ey=sy+25,handX=ex+22,handY=ey-23;arms[i].setAttribute('d','M'+sx+' '+sy+' L'+ex+' '+ey+' L'+handX+' '+handY);
}
}
pose(.08);function frame(now){if(last&&!paused)elapsed+=Math.min(now-last,40);last=now;if(!paused)pose((elapsed/850)%1);requestAnimationFrame(frame)}requestAnimationFrame(frame);
})();
