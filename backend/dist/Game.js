"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            const result = this.board.move(move);
            if (!result) {
                return;
            }
            this.moveCount++;
        }
        catch (e) {
            console.error("Error making move:", e);
            return;
        }
        if (this.board.isGameOver()) {
            const gameOverMessage = {
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            };
            this.player1.send(JSON.stringify(gameOverMessage));
            this.player2.send(JSON.stringify(gameOverMessage));
            return;
        }
        const moveMessage = {
            type: messages_1.MOVE,
            payload: move
        };
        if (this.moveCount % 2 === 1) {
            this.player2.send(JSON.stringify(moveMessage));
        }
        else {
            this.player1.send(JSON.stringify(moveMessage));
        }
    }
}
exports.Game = Game;
