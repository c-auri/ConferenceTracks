class Talk {
    /**
     * @returns A negative value if thisTalk has a shorter duration than thatTrack,
     *          a posivite value if thisTalk has a longer duration than thatTrack,
     *          or 0 if both tracks have the same duration.
     */
    static compareByDuration(thisTalk, thatTalk) {
        return thisTalk.duration - thatTalk.duration
    }

    constructor(title, duration) {
        if (duration < 5) {
            throw new Error('Talk duration must be at least 5 minutes.')
        }

        this.title = title
        this.duration = duration
    }

    toString() {
        return this.title + ' ' + this.duration + 'min'
    }
}

class LightningTalk extends Talk {
    static get duration() {
        return 5
    }

    constructor(title) {
        super(title, LightningTalk.duration)
    }

    toString() {
        return this.title + ' ' + 'lightning'
    }
}


module.exports = { Talk, LightningTalk }