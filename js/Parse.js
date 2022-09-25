const { Talk, LightningTalk } = require("./TrackManagement/Talk")

class Parse {
    static get lightningIdentifier() {
        return 'lightning'
    }

    static lineToTalk(line) {
        line = line.trim()

        if (!Parse.#specifiesDuration(line) && !Parse.#isLightningTalk(line)) {
            throw new Error('No duration specified in: ' + line)
        }

        if (Parse.#isLightningTalk(line)) {
            const title = line.slice(0, line.length - Parse.lightningIdentifier.length).trim()
            return new LightningTalk(title)
        } else {
            const split = Parse.#splitTitleAndDuration(line)
            return new Talk(split.title.trim(), parseInt(split.duration))
        }
    }

    static #specifiesDuration(line) {
        const lastToken = line.split(' ').slice(-1)
        return /\d/.test(lastToken);
    }

    static #isLightningTalk(line) {
        return line.slice(-1 * Parse.lightningIdentifier.length) == Parse.lightningIdentifier
    }

    static #splitTitleAndDuration(line) {
        const tokens = line.split(' ')
        return { title: tokens.slice(0, -1).join(' '), duration: tokens.slice(-1) }
    }
}


module.exports = Parse