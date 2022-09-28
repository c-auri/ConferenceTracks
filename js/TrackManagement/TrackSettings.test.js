const TrackSettings = require('./TrackSettings')
const Duration = require('../Duration')


describe('TrackSettings.maxTrackDuration', () => {
    describe('returns correct value', () => {
        test('for TrackSettings.default.', () => {
            const sevenHours = Duration.fromMinutes(7 * 60)
            expect(TrackSettings.default.maxTrackDuration).toEqual(sevenHours)
        })
    })
})

describe('TrackSettings.canFit(duration)', () => {
    describe('returns true', () => {
        test('for duration that fits into morning session.', () => {
            expect(TrackSettings.default.canFit(Duration.fromMinutes(180))).toBe(true)
        })
        test('for duration that fits into afternoon session.', () => {
            expect(TrackSettings.default.canFit(Duration.fromMinutes(240))).toBe(true)
        })
    })
    describe('returns false', () => {
        test('for duration that fits into no session.', () => {
            expect(TrackSettings.default.canFit(Duration.fromMinutes(250))).toBe(false)
        })
    })
})