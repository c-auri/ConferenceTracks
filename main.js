const { readFileSync } = require('fs');
const { exit } = require('process');

const Parser = require('./js/Parser');
const TrackSettings = require('./js/TrackManagement/TrackSettings')
const GreedyStartHeuristic = require('./js/Solve/GreedyStartHeuristic');
const LocalSearch = require('./js/Solve/LocalSearch')


function main(filename) {
    let starter = new GreedyStartHeuristic(TrackSettings.default)
    let search = new LocalSearch(TrackSettings.default)
    
    let talks = parseTalks(filename)
    let solution = starter.findInitialSolution(talks)
    solution = search.optimize(solution)
    solution.manageExcess()

    console.log(solution.toString())
}

function parseTalks(filename) {
    let parser = new Parser(TrackSettings.default)

    try {
        let lines = readFileSync(filename, 'utf-8').split(/\r?\n/)
        return parser.linesToTalks(lines)
    } catch (e) {
        console.log(e.message)
        exit()
    }
}

if (require.main === module) {
    let filename = process.argv[2] ? './input/' + process.argv[2] : './input/assignment.txt'
    main(filename);
}