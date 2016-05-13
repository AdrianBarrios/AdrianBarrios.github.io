function rueda(){
	THREE.Object3D.call(this);
	THREE.ImageUtils.crossOrigin = '';
	this.textura = 	THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');

	this.arcShape = new THREE.Shape();
				this.arcShape.moveTo( 50, 10 );
				this.arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
	this.holePath = new THREE.Path();
				this.holePath.moveTo( 20, 10 );
				this.holePath.absarc( 10, 10, 10, 0, Math.PI*2, true );
				this.arcShape.holes.push( this.holePath );

	this.extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
	
	this.rueda = new THREE.ExtrudeGeometry( this.arcShape, this.extrudeSettings );
	this.material = new THREE.MeshPhongMaterial({ map: this.textura});
	this.mallaRueda = new THREE.Mesh( this.rueda, this.material );

	this.add(this.mallaRueda);

}
	rueda.prototype = new THREE.Object3D();
	
function base(){
	THREE.Object3D.call(this);
	this.malla = new THREE.Mesh( new THREE.BoxGeometry( 50,20,98 ), new THREE.MeshNormalMaterial({ color: 0x0000ff }) );

	this.add(this.malla);
}
base.prototype = new THREE.Object3D();


function setup(){
	var material = new THREE.MeshPhongMaterial({color: 0x0000ff });
	
	
	
	Pared1= new THREE.Mesh(new THREE.BoxGeometry(3,10,100),new THREE.MeshPhongMaterial({color: '#00ff00'}));
	Pared2= new THREE.Mesh(new THREE.BoxGeometry(100,10,3),new THREE.MeshPhongMaterial({color: '#ff0000'}));
	Pared3= new THREE.Mesh(new THREE.BoxGeometry(3,10,100),new THREE.MeshPhongMaterial({color: '#0000ff'}));	
	Pared4= new THREE.Mesh(new THREE.BoxGeometry(100,10,3),new THREE.MeshPhongMaterial({color: '#aacc00'}));
	

		var soporte = new THREE.BoxGeometry( 10,10,70);
		var soporte2 = new THREE.CylinderGeometry(5,5.25 );

		var mallaSoporte = new THREE.Mesh( soporte, material);
		var mallaSoporte2 = new THREE.Mesh( soporte2, material);
		mallaBase = new base();
		
		mallaRueda1 = new  rueda ();
		mallaRueda2 = new  rueda ();

		mallaRueda1.position.set( 0, 0, 0);
		mallaBase.position.set( 0, 0, 50); 
		mallaRueda2.position.set( 0, 0, 100);
		mallaSoporte.position.set( 0, 100, 50);
		mallaSoporte2.position.set( 0, 50, 53 );
		
	var forma = new THREE.Geometry();
	THREE.GeometryUtils.merge(forma,mallaRueda1 );
	THREE.GeometryUtils.merge(forma,mallaRueda2 );
	THREE.GeometryUtils.merge(forma,mallaSoporte );
	THREE.GeometryUtils.merge(forma,mallaSoporte2 );	
	THREE.GeometryUtils.merge(forma,mallaBase );	
		

	var material = new THREE.MeshNormalMaterial();
	Segway = new THREE.Mesh(forma, material);
	
	Pared1.position.x=50;
	Pared2.position.z=50;
	Pared3.position.x=-50;
	Pared4.position.z=-50;	
		
	var luzfocal = new THREE.SpotLight( 0xffffff, 5, 200, 0.2 );
  	luzfocal.position.x = -500;
  	luzfocal.position.y = -500;
  	luzfocal.position.z = 0;
  
  	camara = new THREE.PerspectiveCamera();
	camara.position.y = 500;
	camara.rotation.x = -1.57;
	raycaster = new THREE.Raycaster( mallaRueda1.position, new THREE.Vector3(1,0,0));
  	
  	
  	
  	escena = new THREE.Scene(); 
	escena.add(luzfocal);
	escena.add(camara);
	escena.add(Pared1);
	escena.add(Pared2);
	escena.add(Pared3);
	escena.add(Pared4);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
	document.body.appendChild( renderer.domElement );
	step = 15;
}
function loop() {

  
  Obs1=raycaster.intersectObject(Pared1);
  Obs2=raycaster.intersectObject(Pared2);
  Obs3=raycaster.intersectObject(Pared3);
  Obs4=raycaster.intersectObject(Pared4);
  
  if ((Obs1.length>0) && (Obs1[0].distance<=10)){
    raycaster.set(Segway.position,new THREE.Vector3(0,0,1));
	dir=2;
	
  }
  
  if ((Obs2.length>0) && (Obs2[0].distance<=10)){
    raycaster.set(Segway.position,new THREE.Vector3(-1,0,0));
	dir=3;
  }
 if ((Obs3.length>0) && (Obs3[0].distance<=10)){
    raycaster.set(Segway.position,new THREE.Vector3(0,0,-1));
	dir=4;
  }
  
  if ((Obs4.length>0) && (Obs4[0].distance<=10)){
    raycaster.set(Segway.position,new THREE.Vector3(1,0,0));
	dir=1;
  }


if (dir==1){
	Segway.position.x+=step;
	Segway.rotation.y=1.57;
	Segway.rotation.z=0;
	 
	 	 
  }
  else if(dir==2){
	Segway.position.z+=step;
	Segway.rotation.y=0;
	Segway.rotation.z=0;
	 
  }
  else if(dir==3){
	Segway.position.x-=step;
	Segway.rotation.y=-1.57;
	Segway.rotation.z=0;
  }
  else if(dir==4){
	Segway.position.z-=step;
	Segway.rotation.y=3.14;
	Segway.rotation.z=0;
    
	
	}
 
  renderer.render(escena,camara);
  requestAnimationFrame(loop);
}

var escena, camara, renderer, Pared1, Pared2,Pared3,Pared4, wally;
var Obs1,Obs2,Obs3,Obs4;
var cubo1, cubo2, mallaRobot, camara, escena, renderer;
var mallaRueda1, mallaRueda2, mallaBase, mallaSoporte, mallaSoporte2;
var raycaster1,raycaster2, raycaster3, step;
var obstaculo1, obstaculo2;

setup();
loop();

