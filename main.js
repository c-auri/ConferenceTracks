const { readFileSync } = require('fs');
const { exit } = require('process');

const Parse = require('./js/Parse');
const solve = require('./js/solve');

function main(filename) {
    let talks = parseFile(filename)
    let solution = solve(talks)

    for (const track of solution.tracks) {
        console.log(track.toString())
        console.log()
    }

    if (solution.excess.length > 0) {
        console.log(solution.excess)
    }
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