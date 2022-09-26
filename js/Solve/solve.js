const TrackSettings = require('../TrackManagement/TrackSettings')
const Solution = require('./Solution')
const { Talk, _ } = require('../TrackManagement/Talk')

function solve(talks, trackSettings = TrackSettings.default) {
    talks.sort(Talk.compareByDuration).reverse()
    const numberOfTracks = getMinimumNumberOfTracks(talks, trackSettings)
    let solution = new Solution(numberOfTracks, trackSettings)

    for (const talk of talks) {
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

function getMinimumNumberOfTracks(talks, settings) {
    const totalDuration = talks.reduce(
        (partial, currentTalk) => partial + currentTalk.duration,
        0)

    const maxMorningHours = settings.morningLatestEndHour - settings.morningBeginningHour
    const maxAfternoonHours = settings.afternoonLatestEndHour - settings.afternoonBeginningHour
    const maxTrackDuration = (maxMorningHours + maxAfternoonHours) * 60

    return Math.ceil(totalDuration / maxTrackDuration)
}


module.exports = solve