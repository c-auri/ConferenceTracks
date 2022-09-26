const Solution = require('./Solution')
const { Talk, _ } = require('../TrackManagement/Talk')

class GreedyStarter {
    constructor(trackSettings) {
        this.trackSettings = trackSettings
    }

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
    
        const maxMorningHours = this.trackSettings.morningLatestEndHour - this.trackSettings.morningBeginningHour
        const maxAfternoonHours = this.trackSettings.afternoonLatestEndHour - this.trackSettings.afternoonBeginningHour
        const maxTrackDuration = (maxMorningHours + maxAfternoonHours) * 60
    
        return Math.ceil(totalDuration / maxTrackDuration)
    }
}


module.exports = GreedyStarter