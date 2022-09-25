const { Talk, LightningTalk } = require('./Talk')

describe('constructor', () => {
    describe('throws Error', () => {
        test('for duration less than 5 minutes.', () => {
            expect(() => new Talk('JavaScript, The Good Parts', 4)).toThrow(Error)
        })
    })
})

describe('duration', () => {
    describe('returns value specified at construction', () => {
        test('for new Talk.', () => {
            const duration = 25
            const talk = new Talk('How to measure time', duration)
            expect(talk.duration).toBe(duration)
        })
    })
    describe('returns 5 minutes', () => {
        test('for new LightningTalk.', () => {
            const talk = new LightningTalk('Time is an illusion')
            expect(talk.duration).toBe(LightningTalk.duration)
        })
    })
})