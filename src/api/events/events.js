'use strict'

// import area
import EventConstants from './eventConstants'
import EventHandler   from './eventHandler'

// variables area


class Events {
    constructor() {
        this.className       = this.constructor.name
        this.eventNamespace  = undefined
        this.connections     = new Map()

        this.onConnection    = this.onConnection.bind(this)
    }

    init(websocket, config, store) {
        console.log(`[${this.className}] initialising`)

        this.websocket      = websocket
        this.config         = config
        this.store          = store
        this.eventNamespace = websocket.of(this.config.project.server.api)

        this.eventNamespace.on(EventConstants.CONNECTION, this.onConnection)
    }

    onConnection(socket) {
        console.log(`[${this.className}] connection established with ${socket.id}`)

        this.registerConnection(socket.id, new EventHandler(this.store, this, socket))
    }

    registerConnection(id, socket) {
        console.log(`[${this.className}] registerConnection ${id}`)

        this.connections.set(id, socket)
    }

    removeConnection(id) {
        console.log(`[${this.className}] removeConnection ${id}`)
        this.connections.delete(id)
    }

    /***********************************************
    *                 help functions
    ************************************************/


}

export default new Events()
