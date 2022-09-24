const util = require('util')

const { Talk, LightningTalk } = require('./js/Talk')
const solve = require('./js/solve')

function main() {
    const talks = [
        new Talk('Writing Fast Tests Against Enterprise Rails', 60),
        new Talk('Overdoing it in Python', 45),
        new Talk('Lua for the Masses', 30),
        new Talk('Ruby Errors from Mismatched Gem Versions', 45),
        new Talk('Common Ruby Errors', 45),
        new LightningTalk('Rails for Python Developers'),
        new Talk('Communicating Over Distance', 60),
        new Talk('Accounting-Driven Development', 45),
        new Talk('Woah', 30),
        new Talk('Sit Down and Write', 30),
        new Talk('Pair Programming vs Noise', 45),
        new Talk('Rails Magic', 60),
        new Talk('Ruby on Rails: Why We Should Move On', 60),
        new Talk('Clojure Ate Scala (on my project)', 45),
        new Talk('Programming in the Boondocks of Seattle', 30),
        new Talk('Ruby vs. Clojure for Back-End Development', 30),
        new Talk('Ruby on Rails Legacy App Maintenance', 60),
        new Talk('A World Without HackerNews', 30),
        new Talk('User Interface CSS in Rails Apps', 30),
    ]

    let solution = solve(talks)

    console.log(util.inspect(solution.tracks, {showHidden: false, depth: null, colors: true}))

    if (solution.excess.length > 0) {
        console.log(solution.excess)
    }
}

if (require.main === module) {
    main();
}