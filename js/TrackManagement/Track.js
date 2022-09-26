const Time = require('../Time')
const Session = require('./Session')


class Track {
    /**
     * A track is prioritized if it is not satisfied (and the other track is)
     * or if it contains talks with a shorter total duration than the other track.
     * @returns A negative value if thisTrack has higher priority than thatTrack,
     *          a positive value if thisTrack has lower priority than thatTrack,
     *          or 0 if both tracks have the same priority.
     */
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

    /**
     * A track is satisfied if all contained sessions 
     * are filled with enough talks to meet the earliest end for that session.
     */
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

    /**
     * Tries to add a talk to the first available session of this track.
     * 
     * May fail if the talk duration is longer than the remaining session time for all sessions.
     * @returns true if the talk was added successfully and false if not.
     */
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
            + Time.toString(this.afternoon.isSatisfied ? this.afternoon.end : this.afternoon.earliestEnd) 
            + ' Networking Event\n'
    }
}


module.exports = Track