function evaluate(board) {
    let aiScore = 0;
    let humanScore = 0;

    for (const pattern of winningCombos) {
        let aiCount = 0;
        let humanCount = 0;
        for (const index of pattern) {
            if (board[index] === aiPlayer) {
                aiCount++;
            } else if (board[index] === humanPlayer) {
                humanCount++;
            }
        }
        // Update scores based on the counts
        if (aiCount === Math.sqrt(selectedDifficulty)) {
            aiScore += 1000; // AI wins
        } else if (humanCount === 6) {
            humanScore += 1000; // Human wins
        } else {
            aiScore += aiCount * aiCount;
            humanScore += humanCount * humanCount;
        }
    }
    return aiScore - humanScore;
}
