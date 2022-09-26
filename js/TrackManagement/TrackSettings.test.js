const { Talk, _ } = require('./Talk')
const TrackSettings = require('./TrackSettings')


describe('TrackSettings.maxTrackDuration', () => {
    describe('returns correct value', () => {
        test('for TrackSettings.default.', () => {
            const sevenHours = 7 * 60
            expect(TrackSettings.default.maxTrackDuration).toBe(sevenHours)
        })
    })
})

describe('TrackSettings.canFit(duration)', () => {
    describe('returns true', () => {
        test('for duration that fits into morning session.', () => {
            expect(TrackSettings.default.canFit(180)).toBe(true)
        })
        test('for duration that fits into afternoon session.', () => {
            expect(TrackSettings.default.canFit(240)).toBe(true)
        })
    })
    describe('returns false', () => {
        test('for duration that fits into no session.', () => {
            expect(TrackSettings.default.canFit(250)).toBe(false)
        })
    })
})