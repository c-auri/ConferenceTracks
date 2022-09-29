const { Talk, _ } = require('../TrackManagement/Talk')
const Duration = require('../Duration')
const Solution = require('./Solution')
const InsertionStrategy = require('./InsertionStrategy')


class GreedyStartHeuristic {
    constructor(trackSettings) {
        this.trackSettings = trackSettings
        this.minimumNumberOfTracks
        this.talks
    }

    /**
     * Tries to fit all talks into a minimum number of tracks,
     * but may fail to find the optimum.
     * @returns a valid solution that may or may not be the optimum.
     */
    findInitialSolution(talks) {
        this.minimumNumberOfTracks = this.#getMinimumNumberOfTracks(talks)
        this.talks = talks.sort(Talk.compareByDuration).reverse()

        let solutions = [
            this.#solveWith(InsertionStrategy.prioritizeUnsatisfiedBreadthFirst),
            this.#solveWith(InsertionStrategy.prioritizeUnsatisfiedDepthFirst),
        ]

        return this.#getBest(solutions)
    }

    #solveWith(priorityFunction) {
        let solution = new Solution(this.minimumNumberOfTracks, this.trackSettings)

        for (const talk of this.talks) {
            let added = false

            for (const track of solution.prioritizeTracks(priorityFunction)) {
                added = track.tryAdd(talk)
                if (added) { break }
            }
    
            if (!added) {
                solution.addToNewTrack(talk)
            }
        }

        return solution
    }

    #getBest(solutions) {
        return solutions.reduce(
            (best, current) => current.tracks.length < best.tracks.length ? current : best, 
            solutions[0])
    }

    #getMinimumNumberOfTracks(talks) {
        const totalDuration = talks.reduce(
            (partial, talk) => partial.add(talk.duration), 
            Duration.fromMinutes(0))
        
        return Math.ceil(totalDuration.minutes / this.trackSettings.maxTrackDuration.minutes)
    }
}


module.exports = GreedyStartHeuristic