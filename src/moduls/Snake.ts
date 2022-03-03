class Snake{
    head:HTMLElement;
    bodies:HTMLCollection;
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div')!;
        this.bodies = this.element.getElementsByTagName('div')
    }

    get X(){
        return this.head.offsetLeft
    }

    get Y(){
        return this.head.offsetTop
    }

    set X(value:number) {
        if(this.X === value) return
        if(this.checkoutKnockOutWall(value)) throw new Error('蛇撞墙了')

        //判断是否掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            if(value > this.X){
               value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkoutKnockSelf()
    }

    set Y(value:number) {
        if(this.Y === value) return
        if(this.checkoutKnockOutWall(value)) throw new Error('蛇撞墙了')
        //判断是否掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }

        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkoutKnockSelf()
    }

    addBody(){
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }

    moveBody(){
        const bodyLength = this.bodies.length
        for(let i = bodyLength-1; i > 0; i-- ){
            const nextBody = this.bodies[i-1] as HTMLElement
            const curBody = this.bodies[i] as HTMLElement
            const x = nextBody.offsetLeft
            const y = nextBody.offsetTop

            curBody.style.left = x + 'px'
            curBody.style.top = y + 'px'
        }
    }

    checkoutKnockOutWall(value: number): boolean {
        return value < 0 || value > 290
    }
    checkoutKnockSelf(){
        const bodyLength = this.bodies.length
        for(let i = bodyLength-1; i > 0; i-- ){
            const curBody = this.bodies[i] as HTMLElement
            const x = curBody.offsetLeft
            const y = curBody.offsetTop
            if(this.X === x && this.Y == y){
                throw new Error('撞到自己了')
            }
        }
    }
}

export default  Snake