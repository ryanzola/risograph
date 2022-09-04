import * as THREE from 'three'

import Experience from './Experience'
import Canvas from './Canvas'
import Lambert from './Lambert'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setLambert()
            }
        })
    }

    setLambert() {
        // red
        this.lambert1 = new Lambert({
            color: new THREE.Color(0xEA3323),
            position: new THREE.Vector3(-3, 0, 3)
        })

        // black
        this.lambert2 = new Lambert({
            color: new THREE.Color(0x111111),
            position: new THREE.Vector3(0, 0, -3)
        })

        //blue
        this.lambert3 = new Lambert({
            color: new THREE.Color(0x51b1f5),
            position: new THREE.Vector3(3, 0, 3)
        })

        console.log(this.lambert1.mesh)

        this.sphereGroup = new THREE.Group()
        this.scene.add(this.sphereGroup)
        this.sphereGroup.add(this.lambert1.mesh, this.lambert2.mesh, this.lambert3.mesh)
    }

    resize()
    {
    }

    update()
    {
        if(this.canvas)
            this.canvas.update()

        if(this.sphereGroup) {
            this.sphereGroup.rotation.y += 0.005
            this.sphereGroup.rotation.x += 0.002
        }
    }

    destroy()
    {
    }
}