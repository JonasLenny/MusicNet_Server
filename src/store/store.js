'use strict'

// import area
import Database from './database'

// variables area

class Store {
    constructor() {
        this.className    = this.constructor.name
        this.state        = undefined
        this.bindings     = undefined
        this.playlist     = undefined
        this.database     = new Database()

        this.initBindings = this.initBindings.bind(this)
        this.initState    = this.initState.bind(this)
    }

    init() {
        let promise = new Promise((resolve, reject) => {

            this.database.init()
            .then(() => {
                return this.initBindings()
            })
            .then(() => {
                return this.initState()
            })
            .then(() => {
                resolve()
            })
            .catch(error => {
                console.error(error)
            })
        })

        return promise
    }

    getState() {
        return this.state
    }

    getBindings() {
        return this.bindings
    }

    getPlaylist() {
        return this.playlist
    }

    /***********************************************
    *                 help functions
    ************************************************/

    initBindings() {
        let promise = new Promise((resolve, reject) => {
            this.database.getEntry('bindings', {})
            .then(entries => {
                this.bindings = entries
                return
            })
            .then(() => {
                resolve()
            })
        })

        return promise
    }

    initState() {
        this.state = {
            play: false,
            fullscreen: false,
            volume: 50,
        }
    }

}

export default Store
