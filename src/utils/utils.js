'use strict'

class Utils {
    constructor() {
        this.className = this.constructor.name
    }

    extendMap(source, name, value) {
        // console.log(`[${this.className}] extending map`)
        let extendedMap = undefined

        if(!source || !name || !value) {
            console.warn(`[${this.className}] one of your passed arguments is undefined`)
            console.warn(arguments)

            return
        }

        extendedMap = new Map(source)

        let nameList = source.get(name)

        // if it's empty, start a new array with listeners
        if(!nameList)
            extendedMap.set(name, [value])

        // if the list contains already listeners, than just append the new
        // one
        else {
            nameList.push(value)
            extendedMap.set(name, nameList)
        }

        return extendedMap
    }
}

export default new Utils()
