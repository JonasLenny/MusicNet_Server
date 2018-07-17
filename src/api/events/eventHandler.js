'use strict'

// import area
import EventConstants from './eventConstants'

// variables area

class EventHandler {
    constructor(store, events, socket) {
        this.className        = this.constructor.name
        this.store            = store
        this.events           = events
        this.socket           = socket

        this.onDisconnecting  = this.onDisconnecting.bind(this)
        this.onTestHandler    = this.onTestHandler.bind(this)
        this.onRegister       = this.onRegister.bind(this)
        this.sendInitialState = this.sendInitialState.bind(this)

        this.init()
    }

    init() {
        console.log(`[${this.socket.id}] initialising SocketHandler`)

        this.socket.on(EventConstants.DISCONNECTING, this.onDisconnecting)
        this.socket.on(EventConstants.REGISTER, this.onRegister)
        this.socket.on('test', this.onTestHandler)
    }

    onRegister(event) {
        console.log(`[${this.className}] onRegister received:`)
        console.log(event)

        let type = event.message.type
        console.log(type)

        switch (type) {
            case EventConstants.ROLE_USER: {
                this.socket.join(EventConstants.ROOM_USER)
                this.sendInitialState()
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

    /**
    *   Send
    **/
    sendInitialState() {
        console.log(`[${this.className}] sending inital state and bindings`)

        let state = {
            playerState : this.store.getState(),
            bindings    : this.store.getBindings()
        }

        console.log(state)
        this.socket.emit(EventConstants.REGISTER_RESPONSE, state)
    }

    /***********************************************
    *                 help functions
    ************************************************/

}

export default EventHandler
