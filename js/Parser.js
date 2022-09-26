const { Talk, LightningTalk } = require("./TrackManagement/Talk")


class Parser {
    static get lightningIdentifier() {
        return 'lightning'
    }

    static #specifiesDuration(line) {
        const lastToken = line.split(' ').slice(-1)
        return /\d/.test(lastToken);
    }

    static #isLightningTalk(line) {
        return line.slice(-1 * Parser.lightningIdentifier.length) == Parser.lightningIdentifier
    }

    static #splitTitleAndDuration(line) {
        const tokens = line.split(' ')
        return { title: tokens.slice(0, -1).join(' ').trim(), duration: parseInt(tokens.slice(-1)) }
    }

    constructor(trackSettings) {
        this.trackSettings = trackSettings
    }

    lineToTalk(line) {
        line = line.trim()

        if (!Parser.#specifiesDuration(line) && !Parser.#isLightningTalk(line)) {
            throw new Error('No duration specified in: ' + line)
        }

        if (Parser.#isLightningTalk(line)) {
            const title = line.slice(0, line.length - Parser.lightningIdentifier.length).trim()
            return new LightningTalk(title)
        } else {
            const { title, duration } = Parser.#splitTitleAndDuration(line)

            if (!this.trackSettings.canFit(duration)) {
                throw new Error('Talk duration is too long.')
            } else {
                return new Talk(title, duration)
            }
        }
    }
}


module.exports = Parser