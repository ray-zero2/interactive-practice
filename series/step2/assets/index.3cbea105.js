import{R as c,T as l,a as r,P as d,C as p,M as x}from"./vendor.ca30140f.js";const u=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerpolicy&&(e.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?e.credentials="include":s.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(s){if(s.ep)return;s.ep=!0;const e=i(s);fetch(s.href,e)}};u();const a=(h,t)=>Math.floor(Math.random()*(t-h+1)+h),m=15,g=15;class v{constructor(){this.canvas=document.createElement("canvas"),this.size={x:0,y:0},this.ctx=this.canvas.getContext("2d"),this.ctx.globalCompositeOperation="lighter",this.time=0,this.range={x:[0,0],y:[0,0]},this.speedX=a(1,3),this.speedY=a(1,3),this.lineWidth=2}init(){this.setSize()}getCanvas(){return this.canvas}getImage(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)}setLineWidth(t){this.lineWidth=t,this.ctx.lineWidth=t}setSize(t,i){this.size.x=t,this.size.y=i,this.canvas.width=t,this.canvas.height=i}update(t){this.ctx.clearRect(0,0,this.size.x,this.size.y),this.time+=t,this.range.x[0]=(this.size.x*Math.sin(this.time*this.speedX)+this.size.x)*.5,this.range.x[1]=(this.size.x*Math.sin(this.time*this.speedX*1.1+Math.PI)+this.size.x)*.5,this.range.y[0]=(this.size.y*Math.sin(this.time*this.speedY)+this.size.y)*.5,this.range.y[1]=(this.size.y*Math.sin(this.time*this.speedY*1.1+Math.PI)+this.size.y)*.5,this.draw()}draw(){this.ctx.strokeStyle="#ff0000",this.ctx.beginPath();for(let t=0;t<m;t++){const i=a(this.range.y[0],this.range.y[1]);this.setLine(0,i,this.size.x,i)}this.ctx.closePath(),this.ctx.stroke(),this.ctx.strokeStyle="#00ff00",this.ctx.beginPath();for(let t=0;t<g;t++){const i=a(this.range.x[0],this.range.x[1]);this.setLine(i,0,i,this.size.y)}this.ctx.closePath(),this.ctx.stroke()}setLine(t,i,o,s){this.ctx.moveTo(t,i),this.ctx.lineTo(o,s)}}var y=`attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}`,z=`precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform sampler2D tex1;
uniform sampler2D tex2;
varying vec2 vUv;

void main() {
    vec4 shapeColor = texture2D(tex2, vUv);
    float verticalLine = texture2D(tex1, vUv + vec2(shapeColor.g * 0.005)).g;
    float horizontalLine = texture2D(tex1, vUv + vec2(shapeColor.r * 0.005)).r;
    gl_FragColor = vec4(vec3(verticalLine+horizontalLine), .7);
}`;class f{constructor(t){this.renderer=new c({canvas:t,width:t.width,height:t.height,alpha:!0,antialias:!0}),this.gl=this.renderer.gl,this.geometry=new l(this.gl);const i={generateMipmaps:!1,width:t.width,height:t.height};this.textures=[new r(this.gl,i),new r(this.gl,i)],this.program=new d(this.gl,{vertex:y,fragment:z,uniforms:{uTime:{value:0},uColor:{value:new p(.3,.2,.5)},tex1:{value:this.textures[0]},tex2:{value:this.textures[1]}}}),this.mesh=new x(this.gl,{geometry:this.geometry,program:this.program}),this.time=0,this.images={}}setSize(t,i){this.renderer.setSize(t,i),this.gl.canvas.style.width="100%",this.gl.canvas.style.height="100%"}setTextureImage(t,i){this.textures[i].image=t}update(t){this.time+=t,this.program.uniforms.uTime.value=this.time}draw(){this.renderer.render({scene:this.mesh})}}class w{constructor(){this.canvas=document.createElement("canvas"),this.canvasSize={x:0,y:0},this.ctx=this.canvas.getContext("2d"),this.time=0,this.mouse={x:0,y:0},this.position={x:0,y:0},this.type=0,this.size=80,this.speed=.1}init(){this.type=Math.floor(Math.random()*3),console.log(this.type)}getCanvas(){return this.canvas}getImage(){return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height)}setLineWidth(t){this.lineWidth=t,this.ctx.lineWidth=t}setSize(t,i){this.canvasSize.x=t,this.canvasSize.y=i,this.canvas.width=t,this.canvas.height=i}setMouse(t){this.mouse=t}update(t){this.ctx.clearRect(0,0,this.canvasSize.x,this.canvasSize.y),this.time+=t;const i=this.mouse;this.position.x+=(i.x-this.position.x)*this.speed,this.position.y+=(i.y-this.position.y)*this.speed,this.draw()}draw(){switch(this.ctx.globalCompositeOperation="lighter",this.type){case 0:this.drawCircle();break;case 1:this.drawRect();break;case 2:this.drawTriangle();break}}drawCircle(){const t=this.ctx.createLinearGradient(this.position.x-this.size,this.position.y,this.position.x+this.size,this.position.y);t.addColorStop(0,"#000"),t.addColorStop(.5,"#f00"),t.addColorStop(1,"#000");const i=this.ctx.createLinearGradient(this.position.x,this.position.y-this.size,this.position.x,this.position.y+this.size);i.addColorStop(0,"#000"),i.addColorStop(.5,"#0f0"),i.addColorStop(1,"#000"),this.ctx.beginPath(),this.ctx.fillStyle=t,this.ctx.arc(this.position.x,this.position.y,this.size,0,Math.PI*2),this.ctx.closePath(),this.ctx.fill(),this.ctx.beginPath(),this.ctx.fillStyle=i,this.ctx.arc(this.position.x,this.position.y,this.size,0,Math.PI*2),this.ctx.closePath(),this.ctx.fill()}drawRect(){const t=this.ctx.createLinearGradient(this.position.x-this.size,this.position.y,this.position.x+this.size,this.position.y);t.addColorStop(0,"#a00"),t.addColorStop(.1,"#000"),t.addColorStop(.9,"#000"),t.addColorStop(1,"#a00");const i=this.ctx.createLinearGradient(this.position.x,this.position.y-this.size,this.position.x,this.position.y+this.size);i.addColorStop(0,"#0a0"),i.addColorStop(.1,"#000"),i.addColorStop(.9,"#000"),i.addColorStop(1,"#0a0"),this.ctx.beginPath(),this.ctx.fillStyle=t,this.ctx.rect(this.position.x-this.size,this.position.y-this.size,this.size*2,this.size*2),this.ctx.closePath(),this.ctx.fill(),this.ctx.beginPath(),this.ctx.fillStyle=i,this.ctx.rect(this.position.x-this.size,this.position.y-this.size,this.size*2,this.size*2),this.ctx.closePath(),this.ctx.fill()}drawTriangle(){const t=this.ctx.createLinearGradient(this.position.x-this.size,this.position.y,this.position.x+this.size,this.position.y);t.addColorStop(0,"#000"),t.addColorStop(.5,"#a00"),t.addColorStop(1,"#000");const i=this.ctx.createLinearGradient(this.position.x,this.position.y-this.size,this.position.x,this.position.y+this.size);i.addColorStop(0,"#000"),i.addColorStop(.5,"#0a0"),i.addColorStop(1,"#000"),this.ctx.beginPath(),this.ctx.fillStyle=t,this.ctx.moveTo(this.position.x,this.position.y-this.size),this.ctx.lineTo(this.position.x+this.size*Math.cos(Math.PI/6),this.position.y+this.size*Math.sin(Math.PI/6)),this.ctx.lineTo(this.position.x+this.size*Math.cos(Math.PI*5/6),this.position.y+this.size*Math.sin(Math.PI*5/6)),this.ctx.lineTo(this.position.x,this.position.y-this.size),this.ctx.closePath(),this.ctx.fill(),this.ctx.beginPath(),this.ctx.fillStyle=i,this.ctx.moveTo(this.position.x,this.position.y-this.size),this.ctx.lineTo(this.position.x+this.size*Math.cos(Math.PI/6),this.position.y+this.size*Math.sin(Math.PI/6)),this.ctx.lineTo(this.position.x+this.size*Math.cos(Math.PI*5/6),this.position.y+this.size*Math.sin(Math.PI*5/6)),this.ctx.lineTo(this.position.x,this.position.y-this.size),this.ctx.closePath(),this.ctx.fill()}}class S{constructor(t=".js-canvas"){this.canvas=document.querySelector(t),this.time=0,this.lines=new v,this.shapes=new w,this.mixer=new f(this.canvas),this.mouse={x:0,y:0}}init(){this.setCanvasSize(),this.lines.setLineWidth(.5),this.shapes.init(),this.shapes.setMouse(this.mouse),this.bind()}update(t){this.time+=t,this.lines.update(t),this.shapes.update(t);const i=this.lines.getImage();this.mixer.setTextureImage(i,0);const o=this.shapes.getImage();this.mixer.setTextureImage(o,1),this.mixer.update(t)}draw(){this.mixer.draw()}setCanvasSize(){const{width:t,height:i}=this.canvas;this.lines.setSize(t,i),this.shapes.setSize(t,i),this.mixer.setSize(t,i)}handleMouseMove(t){const{offsetX:i,offsetY:o,target:s}=t,e=i/s.clientWidth*s.width,n=o/s.clientHeight*s.height;this.mouse.x=e,this.mouse.y=n}bind(){this.canvas.addEventListener("mousemove",this.handleMouseMove.bind(this))}}class M{constructor(){this.mouse={position:{x:0,y:0},isDown:!1},this.time=0,this.deltaTime=0,this.lastTimeStamp=0,this.bind()}start(){this.animate()}update(){}draw(){}handleMouseDown(t){this.mouse.isDown=!0,this.mouse.position.x=t.clientX,this.mouse.position.y=t.clientY}handleMouseMove(t){this.mouse.position.x=t.clientX,this.mouse.position.y=t.clientY}handleMouseUp(t){this.mouse.isDown=!1,this.mouse.position.x=t.clientX,this.mouse.position.y=t.clientY}handleResize(t){}animate(t){requestAnimationFrame(this.animate.bind(this)),this.deltaTime=(t-this.lastTimeStamp)/1e3||0,this.time+=this.deltaTime,this.update(),this.draw(),this.lastTimeStamp=t}bind(){window.addEventListener("mousedown",this.handleMouseDown.bind(this),{passive:!1}),window.addEventListener("mousemove",this.handleMouseMove.bind(this),{passive:!1}),window.addEventListener("mouseup",this.handleMouseUp.bind(this),{passive:!1}),window.addEventListener("resize",this.handleResize.bind(this),{passive:!0})}}class C extends M{constructor(){super();this.boundary=new S(".js-canvas"),this.init()}init(){this.boundary.init()}update(){this.boundary.update(this.deltaTime)}draw(){this.boundary.draw()}handleResize(t){}handleLoad(){this.handleResize()}bind(){super.bind(),window.addEventListener("load",this.handleLoad.bind(this),{passive:!0})}}const b=new C;b.start();
