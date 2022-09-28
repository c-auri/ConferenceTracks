class Duration {
    static fromHours(hours) {
        return Duration.fromMinutes(hours * 60)
    }

    static fromMinutes(minutes) {
        return new Duration(minutes * 60000)
    }

    constructor(milliseconds) {
        this.milliseconds = milliseconds
    }

    get minutes() {
        return this.milliseconds / 60000
    }

    add(other) {
        return new Duration(this.milliseconds + other.milliseconds)
    }

    subtract(other) {
        if (this.isShorterThan(other)) {
            throw new Error('Trying to subtract a longer duration from a shorter one.')
        }

        return new Duration(this.milliseconds - other.milliseconds)
    }

    addTo(date) {
        return new Date(date.getTime() + this.milliseconds);
    }

    isShorterThan(other) {
        return this.milliseconds < other.milliseconds
    }

    isLongerThan(other) {
        return this.milliseconds > other.milliseconds
    }

    isLongerThanOrEqualTo(other) {
        return this.milliseconds >= other.milliseconds
    }

    toString() {
        return this.minutes + 'min'
    }
}


module.exports = Duration