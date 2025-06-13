
  
    let turn = 'X';
    let gameOver = false;
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');
    const moveSound = document.getElementById('moveSound');
    const winSound = document.getElementById('winSound');

    function createBoard() {
      board.innerHTML = '';
      for (let i = 0; i < 3; i++) {
        const row = board.insertRow();
        for (let j = 0; j < 3; j++) {
          const cell = row.insertCell();
          cell.dataset.row = i;
          cell.dataset.col = j;
          cell.onclick = () => {
            if (!cell.innerText && !gameOver) {
              cell.innerText = turn;
              moveSound.play();
              checkWinner();
              if (!gameOver) {
                turn = (turn === 'X') ? 'O' : 'X';
              }
            }
          };
        }
      }
    }

    function checkWinner() {
      const cells = [...board.rows].map(row => [...row.cells]);
      const lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
      ];

      for (const line of lines) {
        const [a, b, c] = line;
        const valA = cells[a[0]][a[1]].innerText;
        const valB = cells[b[0]][b[1]].innerText;
        const valC = cells[c[0]][c[1]].innerText;

        if (valA && valA === valB && valA === valC) {
          cells[a[0]][a[1]].classList.add('win');
          cells[b[0]][b[1]].classList.add('win');
          cells[c[0]][c[1]].classList.add('win');
          result.innerText = `${valA} Wins!`;
          gameOver = true;
          winSound.play();
          return;
        }
      }

      const allFilled = cells.flat().every(cell => cell.innerText !== '');
      if (allFilled && !gameOver) {
        result.innerText = `It's a Draw!`;
        gameOver = true;
      }
    }

    resetBtn.onclick = () => {
      turn = 'X';
      gameOver = false;
      result.innerText = '';
      createBoard();
    };

    createBoard();
