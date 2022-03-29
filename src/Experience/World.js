import * as THREE from 'three'

import Experience from './Experience'
import Canvas from './Canvas'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setCanvas()
            }
        })
    }

    setCanvas() {
        this.canvas = new Canvas()
    }

    resize()
    {
    }

    update()
    {
        if(this.canvas)
            this.canvas.update()
    }

    destroy()
    {
    }
}