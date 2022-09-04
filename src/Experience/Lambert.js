import * as THREE from 'three'
import glslify from 'glslify'

import Experience from './Experience'

import fragment from './shaders/lambert/fragment.glsl'

export default class Canvas
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.config = this.experience.config
        this.time = this.experience.time
        this.color = _options.color
        this.position = _options.position

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setLights()
    }

    setGeometry() {
      this.geometry = new THREE.SphereBufferGeometry(1, 32, 32);
    }

    setMaterial() {
      this.uniforms = THREE.UniformsUtils.merge([
        THREE.ShaderLib.lambert.uniforms,
        {
          uColor: { value: new THREE.Color(this.color) },
          uNoiseCoef: { value: 3.5 },
          uNoiseScale: { value: 0.8 },
          uTime: { value: 0.0 }
        }
      ])
      
      this.material = new THREE.ShaderMaterial({
        vertexShader: THREE.ShaderLib.lambert.vertexShader,
        fragmentShader: glslify(fragment),
        uniforms: this.uniforms,
        lights: true,
        transparent: true
      })
    }

    setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.mesh.position.copy(this.position)
      // this.scene.add(this.mesh)
    }

    setLights() {
      const spotLight = new THREE.SpotLight(0xffffff)
      spotLight.position.set(0, 5, 4)
      spotLight.intensity = 0.5
      this.scene.add(spotLight)
    }

    update() {
      if(this.material)
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}