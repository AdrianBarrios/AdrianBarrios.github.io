function Sensor(position,direction){
 THREE.Raycaster.call(this,position,direction);
 this.colision=false;
}
Sensor.prototype=new THREE.Raycaster();

function  Segway(){
THREE.Object3D.call(this);
//THREE.ImageUtils.crossOrigin = '';
//	this.textura = 	THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');

var arcShape = new THREE.Shape();
				arcShape.moveTo( 50, 10 );
				arcShape.absarc( 10, 10, 40, 0, Math.PI*2, false );
	var holePath = new THREE.Path();
				holePath.moveTo( 20, 10 );
				holePath.absarc( 10, 10, 10, 0, Math.PI*2, true );
				arcShape.holes.push( holePath );

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
  
  	this.add(this.Rueda1)
		this.add(this.Rueda2)
		this.add(this.Base)
		this.add(this.Soporte1)
		this.add(this.Soporte2)
		
		}
Segway.prototype = new THREE.Object3D();

function Wall(size,x=0,y=0){
 THREE.Mesh.call(this,new THREE.BoxGeometry(size,size,size), new THREE.MeshNormalMaterial()); 
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
    this.add(new Robot(j-offset,-(i-offset)));
  }
 }
}	

Segway.prototype.sense=function(environment){
 this.sensor.set(this.position, new THREE.Vector3(Math.cos(this.rotation.z),Math.sin(this.rotation.z),0));
 var obstaculo = this.sensor.intersectObjects(environment.children,true);
 if ((obstaculo.length>0&&(obstaculo[0].distance<=1.5)))
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
 robot.scale.x=0.5;
 robot.scale.y=0.5;
 robot.scale.z=0.5;
 if (Math.abs(Segway.Rueda1.rotation.z) > .3 )
  steppie = -steppie;

if (Math.abs(Segway.Rueda2.rotation.x) > 2 || Math.abs(Segway.Rueda2.rotation.x) < 1)
  stepRueda = -stepRueda;

 Segway.position.x+=step*Math.cos(Segway.rotation.z);
 Segway.position.y+=step*Math.sin(Segway.rotation.z);
 Segway.Rueda1.rotation.x += stepRueda;
 Segway.Rueda2.rotation.x += stepRueda;
 Segway.Base.rotation.z += steppie;
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
  mapa[4] = "x    r                     x";
  mapa[5] = "x                          x";
  mapa[6] = "xxxxxxxxxxxxxxxx    xxxxxxxx";
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
 mapa[19] = "x     r                    x";
 mapa[20] = "x                          x";
 mapa[21] = "x                          x";
 mapa[22] = "x                          x";
 mapa[23] = "x                          x";
 mapa[24] = "xxxxxxxxxxxxx           xxxx";
 mapa[25] = "x                          x";
 mapa[26] = "x                          x";
 mapa[27] = "x      r                   x";
 mapa[28] = "x                          x";
 mapa[29] = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
 entorno=new Environment();
 entorno.setMap(mapa);
  steppie=0.1;
  stepbrazo = 0.017;
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

var entorno,luzPuntual,Segway,step,angulo,camara,renderer,steppie, stepbrazo;

setup();
loop();
