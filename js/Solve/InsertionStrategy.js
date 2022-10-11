class InsertionStrategy {
    static naiveBreadthFirst(thisTrack, thatTrack) {
        let compare = InsertionStrategy.#compareBy(
            InsertionStrategy.#hasMoreTimeLeft)
        
        return compare(thisTrack, thatTrack)
    }

    static naiveDepthFirst(thisTrack, thatTrack) {
        let compare = InsertionStrategy.#compareBy(
            InsertionStrategy.#hasLessTimeLeft)
        
        return compare(thisTrack, thatTrack)
    }
    
    static prioritizeUnsatisfiedBreadthFirst(thisTrack, thatTrack) {
        let compare = InsertionStrategy.#compareBy(
            InsertionStrategy.#isLessSatisfied, 
            InsertionStrategy.#hasMoreTimeLeft)
        
        return compare(thisTrack, thatTrack)
    }

    static prioritizeUnsatisfiedDepthFirst(thisTrack, thatTrack) {
        let compare = InsertionStrategy.#compareBy(
            InsertionStrategy.#isLessSatisfied, 
            InsertionStrategy.#hasLessTimeLeft)
        
        return compare(thisTrack, thatTrack)
    }

    /**
     * Creates a comparison function for two tracks based on the given priority functions.
     * @param  {...any} priorityFunctions 
     *          Functions that return true if their 1st argument ist prioritized over the 2nd one.
     *          Must be ordered by their precedence.
     * @returns A function that takes two tracks and returns 
     *          a negative value if the first track is prioritized over the second,
     *          A positive value if the second is prioritized over the first,
     *          0 if both tracks have the same priority.
     */
    static #compareBy(...priorityFunctions) {
        return (thisTrack, thatTrack) => {
            for (const isPrioritized of priorityFunctions) {
                if (isPrioritized(thisTrack, thatTrack)) { return -1 } 
                if (isPrioritized(thatTrack, thisTrack)) { return  1 }
            }
            
            return 0
        }
    }

    static #isLessSatisfied(thisTrack, thatTrack) {
        return !thisTrack.isSatisfied && thatTrack.isSatisfied
    }

    static #hasMoreTimeLeft(thisTrack, thatTrack) {
        return thisTrack.timeLeft.isLongerThan(thatTrack.timeLeft)
    }

    static #hasLessTimeLeft(thisTrack, thatTrack) {
        return thisTrack.timeLeft.isShorterThan(thatTrack.timeLeft)
    }
}


module.exports = InsertionStrategy