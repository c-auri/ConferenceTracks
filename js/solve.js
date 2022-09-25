const defaultTrackSettings = require('./defaultTrackSettings')
const Track = require('./TrackManagement/Track')

function solve(talks, trackSettings = defaultTrackSettings) {
    talks.sort((a, b) => a.duration - b.duration).reverse()
    const numberOfTracks = getMinimumNumberOfTracks(talks, trackSettings)
    let solution = initializeSolution(numberOfTracks, trackSettings)

    for (const talk of talks) {
        let added = false

        for (const track of solution.tracks) {
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

function initializeSolution(numberOfTracks, trackSettings) {
    let tracks = []

    for (let i = 0; i < numberOfTracks; i++) {
        tracks.push(new Track(`Track ${i + 1}`, trackSettings))
    }

    return { tracks: tracks, excess: [] }
}


module.exports = solve