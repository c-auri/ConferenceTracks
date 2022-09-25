const { readFileSync } = require('fs');
const { exit } = require('process');

const Parse = require('./js/Parse');
const solve = require('./js/Solve/solve');

function main(filename) {
    let talks = parseFile(filename)
    let solution = solve(talks)
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