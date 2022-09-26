const Track = require('./Track')
const { Talk, _ } = require('./Talk')
const TrackSettings = require('./TrackSettings')


function createTestTrack() {
    return new Track('TestTrack', TrackSettings.default)
}

describe('Track.constructor', () => {
    describe('does not throw', () => {
        test('when called with valid settings', () => {
            expect(() => createTestTrack).not.toThrow()
        })
    })
})

describe('Track.isSatisfied', () => {
    describe('returns false', () => {
        test('for empty Track.', () => {
            const track = createTestTrack()
            expect(track.isSatisfied).toBe(false)
        })
        test('for Track containing a single Talk.', () => {
            const track = createTestTrack()
            const halfHourTalk = new Talk('Basic Arithmetics', 30)
            track.tryAdd(halfHourTalk)
            expect(track.isSatisfied).toBe(false)
        })
        test('when both Sessions are not satisfied.', () => {
            const track = createTestTrack()
            const talk = new Talk('Basic Arithmetics', 120)
            track.tryAdd(talk)
            track.tryAdd(talk)
            expect(track.isSatisfied).toBe(false)
        })
        test('when only the morning Session is satisfied.', () => {
            const track = createTestTrack()
            const morningTalk = new Talk('Basic Arithmetics', 180)
            const afterNoonTalk = new Talk('Basic Arithmetics', 120)
            track.tryAdd(morningTalk)
            track.tryAdd(afterNoonTalk)
            expect(track.morning.isSatisfied).toBe(true)
            expect(track.isSatisfied).toBe(false)
        })
        test('when only the afternoon Session is satisfied.', () => {
            const track = createTestTrack()
            const morningTalk = new Talk('Basic Arithmetics', 120)
            const afterNoonTalk = new Talk('Basic Arithmetics', 180)
            track.tryAdd(morningTalk)
            track.tryAdd(afterNoonTalk)
            expect(track.afternoon.isSatisfied).toBe(true)
            expect(track.isSatisfied).toBe(false)
        })
    })
    describe('returns true', () => {
        test('when both Sessions are satisfied but not maxed out.', () => {
            const track = createTestTrack()
            const talk = new Talk('Basic Arithmetics', 180)
            track.tryAdd(talk)
            track.tryAdd(talk)
            expect(track.isSatisfied).toBe(true)
        })
        test('when both Sessions are satisfied and maxed out.', () => {
            const track = createTestTrack()
            const morningTalk = new Talk('Basic Arithmetics', 180)
            const afterNoonTalk = new Talk('Basic Arithmetics', 240)
            track.tryAdd(morningTalk)
            track.tryAdd(afterNoonTalk)
            expect(track.isSatisfied).toBe(true)
        })
    })
})

describe('Track.talks', () => {
    describe('returns empty list', () => {
        test('for new Track.', () => {
            const track = createTestTrack()
            expect(track.talks.length).toBe(0)
        })
        test('after failing to add a Talk to a new Track.', () => {
            const track = createTestTrack()
            const tooLongTalk = new Talk('The Importance of Reading The Manual', 360)
            track.tryAdd(tooLongTalk)
            expect(track.talks.length).toBe(0)
        })
    })
    describe('lists all added Talks', () => {
        test('for a single added Talk.', () => {
            const track = createTestTrack()
            const talk = new Talk('Enjoying being alone', 60)
            track.tryAdd(talk)
            expect(track.talks).toContain(talk)
        })
        test('for many added Talks.', () => {
            const track = createTestTrack()
            const firstTalk = new Talk('Being Early', 60)
            const secondTalk = new Talk('The Golden Middle', 60)
            const thirdTalk = new Talk('Being Last', 60)
            track.tryAdd(firstTalk)
            track.tryAdd(secondTalk)
            track.tryAdd(thirdTalk)
            expect(track.talks).toContain(firstTalk)
            expect(track.talks).toContain(secondTalk)
            expect(track.talks).toContain(thirdTalk)
        })
        test('after trying to overfill the Track.', () => {
            const track = createTestTrack()
            const firstTalk = new Talk('Being Early', 180)
            const secondTalk = new Talk('The Golden Middle', 120)
            const thirdTalk = new Talk('Being Last', 120)
            const fourthTalk = new Talk('Being Too Late', 120)
            track.tryAdd(firstTalk)
            track.tryAdd(secondTalk)
            track.tryAdd(thirdTalk)
            track.tryAdd(fourthTalk)
            expect(track.talks).toContain(firstTalk)
            expect(track.talks).toContain(secondTalk)
            expect(track.talks).toContain(thirdTalk)
            expect(track.talks).not.toContain(fourthTalk)
        })
    })
})

