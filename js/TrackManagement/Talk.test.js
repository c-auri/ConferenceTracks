const { Talk, LightningTalk } = require('./Talk')
const Duration = require('../Duration')


describe('Talk.constructor', () => {
    describe('throws Error', () => {
        test('for duration less than 5 minutes.', () => {
            expect(() => new Talk('JavaScript, The Good Parts', Duration.fromMinutes(4)))
            .toThrow(Error)
        })
    })
})

describe('Talk.duration', () => {
    describe('returns value specified at construction', () => {
        test('for new Talk.', () => {
            const duration = Duration.fromMinutes(25)
            const talk = new Talk('How to measure time', duration)
            expect(talk.duration).toBe(duration)
        })
    })
    describe('returns minimum Talk duration', () => {
        test('for new LightningTalk.', () => {
            const talk = new LightningTalk('Time is an illusion')
            expect(talk.duration).toEqual(Talk.minimumDuration)
        })
    })
})

describe('Talk.compareByDuration', () => {
    describe('returns 0', () => {
        test('for equal Talks.', () => {
            const talk = new Talk('Equality in all Things', Duration.fromMinutes(9))
            expect(Talk.compareByDuration(talk, talk)).toBe(0)
        })
        test('for Talks with equal durations.', () => {
            const duration = Duration.fromMinutes(14)
            const thisTalk = new Talk('Potato', duration)
            const thatTalk = new Talk('Tomato', duration)
            expect(Talk.compareByDuration(thisTalk, thatTalk)).toBe(0)
        })
    })
    describe('returns positive value', () => {
        test('if the first Talk is longer than the second.', () => {
            const thisTalk = new Talk('Potato', Duration.fromMinutes(19))
            const thatTalk = new Talk('Tomato', Duration.fromMinutes(13))
            expect(Talk.compareByDuration(thisTalk, thatTalk)).toBeGreaterThan(0)
        })
    })
    describe('returns negative value', () => {
        test('if the first Talk is shorter than the second.', () => {
            const thisTalk = new Talk('Potato', Duration.fromMinutes(13))
            const thatTalk = new Talk('Tomato', Duration.fromMinutes(19))
            expect(Talk.compareByDuration(thisTalk, thatTalk)).toBeLessThan(0)
        })
    })
})