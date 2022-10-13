const Track = require('../TrackManagement/Track')


class Solution {
    constructor(numberOfTracks, trackSettings) {
        this.trackSettings = trackSettings
        this.tracks = []

        for (let i = 0; i < numberOfTracks; i++) {
            this.tracks.push(new Track(trackSettings, i))
        }
    }

    get sortedTracks() {
        return this.tracks.sort((a, b) => a.id - b.id)
    }

    get talks() {
        return this.tracks.reduce((partial, track) => partial.concat(track.talks), [])
    }

    get deepCopy() {
        let copy = new Solution(this.tracks.length, this.trackSettings)

        for (let i = 0; i < this.tracks.length; i++) {
            for (const talk of this.tracks[i].talks) {
                copy.tracks[i].tryAdd(talk)
            }
        }

        return copy
    }

    addToNewTrack(talk) {
        let newTrack = new Track(this.trackSettings, this.tracks.length)
        newTrack.tryAdd(talk)
        this.tracks.push(newTrack)
    }
    
    prioritizeTracks(compareFunction) {
        return this.tracks.sort(compareFunction)
    }

    toString() {
        let result = ''

        for (const track of this.sortedTracks) {
            result += track.toString() + '\n'
        }

        return result
    }
}


module.exports = Solution