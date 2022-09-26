const Parse = require('./Parse')
const { Talk, LightningTalk } = require('./TrackManagement/Talk')
const title = 'TestTitle'

describe('Parse.lineToTalk', () => {
    describe('throws Error', () => {
        test('when line does not specify duration.', () => {
            expect(() => Parse.lineToTalk(title)).toThrow(Error)
        })
    })
    describe('returns Talk with correct title and duration', () => {
        test('for well behaved input.', () => {
            expect(Parse.lineToTalk(title + ' 60min')).toEqual(new Talk(title, 60))
        })
        test('when first digit of duration is smaller than 5.', () => {
            expect(Parse.lineToTalk(title + ' 25min')).toEqual(new Talk(title, 25))
        })
        test('when title contains the word lightning.', () => {
            const talk = Parse.lineToTalk(title + ' lightning 45min')
            expect(talk.title).toBe(title + ' lightning')
        })
        test('when title contains a number.', () => {
            const numberTitle = title + '3'
            expect(Parse.lineToTalk(numberTitle + ' 45min')).toEqual(new Talk(numberTitle, 45))
        })
        test('when time specification omits unit of measurement.', () => {
            expect(Parse.lineToTalk(title + ' 45')).toEqual(new Talk(title, 45))
        })
        test('when time specification is separated by multiple whitespaces.', () => {
            expect(Parse.lineToTalk(title + '   45')).toEqual(new Talk(title, 45))
        })
    })
    describe('returns LightningTalk with correct title', () => {
        test('when last token is lightning keyword.', () => {
            const lightningTitle = title + ' ' + Parse.lightningIdentifier
            expect(Parse.lineToTalk(lightningTitle)).toEqual(new LightningTalk(title))
        })
        test('when title contains the word lightning and last token is lightning keyword.', () => {
            const talk = Parse.lineToTalk(title + ' lightning lightning')
            expect(talk).toEqual(new LightningTalk(title + ' lightning'))
        })
    })
})