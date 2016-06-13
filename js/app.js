$(document).ready(startGame);

function startGame() {
    // Clear the game board.
    $('td').html('&nbsp;');

    // Set the flag to determine the next letter to add.
    var flag = 1;

    // Make a virtual board to store the moves.
    var board = [
        [0,1,2],
        [0,1,2],
        [0,1,2]
    ];

    var letter;

    // Add the letter when the cell is clicked.
    $('table').on('click', 'td', function(e) {
        e.preventDefault();

        var row = $(this).parent().attr('id');
        row = getNumber(row);
        console.log(row);
        var col = $(this).attr('class');
        col = getNumber(col);
        console.log(col);

        if (flag % 2 == 0) {
            $(this).text('O');
            board[row][col] = 'O';
            letter = 'O';
        } else {
            $(this).text('X');
            board[row][col] = 'X';
            letter = 'X';
        }

        function getNumber(string) {
            var num = string.match(/\d/);
            return num;
        }

        getWinner(letter);
        console.log(board);

        function getWinner(letter) {
            if (board[1][1] === letter) {
                if (board[0][0] === letter && board[2][2] === letter) {
                    console.log("Diagonal winner.");
                    return true;
                } else if (board[[2][0]] === letter && board[0][2] === letter) {
                    console.log("Diagonal winner.");
                    return true;
                }
            } else if (rowMatch(letter) || colMatch(letter)) {
                console.log("Player " + letter + " wins!");
                return true;
            }
            return false;
        }

        function rowMatch(letter) {
            for (var i = 0; i < 3; i++) {
                var rowCount = 0;
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] === letter) {
                        rowCount += 1;
                    } else {
                        break;
                    }
                }
                if (rowCount === 3) {
                    return true;
                }
            }
        }

        function colMatch(letter) {
            for (var i = 0; i < 3; i++) {
                var colCount = 0;
                for (var j = 0; j < 3; j++) {
                    if (board[j][i] === letter) {
                        colCount += 1;
                    } else {
                        break;
                    }
                }
                if (colCount === 3) {
                    return true;
                }
            }
        }

        flag +=1;

    });
}
