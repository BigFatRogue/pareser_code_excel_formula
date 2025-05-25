import NodeExpression from "./NodeExpression.js"


export default class StringNode extends NodeExpression {
    constructor(str) {
        super()
        this.str = str
    }
}