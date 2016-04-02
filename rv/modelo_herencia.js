function rueda(){
	THREE.Object3D.call(this);
	this.arcShape = new THREE.Shape();
				this.arcShape.moveTo( 50, 10 );
				this.arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
	this.holePath = new THREE.Path();
				this.holePath.moveTo( 20, 10 );
				this.holePath.absarc( 10, 10, 10, 0, Math.PI*2, true );
				this.arcShape.holes.push( this.holePath );

	this.extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
	
	this.rueda = new THREE.ExtrudeGeometry( this.arcShape, this.extrudeSettings );
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

		var Soporte = new THREE.Mesh( 10,10,70 );
		var Soporte2 = new THREE.Mesh(5,5.25);
		
		var mallaSoporte = new THREE.Mesh( Soporte, material);
		var mallaSoporte2 = new THREE.Mesh( Soporte2, material);
		mallaBase = new base();
		
		mallaRueda1 = new  rueda ();
		mallaRueda2 = new  rueda ();

		mallaRueda1.position.set( 0, 0, 0);
		mallaBase.position.set( 0, 0, 50);
		mallaRueda2.position.set( 0, 0, 100);
		mallaSoporte.position.set( 0, 100, 50);
		mallaSoporte2.position.set( 0, 50, 53 );
		
		var robot = new THREE.Geometry();

	THREE.GeometryUtils.merge( robot, mallaSoporte );
	THREE.GeometryUtils.merge( robot, mallaSoporte2 );
	THREE.GeometryUtils.merge( robot, mallaBase );

	mallaRobot = new THREE.Mesh( robot , material );


	escena = new THREE.Scene();
	escena.add( mallaRobot );
	escena.add( mallaRueda1 );
	escena.add( mallaRueda2 );
	escena.add( mallaBase);

camara = new THREE.PerspectiveCamera();
	camara.position.z = 500;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
	document.body.appendChild( renderer.domElement );
}

function loop(){
	requestAnimationFrame( loop );

	renderer.render( escena, camara );
}
var mallaRobot, camara, escena, renderer;
var mallaRueda1, mallaRueda2, mallaBase;

setup();
loop();
