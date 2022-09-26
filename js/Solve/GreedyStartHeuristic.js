const Solution = require('./Solution')
const { Talk, _ } = require('../TrackManagement/Talk')

class GreedyStartHeuristic {
    constructor(trackSettings) {
        this.trackSettings = trackSettings
    }

    /**
     * Tries to fit all talks into the minimum number of tracks.
     * 
     * May fail to insert some talks depending on the input structure.
     * Those talks will be saved in the excess property of the solution and will need to be handled later.
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
                solution.excess.push(talk)
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