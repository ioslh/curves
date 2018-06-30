class MathFunction {
    constructor({
        x: xFunction,
        y: yFunction
    }, canvas) {
        this.xFunction = xFunction
        this.yFunction = yFunction
        this.steps = 0
        this.canvas = canvas
        this.width = canvas.width
        this.height = canvas.height
        this.rect = Math.min(this.width, this.height)
        this.dotRadius = 2
        this.ctx = canvas.getContext('2d')
        this.interval = 0
    }

    run() {
        clearTimeout(this.timer)
        this.steps++
        const x = this.xFunction.call(this, this.steps)
        const y = this.yFunction.call(this, this.steps)
        this.drawPoint({x, y})
        this.timer = setTimeout(() => {
            this.run()
        }, this.interval)
    }

    stop() {
        clearTimeout(this.timer)
    }

    drawPoint(point) {
        const ctx = this.ctx
        ctx.save()
        const { x, y } = this.mathToDOMCoord(point)
        // console.log(x, y)
        ctx.beginPath()
        ctx.arc(x, y, this.dotRadius / 2, 0, Math.PI * 2, true)
        ctx.stroke()
        ctx.restore()
    }

    mathToDOMCoord(point) {
        const [x, y] = ['x', 'y'].map(t => {
            return point[t] * this.rect / 2 + this.rect / 2
        })
        return {
            x,
            y: this.height - y
        }
    }
}