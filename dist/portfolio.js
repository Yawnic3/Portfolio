// Small orthographic 3D studies. Geometry is projected and depth-sorted locally;
// no remote graphics libraries or autoplay animation are needed.
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
function study(canvas,type){
 const ctx=canvas.getContext('2d'); if(!ctx)return;
 let angle=-.56,target=-.56,width=0,height=0; const shapes=[];
 const palette={green:['#879b74','#647c53','#4a6140'],orange:['#cf8359','#b86843','#8c4b31'],paper:['#f8f3e5','#d6d2c5','#b9baa9'],steel:['#8d9890','#616e65','#465349'],dark:['#515e50','#3b493a','#2a362c']};
 function box(x,y,z,w,h,d,c){shapes.push({x,y,z,w,h,d,c:palette[c]||c})}
 if(type==='planner'){
 box(-3,-.2,-2.6,6,.25,5.2,'paper');
 for(let x=0;x<5;x++)for(let z=0;z<5;z++)box(-2.8+x*1.13,.06,-2.4+z*.95,1.03,.035,.84,['#e5e5d7','#c5cbb9','#afbca2']);
 [[0,0,1.6,'green'],[2,1,1.5,'orange'],[4,0,2.5,'steel'],[1,3,1.5,'green'],[3,3,.6,'orange']].forEach(([x,z,d,c])=>box(-2.78+x*1.13,.1,-2.38+z*.95,1,.4,d,c));
 box(-2.8,.1,-2.7,5.5,.1,.15,'dark');
 } else if(type==='railway'){
 box(-3.5,-.45,-2.5,7,.4,5,'green');
 for(let z=-2.2;z<2.5;z+=.5)box(-2.9,0,z,1.7,.12,.18,['#9b8260','#766346','#5b4e38']);
 box(-2.75,.12,-2.4,.12,.12,4.8,'steel');box(-1.55,.12,-2.4,.12,.12,4.8,'steel');
 box(-.3,0,-1.2,2.7,1.6,2.1,'paper');box(-.5,1.6,-1.4,3.1,.3,2.5,'steel');
 box(.1,0,.92,.55,1.1,.04,'dark');box(1.25,.65,.94,.6,.5,.03,['#aec6b6','#7ea28b','#668675']);
 box(2.55,0,-1.6,.18,2.3,.18,'steel');box(2.3,2.3,-1.85,.7,.3,.7,'orange');
 }else{
 for(let i=0;i<3;i++)box(-2.7,.1+i*.17,-2.1,4.3,.1,3.4,'paper');
 for(let x=0;x<4;x++)for(let z=0;z<5;z++)box(-2.45+x*.9,.56,-1.85+z*.48,.78,.025,.34,x===0?'steel':['#d7dacb','#b7beaa','#929f86']);
 box(.9,.05,.3,2.5,.3,2.5,'dark');for(let x=0;x<3;x++)for(let z=0;z<4;z++)box(1.08+x*.73,.36,.48+z*.55,.64,.13,.42,x===0?'orange':'green');
 }
 function project(x,y,z){const a=x*Math.cos(angle)-z*Math.sin(angle),b=x*Math.sin(angle)+z*Math.cos(angle),scale=Math.min(width/9,height/6.4);return{x:width*.5+a*scale,y:height*.56+b*scale*.53-y*scale,depth:b+y*.001}}
 function polygon(vertices,color){ctx.beginPath();vertices.forEach((v,i)=>i?ctx.lineTo(v.x,v.y):ctx.moveTo(v.x,v.y));ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#26382614';ctx.lineWidth=.6;ctx.stroke()}
 function draw(){ctx.clearRect(0,0,width,height);const faces=[];shapes.forEach(({x,y,z,w,h,d,c})=>{
 const p=(a,b,c)=>project(a,b,c);const add=(v,c)=>faces.push({v,c,depth:v.reduce((s,p)=>s+p.depth,0)/v.length});
 add([p(x,y+h,z),p(x+w,y+h,z),p(x+w,y+h,z+d),p(x,y+h,z+d)],c[0]);
 // Both visible sides are selected from the current view angle.
 if(Math.cos(angle)>0)add([p(x,y,z+d),p(x+w,y,z+d),p(x+w,y+h,z+d),p(x,y+h,z+d)],c[1]);else add([p(x,y,z),p(x+w,y,z),p(x+w,y+h,z),p(x,y+h,z)],c[1]);
 if(Math.sin(angle)>0)add([p(x+w,y,z),p(x+w,y,z+d),p(x+w,y+h,z+d),p(x+w,y+h,z)],c[2]);else add([p(x,y,z),p(x,y,z+d),p(x,y+h,z+d),p(x,y+h,z)],c[2]);
 });faces.sort((a,b)=>a.depth-b.depth);faces.forEach(f=>polygon(f.v,f.c));
 if(type==='railway'){ctx.fillStyle='#ad472b';for(let i=0;i<46;i++){const p=project(-.3+(i%9)*.3,.2+(i%5)*.3,1.2+(i%3)*.13);ctx.fillRect(p.x,p.y,1.5,1.5)}}
 }
 const resize=()=>{const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const ratio=Math.min(devicePixelRatio,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);draw()};new ResizeObserver(resize).observe(canvas);
 let raf=0;function ease(){angle+=(target-angle)*.15;draw();if(Math.abs(target-angle)>.001)raf=requestAnimationFrame(ease);else raf=0}
 const link=canvas.closest('a');link.addEventListener('pointermove',e=>{if(reduced||e.pointerType==='touch')return;const r=link.getBoundingClientRect();target=-.56+((e.clientX-r.left)/r.width-.5)*.35;if(!raf)raf=requestAnimationFrame(ease)});link.addEventListener('pointerleave',()=>{target=-.56;if(!raf)raf=requestAnimationFrame(ease)});resize();
}
document.querySelectorAll('[data-scene]').forEach(canvas=>study(canvas,canvas.dataset.scene));

// Visual explanations remain optional: the accompanying labels work without interaction.
const conflictToggle=document.querySelector('#conflict-toggle');
conflictToggle.addEventListener('click',()=>{const on=conflictToggle.getAttribute('aria-pressed')!=='true';conflictToggle.setAttribute('aria-pressed',String(on));document.querySelector('.calendar-wrap').classList.toggle('conflicted',on);document.querySelector('#calendar-state').textContent=on?'Time conflict':'No overlap';conflictToggle.textContent=on?'Restore the schedule':'Show a time conflict';document.querySelector('.course-b small').textContent=on?'09:15–10:15':'11:00–12:00'});
const pointGroup=document.querySelector('#rail-points');
for(let i=0;i<160;i++){const circle=document.createElementNS('http://www.w3.org/2000/svg','circle');const x=295+(i%16)*12,y=135+Math.floor(i/16)*9;circle.setAttribute('cx',String(x));circle.setAttribute('cy',String(y+(x-295)*.15));circle.setAttribute('r','1.8');circle.setAttribute('fill',i%4===0?'#b55d3a':'#627852');pointGroup.append(circle)}
document.querySelectorAll('[data-rail]').forEach(button=>button.addEventListener('click',()=>{const mode=button.dataset.rail;document.querySelectorAll('[data-rail]').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});document.querySelector('#rail-geometry').setAttribute('opacity',mode==='scene'?'1':'.16');pointGroup.setAttribute('opacity',mode==='scene'?'0':'1');document.querySelector('#rail-label').setAttribute('opacity',mode==='labels'?'1':'0')}));
