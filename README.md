# ConferenceTrackManagement
An application that for a job application. It manages conference talks and uses parallel tracks with a morning and an afternoon session and tries to fit all the proposed talks into the minimum amount of tracks.

## Running the Application
The App is written using `Node.js v18.9.0` and `npm 8.19.1`. The tests are written with the [Jest Testing Framework](https://jestjs.io/).

1. Load Node.js dependencies:
    ```
    npm install
    ```
2. Run the unit tests [optional]:
    ```
    npm test
    ```
3. Run the console app:
    ```
    node main [inputFilename]
    ```

The given input filename must refer to a text file in the `input` directory. If no file is specified, `assignment.txt` will be used, which is the example problem given in the assignment.

## Input rules
- Input files must define the proposed talks for a conference on separate lines.
- The file may contain any number of comment lines (starting with '#') or empty lines.
- A talk is defined by a single line containing the full title, followed by the time specification.
- The time specification can either be 'lightning' (fixed to 5 minutes) or given in minutes (at least 5).
- Titles may contain numbers or the word 'lightning'.
- The time specification must be separated from the title by whitespace.

## Algorithm Description
### Greedy Phase
1. Sort the talks by their duration in descending order.
2. Guess the optimal number of tracks by dividing the total duration of all talks by the maximum duration of a track (7 hours), rounding up. Initialize multiple solutions with that number of empty tracks.
3. For each solution: Iteratively insert all the talks into the tracks of that solution, creating new tracks if a talk does not fit into the existing ones. Use a different insertion strategy (i.e. which track to insert into when presented with a choice) for each solution.
4. Return the solution that has the fewest tracks.
### Improvement Phase
5. [NOT IMPLEMENTED] Try to improve the initial solution via metaheuristics, e.g. Tabu Search.

Even without the improvement phase the algorithm solves many problems just fine, but there are some cases where it produces more tracks than necessary. A metaheuristic might improve upon this, but I have not implemented it yet.
