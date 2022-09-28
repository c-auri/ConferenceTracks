const Parser = require('./Parser')
const { Talk, LightningTalk } = require('./TrackManagement/Talk')
const TrackSettings = require('./TrackManagement/TrackSettings')


const title = 'TestTitle'

describe('Parse.linesToTalks', () => {
    describe('throws Error', () => {
        test('when line does not specify duration.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(() => parser.linesToTalks([ title ])).toThrow(Error)
        })
        test('when time specified is longer than maximum session duration.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(() => parser.linesToTalks([ title + ' 250min' ])).toThrow(Error)
        })
        test('when time specified is shorter than 5 minutes.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(() => parser.linesToTalks([ title + ' 3min' ])).toThrow(Error)
        })
    })
    describe('returns Talks with correct titles and durations', () => {
        test('for multiple lines.', () => {
            const parser = new Parser(TrackSettings.default)
            let lines = [ 
                title + ' 60min',
                'Another' + title + ' 45min',
                'Fast' + title + ' lightning'
             ]

             let expectedTalks = [
                new Talk(title, 60),
                new Talk('Another' + title, 45),
                new LightningTalk('Fast' + title),
             ]

            expect(parser.linesToTalks(lines)).toEqual(expectedTalks)
        })
        test('when first digit of duration is smaller than 5.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(parser.linesToTalks([ title + ' 25min' ])).toEqual([ new Talk(title, 25) ])
        })
        test('when title contains the word lightning.', () => {
            const parser = new Parser(TrackSettings.default)
            const talks = parser.linesToTalks([ title + ' lightning 45min' ])
            expect(talks[0].title).toBe(title + ' lightning')
        })
        test('when title contains a number.', () => {
            const parser = new Parser(TrackSettings.default)
            const numberTitle = title + '3'
            expect(parser.linesToTalks([ numberTitle + ' 45min' ])).toEqual([ new Talk(numberTitle, 45) ])
        })
        test('when time specification omits unit of measurement.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(parser.linesToTalks([ title + ' 45' ])).toEqual([ new Talk(title, 45) ])
        })
        test('when time specification is separated by multiple whitespaces.', () => {
            const parser = new Parser(TrackSettings.default)
            expect(parser.linesToTalks([ title + '   45' ])).toEqual([ new Talk(title, 45) ])
        })
    })
    describe('returns LightningTalk with correct title', () => {
        test('when last token is lightning keyword.', () => {
            const parser = new Parser(TrackSettings.default)
            const lightningTitle = title + ' ' + Parser.lightningIdentifier
            expect(parser.linesToTalks([ lightningTitle ])).toEqual([ new LightningTalk(title) ])
        })
        test('when title contains the word lightning and last token is lightning keyword.', () => {
            const parser = new Parser(TrackSettings.default)
            const talks = parser.linesToTalks([ title + ' lightning lightning' ])
            expect(talks).toEqual([ new LightningTalk(title + ' lightning') ])
        })
    })
    describe('Skips comments', () => {
        test('at the start of the file.', () => {
            const parser = new Parser(TrackSettings.default)
            const lines = [ 
                Parser.commentIdentifier + ' Comment',
                Parser.commentIdentifier + ' Another Comment',
                title + ' 45min',
            ]
    
            expect(parser.linesToTalks(lines)).toEqual([ new Talk(title, 45) ])
        })
        test('in the middle of the file.', () => {
            const parser = new Parser(TrackSettings.default)
            const lines = [ 
                title + ' 45min',
                Parser.commentIdentifier + ' Comment',
                Parser.commentIdentifier + ' Another Comment',
                title + ' 35min',
            ]
    
            expect(parser.linesToTalks(lines)).toEqual([ new Talk(title, 45), new Talk(title, 35) ])
        })
        test('at the end of the file.', () => {
            const parser = new Parser(TrackSettings.default)
            const lines = [ 
                title + ' 45min',
                Parser.commentIdentifier + ' Comment',
                Parser.commentIdentifier + ' Another Comment',
            ]
    
            expect(parser.linesToTalks(lines)).toEqual([ new Talk(title, 45) ])
        })
        test('surrounding a talk.', () => {
            const parser = new Parser(TrackSettings.default)
            const lines = [ 
                Parser.commentIdentifier + ' Comment',
                title + ' 45min',
                Parser.commentIdentifier + ' Another Comment',
            ]
    
            expect(parser.linesToTalks(lines)).toEqual([ new Talk(title, 45) ])
        })
    })
    describe('Skips empty lines', () => {
        test('at the start of the file.', () => {
            const parser = new Parser(TrackSettings.default)
            const lines = [
                '',
                '  ',
                title + ' 45min',
            ]
    
            expect(parser.linesToTalks(lines)).toEqual([ new Talk(title, 45) ])
        })
        test('in the middle of the file.', () => {
            const parser = new Parser(TrackSettings.default)
            const lines = [ 
                title + ' 45min',
                '',
                '  ',
                title + ' 35min',
            ]
    
            expect(parser.linesToTalks(lines)).toEqual([ new Talk(title, 45), new Talk(title, 35) ])
        })
        test('at the end of the file.', () => {
            const parser = new Parser(TrackSettings.default)
            const lines = [ 
                title + ' 45min',
                '',
                '  ',
            ]
    
            expect(parser.linesToTalks(lines)).toEqual([ new Talk(title, 45) ])
        })
        test('surrounding a talk.', () => {
            const parser = new Parser(TrackSettings.default)
            const lines = [ 
                '',
                title + ' 45min',
                '  ',
            ]
    
            expect(parser.linesToTalks(lines)).toEqual([ new Talk(title, 45) ])
        })
    })
})