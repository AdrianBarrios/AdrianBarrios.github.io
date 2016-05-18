function rueda(){
	THREE.Object3D.call(this);
	// this.textura = 	THREE.ImageUtils.loadTexture('cuadros.jpg');
	// THREE.ImageUtils.crossOrigin = '';

	this.arcShape = new THREE.Shape();
				this.arcShape.moveTo( 50, 10 );
				this.arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
	this.holePath = new THREE.Path();
				this.holePath.moveTo( 20, 10 );
				this.holePath.absarc( 10, 10, 10, 0, Math.PI*2, true );
				this.arcShape.holes.push( this.holePath );

	this.extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
	
	this.rueda = new THREE.ExtrudeGeometry( this.arcShape, this.extrudeSettings );
	// this.material = new THREE.MeshPhongMaterial({ map: this.textura});
	this.material = new THREE.MeshNormalMaterial();
	this.mallaRueda = new THREE.Mesh( this.rueda, this.material );

	this.add(this.mallaRueda);

}
	rueda.prototype = new THREE.Object3D();








	
function base(){
	THREE.Object3D.call(this);
	this.malla = new THREE.Mesh( new THREE.BoxGeometry( 50,20,98 ), new THREE.MeshNormalMaterial() );

	this.add(this.malla);
}
base.prototype = new THREE.Object3D();








function setup(){
	var material = new THREE.MeshNormalMaterial();
	
	
	
	Pared1= new THREE.Mesh(new THREE.BoxGeometry(6,20,600),new THREE.MeshNormalMaterial());
	Pared2= new THREE.Mesh(new THREE.BoxGeometry(600,20,6),new THREE.MeshNormalMaterial());
	Pared3= new THREE.Mesh(new THREE.BoxGeometry(6,20,600),new THREE.MeshNormalMaterial());	
	Pared4= new THREE.Mesh(new THREE.BoxGeometry(600,20,6),new THREE.MeshNormalMaterial());
	

		var formaSoporte1 = new THREE.BoxGeometry( 10,10,70);
		var formaSoporte2 = new THREE.CylinderGeometry(5,5.25 );

		
		var Soporte1 = new THREE.Mesh(formaSoporte1, material);
		var Soporte2 = new THREE.Mesh(formaSoporte2, material);
		
		Base = new base();
		Rueda1 = new  rueda ();
		Rueda2 = new  rueda ();

		Rueda1.position.set( 0, 0, 0);
		Rueda2.position.set( 0, 0, 100);
		Soporte1.position.set( 0, 100, 50);
		Soporte2.position.set( 0, 50, 53 );
		Base.position.set( 0, 0, 50); 
		
	var forma = new THREE.Geometry();
	
	// THREE.GeometryUtils.merge(forma,Rueda1);
	// THREE.GeometryUtils.merge(forma,Rueda2);
	THREE.GeometryUtils.merge(forma,Soporte1);
	THREE.GeometryUtils.merge(forma,Soporte2);	
	// THREE.GeometryUtils.merge(forma,Base);	
	
	Segway = new THREE.Mesh(forma, material);
	
	Pared1.position.x=300;
	Pared2.position.z=300;
	Pared3.position.x=-300;
	Pared4.position.z=-300;	
		
	var luzfocal = new THREE.SpotLight( 0xffffff, 5, 200, 0.2 );
  	luzfocal.position.x = -500;
  	luzfocal.position.y = -500;
  	luzfocal.position.z = 0;
  
  	camara = new THREE.PerspectiveCamera();
	camara.position.y =1200;
	// camara.position.y =100;
	camara.rotation.x = -1.57;


	raycaster = new THREE.Raycaster(Segway.position, new THREE.Vector3(1,0,0));
  	
  	
  	
  	escena = new THREE.Scene(); 
	escena.add(luzfocal);
	escena.add(camara);
	escena.add(Pared1);
	escena.add(Pared2);
	escena.add(Pared3);
	escena.add(Pared4);
	escena.add(Segway);
	escena.add(Base);
	escena.add(Rueda1);
	escena.add(Rueda2);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
	document.body.appendChild( renderer.domElement );
	step = 0.5;
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
	Segway.rotation.y=0;
	Segway.rotation.z=0;
	
	Rueda1.position.x+=step;
	Rueda1.rotation.y=0;
	Rueda1.rotation.z=0;
	
	Rueda2.position.x+=step;
	Rueda2.rotation.y=0;
	Rueda2.rotation.z=0;	
	 	 
	Base.position.x+=step;
	Base.rotation.y=0;
	Base.rotation.z=0;
  }
  else if(dir==2){
	Segway.position.z+=step;
	Segway.rotation.y=1.57;
	Segway.rotation.z=1;
	
	
	
	
	Rueda1.position.z+=step;
	Rueda1.rotation.y=1.57;
	Rueda1.rotation.z=0;
	Rueda1.position.X+=175;
	
	Rueda2.position.z+=step;
	Rueda2.rotation.y=1.57;
	Rueda2.rotation.z=0;
	Rueda2.rotation.z=125;
	 	 
	Base.position.z+=step;
	Base.rotation.y=1.57;
	Base.rotation.z=0;
	 
  }
  else if(dir==3){
	Segway.position.x-=step;
	Segway.rotation.y=-1.57;
	Segway.rotation.z=0;
	
	Rueda1.position.x-=step;
	Rueda1.rotation.y=-1.57;
	Rueda1.rotation.z=0;
	
	Rueda2.position.x-=step;
	Rueda2.rotation.y=-1.57;
	Rueda2.rotation.z=0;	
	 	 
	Base.position.x-=step;
	Base.rotation.y=-1.57;
	Base.rotation.z=0;
	
	
  }
  else if(dir==4){
	Segway.position.z-=step;
	Segway.rotation.y=3.14;
	Segway.rotation.z=0;
	
	Rueda1.position.z-=step;
	Rueda1.rotation.y=3.14;
	Rueda1.rotation.z=0;
	
	Rueda2.position.z-=step;
	Rueda2.rotation.y=3.14;
	Rueda2.rotation.z=0;	
	 	 
	Base.position.z-=step;
	Base.rotation.y=3.14;
	Base.rotation.z=0;
    
	}
	
 
  
  
  
  renderer.render(escena,camara);
  requestAnimationFrame(loop);
}

var escena, camara, renderer, Pared1, Pared2,Pared3,Pared4, Segway;
var Obs1,Obs2,Obs3,Obs4;
var dir
dir = 1;
var cubo1, cubo2, mallaRobot, camara, escena, renderer;
var Rueda1, Rueda2, mallaBase, Soporte, Soporte2;
var raycaster, step;
var obstaculo1, obstaculo2;

setup();
loop();
