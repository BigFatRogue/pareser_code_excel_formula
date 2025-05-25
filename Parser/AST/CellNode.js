import NodeExpression from "./NodeExpression.js"


export default class CellNode extends NodeExpression {
    constructor(address) {
        super()
        this.address = address
    }
}