'use strict'

// import area
import express from 'express'
import Routes  from './routes'

// variables area

class User extends Routes {
    constructor() {
        super('User')

        this.onRoot = this.onRoot.bind(this)
    }

    init() {
        console.log(`[${this.className}] initialising`)

        this.get('/', this.onRoot)


        this.registerRouter('/user')
    }

    onRoot(req, res, next) {
        console.log(`[${this.className}] sending user view`)
        console.log(`[Test] ${this.publicPath}/user/`)

        let options = {
            root: `${this.publicPath}/user/`
        }

        res.sendFile('index.html', options, (error) => {
            if(error)
                next(error)
            else
                console.log(`[${this.className}] user view sent`)
        })

        // res.send('this is the user request')
    }

    /***********************************************
    *                 help functions
    ************************************************/
}

export default new User()
