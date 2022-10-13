class SolverSettings {
    static get default() {
        return new SolverSettings(
            100,
            SolverSettings.defaultPenaltyFunction)
    }

    static defaultPenaltyFunction(solution) {
        let penalty = 0
        
        for (const track of solution.tracks) {
            penalty += 100
    
            for (const session of track.sessions) {
                if (!session.isSatisfied) {
                    penalty += 10
                }
            }
        }
    
        return penalty
    }

    constructor(numberOfImprovementSteps, penaltyFunction) {
        this.numberOfImprovementSteps = numberOfImprovementSteps
        this.penaltyFunction = (solution) => penaltyFunction(solution)
    }
    
    penalize(solution) {
        return this.penaltyFunction(solution)
    }

    getBest(thisSolution, thatSolution) {
        const thisPenalty = this.penalize(thisSolution)
        const thatPenalty = this.penalize(thatSolution)

        return thisPenalty < thatPenalty ? thisSolution : thatSolution
    }
}


module.exports = SolverSettings