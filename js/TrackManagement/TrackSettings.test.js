const { Talk, _ } = require('./Talk')
const TrackSettings = require('./TrackSettings')

describe('TrackSettings.maxTrackDuration', () => {
    describe('returns correct value', () => {
        test('for TrackSettings.defaul.', () => {
            const sevenHours = 7 * 60
            expect(TrackSettings.default.maxTrackDuration).toBe(sevenHours)
        })
    })
})

describe('TrackSettings.canFit(talk)', () => {
    describe('returns true', () => {
        test('for talk that fits into morning session', () => {
            const talk = new Talk('The Early Bird catches the Worm', 180)
            expect(TrackSettings.default.canFit(talk)).toBe(true)
        })
        test('for talk that fits into afternoon session', () => {
            const talk = new Talk('The Early Worm gets Catched by the Bird', 240)
            expect(TrackSettings.default.canFit(talk)).toBe(true)
        })
    })
    describe('returns false', () => {
        test('for talk that fits into no session', () => {
            const talk = new Talk('The Importance of Reading the Manual', 250)
            expect(TrackSettings.default.canFit(talk)).toBe(false)
        })
    })
})