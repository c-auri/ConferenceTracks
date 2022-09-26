const Track = require('../TrackManagement/Track')

class Solution {
    constructor(numberOfTracks, trackSettings) {
        this.trackSettings = trackSettings
        this.excess = []
        this.tracks = []

        for (let i = 0; i < numberOfTracks; i++) {
            this.tracks.push(new Track(`Track ${i + 1}`, trackSettings))
        }
    }
    
    /**
     * Iterates through the tracks of this solution, sorted by their priority.
     */
    *[Symbol.iterator]() {
        for (const track of this.tracks.sort(Track.compareByPriority)) {
            yield track
        }
    }

    /**
     * Creates new tracks to fit all excess talks that could not be inserted into the initial tracks.
     */
    manageExcess() {
        // Iterate in reverse order so that removing the current talk does not break the loop:
        for (let i = this.excess.length - 1; i >= 0; i--) {
            let currentTalk = this.excess[i]
            if (this.trackSettings.canFit(currentTalk)) {
                while (!this.tracks[this.tracks.length - 1].tryAdd(currentTalk)) {
                    this.#createNewTrack()
                }
    
                this.excess.splice(i, 1)
            }
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

    #createNewTrack() {
        this.tracks.push(new Track(`Track ${this.tracks.length + 1}`, this.trackSettings))
    }
}


module.exports = Solution