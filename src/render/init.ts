/**
 * Created by jijevoid on 2022/7/19
 */
import * as THREE from 'three';
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



const initGames = ()=>{
    createWorld();
    // createPhysicsWorld();

}

class Game{
    constructor() {
        initGames()
    }
}

export default Game
