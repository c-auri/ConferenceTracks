const Solution = require('./Solution')
const { Talk, _ } = require('../TrackManagement/Talk')


class GreedyStartHeuristic {
    constructor(trackSettings) {
        this.trackSettings = trackSettings
        this.excess = []
    }

    /**
     * Tries to fit all talks into a minimum number of tracks, but may fail to find the optimum.
     * @returns a valid solution that may or may not be the optimum.
     */
    findInitialSolution(talks) {
        const numberOfTracks = this.#getMinimumNumberOfTracks(talks)
        let solution = new Solution(numberOfTracks, this.trackSettings)
        
        for (const talk of talks.sort(Talk.compareByDuration).reverse()) {
            let added = false
    
            for (const track of solution) {
                added = track.tryAdd(talk)
                if (added) { 
                    break 
                }
            }
    
            if (!added) {
                this.excess.push(talk)
            }
        }
        
        return this.#integrateExcess(solution)
    }
    
    /**
     * Creates new tracks to fit all excess talks that could not be inserted into the initial tracks.
     */
    #integrateExcess(solution) {
        for (const talk of this.excess) {
            while (!solution.tracks[solution.tracks.length - 1].tryAdd(talk)) {
                solution.addNewTrack()
            }
        }

        return solution
    }

    #getMinimumNumberOfTracks(talks) {
        const totalDuration = talks.reduce(
            (partial, currentTalk) => partial + currentTalk.duration,
            0)
        
        return Math.ceil(totalDuration / this.trackSettings.maxTrackDuration)
    }
}


module.exports = GreedyStartHeuristic