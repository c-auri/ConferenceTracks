const Track = require('../TrackManagement/Track')


class Solution {
    constructor(numberOfTracks, trackSettings) {
        this.trackSettings = trackSettings
        this.tracks = []

        for (let i = 0; i < numberOfTracks; i++) {
            this.tracks.push(new Track(`Track ${i + 1}`, trackSettings))
        }
    }

    get talks() {
        return this.tracks.reduce((partial, track) => partial.concat(track.talks), [])
    }
    
    /**
     * Iterates through the tracks of this solution, sorted by their priority.
     */
    *[Symbol.iterator]() {
        for (const track of this.tracks.sort(Track.compareByPriority)) {
            yield track
        }
    }

    addNewTrack() {
        this.tracks.push(new Track(`Track ${this.tracks.length + 1}`, this.trackSettings))
    }

    toString() {
        let result = ''

        // this.tracks.sort() will sort the tracks by their string representation,
        // resulting in a sort order by Track.title (Track 1 before Track 2 and so on).
        // Is a bit hacky, but works for now.
        for (const track of this.tracks.sort()) {
            result += track.toString() + '\n'
        }

        return result
    }
}


module.exports = Solution