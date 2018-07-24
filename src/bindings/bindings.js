'use strict'

// import area
import Events         from './../api/events/events'
import EventConstants from './../api/events/eventConstants'

// TODO: import spotify

// variables area

class Bindings {
    constructor() {
        this.className         = this.constructor.name
        this.store             = undefined

        this.initBindings      = this.initBindings.bind(this)
        this.addSocketListener = this.addSocketListener.bind(this)
        this.onRegister        = this.onRegister.bind(this)
        this.search            = this.search.bind(this)
    }

    init(store) {
        let promise = new Promise((resolve, reject) => {
            console.log(`[${this.className}] initialise the following bindings`)

            this.store  = store

            this.initBindings(store.getBindings())

            .then(() => {
                Events.on(EventConstants.NEW_CONNECTION, this.addSocketListener)
            })

            .then(() => {
                resolve()
            })

            .catch(error => {
                reject(error)
            })
        })

        return promise
    }

    addSocketListener(event) {
        let socketHandler = event

        socketHandler.addListener(EventConstants.REGISTER, (event) => {
            this.onRegister(socketHandler, event)
        })
    }

    /**
    *   sources - Array<String>: list with the names of bindings which shall be included
    *   query   - String: the input to look for
    **/
    search(sources, query) {
        let promise = new Promise((resolve, reject) => {
            console.log(`[${this.className}] looking for ${query} in ${JSON.stringify(sources)}`)
            let dummyList = {
                spotify: []
            }

            resolve(dummyList)
        })

        return promise
    }

    /***********************************************
    *                 help functions
    ************************************************/

    initBindings(list) {
        let promise = new Promise((resolve, reject) => {
            console.log(`[${this.className}] load the following bindings`)
            console.log(list)

            resolve()
        })

        return promise
    }

    onRegister(source, event) {
        let type  = event.message.type
        let state = {}

        if(type != EventConstants.ROLE_CONFIGURATOR)
            return

        console.log(`[${this.className}] registering event received`)
        console.log(event)

        state.bindings = this.store.getBindings()

        // source.joinRoom(EventConstants.ROOM_USER)
        source.sendMessage(EventConstants.REGISTER_RESPONSE, state)
    }
}

export default new Bindings()
