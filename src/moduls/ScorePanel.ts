class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number;

    constructor(maxLevel:number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = 10
    }

    addScore(){
        this.scoreEle.innerHTML = ++this.score + ''
        if(this.score % 10 === 0) {
            this.levelUp()
        }
    }

    levelUp(){
        if(this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}

const panel = new ScorePanel(10);
for(let i =0 ; i< 100; i++){
    panel.addScore();
}
export default ScorePanel