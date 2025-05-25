import NodeExpression from "./NodeExpression.js"


export default class FunctionNodeExpression extends NodeExpression {
    constructor(formula) {
        super()
        this.formula = formula
        this.args = []
    }
    addArg(arg) {
        this.args.push(arg)
    }
}