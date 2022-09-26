const { readFileSync } = require('fs');
const { exit } = require('process');

const Parse = require('./js/Parse');
const TrackSettings = require('./js/TrackManagement/TrackSettings')
const GreedyStartHeuristic = require('./js/Solve/GreedyStartHeuristic');
const LocalSearch = require('./js/Solve/LocalSearch')


function main(filename) {
    let file = readFile(filename)
    let talks = parseFile(file)
    let starter = new GreedyStartHeuristic(TrackSettings.default)
    let search = new LocalSearch(TrackSettings.default)

    let solution = starter.findInitialSolution(talks)
    solution = search.optimize(solution)
    solution.manageExcess()

    console.log(solution.toString())
}

function readFile(filename) {
    try {
        return readFileSync(filename, 'utf-8');
    } catch (e) {
        console.log('Bad filename: ' + filename)
        exit()
    }
}

function parseFile(file) {
    let lines = skipComments(file.split(/\r?\n/))

    try {
        return lines.map(Parse.lineToTalk)
    } catch (e) {
        console.log('Illegal input: ' + e.message)
        exit()
    }
}

function skipComments(lines) {
    while (lines[0].startsWith('#')) {
        lines.shift()
    }

    return lines
}

if (require.main === module) {
    let filename = process.argv[2] ? './input/' + process.argv[2] : './input/assignment.txt'
    main(filename);
}