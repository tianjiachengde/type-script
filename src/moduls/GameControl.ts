import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
class GameControl {
    food:Food
    snake:Snake
    scorePanel: ScorePanel
    //当前方向
    direction: string = ''
    isLive: boolean = false

    constructor() {
        this.food = new Food()
        this.snake = new Snake()
        this.scorePanel = new ScorePanel()

        this.init()
    }

    init(){
        document.addEventListener('keydown', this.keyboardHandler.bind(this))
        this.run()
    }

    keyboardHandler(event: KeyboardEvent){
        if(event.code === 'Space'){
            this.isLive = !this.isLive
            this.run()
        }
        this.direction = event.code
    }

    run(){
        let x = this.snake.X
        let y = this.snake.Y

        switch (this.direction){
            case 'ArrowUp':
                y -= 10
                break
            case 'ArrowDown':
                y += 10
                break
            case 'ArrowLeft':
                x -= 10
                break
            case 'ArrowRight':
                x += 10
        }

        this.snake.X = x
        this.snake.Y = y

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

}

export default  GameControl
