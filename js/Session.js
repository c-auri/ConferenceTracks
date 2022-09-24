const Time = require('./Time')

class Session {
    constructor(year, monthIndex, day, beginningHour, earliestEndHour, latestEndHour) {
        this.#validate(beginningHour, earliestEndHour, latestEndHour)

        this.beginning = new Date(year, monthIndex, day, beginningHour)
        this.earliestEnd = new Date(year, monthIndex, day, earliestEndHour)
        this.latestEnd = new Date(year, monthIndex, day, latestEndHour)
        this.minDuration = (earliestEndHour - beginningHour) * 60
        this.maxDuration = (latestEndHour - beginningHour) * 60
        this.talks = []
    }

    get duration() {
        return this.talks.reduce(
            (partial, currentTalk) => (partial + currentTalk.duration), 
            0)
    }

    get end() {
        return Time.add(this.beginning, this.duration)
    }

    get timeLeft() {
        return this.maxDuration - this.duration
    }

    get isSatisfied() {
        return this.minDuration <= this.duration
    }

    get isMaxedOut() {
        return this.timeLeft == 0
    }

    tryAdd(talk) {
        if (talk.duration > this.timeLeft) {
            return false
        } else {
            this.talks.push(talk)
            return true
        }
    }

    toString() {
        let result = ''
        let currentTime = this.beginning

        for (const talk of this.talks) {
            result += Time.toString(currentTime) + ' ' + talk.toString() + '\n'
            currentTime = Time.add(currentTime, talk.duration)
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
            throw new Error('beginningHour must be lesser than earliestEndHour and latestEndHour.')
        }

        if (earliestEndHour > latestEndHour) {
            throw new Error('earliestEndHour must be lesser than or equal to latestEndHour.')
        }
    }
}


module.exports = Session