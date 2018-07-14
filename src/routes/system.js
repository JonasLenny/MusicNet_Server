'use strict'

// import area
import express from 'express'

import User   from './user'

// variables area
const router = express.Router()

class System {
    constructor() {
        this.className      = this.constructor.name
        this.app            = undefined

        this.requestLogger  = this.requestLogger.bind(this)
        this.registerRouter = this.registerRouter.bind(this)
    }

    init(app) {
        console.log(`[${this.className}] initialising`)
        this.app = app

        router.use(this.requestLogger)

        // TODO: replace this with the configurator, later.
        router.get('/', (req, res) => {
            res.send('yes it works with returning the Routes object')
        })

        this.registerRouter('/', router)

        User.init()
    }

    requestLogger(req, res, next) {
        console.log(`[${this.className}] request received: ${req.url} ${req.method}`)

        next()
    }

    registerRouter(path, router) {
        console.log(`[${this.className}] registering ${path}`)
        this.app.use(path, router)
    }

    /***********************************************
    *                 help functions
    ************************************************/
}

export default new System()