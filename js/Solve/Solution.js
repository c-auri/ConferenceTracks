const Track = require('../TrackManagement/Track')

class Solution {
    constructor(numberOfTracks, trackSettings) {
        this.excess = []
        this.tracks = []

        for (let i = 0; i < numberOfTracks; i++) {
            this.tracks.push(new Track(`Track ${i + 1}`, trackSettings))
        }
    }
    
    *[Symbol.iterator]() {
        for (const track of this.tracks.sort(Track.compareByPriority)) {
            yield track
        }
    }

    toString() {
        let result = ''

        for (const track of this.tracks) {
            result += track.toString() + '\n'
        }

        if (this.excess.length > 0) {
            result += 'Excess talks: ' + this.excess
        }

        return result
    }
}


module.exports = Solution