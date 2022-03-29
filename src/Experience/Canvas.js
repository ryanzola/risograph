import * as THREE from 'three'

import Experience from './Experience'

import vertex from './shaders/canvas/vertex.glsl'
import fragment from './shaders/canvas/fragment.glsl'

export default class Canvas
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.config = this.experience.config

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
      this.geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
    }

    setMaterial() {
      this.material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          iResolution: { value: new THREE.Vector3(this.config.width, this.config.height, 1) }
        }
      })
    }

    setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.mesh)
    }

    update() {}
}