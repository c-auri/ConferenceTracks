const Time = require('./Time')
const Session = require('./Session')

class Track {
    constructor(name, settings) {
        this.name = name
        
        this.morning = new Session(
            settings.year, 
            settings.monthIndex, 
            settings.day,
            settings.morningBeginningHour,
            settings.morningEarliestEndHour,
            settings.morningLatestEndHour)
        
        this.afternoon = new Session(
            settings.year, 
            settings.monthIndex, 
            settings.day,
            settings.afternoonBeginningHour,
            settings.afternoonEarliestEndHour,
            settings.afternoonLatestEndHour)
    }

    get isSatisfied() {
        return this.morning.isSatisfied 
            && this.afternoon.isSatisfied
    }

    get isMaxedOut() {
        return this.morning.isMaxedOut 
            && this.afternoon.isMaxedOut
    }

    get talks() {
        return this.morning.talks.concat(this.afternoon.talks)
    }

    tryAdd(talk) {
        let added = this.morning.tryAdd(talk)

        if (!added) {
            added = this.afternoon.tryAdd(talk)
        }

        return added
    }

    toString() {
        return this.name + ':\n'
            + this.morning.toString()
            + '12:00 AM Lunch 60min\n'
            + this.afternoon.toString()
            + Time.toString(this.afternoon.end) + ' Networking Event'
    }
}


module.exports = Track