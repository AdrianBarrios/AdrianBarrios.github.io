var keyboard = new THREEx.KeyboardState();

function segway(){
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
				
	
	//this.rueda = new THREE.ExtrudeGeometry( this.arcShape, this.extrudeSettings );
	//this.material = new THREE.MeshPhongMaterial({ map: this.textura});
	//this.mallaRueda = new THREE.Mesh( this.rueda, this.material );

	var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
	
	this.Rueda1 =  new THREE.Mesh(new THREE.ExtrudeGeometry( arcShape, extrudeSettings ));
	this.Rueda2 =  new THREE.Mesh(new THREE.ExtrudeGeometry( arcShape, extrudeSettings ));
 	this.Base = new THREE.Mesh( new THREE.BoxGeometry( 50,20,98 ), new THREE.MeshNormalMaterial() );
	this.Soporte1 =  new THREE.Mesh(new THREE.BoxGeometry( 10,10,70));
	this.Soporte2 =  new THREE.Mesh( new THREE.CylinderGeometry(5,5.25 ));
		
		this.Rueda1.position.y = 0;
		this.Rueda2.position.z = 100;
		this.Soporte1.position.y = 100;
		this.Soporte1.position.z = 50; 
		this.Soporte2.position.y = 50; 
		this.Soporte2.position.z = 53; 
		this.Base.position.z = 50; 
  
    this.add(this.mallaRueda);
  	this.add(this.Rueda1)
		this.add(this.Rueda2)
		this.add(this.Base)
		this.add(this.Soporte1)
		this.add(this.Soporte2)
		
		}

segway.prototype = new THREE.Object3D();



function setup(){
	mallarobot = new segway();
	step = 0.1;
	var luzPuntual = new THREE.PointLight( 0xffffff );
  	luzPuntual.position.x = 50;
  	luzPuntual.position.y = 100;
  	luzPuntual.position.z = 500;

	escena = new THREE.Scene();
	escena.add(mallarobot);
	escena.add(luzPuntual);

	camara = new THREE.PerspectiveCamera();
	camara.position.z = 500;
	
	
camara2 = new THREE.OrthographicCamera( 16 / - 2, 16 / 2, 10 / 2, 10 / - 2, 1, 1000 );
camara2.position.z=40;

  escena.add(camara);
  escena.add(camara2);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
	document.body.appendChild( renderer.domElement );
}

function loop(){
	requestAnimationFrame( loop );
	
	if (keyboard.pressed("P")) {
renderer.render(escena,camara);
}
else
{
renderer.render(escena,camara2);
}
	
	mallarobot.rotation.y += 0.01;
}

var mallaRobot, camara, camara2, escena, renderer, step;

setup();
loop();