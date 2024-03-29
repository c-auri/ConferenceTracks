const { readFileSync } = require('fs');
const { exit } = require('process');

const Parser = require('./js/IO/Parser')
const SolverSettings = require('./js/Solve/SolverSettings')
const TrackSettings = require('./js/TrackManagement/TrackSettings')
const GreedyHeuristic = require('./js/Solve/GreedyHeuristic')
const LocalSearch = require('./js/Solve/LocalSearch')


function main(filepath) {
    let greedy = new GreedyHeuristic(SolverSettings.default, TrackSettings.default)
    let search = new LocalSearch(SolverSettings.default, TrackSettings.default)
    
    let talks = parseTalks(filepath)
    let solution = greedy.findInitialSolution(talks)
    solution = search.improve(solution)

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
    let filename = process.argv[2] ?? 'assignment.txt'
    main('./input/' + filename)
}