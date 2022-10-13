const Time = require('../IO/Time')
const Session = require('./Session')


class Track {
    constructor(settings, id, name = undefined) {
        this.id = id
        this.name = name ?? "Track " + (this.id + 1)
        
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

    get sessions() {
        return [ this.morning, this.afternoon ]
    }

    /**
     * A track is satisfied if all contained sessions 
     * are filled with enough talks to meet the earliest end for that session.
     */
    get isSatisfied() {
        return this.morning.isSatisfied 
            && this.afternoon.isSatisfied
    }

    /**
     * The sum of all the time that's left in all the contained sessions.
     */
    get timeLeft() {
        return this.morning.timeLeft.add(this.afternoon.timeLeft)
    }

    get talks() {
        return this.morning.talks.concat(this.afternoon.talks)
    }

    /**
     * Tries to add a talk to the first available session of this track.
     * 
     * May fail if the talk duration is longer than the remaining session time for all sessions.
     * @returns true if the talk was added successfully and false if not.
     */
    tryAdd(talk) {
        if (this.contains(talk.id)) {
            throw new Error(this.name + ' already contains ' + talk.title)
        }

        let added = this.morning.tryAdd(talk)

        if (!added) {
            added = this.afternoon.tryAdd(talk)
        }

        return added
    }

    contains(id) {
        return this.morning.contains(id)
            || this.afternoon.contains(id)
    }

    /**
     * Removes the Talk with the given id from the Track.
     * 
     * Does nothing if the Track does not contain the given id.
     */
    remove(id) {
        if (this.morning.contains(id)) {
            this.morning.remove(id)
        } if (this.afternoon.contains(id)) {
            this.afternoon.remove(id)
        }
    }

    toString() {
        return this.name + ':\n'
            + this.morning.toString()
            + '12:00 AM Lunch 60min\n'
            + this.afternoon.toString()
            + Time.toString(
                this.afternoon.isSatisfied ? 
                this.afternoon.end : 
                this.afternoon.earliestEnd)
            + ' Networking Event\n'
    }
}


module.exports = Track