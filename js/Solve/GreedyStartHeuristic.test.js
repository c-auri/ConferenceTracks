const { Talk } = require('../TrackManagement/Talk')
const TrackSettings = require('../TrackManagement/TrackSettings')
const GreedyStartHeuristic = require('./GreedyStartHeuristic')


function createHeuristic() {
    return new GreedyStartHeuristic(TrackSettings.default)
}

describe('GreedyStartHeuristic.findInitialSolution()', () => {
    describe('returns correct number of Tracks', () => {
        test('for single Talk.', () => {
            let greedy = createHeuristic()
            let talks = [ new Talk('Quick Talk', 10) ]
            let solution = greedy.findInitialSolution(talks)
            expect(solution.tracks.length).toBe(1)
        })
        test('for two Talks that fit into one Track.', () => {
            let greedy = createHeuristic()
            let talks = [ new Talk('Morning', 180), new Talk('Afternoon', 240) ]
            let solution = greedy.findInitialSolution(talks)
            expect(solution.tracks.length).toBe(1)
        })
        test('for two Talks that only fit in the afternoon.', () => {
            let greedy = createHeuristic()
            let talks = [ new Talk('Afternoon', 240), new Talk('Afternoon', 240) ]
            let solution = greedy.findInitialSolution(talks)
            expect(solution.tracks.length).toBe(2)
        })
        test('for four Talks that fit two tracks perfectly.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('Morning', 180),
                new Talk('Morning', 180),
                new Talk('Afternoon', 240),
                new Talk('Afternoon', 240),
            ]

            let solution = greedy.findInitialSolution(talks)
            expect(solution.tracks.length).toBe(2)
        })
        test('for six Talks that fit two tracks perfectly.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('Morning', 180),
                new Talk('Morning', 180),
                new Talk('Afternoon', 120),
                new Talk('Afternoon', 120),
                new Talk('Afternoon', 120),
                new Talk('Afternoon', 120),
            ]

            let solution = greedy.findInitialSolution(talks)
            expect(solution.tracks.length).toBe(2)
        })
        test('for three Talks that overflow a single Track.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('Fits Morning', 180),
                new Talk('Fits Afternoon', 180),
                new Talk('Does not Fit', 180),
            ]
            
            let solution = greedy.findInitialSolution(talks)
            expect(solution.tracks.length).toBe(2)
        })
        test('for Talks whose total duration fits into 2 tracks, but that actually need 3.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('A Two Hour Talk', 120),
                new Talk('Two and a Half Hour Talk', 150),
                new Talk('Two and a Half Hour Talk', 150),
                new Talk('A Two Hour Talk', 120),
                new Talk('Two and a Half Hour Talk', 150),
                new Talk('Two and a Half Hour Talk', 150),
            ]
            
            let solution = greedy.findInitialSolution(talks)
            expect(solution.tracks.length).toBe(3)
        })
    })
    describe('returns one more Track than needed', () => {
        test('for Talks that fits into 2 tracks, but need a different prioritization.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('A Talk best fit for Mornings', 180),
                new Talk('A Talk best fit for Mornings', 180),
                new Talk('These two should', 120),
                new Talk('Go in the same Afternoon', 120),
                new Talk('Because otherwise', 90),
                new Talk('The shorter ones', 90),
                new Talk('Will not Fit', 60),
            ]
            
            let solution = greedy.findInitialSolution(talks)
            expect(solution.tracks.length).toBe(3)
        })
    })
    describe('returns solution that contains all provided talks', () => {
        test('for single Talk.', () => {
            let greedy = createHeuristic()
            let talks = [ new Talk('Quick Talk', 10) ]
            let solution = greedy.findInitialSolution(talks)
            expect(solution.talks).toEqual(expect.arrayContaining(talks))
            expect(talks).toEqual(expect.arrayContaining(solution.talks))
        })
        test('for two Talks that fit into one Track.', () => {
            let greedy = createHeuristic()
            let talks = [ new Talk('Morning', 180), new Talk('Afternoon', 240) ]
            let solution = greedy.findInitialSolution(talks)
            expect(solution.talks).toEqual(expect.arrayContaining(talks))
            expect(talks).toEqual(expect.arrayContaining(solution.talks))
        })
        test('for two Talks that only fit in the afternoon.', () => {
            let greedy = createHeuristic()
            let talks = [ new Talk('Afternoon', 240), new Talk('Afternoon', 240) ]
            let solution = greedy.findInitialSolution(talks)
            expect(solution.talks).toEqual(expect.arrayContaining(talks))
            expect(talks).toEqual(expect.arrayContaining(solution.talks))
        })
        test('for four Talks that fit two tracks perfectly.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('Morning', 180),
                new Talk('Morning', 180),
                new Talk('Afternoon', 240),
                new Talk('Afternoon', 240),
            ]

            let solution = greedy.findInitialSolution(talks)
            expect(solution.talks).toEqual(expect.arrayContaining(talks))
            expect(talks).toEqual(expect.arrayContaining(solution.talks))
        })
        test('for six Talks that fit two tracks perfectly.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('Morning', 180),
                new Talk('Morning', 180),
                new Talk('Afternoon', 120),
                new Talk('Afternoon', 120),
                new Talk('Afternoon', 120),
                new Talk('Afternoon', 120),
            ]

            let solution = greedy.findInitialSolution(talks)
            expect(solution.talks).toEqual(expect.arrayContaining(talks))
            expect(talks).toEqual(expect.arrayContaining(solution.talks))
        })
        test('for three Talks that overflow a single Track.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('Fits Morning', 180),
                new Talk('Fits Afternoon', 180),
                new Talk('Does not Fit', 180),
            ]
            
            let solution = greedy.findInitialSolution(talks)
            expect(solution.talks).toEqual(expect.arrayContaining(talks))
            expect(talks).toEqual(expect.arrayContaining(solution.talks))
        })
        test('for Talks whose total duration fits into 2 tracks, but that actually need 3.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('A Two Hour Talk', 120),
                new Talk('Two and a Half Hour Talk', 150),
                new Talk('Two and a Half Hour Talk', 150),
                new Talk('A Two Hour Talk', 120),
                new Talk('Two and a Half Hour Talk', 150),
                new Talk('Two and a Half Hour Talk', 150),
            ]
            
            let solution = greedy.findInitialSolution(talks)
            expect(solution.talks).toEqual(expect.arrayContaining(talks))
            expect(talks).toEqual(expect.arrayContaining(solution.talks))
        })
        test('for Talks that fits into 2 tracks, but need a different prioritization.', () => {
            let greedy = createHeuristic()
            let talks = [
                new Talk('A Talk best fit for Mornings', 180),
                new Talk('A Talk best fit for Mornings', 180),
                new Talk('These two should', 120),
                new Talk('Go in the same Afternoon', 120),
                new Talk('Because otherwise', 90),
                new Talk('The shorter ones', 90),
                new Talk('Will not Fit', 60),
            ]
            
            let solution = greedy.findInitialSolution(talks)
            expect(solution.talks).toEqual(expect.arrayContaining(talks))
            expect(talks).toEqual(expect.arrayContaining(solution.talks))
        })
    })
})