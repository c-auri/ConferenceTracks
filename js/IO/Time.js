class Time {
    static toString(time) {
        // print the time in hh:mm a format, e.g. 11:32 AM
        return time.toLocaleTimeString(
            'en-US', 
            { hour: '2-digit', minute:'2-digit' })
    }
}


module.exports = Time