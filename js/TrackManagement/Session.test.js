const Session = require('./Session')
const { Talk, _ } = require('./Talk')
const Duration = require('../Duration')


function createTwoHourSession() {
    return new Session(2022, 11, 1, 10, 11, 12)
}

describe('Session.constructor', () => {
    describe('throws Error', () => {
        test('when beginning is equal to latest end.', () => {
            expect(() => new Session(2022, 11, 1, 10, 10, 10)).toThrow(Error)
        })
        test('when earliest end is after latest end.', () => {
            expect(() => new Session(2022, 11, 1, 10, 12, 11)).toThrow(Error)
        })
        test('when either end is before beginning.', () => {
            expect(() => new Session(2022, 11, 1, 10, 9, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, 11, 9)).toThrow(Error)
        })
        test('when passed hours are not valid hours in a day.', () => {
            expect(() => new Session(2022, 11, 1, -1, 11, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, -1, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, 11, -1)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 25, 11, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, 25, 12)).toThrow(Error)
            expect(() => new Session(2022, 11, 1, 10, 11, 25)).toThrow(Error)
        })
    })
    describe('does not throw', () => {
        test('when beginning is equal to earliest end.', () => {
            expect(() => new Session(2022, 11, 1, 10, 10, 12)).not.toThrow()
        })
        test('when earliest end is equal to latest end.', () => {
            expect(() => new Session(2022, 11, 1, 10, 12, 12)).not.toThrow()
        })
    })
})

describe('Session.duration', () => {
    describe('returns total Session duration', () => {
        test('for empty Session.', () => {
            const session = createTwoHourSession()
            expect(session.duration.minutes).toBe(0)
        })
        test('for a single added Talk.', () => {
            const session = createTwoHourSession()
            const duration = Duration.fromMinutes(11)
            const talk = new Talk('Why use many words, when few do trick', duration)
            session.tryAdd(talk)
            expect(session.duration).toEqual(duration)
        })
        test('for two added Talks.', () => {
            const session = createTwoHourSession()
            const shortDuration = Duration.fromMinutes(10)
            const longDuration = Duration.fromMinutes(45)
            const shortTalk = new Talk('Why use many words, when few do trick', shortDuration)
            const longTalk = new Talk('Eloquence is key', longDuration)
            session.tryAdd(shortTalk)
            session.tryAdd(longTalk)
            expect(session.duration).toEqual(shortDuration.add(longDuration))
        })
    })
})

describe('Session.timeLeft', () => {
    describe('returns remaining Session time', () => {
        test('for a single added Talk.', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', Duration.fromMinutes(30))
            expect(session.timeLeft).toEqual(Duration.fromMinutes(120))
            session.tryAdd(halfHourTalk)
            expect(session.timeLeft).toEqual(Duration.fromMinutes(90))
        })
        test('for multiple added Talks.', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', Duration.fromMinutes(30))
            expect(session.timeLeft).toEqual(Duration.fromMinutes(120))
            session.tryAdd(halfHourTalk)
            expect(session.timeLeft).toEqual(Duration.fromMinutes(90))
            session.tryAdd(halfHourTalk)
            expect(session.timeLeft).toEqual(Duration.fromMinutes(60))
            session.tryAdd(halfHourTalk)
            expect(session.timeLeft).toEqual(Duration.fromMinutes(30))
        })
        test('for maxed out Session.', () => {
            const session = createTwoHourSession()
            const oneHourTalk = new Talk('Basic Arithmetics', Duration.fromMinutes(60))
            expect(session.timeLeft).toEqual(Duration.fromMinutes(120))
            session.tryAdd(oneHourTalk)
            session.tryAdd(oneHourTalk)
            expect(session.timeLeft).toEqual(Duration.zero)
        })
    })
})

describe('Session.isSatisfied', () => {
    describe('returns false', () => {
        test('for empty Session.', () => {
            const session = createTwoHourSession()
            expect(session.isSatisfied).toBe(false)
        })
        test('when current Session end is before earliest end.', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', Duration.fromMinutes(30))
            session.tryAdd(halfHourTalk)
            expect(session.isSatisfied).toBe(false)
        })
    })
    describe('returns true', () => {
        test('when earliest end is reached exactly.', () => {
            const session = createTwoHourSession()
            const oneHourTalk = new Talk('Basic Arithmetics', Duration.fromMinutes(60))
            expect(session.isSatisfied).toBe(false)
            session.tryAdd(oneHourTalk)
            expect(session.isSatisfied).toBe(true)
        })
        test('when earliest end is exceeded.', () => {
            const session = createTwoHourSession()
            const halfHourTalk = new Talk('Basic Arithmetics', Duration.fromMinutes(30))
            expect(session.isSatisfied).toBe(false)
            session.tryAdd(halfHourTalk)
            expect(session.isSatisfied).toBe(false)
            session.tryAdd(halfHourTalk)
            expect(session.isSatisfied).toBe(true)
            session.tryAdd(halfHourTalk)
            expect(session.isSatisfied).toBe(true)
        })
        test('when latest end is reached exactly.', () => {
            const session = createTwoHourSession()
            const oneHourTalk = new Talk('Basic Arithmetics', Duration.fromMinutes(60))
            expect(session.isSatisfied).toBe(false)
            session.tryAdd(oneHourTalk)
            expect(session.isSatisfied).toBe(true)
            session.tryAdd(oneHourTalk)
            expect(session.isSatisfied).toBe(true)
        })
    })
})

describe('Session.tryAdd', () => {
    describe('returns true and adds Talk', () => {
        test('for Talk with a duration shorter than the max.', () => {
            const session = createTwoHourSession()
            const talk = new Talk('Why use many words, when few do trick', Duration.fromMinutes(10))
            const added = session.tryAdd(talk)
            expect(added).toBe(true)
            expect(session.talks).toContain(talk)
        })
        test('for Talk with maximum length.', () => {
            const session = createTwoHourSession()
            const talk = new Talk('How to Talk without saying much', Duration.fromMinutes(120))
            expect(session.tryAdd(talk)).toBe(true)
            expect(session.talks).toContain(talk)
        })
    })
    describe('returns false and does not add Talk', () => {
        test('when a single Talk too long.', () => {
            const session = createTwoHourSession()
            const talk = new Talk('Time flies when you are having fun', Duration.fromMinutes(121))
            const added = session.tryAdd(talk)
            expect(added).toBe(false)
            expect(session.talks).not.toContain(talk)
        })
        test('when adding one too many Talks.', () => {
            const session = createTwoHourSession()
            const oneAndAHalfHourTalk = new Talk('How to Fit In', Duration.fromMinutes(120))
            const oneHourTalk = new Talk('Coping with Rejection', Duration.fromMinutes(60))
            let added = session.tryAdd(oneAndAHalfHourTalk)
            expect(added).toBe(true)
            expect(session.talks).toContain(oneAndAHalfHourTalk)
            added = session.tryAdd(oneHourTalk)
            expect(added).toBe(false)
            expect(session.talks).not.toContain(oneHourTalk)
        })
    })
})