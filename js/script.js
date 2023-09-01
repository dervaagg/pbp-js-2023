let currentPlayer = 'X';
let isGameOver = false;

function makeMove(boxId) {
    const box = document.getElementById(`b${boxId}`);
    if (!box || box.value !== '' || isGameOver) {
        return;
    }

    box.value = currentPlayer;
    box.disabled = true;

    if (cekMenang(currentPlayer)) {
        document.getElementById('print').textContent = `Pemain ${currentPlayer} Menang!`;
        isGameOver = true;
    } else if (cekSeri()) {
        document.getElementById('print').textContent = 'Yah Seri Dong';
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('print').textContent = `Giliran Pemain ${currentPlayer}`;

        if (currentPlayer === 'O' && !isGameOver) {
            botMove();
        }
    }
}

function resetGame() {
    currentPlayer = 'X';
    isGameOver = false;
    document.getElementById('print').textContent = `Giliran Pemain ${currentPlayer}`;
    for (let i = 1; i <= 9; i++) {
        const box = document.getElementById(`b${i}`);
        if (box) {
            box.value = '';
            box.disabled = false;
        }
    }
}

function cekMenang(player) {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const boxA = document.getElementById(`b${a}`);
        const boxB = document.getElementById(`b${b}`);
        const boxC = document.getElementById(`b${c}`);

        if (boxA.value === player && boxB.value === player && boxC.value === player) {
            return true;
        }
    }

    return false;
}

function cekSeri() {
    for (let i = 1; i <= 9; i++) {
        const box = document.getElementById(`b${i}`);
        if (!box || box.value === '') {
            return false;
        }
    }
    return true;
}

function botMove() {
    setTimeout(() => {
        if (!isGameOver) {
            const emptyBoxes = [];
            for (let i = 1; i <= 9; i++) {
                const box = document.getElementById(`b${i}`);
                if (box && box.value === '') {
                    emptyBoxes.push(i);
                }
            }

            if (emptyBoxes.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
                const randomBoxId = emptyBoxes[randomIndex];
                makeMove(randomBoxId);
            }
        }
    }, 1000);
}