function Sensor(position,direction){
 THREE.Raycaster.call(this,position,direction);
 this.colision=false;
}
Sensor.prototype=new THREE.Raycaster();

function Segway(x=0, y=0 ){
 Agent.call(this,x,y);
 
 THREE.ImageUtils.crossOrigin = '';
this.textura = 	THREE.ImageUtils.loadTexture('https://famsa_imagenes2.storage.googleapis.com/238401024ENERGYXM2_perfil2.jpg')
this.textura2 = 	THREE.ImageUtils.loadTexture('https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Segway_logo.svg/1280px-Segway_logo.svg.png')

var arcShape = new THREE.Shape();
				arcShape.moveTo( 50, 10 );
				arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
	var holePath = new THREE.Path();
				holePath.moveTo( 20, 10 );
				holePath.absarc( 10, 10, 10, 0, Math.PI*2, true );
				arcShape.holes.push( holePath );

	var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
	
	this.Rueda1 =  new THREE.Mesh(new THREE.ExtrudeGeometry( arcShape, extrudeSettings ),new THREE.MeshBasicMaterial({map: this.textura}));
	this.Rueda2 =  new THREE.Mesh(new THREE.ExtrudeGeometry( arcShape, extrudeSettings ),new THREE.MeshBasicMaterial({map: this.textura}));
 	this.Base = new THREE.Mesh( new THREE.BoxGeometry( 50,20,98 ), new THREE.MeshNormalMaterial() );
	this.Soporte1 =  new THREE.Mesh(new THREE.BoxGeometry( 10,10,70));
	this.Soporte2 =  new THREE.Mesh( new THREE.CylinderGeometry(5,5.25 ),new THREE.MeshBasicMaterial({map: this.textura2}));
	this.sensor= new Sensor();
	this.actuator= new Array();	
	
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
Segway.prototype = new THREE.Object3D();

function Wall(size,x=0,y=0){
	THREE.ImageUtils.crossOrigin = '';
this.textura = 	THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size), new THREE.MeshBasicMaterial({map: this.textura} )); 
 this.size=size;
 this.position.x=x;
 this.position.y=y;
}
Wall.prototype=new THREE.Mesh();

Environment.prototype.setMap=function(map){
 var offset=Math.floor(map.length/2);
 for(var i=0;i<map.length;i++){
  for(var j=0;j<map.length;j++){
   if(map[i][j]==="x")
    this.add(new Wall(1, j-offset,-(i-offset)));
   else if(map[i][j]==="r")
    this.add(new Segway(j-offset,-(i-offset)));
  }
 }
}	

Segway.prototype.sense=function(environment){
 this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
 var obstaculo = this.sensor.intersectObjects(environment.children,true);
 if ((obstaculo.length>0&&(obstaculo[0].distance<=1.0)))
  this.sensor.colision=true;
 else
  this.sensor.colision=false;

}

Segway.prototype.plan = function(environment){
 this.actuator.commands=[];
  if(this.sensor.colision==true)
   this.actuator.commands.push('RotarIzquierda');
  else
   this.actuator.commands.push('Derecho');
}

Segway.prototype.act=function(environment){
 var command=this.actuator.commands.pop();
 if(command==undefined)
  console.log('Undefined command');
 else if(command in this.operations)
  this.operations[command](this);
 else
  console.log('Unknown command'); 
}

Segway.prototype.operations = {};

Segway.prototype.operations.Derecho = function(Segway,step){
	
	
 if(step==undefined)
 step=0.01;
 Segway.scale.x=0.03;
 Segway.scale.y=0.03;
 Segway.scale.z=0.03;
 if (Math.abs(Segway.Rueda1.rotation.z) > .3 )
  stepRueda = -stepRueda;

if (Math.abs(Segway.Rueda2.rotation.x) > 2 || Math.abs(Segway.Rueda2.rotation.x) < 1)
  stepp = -stepp;

 Segway.position.x+=step*Math.cos(Segway.rotation.z);
 Segway.position.y+=step*Math.sin(Segway.rotation.z);
// Segway.Rueda1.rotation.x += stepp;
 //Segway.Rueda2.rotation.x += stepp;
 Segway.Rueda1.rotation.z += stepRueda;
 Segway.Rueda2.rotation.z += stepRueda;
 };
Segway.prototype.operations.RotarDerecha = function(Segway,angulo){
 if(angulo==undefined){
  angulo=-Math.PI/2;
 }
 Segway.rotation.z+=angulo;
};

Segway.prototype.operations.RotarIzquierda = function(Segway,angulo){
 if(angulo==undefined){
  angulo=Math.PI/2;
 }
 Segway.rotation.z+=angulo;
};
 
function setup(){
 var mapa = new Array();
  mapa[0] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  mapa[1] = "x                          x";
  mapa[2] = "x                          x";
  mapa[3] = "x                          x";
  mapa[4] = "x                          x";
  mapa[5] = "x   r                      x";
  mapa[6] = "xxxx    xxxxxxxxxxxxxxxxxxxx";
  mapa[7] = "x                          x";
  mapa[8] = "x                          x";
  mapa[9] = "x                          x";
 mapa[10] = "x                          x";
 mapa[11] = "x                          x";
 mapa[12] = "x                          x";
 mapa[13] = "x                          x";
 mapa[14] = "x                          x";
 mapa[15] = "x                          x";
 mapa[16] = "x                          x";
 mapa[17] = "x                          x";
 mapa[18] = "x                          x";
 mapa[19] = "x                          x";
 mapa[20] = "x                          x";
 mapa[21] = "x                          x";
 mapa[22] = "x                          x";
 mapa[23] = "x                 r        x";
 mapa[24] = "xxxxxxxxxxxxxxxxxxxxxx    xx";
 mapa[25] = "x                          x";
 mapa[26] = "x                          x";
 mapa[27] = "x                          x";
 mapa[28] = "x  r                       x";
 mapa[29] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
 entorno=new Environment();
 entorno.setMap(mapa);
  stepRueda=0.002;
  stepp = 0.017;
 luzPuntual = new THREE.PointLight(0xffffff);
 luzPuntual.position.x=0;  
 luzPuntual.position.y=10;
 luzPuntual.position.z=30;
 camara=new THREE.PerspectiveCamera();
 camara.position.z=50;
 renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerHeight*0.95, window.innerHeight*0.95);
 document.body.appendChild(renderer.domElement);
 entorno.add(camara);
 entorno.add(luzPuntual);
}

function loop(){
 requestAnimationFrame(loop);
 entorno.sense();
 entorno.plan();
 entorno.act();
 renderer.render(entorno,camara);
}

var entorno,luzPuntual,Segway,step,angulo,camara,renderer,stepRueda, stepp;

setup();
loop();
