'use strict'

// import area
import Server        from 'socket.io'
import SocketHandler from './../utils/socketHandler'

// variables area
const io = new Server()

class Events {
    constructor() {
        this.className       = this.constructor.name
        this.eventNamespace  = undefined
        this.connections     = new Map()

        this.onConnection    = this.onConnection.bind(this)
    }

    init(server, config) {
        console.log(`[${this.className}] initialising`)

        this.config = config
        this.server = server

        io.attach(this.server)
        this.eventNamespace = io.of(this.config.project.server.api)

        this.eventNamespace.on('connection', this.onConnection)
    }

    onConnection(socket) {
        console.log(`[${this.className}] connection established with ${socket.id}`)

        this.registerConnection(socket.id, new SocketHandler(this, socket))
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
