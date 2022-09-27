class Time {
    /**
     * Adds a duration to the given date.
     * @param {The instance of Date to be added to} time 
     * @param {The duration to add in minutes} duration 
     * @returns A new Date instance.
     */
    static add(date, duration) {
        // convert the duration from minutes to milliseconds and add it to date
        return new Date(date.getTime() + duration * 60000);
    }

    static toString(time) {
        // print the time in hh:mm a format, e.g. 11:32 AM
        return time.toLocaleTimeString(
            'en-US', 
            { hour: '2-digit', minute:'2-digit' })
    }
}


module.exports = Time