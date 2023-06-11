import{G as p,n as m,V as r,P as u,d as c,o as f,p as x,M as l,O as v,F as g,b as y,c as w,W as b,f as z,E as S,S as M,A as C,s as j,a as E,g as P,h as _,i as D}from"./postprocessing.esm.f3698027.js";const a=new p;a.close();a.onChange(i=>{i.controller.updateDisplay()});class L extends m{time;constructor(e={}){super(e?.fov,e?.aspect,e?.near,e?.far),this.time=0,this.enableControl=e?.enableControl,e?.canvas&&this.enableControl&&(this.controls=new OrbitControls(this,e?.canvas),this.controls.enableDamping=e?.enableDamping||!1,this.controls.dampingFactor=e?.dampingFactor??.2,this.updateProjectionMatrix())}init(){this.position.set(.039,3.2,6),this.lookAt(new r(0,0,-1.5))}resize(e){this.aspect=e.x/e.y,this.updateProjectionMatrix()}update(e){}}const d=(i,e,t)=>(i.onBeforeCompile=(s,n)=>{s.uniforms={...s.uniforms,...e},t(s,n)},{material:i,uniforms:e});var R=`#include <common>

uniform float uTime;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  
  
  
  
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; 
  vec3 x3 = x0 - D.yyy;      

  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857; 
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  
  
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }`,G=`#include <begin_vertex>

float timeScale = 0.2;
float amplitute = .5;
float _noise = (snoise(transformed + uTime * timeScale) + 1.) * .5;
float noiseEffect = _noise * amplitute;

vec2 uvCenter = vec2(0.5);
float dist = length(uvCenter - uv);
float waveTimeScale = .9;
float waveScale = 50.;
float waveDiffuse = .5;
float waveEffect = max(smoothstep(0.4, 1., sin(dist * waveScale - uTime * waveTimeScale)), waveDiffuse);

float effect =
  (waveEffect * (1. - dist))
  * noiseEffect
  * .7;

transformed += vec3(.0, .0,  effect);`;class H{uniforms;material;depthMaterial;obj;time;timescale;constructor(e,t,s,n){this.uniforms={uTime:{value:0}};const h=new u(e,t,s,n);h.computeTangents(),this.material=d(new c({flatShading:!0,metalness:1.1,roughness:3}),this.uniforms,this.customizeShader.bind(this)),this.depthMaterial=d(new f({depthPacking:x}),this.uniforms,this.customizeShader.bind(this)),this.obj=new l(h,this.material.material),this.time=0,this.timescale=1,this.init()}init(){this.obj.castShadow=!0,this.obj.receiveShadow=!0,this.obj.customDepthMaterial=this.depthMaterial.material,this.obj.rotation.x=-Math.PI/2,this.obj.scale.set(3,3,3)}update(e){this.time+=e,this.uniforms.uTime.value=this.time*this.timescale}customizeShader(e,t){e.vertexShader=e.vertexShader.replace("#include <common>",R).replace("#include <begin_vertex>",G)}}class F{obj;constructor(){this.geometry=new v(1,0),this.material=new c({side:g,flatShading:!0,metalness:1}),this.obj=new l(this.geometry,this.material),this.time=0,this.init()}init(){this.obj.castShadow=!0,this.obj.receiveShadow=!0,this.obj.position.set(0,1.1,0),this.obj.scale.set(.7,.7,.7)}update(e){this.time+=e,this.obj.rotateY(e)}}class o extends y{_helper;time;constructor(e="#ffffff"){super(e,2),this.angle=20,this.penumbra=.4,this.decay=2,this.distance=50,this._helper=new w(this),this.time=0,this.position.set(Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)),this.lookAt(new r(0,0,0)),this.castShadow=!0,this.shadow.autoUpdate=!0,this.shadow.mapSize.width=1024,this.shadow.mapSize.height=1024,this.init(),this.setGui(e)}init(){}getHelper(){return this._helper}update(e){this.time+=e,this._helper.update()}setGui(e){const t=a.addFolder(`spotlight - ${this.id}`);t.add(this._helper,"visible"),t.add(this,"angle").min(0).max(Math.PI/2).step(Math.PI/90),t.add(this,"distance").min(1).max(180).step(1),t.add(this.position,"x").min(-50).max(50).step(1),t.add(this.position,"y").min(-50).max(50).step(1),t.add(this.position,"z").min(-50).max(50).step(1),t.add(this,"penumbra").min(0).max(1).step(.01),t.add(this,"decay").min(0).max(5).step(.01),t.addColor({string:e},"string").onChange(s=>this.color.set(s))}}class I{canvas;time;resolution;dpr;renderer;scene;camera;lights;plane;sphere;composer;stats;framer;gui;constructor(e){this.canvas=e,this.time=0,this.resolution={x:e.offsetWidth,y:e.offsetHeight},this.dpr=Math.min(window.devicePixelRatio,2),this.renderer=new b({canvas:e,depth:!0}),this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.scene=new z,this.camera=new L({fov:30,aspect:this.resolution.x/this.resolution.y,far:100,near:.1,canvas:e,enableControl:!1}),this.lights={spot1:new o,spot2:new o("#fda5b4"),spot3:new o("#66ffff")},this.plane=null,this.sphere=null,this.composer=new S(void 0,{multisampling:this.dpr===1?2:void 0}),this.stats=new M,this.gui=a,this.framer=C.getInstance(),this.init().then(this.start.bind(this))}resize(e,t){this.resolution.x=e,this.resolution.y=t,this.dpr=Math.min(window.devicePixelRatio,2),this.renderer.setSize(this.resolution.x,this.resolution.y,!1),this.camera.resize(this.resolution),this.composer?.setSize(this.resolution.x,this.resolution.y)}async init(){document.body.appendChild(this.stats.dom),this.renderer.outputEncoding=j,this.renderer.toneMapping=E,this.renderer.toneMappingExposure=2.5,this.plane=new H(10,10,256*2,256*2),this.scene.add(this.plane.obj),this.sphere=new F(this.renderer),this.scene.add(this.sphere.obj),this.scene.add(this.lights.spot1),this.scene.add(this.lights.spot2),this.scene.add(this.lights.spot3);const e=this.lights.spot1.getHelper(),t=this.lights.spot2.getHelper(),s=this.lights.spot3.getHelper();this.scene.add(e),this.scene.add(t),this.scene.add(s),e.visible=!1,t.visible=!1,s.visible=!1,this.camera.init(),this.setRenderer(),this.setLights(),this.setEffect(),this.bind(),this.handleResize()}start(){this.framer.start()}animate({deltaTime:e}){this.time+=e,this.lights.spot1.update(e),this.camera.update(e),this.plane.update(e),this.sphere.update(e),this.composer.render(e),this.stats.update()}setRenderer(){this.renderer.setSize(this.resolution.x,this.resolution.y,!1),this.renderer.setPixelRatio(this.dpr),this.renderer.shadowMap.enabled=!0}setLights(){const{spot1:e,spot2:t,spot3:s}=this.lights;e.angle=1.5707963267948966,e.distance=50,e.position.set(0,3,4),e.penumbra=.628318530717959,e.decay=2,t.angle=.80285,t.distance=26,t.position.set(-8,2,-5),t.penumbra=.52,t.decay=2.5,s.angle=.94,s.distance=19,s.position.set(7,7,-2),s.penumbra=1,s.decay=.95}setEffect(){this.composer.setRenderer(this.renderer),this.composer.setSize(this.resolution.x,this.resolution.y,!1),this.composer.addPass(new P(this.scene,this.camera));const e=new _(this.camera,{focalLength:.07,bokehScale:11,resolutionScale:.25});e.target=new r(0,0,0);const t=new D(this.camera,e);this.composer.addPass(t);const s=this.gui.addFolder("Depth of field");s.add({enabled:t.enabled},"enabled").onChange(n=>{t.enabled=n}),s.add(e,"bokehScale").min(0).max(20).step(.5),s.add(e.circleOfConfusionMaterial,"focalLength").min(.01).max(.15).step(.01)}handleResize(){this.resize(window.innerWidth,window.innerHeight)}bind(){window.addEventListener("resize",this.handleResize.bind(this)),this.framer.add({id:"gl1",update:this.animate.bind(this)})}}window.addEventListener("load",()=>{new I(document.querySelector(".canvas"))});
