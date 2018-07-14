'use strict'

// import area
import express from 'express'
import System  from './system'

// variables area
const router = express.Router()

class Routes {
    constructor(name) {
        this.className  = name

        // NOTE: find another way for this...
        this.publicPath = `${__dirname}/../public`
    }

    get(path, handler) {
        console.log(`[${this.className}] add get handler for ${path}`)
        router.get(path, handler)
    }

    registerRouter(path) {
        System.registerRouter(path, router)
    }

    /***********************************************
    *                 help functions
    ************************************************/
}

export default Routes
