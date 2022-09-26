const TrackSettings = require('./TrackSettings')

describe('TrackSettings.maxTrackDuration', () => {
    describe('returns correct value', () => {
        test('for TrackSettings.defaul.', () => {
            const sevenHours = 7 * 60
            expect(TrackSettings.default.maxTrackDuration).toBe(sevenHours)
        })
    })
})
