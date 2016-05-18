function Completo(){
  THREE.Object3D.call(this);
  THREE.ImageUtils.crossOrigin = '';
  var cara = THREE.ImageUtils.loadTexture('http://Ignacio121990.github.io/12899665_10153684992446843_1267488120_n.jpg');
  var brazos = THREE.ImageUtils.loadTexture('http://Ignacio121990.github.io/12899889_10153685013876843_569751267_n.jpg');
  var pies = THREE.ImageUtils.loadTexture('http://Ignacio121990.github.io/12919388_10153685013881843_2062601905_o.jpg');  
  
  
   
  this.cuerpo = new THREE.Mesh(new THREE.SphereGeometry(3,100,100),new THREE.MeshBasicMaterial({map:cara}));
  this.brazoI = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,3),new THREE.MeshBasicMaterial({map:brazos}));
  this.brazoD = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,3),new THREE.MeshBasicMaterial({map:brazos}));
  this.pieI = new THREE.Mesh(new THREE.BoxGeometry(2,1,0.5),new THREE.MeshBasicMaterial({map:pies}));
  this.pieD = new THREE.Mesh(new THREE.BoxGeometry(2,1,0.5),new THREE.MeshBasicMaterial({map:pies}));
  
  this.brazoI.position.z=2.3;
  this.brazoD.position.z=-2.3;
  this.pieD.position.y=-3;
  this.pieD.position.z=1;
  this.pieI.position.y=-3;
  this.pieI.position.z=-1;
  this.pieD.position.x=1;
  this.pieI.position.x=1;
  this.brazoD.rotation.x=1.5;
  this.brazoI.rotation.x=-1.5;
  
  this.add(this.pieI)
  this.add(this.pieD)
  this.add(this.brazoI)
  this.add(this.brazoD)
  this.add(this.cuerpo)
}
Completo.prototype = new THREE.Object3D();

function setup(){
  cubo1 = new THREE.Mesh( new THREE.BoxGeometry( 1, 57, 5),
                          new THREE.MeshNormalMaterial());
  cubo2 = new THREE.Mesh( new THREE.BoxGeometry( 1, 57, 5),
                          new THREE.MeshNormalMaterial());
  cubo3 = new THREE.Mesh( new THREE.BoxGeometry( 60, 1, 5),
                          new THREE.MeshNormalMaterial());
  cubo4 = new THREE.Mesh( new THREE.BoxGeometry( 60, 1, 5),
                          new THREE.MeshNormalMaterial());
  pelota = new Completo();
                          
  cubo1.position.x = 30;
  cubo2.position.x = -30;
  cubo3.position.y = 28;
  cubo4.position.y = -28;
  
  camara = new THREE.PerspectiveCamera();
  camara.position.z = 70;
  
    raycaster1 = new THREE.Raycaster( pelota.position, new THREE.Vector3(1,0,0));
    raycaster2 = new THREE.Raycaster( pelota.position, new THREE.Vector3(-1,0,0));
    raycaster3 = new THREE.Raycaster( pelota.position, new THREE.Vector3(0,1,0));
    raycaster4 = new THREE.Raycaster( pelota.position, new THREE.Vector3(0,-1,0));
  
  escena = new THREE.Scene();
  escena.add ( cubo1 );
  escena.add ( cubo2 );
  escena.add ( cubo3 );
  escena.add ( cubo4 );
  escena.add ( pelota );
  escena.add ( camara );
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerHeight*.95,
                    window.innerHeight*.95 );
  document.body.appendChild( renderer.domElement );

  stepx = 0.05;
  stepy = 0.03;
  step  =0.01;
  stepbrazo = 0.017;
  rotacionx=-1;
  rotaciony=-1;
}

function loop(){
  obstaculo1 = raycaster1.intersectObject( cubo1 );
  obstaculo2 = raycaster2.intersectObject( cubo2 );
  obstaculo3 = raycaster3.intersectObject( cubo3 );
  obstaculo4 = raycaster4.intersectObject( cubo4 );
  
  if ((obstaculo1.length > 0 && (obstaculo1[0].distance <= 3)) ||
      (obstaculo2.length > 0 && (obstaculo2[0].distance <= 3))){
      rotaciony= -rotaciony;  
      stepx= -stepx;
      }
  if ((obstaculo3.length > 0 && (obstaculo3[0].distance <=3)) ||
      (obstaculo4.length > 0 && (obstaculo4[0].distance <=3))){
       rotacionx= -rotacionx;
      stepy= -stepy;
      }
  if (Math.abs(pelota.pieD.rotation.z) > .3 )
  step = -step;

  if (Math.abs(pelota.brazoD.rotation.x) > 2 || Math.abs(pelota.brazoD.rotation.x) < 1)
  stepbrazo = -stepbrazo;

  pelota.brazoD.rotation.x += stepbrazo;
  pelota.brazoI.rotation.x += stepbrazo;
  pelota.pieD.rotation.z += step;
  pelota.pieI.rotation.z -= step;
  pelota.rotation.z=2+rotaciony;
  pelota.rotation.x=2+rotacionx;

      
  pelota.position.x += stepx;
  pelota.position.y += stepy;
  raycaster1.set( pelota.position, new THREE.Vector3(1,0,0) );
  raycaster2.set( pelota.position, new THREE.Vector3(-1,0,0) );
  raycaster3.set( pelota.position, new THREE.Vector3(0,1,0) );
  raycaster4.set( pelota.position, new THREE.Vector3(0,-1,0) );
  
  renderer.render( escena, camara );
  requestAnimationFrame( loop );
}

var cubo1, cubo2, cubo3, cubo4, pelota, escena, camara, renderer;
var raycaster1, raycaster2, reycaster3, reycaster4, step;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4;
var step, stepbrazo, stepx, stepy;

setup();
loop();
