const Duration = require('./Duration')
const Time = require('../IO/Time')

class Session {
    constructor(year, monthIndex, day, beginningHour, earliestEndHour, latestEndHour) {
        this.#validate(beginningHour, earliestEndHour, latestEndHour)

        this.beginning = new Date(year, monthIndex, day, beginningHour)
        this.earliestEnd = new Date(year, monthIndex, day, earliestEndHour)
        this.latestEnd = new Date(year, monthIndex, day, latestEndHour)
        this.minDuration = Duration.fromMinutes((earliestEndHour - beginningHour) * 60)
        this.maxDuration = Duration.fromMinutes((latestEndHour - beginningHour) * 60)
        this.talks = []
    }

    /**
     * @returns The summed duration of all the talks currently contained in this session.
     */
    get duration() {
        return this.talks.reduce((partial, talk) => partial.add(talk.duration), Duration.zero)
    }

    /**
     * The current end time of this session as defined by the currently contained talks.
     */
    get end() {
        return this.duration.addTo(this.beginning)
    }

    /**
     * @returns The maximum amount of time that is still available in this session.
     */
    get timeLeft() {
        return this.maxDuration.subtract(this.duration)
    }

    /**
     * @returns The amount of time that needs to be filled in order to satisfy the session.
     */
    get timeNeeded() {
        return this.isSatisfied ? Duration.zero : this.minDuration.subtract(this.duration)
    }

    /**
     * A session is satisfied if it contains enough talks to meet its earliest end.
     */
    get isSatisfied() {
        return !this.minDuration.isLongerThan(this.duration)
    }

    /**
     * Tries to add a talk to the session.
     * 
     * May fail if the talk duration is longer than the remaining session time.
     * @returns true if the talk was added successfully and false if not.
     */
    tryAdd(talk) {
        if (this.contains(talk.id)) {
            throw new Error('Session already contains ' + talk.title)
        }

        if (talk.duration.isLongerThan(this.timeLeft)) {
            return false
        } else {
            this.talks.push(talk)
            return true
        }
    }

    contains(id) {
        return this.talks.map(talk => talk.id).includes(id)
    }

    /**
     * Removes the Talk with the given id from the Session.
     * 
     * Does nothing if the Session does not contain the given id.
     */
    remove(id) {
        if (this.contains(id)) {
            const index = this.talks.map(talk => talk.id).indexOf(id)
            this.talks.splice(index, 1)
        }
    }

    toString() {
        let result = ''
        let currentTime = this.beginning

        for (const talk of this.talks) {
            result += Time.toString(currentTime) + ' ' + talk.toString() + '\n'
            currentTime = talk.duration.addTo(currentTime)
        }

        return result
    }

    #validate(beginningHour, earliestEndHour, latestEndHour) {
        if (beginningHour < 0 || beginningHour > 24 ||
            earliestEndHour < 0 || earliestEndHour > 24 ||
            latestEndHour < 0 || latestEndHour > 24) {
                throw new Error('Hours must be integers in [0, 24].')
        }

        if (beginningHour == latestEndHour) {
            throw new Error('Session duration must not be 0.')
        }

        if (beginningHour > earliestEndHour || beginningHour > latestEndHour) {
            throw new Error('Beginning must be before earliest end and latest end.')
        }

        if (earliestEndHour > latestEndHour) {
            throw new Error('Earliest end must later than or equal to latest end.')
        }
    }
}


module.exports = Session