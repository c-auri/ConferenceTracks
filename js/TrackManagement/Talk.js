const Duration = require("./Duration")

class Talk {
    static #numberOfTalks = 0

    /**
     * @returns A negative value if thisTalk has a shorter duration than thatTrack,
     *          a posivite value if thisTalk has a longer duration than thatTrack,
     *          or 0 if both tracks have the same duration.
     */
    static compareByDuration(thisTalk, thatTalk) {
        if (thisTalk.duration.isShorterThan(thatTalk.duration)) {
            return -1
        } else if (thisTalk.duration.isLongerThan(thatTalk.duration)) {
            return 1
        } else {
            return 0
        }
    }

    static get minimumDuration() {
        return Duration.fromMinutes(5)
    }

    #id

    constructor(title, duration) {
        if (duration.isShorterThan(Talk.minimumDuration)) {
            throw new Error('Talk duration must be at least ' + Talk.minimumDuration)
        }

        this.#id = Talk.#numberOfTalks++
        this.title = title
        this.duration = duration
    }

    get id() {
        return this.#id
    }

    toString() {
        return this.title + ' ' + this.duration
    }
}

class LightningTalk extends Talk {
    constructor(title) {
        super(title, Talk.minimumDuration)
    }

    toString() {
        return this.title + ' ' + 'lightning'
    }
}


module.exports = { Talk, LightningTalk }