/**
 * This is a function take game as input and generate a panel for tiles
 * @param {Game} geme 
 */
const generateView = function(game) {
    let boardSize = game.boardSize;
    let board = game.board;
    let score = game.gameState.score;
    let $panel = $('#panel');
    $panel.empty();
    for (let i = 0; i < boardSize; i++) {
        let tile
        if (board[i] != 0) {
            tile = $(`<div id="${i}" class="tile${board[i]}" style="float: left; border: 4px blue;">${board[i]}</div>`);
        } else {
            tile = $(`<div id="${i}" class="tile${board[i]}" style="float: left; border: 4px blue;"></div>`);
        }
        $panel.append(tile)
    }
    //alert(score);
    $(".score").text(`SCORE: ${score}`);
}