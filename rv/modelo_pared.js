function setup(){

	var arcShape = new THREE.Shape();
				arcShape.moveTo( 50, 10 );
				arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
	var holePath = new THREE.Path();
				holePath.moveTo( 20, 10 );
				holePath.absarc( 10, 10, 10, 0, Math.PI*2, true );
				arcShape.holes.push( holePath );

	var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
	var rueda = new THREE.ExtrudeGeometry( arcShape, extrudeSettings );
	 var base = new THREE.BoxGeometry( 50,20,98 );
	var soporte = new THREE.BoxGeometry( 10,10,70);
	var soporte2 = new THREE.CylinderGeometry(5,5.25 );


var material = new THREE.MeshNormalMaterial();	
		var mallaRueda1 = new THREE.Mesh( rueda );
		var mallaRueda2 = new THREE.Mesh( rueda );
		var mallaBase = new THREE.Mesh( base );
		var mallaSoporte = new THREE.Mesh( soporte);
		var mallaSoporte2 = new THREE.Mesh( soporte2);
		
Pared1= new THREE.Mesh(new THREE.BoxGeometry(3,10,300),new THREE.MeshNormalMaterial());
Pared2= new THREE.Mesh(new THREE.BoxGeometry(300,10,3),new THREE.MeshNormalMaterial());
Pared3= new THREE.Mesh(new THREE.BoxGeometry(3,10,300),new THREE.MeshNormalMaterial());	
Pared4= new THREE.Mesh(new THREE.BoxGeometry(300,10,3),new THREE.MeshNormalMaterial());
	

	
	mallaRueda1.position.set( 0, 0, 0);
	mallaBase.position.set( 0, 0, 50);
	mallaRueda2.position.set( 0, 0, 100);
	mallaSoporte.position.set( 0, 100, 50);
	mallaSoporte2.position.set( 0, 50, 53 );
	
	
var robot = new THREE.Geometry();

	THREE.GeometryUtils.merge( robot, mallaRueda1 );
	THREE.GeometryUtils.merge( robot, mallaRueda2 );
	THREE.GeometryUtils.merge( robot, mallaBase );
	THREE.GeometryUtils.merge( robot, mallaSoporte );
	THREE.GeometryUtils.merge( robot, mallaSoporte2 );
	
	mallaRobot = new THREE.Mesh( robot , material );

	Pared1.position.x=150;
	Pared2.position.z=150;
	Pared3.position.x=-150;
	Pared4.position.z=-150;	
		
	var luzfocal = new THREE.SpotLight( 0xffffff, 5, 200, 0.2 );
  	luzfocal.position.x = -500;
  	luzfocal.position.y = -500;
  	luzfocal.position.z = 0;
  
    	camara = new THREE.PerspectiveCamera();
	camara.position.y =500;
	// camara.position.y =100;
	camara.rotation.x = -1.57;
	
	raycaster = new THREE.Raycaster(Segway.position, new THREE.Vector3(1,0,0));


	escena = new THREE.Scene();
	escena.add(Segway);
	escena.add(luzfocal);
	escena.add(Pared1);
	escena.add(Pared2);
	escena.add(Pared3);
	escena.add(Pared4);
	escena.add(mallaRobot);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
	document.body.appendChild( renderer.domElement );
}


function loop(){

	
  
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

var escena, camara, renderer, Pared1, Pared2,Pared3,Pared4, Segway;
var Obs1,Obs2,Obs3,Obs4;
var dir
dir = 1;
var cubo1, cubo2, mallaRobot;
var Rueda1, Rueda2, mallaBase, Soporte, Soporte2;
var raycaster, step;
var obstaculo1, obstaculo2;

setup();
loop();
