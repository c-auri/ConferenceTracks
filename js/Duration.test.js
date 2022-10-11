const Duration = require('./Duration.js')


describe('Duration.constructor', () => {
    test('is private', () => {
        expect(() => new Duration(0)).toThrow(Error)
    })
    test('stays private after using Duration.fromHours', () => {
        Duration.fromHours(3)
        expect(() => new Duration(0)).toThrow(Error)
    })
    test('stays private after using Duration.fromMinutes', () => {
        Duration.fromMinutes(90)
        expect(() => new Duration(0)).toThrow(Error)
    })
})

describe('Duration.fromHours and Duration.fromMinutes', () => {
    describe('return correct new Durations', () => {
        test('for integer inputs', () => {
            expect(Duration.fromHours(0)).toEqual(Duration.zero)
            expect(Duration.fromMinutes(0)).toEqual(Duration.zero)
            expect(Duration.fromHours(1)).toEqual(Duration.fromMinutes(60))
            expect(Duration.fromHours(6)).toEqual(Duration.fromMinutes(360))
        })
    })
    describe('do not throw', () => {
        test('for integers in floating point format', () => {
            expect(() => Duration.fromHours(1.0)).not.toThrow(Error)
            expect(() => Duration.fromMinutes(1.0)).not.toThrow(Error)
            expect(() => Duration.fromHours(1.)).not.toThrow(Error)
            expect(() => Duration.fromMinutes(1.)).not.toThrow(Error)
            expect(() => Duration.fromHours(.0)).not.toThrow(Error)
            expect(() => Duration.fromMinutes(.0)).not.toThrow(Error)
        })
    })
    describe('throw an Error', () => {
        test('for true floating point inputs', () => {
            expect(() => Duration.fromHours(4.5)).toThrow(Error)
            expect(() => Duration.fromMinutes(4.5)).toThrow(Error)
        })
        test('for negative inputs', () => {
            expect(() => Duration.fromHours(-1)).toThrow(Error)
            expect(() => Duration.fromHours(-4.5)).toThrow(Error)
            expect(() => Duration.fromMinutes(-1)).toThrow(Error)
            expect(() => Duration.fromMinutes(-4.5)).toThrow(Error)
        })
    })
})

describe('Duration.zero', () => {
    test('returns new Duration with 0 minutes', () => {
        expect(Duration.zero.minutes).toBe(0)
    })
})

describe('Duration.minutes', () => {
    describe('returns the number of minutes', () => {
        test('for Duration created by hours', () => {
            expect(Duration.fromHours(1).minutes).toBe(60)
            expect(Duration.fromHours(3).minutes).toBe(180)
        })
        test('for Duration created by hours', () => {
            expect(Duration.fromMinutes(1).minutes).toBe(1)
            expect(Duration.fromMinutes(90).minutes).toBe(90)
        })
    })
})

describe('Duration.add', () => {
    describe('returns identidy', () => {
        test('when adding 0', () => {
            const duration = Duration.fromMinutes(30)
            expect(duration.add(Duration.zero)).toEqual(duration)
            expect(Duration.zero.add(duration)).toEqual(duration)
            expect(Duration.zero.add(Duration.zero)).toEqual(Duration.zero)
        })
    })
    describe('returns sum', () => {
        test('for two valid Durations', () => {
            const halfHour = Duration.fromMinutes(30)
            const oneHour = Duration.fromHours(1)
            expect(halfHour.add(oneHour).minutes).toBe(90)
        })
    })
})

describe('Duration.subtract', () => {
    describe('throws an error', () => {
        test('when trying to subtract a long Duration from a shorter one', () => {
            const short = Duration.fromMinutes(30)
            const long = Duration.fromMinutes(120)
            expect(() => short.subtract(long)).toThrow(Error)
        })
    })
    describe('returns difference', () => {
        test('for different Durations', () => {
            const oneHour = Duration.fromHours(1)
            const halfHour = Duration.fromMinutes(30)
            expect(oneHour.subtract(halfHour).minutes).toBe(30)
        })
        test('for equal Durations', () => {
            const oneHour = Duration.fromMinutes(60)
            expect(oneHour.subtract(oneHour).minutes).toBe(0)
        })
    })
})

describe('Duration.addTo(date)', () => {
    describe('returns unaltered date', () => {
        test('when adding Duration.zero', () => {
            const date = new Date(2022, 11, 1, 12, 0, 0, 0)
            expect(Duration.zero.addTo(date)).toEqual(date)
        })
    })
    describe('returns correct new date', () => {

        test('when adding a positive Duration', () => {
            const halfHour = Duration.fromMinutes(30)
            const originalDate = new Date(2022, 11, 1, 12, 0, 0, 0)
            const expectedDate = new Date(2022, 11, 1, 12, 30, 0, 0)
            expect(halfHour.addTo(originalDate)).toEqual(expectedDate)
        })

        test('when going over midnight', () => {
            const halfHour = Duration.fromMinutes(30)
            const originalDate = new Date(2022, 11, 1, 23, 45, 0, 0)
            const expectedDate = new Date(2022, 11, 2, 0, 15, 0, 0)
            expect(halfHour.addTo(originalDate)).toEqual(expectedDate)
        })
    })
})