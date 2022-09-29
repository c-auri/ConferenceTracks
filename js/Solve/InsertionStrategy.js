class InsertionStrategy {
    static prioritizeUnsatisfiedBreadthFirst(thisTrack, thatTrack) {
        let compare = InsertionStrategy.#compareBy(InsertionStrategy.#isLessSatisfiedOrHasMoreTimeLeft)
        return compare(thisTrack, thatTrack)
    } 

    static prioritizeUnsatisfiedDepthFirst(thisTrack, thatTrack) {
        let compare = InsertionStrategy.#compareBy(InsertionStrategy.#isLessSatisfiedOrHasLessTimeLeft)
        return compare(thisTrack, thatTrack)
    }

    static #compareBy(priorityFunction) {
        return (thisTrack, thatTrack) => {
            if (priorityFunction(thisTrack, thatTrack)) {
                return -1
            } else if (priorityFunction(thatTrack, thisTrack)) {
                return 1
            } else {
                return 0
            }
        }
    }

    static #isLessSatisfiedOrHasMoreTimeLeft(thisTrack, thatTrack) {
        if (thatTrack.isSatisfied && !thisTrack.isSatisfied) {
            return true
        } else {
            return thisTrack.timeLeft.isLongerThan(thatTrack.timeLeft)
        }
    }

    static #isLessSatisfiedOrHasLessTimeLeft(thisTrack, thatTrack) {
        if (thatTrack.isSatisfied && !thisTrack.isSatisfied) {
            return true
        } else {
            return thisTrack.timeLeft.isShorterThan(thatTrack.timeLeft)
        }
    }
}


module.exports = InsertionStrategy