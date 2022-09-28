const { Talk, LightningTalk } = require("./TrackManagement/Talk")


class Parser {
    static get commentIdentifier() {
        return '#'
    }

    static get lightningIdentifier() {
        return 'lightning'
    }

    constructor(trackSettings) {
        this.trackSettings = trackSettings
    }

    linesToTalks(lines) {
        return this.#skipComments(lines).map(line => this.#lineToTalk(line))
    }

    #skipComments(lines) {
        return lines.filter(line => !line.startsWith(Parser.commentIdentifier))
    }

    #lineToTalk(line) {
        line = line.trim()

        if (!this.#specifiesDuration(line) && !this.#specifiesLightningTalk(line)) {
            throw new Error('No duration specified in: ' + line)
        }

        if (this.#specifiesLightningTalk(line)) {
            return this.#parseLightningTalk(line)
        } else {
            return this.#parseTalk(line)
        }
    }

    #specifiesDuration(line) {
        const lastToken = line.split(' ').slice(-1)
        return /\d/.test(lastToken);
    }

    #specifiesLightningTalk(line) {
        return line.slice(-1 * Parser.lightningIdentifier.length) == Parser.lightningIdentifier
    }

    #parseLightningTalk(line) {
        const title = line.slice(0, line.length - Parser.lightningIdentifier.length).trim()
        return new LightningTalk(title)
    }

    #parseTalk(line) {
        const { title, duration } = this.#extractTitleAndDuration(line)

        if (!this.trackSettings.canFit(duration)) {
            throw new Error('Talk duration is too long.')
        } else {
            return new Talk(title, duration)
        }
    }

    #extractTitleAndDuration(line) {
        const tokens = line.split(' ')

        return { 
            title: tokens.slice(0, -1).join(' ').trim(), 
            duration: parseInt(tokens.slice(-1)) 
        }
    }
}


module.exports = Parser