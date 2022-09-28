const Solution = require('./Solution')
const { Talk, _ } = require('../TrackManagement/Talk')
const Track = require('../TrackManagement/Track')


class GreedyStartHeuristic {
    constructor(trackSettings) {
        this.trackSettings = trackSettings
    }

    /**
     * Tries to fit all talks into a minimum number of tracks,
     * but may fail to find the optimum.
     * @returns a valid solution that may or may not be the optimum.
     */
    findInitialSolution(talks) {
        const numberOfTracks = this.#getMinimumNumberOfTracks(talks)
        let solution = new Solution(numberOfTracks, this.trackSettings)
        talks.sort(Talk.compareByDuration).reverse()

        for (const talk of talks) {
            solution.tracks.sort(Track.compareByPriority)
            let added = false

            for (let i = 0; !added && i < solution.tracks.length; i++) {
                added = solution.tracks[i].tryAdd(talk)
            }
    
            if (!added) {
                solution.addToNewTrack(talk)
            }
        }

        return solution
    }

    #getMinimumNumberOfTracks(talks) {
        const totalDuration = talks.reduce((partial, talk) => partial + talk.duration, 0)
        return Math.ceil(totalDuration / this.trackSettings.maxTrackDuration)
    }
}


module.exports = GreedyStartHeuristic