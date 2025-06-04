import NodeExpression from "./NodeExpression.js"


export default class VariableNode extends NodeExpression {
    constructor(name) {
        super()
        this.name = name
    }
}