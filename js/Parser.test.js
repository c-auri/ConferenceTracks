const Parser = require('./Parser')
const { Talk, LightningTalk } = require('./TrackManagement/Talk')
const TrackSettings = require('./TrackManagement/TrackSettings')


const title = 'TestTitle'

describe('Parse.lineToTalk', () => {
    describe('throws Error', () => {
        test('when line does not specify duration.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(() => parser.lineToTalk(title)).toThrow(Error)
        })
        test('when time specified is longer than maximum session duration.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(() => parser.lineToTalk(title + ' 250min')).toThrow(Error)
        })
    })
    describe('returns Talk with correct title and duration', () => {
        test('for well behaved input.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(parser.lineToTalk(title + ' 60min')).toEqual(new Talk(title, 60))
        })
        test('when first digit of duration is smaller than 5.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(parser.lineToTalk(title + ' 25min')).toEqual(new Talk(title, 25))
        })
        test('when title contains the word lightning.', () => {
            const parser = new Parser(TrackSettings.default)
            const talk = parser.lineToTalk(title + ' lightning 45min')
            expect(talk.title).toBe(title + ' lightning')
        })
        test('when title contains a number.', () => {
            const parser = new Parser(TrackSettings.default)
            const numberTitle = title + '3'
            expect(parser.lineToTalk(numberTitle + ' 45min')).toEqual(new Talk(numberTitle, 45))
        })
        test('when time specification omits unit of measurement.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(parser.lineToTalk(title + ' 45')).toEqual(new Talk(title, 45))
        })
        test('when time specification is separated by multiple whitespaces.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(parser.lineToTalk(title + '   45')).toEqual(new Talk(title, 45))
        })
    })
    describe('returns LightningTalk with correct title', () => {
        test('when last token is lightning keyword.', () => {
            const parser = new Parser(TrackSettings.default)
            const lightningTitle = title + ' ' + Parser.lightningIdentifier
            expect(parser.lineToTalk(lightningTitle)).toEqual(new LightningTalk(title))
        })
        test('when title contains the word lightning and last token is lightning keyword.', () => {
            const parser = new Parser(TrackSettings.default)
            const talk = parser.lineToTalk(title + ' lightning lightning')
            expect(talk).toEqual(new LightningTalk(title + ' lightning'))
        })
    })
})