describe('Track.tryAdd', () => {
    describe('returns true and adds Talk', () => {
        test('for Talk that does not max out any Sessions.', () => {
            const track = createTestTrack()
            const talk = new Talk('Basic Arithmetics', 60)
            const added = track.tryAdd(talk)
            expect(added).toBe(true)
            expect(track.talks).toContain(talk)
        })
        test('for multiple Talks that do not max out any Sessions.', () => {
            const track = createTestTrack()
            const firstTalk = new Talk('Basic Arithmetics', 60)
            const secondTalk = new Talk('Basic Arithmetics', 60)
            const thirdTalk = new Talk('Basic Arithmetics', 60)
            let added = track.tryAdd(firstTalk)
            expect(added).toBe(true)
            added = track.tryAdd(secondTalk)
            expect(added).toBe(true)
            added = track.tryAdd(thirdTalk)
            expect(added).toBe(true)
            expect(track.talks).toContain(firstTalk)
            expect(track.talks).toContain(secondTalk)
            expect(track.talks).toContain(thirdTalk)
        })
        test('for Talk that maxes out the morning Session.', () => {
            const track = createTestTrack()
            const morningTalk = new Talk('Basic Arithmetics', 180)
            const added = track.tryAdd(morningTalk)
            expect(added).toBe(true)
            expect(track.talks).toContain(morningTalk)
        })
        test('for Talk that maxes out the afternoon Session.', () => {
            const track = createTestTrack()
            const afterNoonTalk = new Talk('Basic Arithmetics', 240)
            const added = track.tryAdd(afterNoonTalk)
            expect(added).toBe(true)
            expect(track.talks).toContain(afterNoonTalk)
        })
        test('for two Talks that max out the morning and afternoon Sessions.', () => {
            const track = createTestTrack()
            const morningTalk = new Talk('Basic Arithmetics', 180)
            const afterNoonTalk = new Talk('Basic Arithmetics', 240)
            let added = track.tryAdd(morningTalk)
            expect(added).toBe(true)
            added = track.tryAdd(afterNoonTalk)
            expect(added).toBe(true)
            expect(track.talks).toContain(morningTalk)
            expect(track.talks).toContain(afterNoonTalk)
        })
    })
    describe('returns false and does not add Talk', () => {
        test('for Talk that is too long for both morning and afternoon Sessions.', () => {
            const track = createTestTrack()
            const tooLongTalk = new Talk('The Importance of Reading The Manual', 360)
            let added = track.tryAdd(tooLongTalk)
            expect(added).toBe(false)
            expect(track.talks.length).toBe(0)
        })
        test('for Talk that is too long for morning if afternoon is already maxed out.', () => {
            const track = createTestTrack()
            const afterNoonTalk = new Talk('Taking up all the Time', 240)
            let added = track.tryAdd(afterNoonTalk)
            expect(track.afternoon.timeLeft).toBe(0)
            added = track.tryAdd(afterNoonTalk)
            expect(added).toBe(false)
            expect(track.talks.length).toBe(1)
        })
        test('for the first Talk that would overfill the Track in the morning.', () => {
            const track = createTestTrack()
            const afterNoonTalk = new Talk('Taking up all the Time', 240)
            track.tryAdd(afterNoonTalk)
            const eightyMinuteTalk = new Talk('Basic Arithmetics', 80)
            let added = track.tryAdd(eightyMinuteTalk)
            expect(added).toBe(true)
            added = track.tryAdd(eightyMinuteTalk)
            expect(added).toBe(true)
            added = track.tryAdd(eightyMinuteTalk)
            expect(added).toBe(false)
            expect(track.talks.length).toBe(3)
        })
        test('for the first Talk that would overfill the Track in the afternoon.', () => {
            const track = createTestTrack()
            const morningTalk = new Talk('Taking up all the Time', 180)
            track.tryAdd(morningTalk)
            const eightyMinuteTalk = new Talk('Basic Arithmetics', 80)
            let added = track.tryAdd(eightyMinuteTalk)
            expect(added).toBe(true)
            added = track.tryAdd(eightyMinuteTalk)
            expect(added).toBe(true)
            added = track.tryAdd(eightyMinuteTalk)
            expect(added).toBe(true)
            added = track.tryAdd(eightyMinuteTalk)
            expect(added).toBe(false)
            expect(track.talks.length).toBe(4)
        })
    })
})
