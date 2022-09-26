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

        // this.tracks.sort() will sort the tracks by their string representation,
        // resulting in a sort order by Track.title (Track 1 before Track 2 and so on).
        // Is a bit hacky, but works for now.
        for (const track of this.tracks.sort()) {
            result += track.toString() + '\n'
        }

        if (this.excess.length > 0) {
            result += 'Excess talks: ' + this.excess
        }

        return result
    }
}


module.exports = Solution