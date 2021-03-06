function  Robot(){
THREE.Object3D.call(this);
//THREE.ImageUtils.crossOrigin = '';
//this.textura = 	THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');

var arcShape = new THREE.Shape();
				arcShape.moveTo( 50, 10 );
				arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
	var holePath = new THREE.Path();
				holePath.moveTo( 20, 10 );
				holePath.absarc( 10, 10, 10, 0, Math.PI*2, true );
				arcShape.holes.push( holePath );

	var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
	
	this.Rueda1 =  new THREE.Mesh(new THREE.ExtrudeGeometry( arcShape, extrudeSettings ));//,new THREE.MeshPhongMaterial({map}));
	this.Rueda2 =  new THREE.Mesh(new THREE.ExtrudeGeometry( arcShape, extrudeSettings ));//,new THREE.MeshPhongMaterial({map}));
 	this.Base = new THREE.Mesh( new THREE.BoxGeometry( 50,20,98 ));//, new THREE.MeshPhongMaterial({map}));
	this.Soporte1 =  new THREE.Mesh(new THREE.BoxGeometry( 10,10,70));//, new THREE.MeshPhongMaterial({map}));
	this.Soporte2 =  new THREE.Mesh( new THREE.CylinderGeometry(5,5.25 ));//,new THREE.MeshPhongMaterial({map}));
		
		this.Rueda1.position.y = 0;
		this.Rueda2.position.z = 100;
		this.Soporte1.position.y = 100;
		this.Soporte1.position.z = 50; 
		this.Soporte2.position.y = 50; 
		this.Soporte2.position.z = 53; 
		this.Base.position.z = 50; 
		 
		this.add(this.Rueda1)
		this.add(this.Rueda2)
		this.add(this.Base)
		this.add(this.Soporte1)
		this.add(this.Soporte2)
		
		}
		
Robot.prototype = new THREE.Object3D();

function setup(){

    Pared1= new THREE.Mesh(new THREE.BoxGeometry(20,80,1020),new THREE.MeshNormalMaterial());
	Pared2= new THREE.Mesh(new THREE.BoxGeometry(1020,80,20),new THREE.MeshNormalMaterial());
	Pared3= new THREE.Mesh(new THREE.BoxGeometry(20,80,1020),new THREE.MeshNormalMaterial());	
	Pared4= new THREE.Mesh(new THREE.BoxGeometry(1020,80,20),new THREE.MeshNormalMaterial());
	
	Segway = new Robot();
	
	Pared1.position.x=500;
	Pared2.position.z=500;
	Pared3.position.x=-500;
	Pared4.position.z=-500;	
	
	
	camara = new THREE.PerspectiveCamera();
	camara.position.y = 2000;
	//camara.position.z = 1000;
	camara.rotation.x = -1.57;
	
	  escena = new THREE.Scene();
	escena.add(camara);
	escena.add(Pared1);
	escena.add(Pared2);
	escena.add(Pared3);
	escena.add(Pared4);
	escena.add(Segway);
	  
	
	raycaster = new THREE.Raycaster( Segway.position, new THREE.Vector3(1,0,0));
  

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
	document.body.appendChild( renderer.domElement );
	step = 1.5;
	}
	
	
function loop() {

  
  Obs1=raycaster.intersectObject(Pared1);
  Obs2=raycaster.intersectObject(Pared2);
  Obs3=raycaster.intersectObject(Pared3);
  Obs4=raycaster.intersectObject(Pared4);
  
   if ((Obs1.length>0) && (Obs1[0].distance<=120)){
    raycaster.set(Segway.position,new THREE.Vector3(0,0,1));
	dir=2;
  }
  
  if ((Obs2.length>0) && (Obs2[0].distance<=120)){
    raycaster.set(Segway.position,new THREE.Vector3(-1,0,0));
	dir=3;
  }
 if ((Obs3.length>0) && (Obs3[0].distance<=120)){
    raycaster.set(Segway.position,new THREE.Vector3(0,0,-1));
	dir=4;
  }
  
  if ((Obs4.length>0) && (Obs4[0].distance<=120)){
    raycaster.set(Segway.position,new THREE.Vector3(1,0,0));
	dir=1;
  }
if (dir==1){
	Segway.position.x+=step;
	Segway.rotation.y=3.14;
	//Segway.rotation.z=0;

  }
  else if(dir==2){
	Segway.position.z+=step;
	Segway.rotation.y=1.57;
	//Segway.rotation.z=0;
	
  }
  else if(dir==3){
	Segway.position.x-=step;
	Segway.rotation.y=0;
	//Segway.rotation.z=0;
	
  }
  else if(dir==4){
	Segway.position.z-=step;
	Segway.rotation.y=-1.57;
	//Segway.rotation.z=0;
    
	}
 
  renderer.render(escena,camara);
  requestAnimationFrame(loop);
}

var escena, camara, renderer, Pared1, Pared2,Pared3,Pared4, Segway;
var Obs1,Obs2,Obs3,Obs4;
var dir
dir = 1;
//var cubo1, cubo2, mallaRobot, camara, escena, renderer;
//var Rueda1, Rueda2, mallaBase, Soporte, Soporte2;
var raycaster, step;

setup();
loop();
