class InsertionStrategy {
    static firstUnsatisfiedThenOrderByTimeLeft(thisTrack, thatTrack) {
        if (InsertionStrategy.#isLessSatisfiedOrHasMoreTimeLeft(thisTrack, thatTrack)) {
            return -1
        } else if (InsertionStrategy.#isLessSatisfiedOrHasMoreTimeLeft(thatTrack, thisTrack)) {
            return 1
        } else {
            return 0
        }
    }

    static #isLessSatisfiedOrHasMoreTimeLeft(thisTrack, thatTrack) {
        if (thatTrack.isSatisfied && !thisTrack.isSatisfied) {
            return true
        } else {
            return thisTrack.timeLeft.isLongerThan(thatTrack.timeLeft)
        }
    }
}


module.exports = InsertionStrategy