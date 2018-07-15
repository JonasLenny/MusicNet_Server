'use strict'

// import area
import EventConstants from './eventConstants'

// variables area


class SocketHandler {
    constructor(events, socket) {
        this.className       = this.constructor.name
        this.events          = events
        this.socket          = socket

        this.onDisconnecting = this.onDisconnecting.bind(this)
        this.onTestHandler   = this.onTestHandler.bind(this)
        this.onRegister      = this.onRegister.bind(this)

        this.init()
    }

    init() {
        console.log(`[${this.socket.id}] initialising SocketHandler`)

        this.socket.on('disconnecting', this.onDisconnecting)
        this.socket.on('test', this.onTestHandler)
        this.socket.on('register', this.onRegister)
    }

    onRegister(event) {
        console.log(`[${this.className}] onRegister received:`)
        console.log(event)

        let type = event.message.type
        console.log(type)

        switch (type) {
            case EventConstants.ROLE_USER: {
                this.socket.join(EventConstants.ROOM_USER)
                break
            }

            case EventConstants.ROLE_DISPLAY: {
                this.socket.join(EventConstants.ROOM_DISPLAY)
                break
            }

            default: {

            }
        }
    }

    onDisconnecting(reason) {
        console.log(`[${this.className}] disconnecting ${reason}`)
        this.events.removeConnection(this.socket.id)
    }

    onTestHandler(message) {
        console.log(`[${this.className}] test call received:`)
        console.log(message)
    }

    /***********************************************
    *                 help functions
    ************************************************/

}

export default SocketHandler
