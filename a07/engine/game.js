export default class Game {
    //size: the number of tiles in one row
    constructor(size) {
            this.size = size;
            this.boardSize = size * size;
            this.board = [];

            this.gameState = {
                    board: this.creatArr(this.board),
                    score: 0,
                    won: false,
                    over: false
                }
                //
            this.onMoveObserver = [];
            this.onWinObserver = [];
            this.onLoseObserver = [];
        }
        /**
         * @return a accurate gameState object
         */
    getGameState() {
            return this.gameState;
        }
        /**
         * resets the game back to a random starting position
         */
    setupNewGame() {
            this.gameState = {
                board: this.creatArr(this.board),
                score: 0,
                won: false,
                over: false
            }
        }
        /**
         * create array and generate two new tiles
         */
    creatArr(board) {
            //initialize all grids with 0
            for (let i = 0; i < this.boardSize; i++) {
                board[i] = 0;
            }
            //generate two tiles
            this.newTile(board);
            this.newTile(board);
            return board;
        }
        /**
         * given a gameState object, it loads that position, score, etc...
         */
    loadGame(gameState) {
            this.gameState.score = gameState.score;
            this.gameState.won = gameState.won;
            this.gameState.over = gameState.over;
            this.gameState.board = gameState.board;
        }
        /**
         * Create a new tile, 90%-> 2; 10%-> 4.
         */
    newTile(board) {
            let num = this.getRandom(this.boardSize);
            let r = Math.random();
            do {
                num = this.getRandom(this.boardSize);
            } while (board[num] != 0);
            if (r < 0.9) {
                board[num] = 2;
            } else {
                board[num] = 4;
            }
        }
        /**
         * merge tiles in a and b, destination:b
         */
    mergeTiles(a, b) {
            this.gameState.board[b] = this.gameState.board[b] * 2;
            this.gameState.board[a] = 0;
        }
        /**
         * move tile from a to b
         */
    moveTiles(a, b) {
            this.gameState.board[b] = this.gameState.board[a];
            this.gameState.board[a] = 0;
        }
        /**
         * check if won
         * @returns {true/false}
         */
    checkWon() {
            let result = false;
            for (let i = 0; i < this.boardSize; i++) {
                if (this.gameState.board[i] == 2048) {
                    result = true;
                }
            }
            return result;
        }
        /**
         * check if over
         * @returns {ture/false}
         */
    checkOver() {
            let result = true;
            //if there are tiles with value '0', not over
            for (let i = 0; i < this.boardSize; i++) {
                if (this.gameState.board[i] == 0) {
                    result = false;
                }
                //if consequent tiles in a row have the same value, not over
                if (result) {
                    for (let i = 0; i <= this.boardSize - this.size; i = i + this.size) {
                        for (let j = i + 1; j < i + this.size; j++) {
                            if (this.gameState.board[j] == this.gameState.board[j - 1]) {
                                result = false;
                            }

                        }

                    }
                    //if consequent tiles in a column have the same value, not over
                    for (let i = 0; i < this.size; i++) {
                        for (let j = i + this.size; j <= i + (this.boardSize - this.size); j = j + this.size) {
                            if (this.gameState.board[j] == this.gameState.board[j - this.size]) {
                                result = false;
                            }
                        }
                    }
                }
            }
            return result;
        }
        /**
         * given up, down, left, or right as string input, 
         *it makes the appropriate shifts and adds a random tile. 
         * @param {direction} string of up, down, left, or right
         */
    move(direction) {
            let legalMove = false;
            switch (direction) {
                case 'right':
                    for (let x = 0; x < this.size; x++) {
                        for (let i = this.boardSize - 1; i >= this.size - 1; i = i - this.size) {
                            for (let j = i; j > i - this.size + 1; j--) {
                                if ((this.gameState.board)[j] == 0) {
                                    if ((this.gameState.board)[j - 1] != 0) {
                                        legalMove = true;
                                    }
                                    this.moveTiles(j - 1, j);
                                }
                            }
                        }
                    }
                    for (let j = this.boardSize - 1; j >= this.size - 1; j = j - this.size) {
                        let i = j;
                        while (i > j - this.size + 1) {
                            if ((this.gameState.board)[i] == (this.gameState.board)[i - 1]) {
                                if ((this.gameState.board)[i] != 0) {
                                    legalMove = true;
                                }
                                this.mergeTiles(i - 1, i);
                                this.gameState.score = (this.gameState.score) + (this.gameState.board)[i];
                                i = i - 2;
                            } else {
                                i = i - 1;
                            }
                        }
                    }
                    for (let x = 0; x < this.size; x++) {
                        for (let i = this.boardSize - 1; i >= this.size - 1; i = i - this.size) {
                            for (let j = i; j > i - this.size + 1; j--) {
                                if ((this.gameState.board)[j] == 0) {
                                    if ((this.gameState.board)[j - 1] != 0) {
                                        legalMove = true;
                                    }
                                    this.moveTiles(j - 1, j);
                                }
                            }
                        }
                    }
                    break;
                case 'left':
                    for (let x = 0; x < this.size; x++) {
                        for (let i = 0; i <= this.size * (this.size - 1); i = i + this.size) {
                            for (let j = i; j < i + this.size - 1; j++) {
                                if ((this.gameState.board)[j] == 0) {
                                    if ((this.gameState.board)[j + 1] != 0) {
                                        legalMove = true;
                                    }
                                    this.moveTiles(j + 1, j);
                                }
                            }
                        }
                    }
                    for (let j = 0; j <= this.boardSize - this.size; j = j + this.size) {
                        let i = j;
                        while (i < j + this.size - 1) {
                            if ((this.gameState.board)[i] == (this.gameState.board)[i + 1]) {
                                if ((this.gameState.board)[i] != 0) {
                                    legalMove = true;
                                }
                                this.mergeTiles(i + 1, i);
                                this.gameState.score = (this.gameState.score) + (this.gameState.board)[i];
                                i = i + 2;
                            } else {
                                i = i + 1;
                            }
                        }
                    }
                    for (let x = 0; x < this.size; x++) {
                        for (let i = 0; i <= this.size * (this.size - 1); i = i + this.size) {
                            for (let j = i; j < i + this.size - 1; j++) {
                                if ((this.gameState.board)[j] == 0) {
                                    if ((this.gameState.board)[j + 1] != 0) {
                                        legalMove = true;
                                    }
                                    this.moveTiles(j + 1, j);
                                }
                            }
                        }
                    }
                    break;
                case 'down':
                    for (let x = 0; x < this.size; x++) {
                        for (let i = this.boardSize - 1; i >= this.size * (this.size - 1); i--) {
                            for (let j = i; j > i - (this.size * (this.size - 1)); j = j - this.size) {
                                if ((this.gameState.board)[j] == 0) {
                                    if ((this.gameState.board)[j - this.size] != 0) {
                                        legalMove = true;
                                    }
                                    this.moveTiles(j - this.size, j);
                                }
                            }
                        }
                    }

                    for (let j = this.boardSize - 1; j >= this.boardSize - this.size; j--) {
                        let i = j;
                        while (i > j - (this.size * (this.size - 1))) {
                            if ((this.gameState.board)[i] == (this.gameState.board)[i - this.size]) {
                                if ((this.gameState.board)[i] != 0) {
                                    legalMove = true;
                                }
                                this.mergeTiles(i - this.size, i);
                                this.gameState.score = (this.gameState.score) + (this.gameState.board)[i];
                                i = i - (this.size * 2);
                            } else {
                                i = i - this.size;
                            }
                        }
                    }
                    for (let x = 0; x < this.size; x++) {
                        for (let i = this.boardSize - 1; i >= this.size * (this.size - 1); i--) {
                            for (let j = i; j > i - (this.size * (this.size - 1)); j = j - this.size) {
                                if ((this.gameState.board)[j] == 0) {
                                    if ((this.gameState.board)[j - this.size] != 0) {
                                        legalMove = true;
                                    }
                                    this.moveTiles(j - this.size, j);
                                }
                            }
                        }
                    }
                    break;
                case 'up':
                    for (let x = 0; x < this.size; x++) {
                        for (let i = 0; i <= (this.size - 1); i++) {
                            for (let j = i; j < i + (this.size * (this.size - 1)); j = j + this.size) {
                                if ((this.gameState.board)[j] == 0) {
                                    if ((this.gameState.board)[j + this.size] != 0) {
                                        legalMove = true;
                                    }
                                    this.moveTiles(j + this.size, j);
                                }
                            }
                        }
                    }
                    for (let j = 0; j < this.size; j++) {
                        let i = j;
                        while (i < j + (this.size * (this.size - 1))) {
                            if ((this.gameState.board)[i] == (this.gameState.board)[i + this.size]) {
                                if (this.gameState.board[i] != 0) {
                                    legalMove = true;
                                }
                                this.mergeTiles(i + this.size, i);
                                this.gameState.score = (this.gameState.score) + (this.gameState.board)[i];
                                i = i + (this.size * 2);
                            } else {
                                i = i + this.size;
                            }
                        }
                    }
                    for (let x = 0; x < this.size; x++) {
                        for (let i = 0; i <= (this.size - 1); i++) {
                            for (let j = i; j < i + (this.size * (this.size - 1)); j = j + this.size) {
                                if ((this.gameState.board)[j] == 0) {
                                    if ((this.gameState.board)[j + this.size] != 0) {
                                        legalMove = true;
                                    }
                                    this.moveTiles(j + this.size, j);

                                }
                            }
                        }
                    }
                    break;
            }
            if (legalMove == true) {
                this.newTile(this.gameState.board);
            }

            if (this.checkWon()) {
                this.gameState.won = true;
            }
            if (this.checkOver()) {
                this.gameState.over = true;
            }
            //observe
            for (let i = 0; i < this.onMoveObserver.length; i++) {
                this.onMoveObserver[i](this.gameState);
            }
            if (this.gameState.over) {
                for (let i = 0; i < this.onLoseObserver.length; i++) {
                    this.onLoseObserver[i](this.gameState);
                }
            }
            if (this.gameState.won) {
                for (let i = 0; i < this.onWinObserver.length; i++) {
                    this.onWinObserver[i](this.gameState);
                }
            }

        }
        /**
         * get a random number between [0, n)*/
    getRandom(n) {
            return Math.floor(Math.random() * n)
        }
        /**  returns a string that is a text/ascii version of the game. See the gameState 
         * section above for an example. This will not be graded, but it useful for your 
         * testing purposes when you run the game in the console.(run_in_console.js trying
         * to print the .toString() function after every move).
         */
    toString() {
            //return JSON.stringify(this.getGameState());
            /*for (let j = 0; j < this.size; j++) {
                let line = [];
                line.push(this.board[j]);
                console.log(line);    
            }*/
            let number = this.board;
            console.log([number[0], number[1], number[2], number[3]]);
            console.log([number[4], number[5], number[6], number[7]]);
            console.log([number[8], number[9], number[10], number[11]]);
            console.log([number[12], number[13], number[14], number[15]]);
            console.log(this.checkWon())
        }
        /**Takes a callback, when a move is made, every observer should be called with 
         * the games current gameState*/
    onMove(callback) {
            this.onMoveObserver.push(callback);
        }
        /**Takes a callback, when the game is won, every observer should be called with 
         *the games current gameState.*/
    onWin(callback) {
            this.onWinObserver.push(callback);
        }
        /**Takes a callback, when the game is lost, every observer should be called with 
         * the games current gameState.*/
    onLose(callback) {
        this.onLoseObserver.push(callback);
    }

}