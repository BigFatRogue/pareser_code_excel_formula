import { tokenCategoryList } from "../TokenType.js"
import NodeExpression from "./NodeExpression.js"


export default class BinaryNodeExpression extends NodeExpression {
    /**
     * 
     * @param {string} operator 
     * @param {tokenCategoryList} categoryExpression 
     * @param {NodeExpression} leftNode 
     * @param {NodeExpression} rigthNode 
     */
    constructor(operator, categoryExpression, leftNode=null, rigthNode=null) {
        super()
        this.operator = operator
        this.categoryExpression = categoryExpression
        this.leftNode = leftNode
        this.rigthNode = rigthNode
        this.priority = 1
    }
}

