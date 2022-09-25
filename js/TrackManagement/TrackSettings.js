class TrackSettings {
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

    static get default() {
        return new TrackSettings(2022, 11, 1, 9, 12, 12, 13, 16, 17)
    }
}


module.exports = TrackSettings