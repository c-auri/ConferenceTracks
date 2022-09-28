# ConferenceTrackManagement
An application that manages conference talks. Uses parallel conference tracks with a morning and an afternoon session and tries to fit all the proposed talks into the minimum amount of tracks.

I may keep working on this project for a little bit. I created a [tag](https://github.com/c-auri/ConferenceTrackManagement/tree/submitted) at the commit that I initially submitted.

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

Input files must be placed in the `input` directory. There are predefined problems for testing, but you can also write your own. If no file is specified `assignment.txt` will be used, which is the example problem given in the assignment.

### Input rules
- Input files must be .txt files that define individual talks on separate lines.
- The file may contain any number of comment lines (starting with '#') or empty lines. They will simply be skipped.
- A talk is defined by a single line containing the full title, followed by the time specification.
- The time specification can either be 'lightning' (fixed to 5 minutes) or given in minutes (at least 5).
- Titles may contain numbers or the word 'lightning'.
- The time specification must be seperated from the title by whitespace.

## Algorithm Description
### Initialization
1. Divide the total duration of all talks by the maximum duration of a track (7 hours), rounding up. This is the minimum number of tracks required.
2. Initialize the minimum number of tracks.
### Greedy Phase
3. Sort the talks by their duration in descending order.
4. Add the talks into the tracks one by one, prioritizing tracks that have the most time left. If a talk does not fit into any track, create a new one.
### Optimization [NOT IMPLEMENTED]
6. Try to reduce the number of tracks via local search methods, e.g. Tabu Search.

## Implementation Compromises
- The optimization step is not implemented yet. The algorithm solves most problems just fine as is, but there are some edge cases where it produces more tracks than are strictly necessary. A local search optimization might improve upon this, but comes at a high implementation and running time cost. So I skipped it for now.
- Variables holding time are integers measured in minutes if not specified otherwise. This is not very clean, a dedicated Time class would be better. But since I'm not familiar with JavaScripts best practices for Date arithmetics this seemed like an easy compromise that wouldn't make too much trouble.