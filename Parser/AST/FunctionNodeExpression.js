import NodeExpression from "./NodeExpression.js"


export default class FunctionNodeExpression extends NodeExpression {
    constructor(name) {
        super()
        this.name = name
        this.args = []
    }

    addArgs(args) {
        this.args.push(...args)
    }
}