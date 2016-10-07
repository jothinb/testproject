/**
 * Created by 212361828 on 5/16/15.
 */




var showGyro = false,
container2,
renderer2,
scene2,
camera2,
axes2;


// Gyroscope
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------

if (showGyro) {
	// dom
	container2 = document.getElementById('compass');

	// renderer
	renderer2 = new THREE.WebGLRenderer();
	renderer2.setClearColor(0xf0f0f0, 1);
	renderer2.setSize(200, 200);
	container2.appendChild(renderer2.domElement);

	// scene
	scene2 = new THREE.Scene();

	// camera
	camera2 = new THREE.PerspectiveCamera(50, 1, 1, 1000);
	camera2.up = camera.up; // important!

	// axes
	axes2 = new THREE.AxisHelper(100);
	scene2.add(axes2);
}
// animate
// -----------------------------------------------
// -----------------------------------------------
// -----------------------------------------------


function animate() {

	TWEEN.update();
	//requestAnimationFrame
	requestAnimationFrame( animate );

	if (showGyro) {
		camera2.position.copy(camera.position);
		camera2.position.setLength(300);
		camera2.lookAt(scene2.position);
	}

	render();
	stats.update();

};



function render() {

	pick();
	renderer.render( scene, camera );
	if (showGyro) {
		renderer2.render( scene2, camera2 );
	}
};






