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
	var soporte = new THREE.CylinderGeometry(10,10,50 );
	var soporte2 = new THREE.CylinderGeometry(5,5.25 );

var material = new THREE.MeshNormalMaterial();	
		var mallaRueda1 = new THREE.Mesh( rueda );
		var mallaRueda2 = new THREE.Mesh( rueda );
		var mallaBase = new THREE.Mesh( base );
		var mallaSoporte = new THREE.Mesh( soporte);
		var mallaSoporte2 = new THREE.Mesh( soporte2);
		
		
	mallaRueda1.position.set( 0, 0, 0);
	mallaBase.position.set( 50, 0, 50);
	mallaRueda2.position.set( 0, 0, 100);
	mallaSoporte.position.set( 0, 0, -200);
	mallaSoporte2.position.set( 50, 0, -250 );
	
	
	var robot = new THREE.Geometry();

	THREE.GeometryUtils.merge( robot, mallaRueda1 );
	THREE.GeometryUtils.merge( robot, mallaRueda2 );
	THREE.GeometryUtils.merge( robot, mallaBase );
	THREE.GeometryUtils.merge( robot, mallaSoporte );
	THREE.GeometryUtils.merge( robot, mallaSoporte2 );
	
	mallaRobot = new THREE.Mesh( robot , material );

	camara = new THREE.PerspectiveCamera();
	camara.position.z = 500;

	escena = new THREE.Scene();
	escena.add( mallaRobot );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
	document.body.appendChild( renderer.domElement );
}


function loop(){
	requestAnimationFrame( loop );

	//mallaRobot.rotation.x += 0.01;
	mallaRobot.rotation.y += 0.01;

	renderer.render( escena, camara );
}

var mallaRobot, camara, escena, renderer;

setup();
loop();
		
