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

    addToNewTrack(talk) {
        let newTrack = new Track(`Track ${this.tracks.length + 1}`, this.trackSettings)
        newTrack.tryAdd(talk)
        this.tracks.push(newTrack)
    }
    
    prioritizeTracks(compareFunction) {
        return this.tracks.sort(compareFunction)
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