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
	
		cubo1 = new THREE.Mesh(  new THREE.BoxGeometry(1,1,1),
                         new THREE.MeshNormalMaterial());
		cubo2 = new THREE.Mesh(  new THREE.BoxGeometry(1,1,1),
                         new THREE.MeshNormalMaterial());

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
		
	var luzPuntual = new THREE.PointLight( 0xffff00 );
  	luzPuntual.position.x = 0;
  	luzPuntual.position.y = -500;
  	luzPuntual.position.z = 500;
  
  	camara = new THREE.PerspectiveCamera();
	camara.position.y = 500;
	camara.rotation.x = -1.57;
	raycaster1 = new THREE.Raycaster( mallaRueda1.position, new THREE.Vector3(1,0,0));
  	raycaster2 = new THREE.Raycaster( mallaRueda2.position, new THREE.Vector3(-1,0,0));	
  
  	escena = new THREE.Scene(); 
	escena.add(mallaRueda1);
	escena.add(mallaRueda2);
	escena.add( mallaBase);
	escena.add(luzPuntual);
	escena.add(mallaSoporte);
	escena.add(mallaSoporte2);
	escena.add(camara);
	escena.add(cubo1);
	escena.add(cubo2);
	
	
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
	document.body.appendChild( renderer.domElement );
	step = 0.01;
}
function loop(){

 obstaculo1 = raycaster1.intersectObject(cubo1);
 obstaculo2 = raycaster2.intersectObject(cubo2);
   if((obstaculo1.length> 0 && (obstaculo1[0].distance<= 0.5)) ||
    (obstaculo2.length> 0 && (obstaculo2[0].distance<= 0.5)))
  step = -step;

  mallaRueda1.position.x += step;
  mallaRueda2.position.x += step;
  
  renderer.render(escena,camara);
  requestAnimationFrame(loop);
}
var cubo1, cubo2, mallaRobot, camara, escena, renderer;
var mallaRueda1, mallaRueda2, mallaBase;
var raycaster1,raycaster2, step;
var obstaculo1, obstaculo2;

setup();
loop();

