export const generateRandomBoard = (boardSize) => {
  const dice = [["RIFOBX", "IFEHEY", "DENOWS", "UTOKND"],
    ["HMSRAO", "LUPETS", "ACITOA", "YLGKUE"],
    ["QBMJOA", "EHISPN", "VETIGN", "BALIYT"],
    ["EZAVND", "RALESC", "UWILRG", "PACEMD"]];

    let randomBoard = [];
    for (let i = 0; i < boardSize; i++) {
        randomBoard.push([]);
    }

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            randomBoard[i][j] = dice[i][j].charAt(
                Math.floor(Math.random() * dice[i][j].length)
            ).toLowerCase();

        }
    }

    return randomBoard;
};

// this function isn't working correctly (90% correct)
export const generatePossibleWords = (board, words) => {
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    let res = [];

    const buildTrie = () => {
        const root = {};
        for (const w of words) {
            let node = root;
            for (const c of w) {
                if (node[c] == null) node[c] = {};
                node = node[c];
            }
            node.word = w;
        }
        return root;
    };

    const search = (node, x, y) => {
        if (node.word != null) {
            res.push(node.word);
            node.word = null; // make sure only print one time for each word
        }

        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return;
        if (node[board[x][y]] == null) return;

        const c = board[x][y];
        board[x][y] = '#'; // Mark visited
        for (const [dx, dy] of dirs) {
            const i = x + dx;
            const j = y + dy;
            search(node[c], i, j);
        }
        board[x][y] = c; // Reset
    };

    const root = buildTrie();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            search(root, i, j);
        }
    }

    let finalResult = []

    for (let i = 0; i < res.length; i++) {
        if (res[i].length > 2) {
            finalResult.push(res[i])
        }
    }
    return finalResult;
};

// Turn possible words into possible score
export const convertWordsToMap = (possibleWords) => {
    let resultMap = new Map();
    for (let i = 0; i < possibleWords.length; i++) {
        if (possibleWords[i].length <= 4) {
            resultMap.set(possibleWords[i], 1);
        } else if (possibleWords[i].length == 5) {
            resultMap.set(possibleWords[i], 2);
        } else if (possibleWords[i].length == 6) {
            resultMap.set(possibleWords[i], 3);
        } else if (possibleWords[i].length == 7) {
            resultMap.set(possibleWords[i], 5);
        } else if (possibleWords[i].length >= 8) {
            resultMap.set(possibleWords[i], 11);
        }
    }
    return resultMap;
};