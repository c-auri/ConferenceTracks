class Time {
    static add(time, duration) {
        // convert the duration from minutes to milliseconds and add it to time
        return new Date(time.getTime() + duration * 60000);
    }

    static toString(time) {
        // print the time in hh:mm a format, e.g. 11:32 AM
        return time.toLocaleTimeString(
            'en-US', 
            { hour: '2-digit', minute:'2-digit' })
    }
}


module.exports = Time