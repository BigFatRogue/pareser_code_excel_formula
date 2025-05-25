import NodeExpression from "./NodeExpression.js"


export default class NumberNode extends NodeExpression {
    constructor(value) {
        super()
        this.value = Number(value)
    }
}