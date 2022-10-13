class LocalSearch {
    constructor(solverSettings, trackSettings) {
        this.solverSettings = solverSettings
        this.trackSettings = trackSettings
    }

    improve(solution) {
        for (let i = 0; i < this.solverSettings.numberOfImprovementSteps; i++) {
            for (const neighbor of this.#iterateNeighbors(solution)) {
                solution = this.solverSettings.getBest(neighbor, solution)
            }
        }

        return solution
    }

    * #iterateNeighbors(solution) {
        for (const talk of solution.talks) {
            let fromId = solution.tracks.filter(track => track.contains(talk.id))[0].id
            
            for (const toId of solution.sortedTracks.map(track => track.id)) {
                let copy = solution.deepCopy
                let wasMoved = false

                if (toId == fromId) {
                    wasMoved = this.#tryToSwapSessions(talk, copy.tracks[fromId])
                } else {
                    wasMoved = this.#tryToMove(talk, copy.tracks[fromId], copy.tracks[toId])
                }

                if (wasMoved) { yield copy }
            }
        }
    }
    
    #tryToMove(talk, fromTrack, toTrack) {
        let wasMoved = toTrack.tryAdd(talk)
        
        if (wasMoved) {
            fromTrack.remove(talk.id)
        }
        
        return wasMoved
    }
    
    #tryToSwapSessions(talk, track) {
        if (track.morning.contains(talk.id)) {
            track.remove(talk.id)
            return track.afternoon.tryAdd(talk)
        } else {
            track.remove(talk.id)
            return track.morning.tryAdd(talk)
        }
    }
}


module.exports = LocalSearch