'use strict'

// import area
import Events         from './events/events'
import EventConstants from './events/eventConstants'

import Bindings       from './../bindings/bindings'

// variables area

class UserAPI {
    constructor() {
        this.className         = this.constructor.name
        this.store             = undefined

        this.addSocketListener = this.addSocketListener.bind(this)
        this.onRegister        = this.onRegister.bind(this)
    }

    init(store) {
        let promise = new Promise((resolve, reject) => {
            console.log(`[${this.className}] initialise`)

            this.store = store

            Events.on(EventConstants.NEW_CONNECTION, this.addSocketListener)

            resolve()
        })

        return promise
    }

    addSocketListener(event) {
        let socketHandler = event

        socketHandler.addListener(EventConstants.REGISTER, (event) => {
            this.onRegister(socketHandler, event)
        })
    }


    /***********************************************
    *                 help functions
    ************************************************/

    onRegister(source, event) {
        let type  = event.message.type
        let state = {}

        if(type != EventConstants.ROLE_USER)
            return

        console.log(`[${this.className}] registering event received`)
        console.log(event)

        state.displayState = this.store.getState(),
        state.bindings     = this.store.getBindings()

        source.joinRoom(EventConstants.ROOM_USER)
        source.sendMessage(EventConstants.REGISTER_RESPONSE, state)
    }
}

export default new UserAPI()
