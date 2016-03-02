function setup(){
  //se plantea las geometrias a utilizar

  var esferaForma = new THREE.SphereGeometry(1);
  var cilindroForma = new THREE.CylinderGeometry(0.5, 0.5, 4);
  //para generar una forma combinada se requiere de las mallas para 
  //poder desplazar las formas en el espacioo virtual
  var esfera1 = new THREE.Mesh( esferaForma );
  var esfera2 = new THREE.Mesh( esferaForma );
  var cilindro = new THREE.Mesh( cilindroForma );
  //Se desplazan las mallas
  esfera1.position.y = 2;
  esfera2.position.y = -2;
  
  var forma = new THREE.Geometry();
  //se utiliza el paquete GeometryUtils para conjuntar las formas
  THREE.GeometryUtils.merge( forma, esfera1 );
  THREE.GeometryUtils.merge( forma, esfera2 );
  THREE.GeometryUtils.merge( forma, cilindro );
  //se genera la malla a partir de la forma
  malla = new THREE.Mesh( forma );
  
  //se inicializa la escena y se agrega la mmaa a esta
  escena = new THREE.Scene();
  escena.add( malla );
  
  //se inicializa la cámara y el renderer
  
  camara = new THREE.PerspectiveCamera();
  camara.position.z = 10;
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerHeight*.95, window.innerHeight*.95 );
  document.body.appendChild( renderer.domElement );
}

function loop(){
  
  requestAnimationFrame( loop );
  //ES IMPORTANTE NOTAR QUE LAS ROTACIONES SON SOBRE LOS EJES QUE ESTÁN FIJOS A ALA MALLA, NO LOS EJES DEL LIENZO. INICIALEMNTE AMBOS COINCIDEN
  malla.rotation.x += 0.01;
  malla.rotation.y += 0.01;
  renderer.render( escena, camara );
}

var escena, camara, renderer, malla;
setup();
loop();
