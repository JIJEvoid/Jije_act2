/**
 * Created by jijevoid on 2022/7/19
 */
import { WEBGL } from '@/utils/WebGL';
import * as Ammo from '@/utils/builds/ammo';
import {
    clock,
    scene,
    camera,
    renderer,
    stats,
    manager,
    createWorld,
    createPhysicsWorld,
    lensFlareObject,
    createLensFlare,
    particleGroup,
    particleAttributes,
    particleSystemObject,
    glowingParticles,
    addParticles,
    moveParticles,
    generateGalaxy,
    galaxyMaterial,
    galaxyClock,
    galaxyPoints,
} from '@/render/resources/world';

let physicsWorld;


/*
function updatePhysics(deltaTime) {
    // Step world
    physicsWorld.stepSimulation(deltaTime, 10);

    // Update rigid bodies
    for (let i = 0; i < rigidBodies.length; i++) {
        let objThree = rigidBodies[i];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();
        if (ms) {
            ms.getWorldTransform(tmpTrans);
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set(p.x(), p.y(), p.z());
            objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
    }

    //check to see if ball escaped the plane
    if (ballObject.position.y < -50) {
        scene.remove(ballObject);
        createBall();
    }

    //check to see if ball is on text to rotate camera
    rotateCamera(ballObject);
}
*/

function renderFrame() {
    // FPS stats module
    stats.begin();
    const elapsedTime = galaxyClock.getElapsedTime() + 150;
    let deltaTime = clock.getDelta();
    moveParticles();
    renderer.render(scene, camera);
    stats.end();
    galaxyMaterial.uniforms.uTime.value = elapsedTime * 5;
    //galaxyPoints.position.set(-50, -50, 0);
    requestAnimationFrame(renderFrame);
}

const initGames = ()=>{
    Ammo().then((Ammo) => {
        createWorld();
        physicsWorld = createPhysicsWorld(Ammo);
        renderFrame();
    })
}

class Game{
    constructor() {
        initGames()
    }
}

export default Game
