const { readFileSync } = require('fs');
const { exit } = require('process');

const Parse = require('./js/Parse');
const TrackSettings = require('./js/TrackManagement/TrackSettings')
const GreedyStarter = require('./js/Solve/GreedyStarter');
const TabuSearch = require('./js/Solve/TabuSearch')

function main(filename) {
    let talks = parseFile(filename)
    let starter = new GreedyStarter(TrackSettings.default)
    let tabu = new TabuSearch(TrackSettings.default)

    let solution = starter.findInitialSolution(talks)
    solution = tabu.optimize(solution)
    solution.manageExcess()

    console.log(solution.toString())
}

function parseFile(filename) {
    let file

    try {
        file = readFileSync(filename, 'utf-8');
    } catch (e) {
        console.log('Bad filename: ' + filename)
        exit()
    }

    return file.split(/\r?\n/).map(Parse.lineToTalk)
}

if (require.main === module) {
    let filename = process.argv[2] ? './input/' + process.argv[2] : './input/assignment.txt'
    main(filename);
}