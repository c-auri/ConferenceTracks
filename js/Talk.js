class Talk {
    constructor(title, duration) {
        if (duration < 5) {
            throw new Error('Talk duration must at least be 5 minutes')
        }

        this.title = title
        this.duration = duration
    }

    toString() {
        return this.title + ' ' + this.duration + 'min'
    }
}

class LightningTalk extends Talk {
    constructor(title) {
        super(title, 5)
    }

    toString() {
        return this.title + ' ' + 'lightning'
    }
}


module.exports = { Talk, LightningTalk }