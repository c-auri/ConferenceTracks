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
        return this.#maxMorningDuration + this.#maxAfternoonDuration
    }

    get #maxMorningDuration() {
        return (this.morningLatestEndHour - this.morningBeginningHour) * 60
    }

    get #maxAfternoonDuration() {
        return (this.afternoonLatestEndHour - this.afternoonBeginningHour) * 60
    }

    canFit(talk) {
        return talk.duration <= this.#maxMorningDuration
            || talk.duration <= this.#maxAfternoonDuration
    }
}


module.exports = TrackSettings