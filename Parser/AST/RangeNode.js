import NodeExpression from "./NodeExpression.js"


export default class RangeNode extends NodeExpression {
    constructor(address) {
        super()
        this.address = address
    }
}