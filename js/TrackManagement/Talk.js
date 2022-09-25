class Talk {
    constructor(title, duration) {
        if (duration < 5) {
            throw new Error('Talk duration must be at least 5 minutes.')
        }

        this.title = title
        this.duration = duration
    }

    static compareByDuration(thisTalk, thatTalk) {
        return thisTalk.duration - thatTalk.duration
    }

    toString() {
        return this.title + ' ' + this.duration + 'min'
    }
}

class LightningTalk extends Talk {
    constructor(title) {
        super(title, LightningTalk.duration)
    }

    static get duration() {
        return 5
    }

    toString() {
        return this.title + ' ' + 'lightning'
    }
}


module.exports = { Talk, LightningTalk }