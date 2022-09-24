const Session = require('./Session')
const  { Talk, _ } = require('./Talk')

function createTwoHourSession() {
    return new Session(2022, 11, 1, 10, 11, 12)
}

describe('constructor', () => {
    describe('throws Error', () => {
        test('when beginning is equal to latest end', () => {
            expect(() => new Session(2022, 11, 1, 10, 10, 10)).toThrow(Error)
        })
        test('when earliest end is after latest end', () => {
            expect(() => new Session(2022, 11, 1, 10, 12, 11)).toThrow(Error)
        })
        test('when either end is before beginning', () => {
            expect(() => new Session(2022, 11, 1, 10, 9, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, 11, 9)).toThrow(Error)
        })
        test('when passed hours are not valid hours in a day', () => {
            expect(() => new Session(2022, 11, 1, -1, 11, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, -1, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, 11, -1)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 25, 11, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, 25, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, 11, 25)).toThrow(Error)
        })
    })
    describe('does not throw', () => {
        test('when beginning is equal to earliest end', () => {
            expect(() => new Session(2022, 11, 1, 10, 10, 12)).not.toThrow()
        })
        test('when earliest end is equal to latest end', () => {
            expect(() => new Session(2022, 11, 1, 10, 12, 12)).not.toThrow()
        })
    })
})

describe('durationMin', () => {
    describe('returns 0', () => {
        test('for empty session', () => {
            const session = createTwoHourSession()
            expect(session.duration).toBe(0)
        })
    })
    describe('returns summed duration', () => {
        test('for a single added talk', () => {
            const session = createTwoHourSession()
            const talkDuration = 11
            const shortTalk = new Talk('Why use many words, when few do trick', talkDuration)
            session.tryAdd(shortTalk)
            expect(session.duration).toBe(talkDuration)
        })
        test('for two added talks', () => {
            const session = createTwoHourSession()
            const shortDuration = 10
            const longDuration = 45
            const shortTalk = new Talk('Why use many words, when few do trick', shortDuration)
            const longTalk = new Talk('Eloquence is key', longDuration)
            session.tryAdd(shortTalk)
            session.tryAdd(longTalk)
            expect(session.duration).toBe(shortDuration + longDuration)
        })
    })
})

describe('timeLeft', () => {
    describe('returns remaining session time', () => {
        test('for a single added talk', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            expect(session.timeLeft).toBe(90)
        })
        test('for multiple added talks', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            expect(session.timeLeft).toBe(30)
        })
        test('for maxed out session', () => {
            const session = createTwoHourSession()
            const oneHourTalk = new Talk('Basic Arithmetics', 60)
            session.tryAdd(oneHourTalk)
            session.tryAdd(oneHourTalk)
            expect(session.timeLeft).toBe(0)
        })
    })
})

describe('isSatisfied', () => {
    describe('returns false', () => {
        test('for empty session', () => {
            const session = createTwoHourSession()
            expect(session.isSatisfied).toBe(false)
        })
        test('for session duration shorter than earliest end', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            expect(session.isSatisfied).toBe(false)
        })
    })
    describe('returns true', () => {
        test('when earliest end is reached exactly', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            expect(session.isSatisfied).toBe(true)
        })
        test('when earliest end is exceeded', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            expect(session.isSatisfied).toBe(true)
        })
        test('when latest end is reached exactly', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            expect(session.isSatisfied).toBe(true)
        })
    })
})

describe('isMaxedOut', () => {
    describe('returns false', () => {
        test('for empty Session.', () => {
            const session = createTwoHourSession()
            expect(session.isMaxedOut).toBe(false)
        })
        test('for session duration shorter than earliest end', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            expect(session.isMaxedOut).toBe(false)
        })
        test('for session duration equal to earliest end', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            expect(session.isMaxedOut).toBe(false)
        })
        test('for session duration longer than earliest end but shorter than latest end', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            expect(session.isMaxedOut).toBe(false)
        })
    })
    describe('returns true', () => {
        test('for session duration equal to latest end', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            session.tryAdd(halfHourTalk)
            expect(session.isMaxedOut).toBe(true)
        })
    })
})

describe('tryAdd', () => {
    describe('returns true and adds talk', () => {
        test('for talk with a duration shorter than the max.', () => {
            const session = createTwoHourSession()
            const shortTalk = new Talk('Why use many words, when few do trick', 10)
            const succeeded = session.tryAdd(shortTalk)
            expect(succeeded).toBe(true)
            expect(session.talks).toContain(shortTalk)
        })
        test('for talk with maximum length.', () => {
            const session = createTwoHourSession()
            const maximumLengthTalk = new Talk('How to Talk without saying much', 120)
            expect(session.tryAdd(maximumLengthTalk)).toBe(true)
            expect(session.talks).toContain(maximumLengthTalk)
        })
    })
    describe('returns false', () => {
        test('for talk that is too long', () => {
            const session = createTwoHourSession()
            const tooLongTalk = new Talk('How time flies when you are having fun', 121)
            const succeeded = session.tryAdd(tooLongTalk)
            expect(succeeded).toBe(false)
            expect(session.talks).not.toContain(tooLongTalk)
        })
    })
})