class Duration {
    static #constructingWithCreate = false

    static get zero() {
        return Duration.fromMinutes(0)
    }

    static fromHours(hours) {
        if (!Number.isInteger(hours)) {
            throw new Error('Hours must be an integer value.')
        }

        return Duration.#create(Duration.#toMilliseconds(Duration.#toMinutes(hours)))
    }

    static fromMinutes(minutes) {
        if (!Number.isInteger(minutes)) {
            throw new Error('Minutes must be an integer value.')
        }

        return Duration.#create(Duration.#toMilliseconds(minutes))
    }

    static #create(milliseconds) {
        Duration.#constructingWithCreate = true
        const instance = new Duration(milliseconds)
        Duration.#constructingWithCreate = false
        return instance
    }

    static #toMinutes(hours) {
        return hours * 60
    }

    static #toMilliseconds(minutes) {
        return minutes * 60000
    }

    constructor(milliseconds) {
        if (!Duration.#constructingWithCreate) {
            throw new Error('Duration.constructor is private.')
        }

        if (milliseconds < 0) {
            throw new Error('Duration must be non-negative.')
        }

        this.milliseconds = milliseconds
    }

    get minutes() {
        return this.milliseconds / 60000
    }

    add(other) {
        return Duration.#create(this.milliseconds + other.milliseconds)
    }

    subtract(other) {
        if (this.isShorterThan(other)) {
            throw new Error('Trying to subtract a longer duration from a shorter one.')
        }

        return Duration.#create(this.milliseconds - other.milliseconds)
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