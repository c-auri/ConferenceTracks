const Time = require('../Time')
const Session = require('./Session')

class Track {
    static compareByPriority(thisTrack, thatTrack) {
        if (thisTrack.hasHigherPriorityThan(thatTrack)) {
            return -1
        } else if (thatTrack.hasHigherPriorityThan(thisTrack)) {
            return 1
        } else {
            return 0
        }
    }

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

    get timeLeft() {
        return this.morning.timeLeft + this.afternoon.timeLeft
    }

    get talks() {
        return this.morning.talks.concat(this.afternoon.talks)
    }

    hasHigherPriorityThan(other) {
        if (other.isSatisfied && !this.isSatisfied) {
            return true
        } else {
            return this.timeLeft > other.timeLeft
        }
    }

    tryAdd(talk) {
        let added = this.morning.tryAdd(talk)

        if (!added) {
            added = this.afternoon.tryAdd(talk)
        }

        return added
    }

    toString() {
        let networkingStart
        if (this.afternoon.end > this.afternoon.earliestEnd) {
            networkingStart = this.afternoon.end
        } else {
            networkingStart = this.afternoon.earliestEnd
        }
        

        return this.name + ':\n'
            + this.morning.toString()
            + '12:00 AM Lunch 60min\n'
            + this.afternoon.toString()
            + Time.toString(networkingStart) + ' Networking Event\n'
    }
}


module.exports = Track