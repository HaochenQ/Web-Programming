/**
 * Controller of 2048
 */
import Game from "./engine/game.js";

/**
 * build a 2048 panel
 * @param {number} size 
 */
$(document).ready(() => {
    start();
    $('.main').on('click', '#newGame', function() {
        start();
    })
});


function start() {
    let game = new Game(4);
    generateView(game);
    //press key
    $(document).keydown(e => {
        e.preventDefault();
        switch (e.keyCode) {
            case 37:
                game.move('left');
                generateView(game);
                break;
            case 38:
                game.move('up');
                generateView(game);
                break;
            case 39:
                game.move('right');
                generateView(game);
                break;
            case 40:
                game.move('down');
                generateView(game);
                break;
        }
    });
    game.onWin(gameState => {
        alert('Bravo！You won ! ');
        game = new Game(4);
    });

    game.onLose(gameState => {
        alert('You lost! :(');
        game = new Game(4);
    });

}