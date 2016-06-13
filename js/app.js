$(document).ready(startGame);

var board, flag, letter, winner;

function resetBoard() {
    // Clear the game board.
    $('td').html('&nbsp;');

    // Set the flag to determine the next letter to add.
    flag = 1;

    // Clear the winner variable in case of a previous game.
    winner = '';

    // Make a virtual board to store the moves.
    board = [
        [0,1,2],
        [0,1,2],
        [0,1,2]
    ];
}

// Get the row or column number from the id or class.
function getNumber(string) {
    var num = string.match(/\d/);
    return num;
}

// Checks for a tie game - if the array values are all strings
// then no more moves "should" be possible.
function tieGame() {
    var moves = 1;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (isNaN(board[i][j])) {
                moves += 1;
            }
        }
    }
    if (moves > 9) {
        return true;
    }
}

// Iterate over the rows to see if any are filled with the same letter.
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
// Iterate over the columns to see if any are filled with the same letter.
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

// A Player can win or tie on the current move.
// A win occurs is a row or column is filled with a single letter
// or either diagonal is filled with a single letter.
// If all cells are filled without a winner then the game ends in a tie.
function getWinner(letter) {
    // start by checking if the current letter has the center position.
    if (board[1][1] === letter) {
        // If so, check the corners to see if they match it.
        if (board[0][0] === letter && board[2][2] === letter) {
            return letter;
        } else if (board[2][0] === letter && board[0][2] === letter) {
            return letter;
        }
    }
    // If no diagonal match is found, continue searching for rows or
    // columns that are filled with the current letter.
    if (rowMatch(letter) || colMatch(letter)) {
        return letter;
    // If no rows or columns are filled, check for a tie.
    } else if (tieGame()) {
        letter = "Tie";
        return letter;
    }
    // If no winner or tie, keep playing.
    return false;
}

// When there's a winner or a tie, render the result and setup for another
// game.
function gameOver(winner) {
    if (winner === "Tie") {
        $('#winner').html("<span>Tie. No winner.</span>");
    } else {
        $('#winner').html("Player <span>" + winner + "</span> wins!");
    }
    $('#winner').show();
    $('#start').show();
    $('#overlay').show();
}

// Start and run the game.
function startGame() {

    // Start the game.
    $('#start').on('click', function(e){
        e.preventDefault();
        resetBoard();
        $('#winner').hide();
        $('#start').hide();
        $('#overlay').hide();

    })

    // Add the letter when the cell is clicked.
    $('table').on('click', 'td', function(e) {
        e.preventDefault();

        var row = $(this).parent().attr('id');
        row = getNumber(row);
        var col = $(this).attr('class');
        col = getNumber(col);

        if (flag % 2 == 0) {
            $(this).text('O');
            board[row][col] = 'O';
            letter = 'O';
        } else {
            $(this).text('X');
            board[row][col] = 'X';
            letter = 'X';
        }

        // If a winner exists or it's a tie, run the game over function.
        winner = getWinner(letter);
        if (winner) {
            gameOver(winner);
        }

        // Finally, update the flag and keep playing.
        flag +=1;

    });
}
