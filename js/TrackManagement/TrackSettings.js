const Duration = require("./Duration")

class TrackSettings {
    static get default() {
        return new TrackSettings(2022, 11, 1, 9, 12, 12, 13, 16, 17)
    }

    constructor(
        year,
        monthIndex, 
        day, 
        morningBeginningHour, 
        morningEarliestEndHour, 
        morningLatestEndHour, 
        afternoonBeginningHour, 
        afternoonEarliestEndHour, 
        afternoonLatestEndHour) {
        this.year = year
        this.monthIndex = monthIndex
        this.day = day
        this.morningBeginningHour = morningBeginningHour
        this.morningEarliestEndHour = morningEarliestEndHour
        this.morningLatestEndHour = morningLatestEndHour
        this.afternoonBeginningHour = afternoonBeginningHour
        this.afternoonEarliestEndHour = afternoonEarliestEndHour
        this.afternoonLatestEndHour = afternoonLatestEndHour
    }

    get maxTrackDuration() {
        return this.#maxMorningDuration.add(this.#maxAfternoonDuration)
    }

    get #maxMorningDuration() {
        return Duration.fromHours(this.morningLatestEndHour - this.morningBeginningHour)
    }

    get #maxAfternoonDuration() {
        return Duration.fromHours(this.afternoonLatestEndHour - this.afternoonBeginningHour)
    }

    canFit(duration) {
        return this.#maxMorningDuration.isLongerThanOrEqualTo(duration)
            || this.#maxAfternoonDuration.isLongerThanOrEqualTo(duration)
    }
}


module.exports = TrackSettings