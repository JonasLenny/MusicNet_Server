'use strict'

import express from 'express'
import http    from 'http'
import path    from 'path'

import config  from './../config.json'
import System  from './routes/system'
import Events  from './api/events'

const port       = config.project.server.port
const app        = express()
const httpServer = http.createServer(app)

class Application {
    constructor() {
        this.className   = this.constructor.name
        this.portHandler = this.portHandler.bind(this)
    }

    init() {
        console.log(`[${this.className}] initialising`)

        // list all public folders here
        app.use(this.customRequestHeader)

        // append the routes to the app
        System.init(app)
        Events.init(httpServer, config)
        // init the websocket


        httpServer.listen(port, this.portHandler)
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

    customRequestHeader(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        next();
    }

}

new Application().init()
