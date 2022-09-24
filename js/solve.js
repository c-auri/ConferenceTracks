const defaultTrackSettings = require('./defaultTrackSettings')
const Track = require('./Track')

function solve(talks, trackSettings = defaultTrackSettings) {
    talks.sort((thisTalk, thatTalk) => thisTalk.duration - thatTalk.duration).reverse()
    const numberOfTracks = getMinimumNumberOfTracks(talks, trackSettings)
    let tracks = createTracks(numberOfTracks, trackSettings)
    let excess = []

    for (const talk of talks) {
        let added = false

        for (const track of tracks) {
            added = track.tryAdd(talk)
            if (added) { 
                break 
            }
        }

        if (!added) {
            excess.push(talk)
        }
    }

    return { tracks: tracks, excess: excess }
}

function getMinimumNumberOfTracks(talks, settings) {
    const totalDuration = talks.reduce(
        (partial, currentTalk) => partial + currentTalk.duration,
        0)

    const maximumTrackDuration = (settings.morningLatestEndHour - settings.morningBeginningHour) * 60
        + (settings.afternoonLatestEndHour - settings.afternoonBeginningHour) * 60

    return Math.ceil(totalDuration / maximumTrackDuration)
}

function createTracks(numberOfTracks, trackSettings) {
    let tracks = []

    for (let i = 0; i < numberOfTracks; i++) {
        tracks.push(new Track(`Track ${i + 1}`, trackSettings))
    }

    return tracks
}


module.exports = solve