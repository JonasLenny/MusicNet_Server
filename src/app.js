'use strict'

import express from 'express'
import path    from 'path'

import config  from './../config.json'
import System  from './routes/system'

const port = config.project.server.port
const app  = express()

class Application {
    constructor() {
        this.className   = this.constructor.name
        this.portHandler = this.portHandler.bind(this)
    }

    init() {
        console.log(`[${this.className}] initialising`)

        // list all public folders here
        app.use(express.static(__dirname + '/public/user'))


        System.init(app)


        app.listen(port, this.portHandler)
    }

    portHandler(error) {
        if(error)
            console.log(`[${this.className}] ${error}`)
        else
            console.log(`[${this.className}] listening on ${port}`)
    }

    /***********************************************
    *                 help functions
    ************************************************/
}

new Application().init()
