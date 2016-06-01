function setup(){

THREE.ImageUtils.crossOrigin='';

var pared=new THREE.BoxGeometry(800, 100, 10);
var pared1=new THREE.BoxGeometry(10, 100, 800);
var brick = THREE.ImageUtils.loadTexture('http://www.rgbstock.com/bigphoto/oCoSQrk/Graphic+Bricks+5');
var poke= THREE.ImageUtils.loadTexture('https://upload.wikimedia.org/wikipedia/en/3/39/Pokeball.PNG')
var mat2 = new THREE.MeshPhongMaterial({map: brick });
var mat1 = new THREE.MeshBasicMaterial({map: poke });

Pared1= new THREE.Mesh(pared, mat2);
Pared2= new THREE.Mesh(pared, mat2);
Pared3= new THREE.Mesh(pared1, mat2);
Pared4= new THREE.Mesh(pared1, mat2);

escena=new THREE.Scene();
escena.add(malla);
escena.add(Pared1);
escena.add(Pared2);
escena.add(Pared3);
escena.add(Pared4);

Pared1.position.z=400;
Pared2.position.z=-400;
Pared3.position.x=400;
Pared4.position.x=-400;

var forma=new THREE.CylinderGeometry(35,35,125,20);
cilindro=new THREE.Mesh(forma,mat1);

camara=new THREE.PerspectiveCamera();
camara.position.z=1500;
camara.position.y = 500 ;  

escena.add(cilindro)

light = new THREE.PointLight( 0x0000ff, 3, 0 );
light.position.set( 0, 0, 0 );
escena.add( light );

renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*0.95,window.innerHeight*0.95);
document.body.appendChild(renderer.domElement);
}
function loop(){
  
  renderer.render(escena,camara);
  requestAnimationFrame(loop);
  cilindro.rotation.y +=0.01;
}
  
var escena, camara, renderer, malla;
var light
var Pared1,Pared2,Pared3,Pared4;
var cilindro;
setup();
loop();