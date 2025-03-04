import { Chess } from "chess.js";
import { WebSocket } from "ws"
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game{

    public player1:WebSocket;
    public player2:WebSocket;
    public board:Chess;
    private startTime:Date;
    private moveCount = 0;

    constructor(player1:WebSocket , player2:WebSocket){
        this.player1 = player1
        this.player2 = player2
        this.board = new Chess()
        this.startTime = new Date()
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))

        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))
    }

    makeMove(socket:WebSocket,move:{
        from:string,
        to:string
    }){
        
        if(this.moveCount %2 === 0 && socket !== this.player1){
            return
        }

        if(this.moveCount %2 === 1 && socket !== this.player2){
            return
        }

        try{
            const result = this.board.move(move)
            if(!result) {
                return 
            }
            this.moveCount++
        }catch(e){
            console.error("Error making move:", e)
            return
        }

        if(this.board.isGameOver()){
            const gameOverMessage = {
                type:GAME_OVER,
                payload :{
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }
            this.player1.send(JSON.stringify(gameOverMessage))
            this.player2.send(JSON.stringify(gameOverMessage)) 
            return;
        }

        const moveMessage = {
            type:MOVE,
            payload:move
        }

        if(this.moveCount % 2 === 1){ 
            this.player2.send(JSON.stringify(moveMessage))
        }else{ 
            this.player1.send(JSON.stringify(moveMessage))
        }

        }
    }
