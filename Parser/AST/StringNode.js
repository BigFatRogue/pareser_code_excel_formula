import NodeExpression from "./NodeExpression.js"


export default class StringNode extends NodeExpression {
    /**
     * 
     * @param {string} text 
     */
    constructor(text) {
        super()
        this.text = text.slice(1, -1)
    }
}
