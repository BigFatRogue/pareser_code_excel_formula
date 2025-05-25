import NodeExpression from "./NodeExpression.js"


export default class BinaryNodeExpression extends NodeExpression {
    constructor(operator, leftNode=null, rigthNode=null) {
        super()
        this.operator = operator
        this.leftNode = leftNode
        this.rigthNode = rigthNode
        this.priority = 1
    }
}

