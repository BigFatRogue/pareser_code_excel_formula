import NumberNode from './AST/NumberNode.js'
import StringNode from './AST/StringNode.js'
import VariableNode from './AST/VariableNode.js'
import CellNode from './AST/CellNode.js'
import RangeNode from './AST/RangeNode.js'
import BinaryNodeExpression from './AST/BinaryNodeExpression.js'
import FunctionNodeExpression from './AST/FunctionNodeExpression.js'
import { tokenCategoryList } from './TokenType.js'
import NodeExpression from './AST/NodeExpression.js'


export default class ASTRunner {
    constructor(nodeList) {
        this.nodeList = nodeList
        this.listVariable = {}

        this.functionRunner = new FunctionRunner()
    }

    run() {
        this.nodeList.forEach(node => {
            const result = this.runNode(node)
        })
        console.log(this.listVariable)
    }

    /**
     * 
     * @param {NodeExpression} node 
     * @returns 
     */
    runNode(node) {
        while (true) {
            if (node instanceof NumberNode) {
                return node.value
            }
            else if (node instanceof StringNode) {
                return node.text
            }

            else if (node instanceof VariableNode) {
                return this.listVariable[node.name]

            }

            else if (node instanceof CellNode) {

            }

            else if (node instanceof RangeNode) {

            }

            else if (node instanceof BinaryNodeExpression) {
                return this.runBinaryExpresionNode(node)
            }

            else if (node instanceof FunctionNodeExpression) {
                return this.runFunctionExpressionNode(node)
            }
            throw new Error(`Критическая ошибка. Ноды ${node.constructor.name} не найдено`)
        }
    }

    /**
     * 
     * @param {BinaryNodeExpression} node 
     */
    runBinaryExpresionNode(node) {
        const operator = node.operator
        const leftNode = node.leftNode
        const rigthNode = node.rigthNode

        switch (operator) {
            case "=":
                this.listVariable[node.leftNode.name] = this.runNode(rigthNode)
                return null
            case "+" :
                return this.runNode(leftNode) + this.runNode(rigthNode)
            case "-" :
                return this.runNode(leftNode) - this.runNode(rigthNode)
            case "*" :
                return this.runNode(leftNode) * this.runNode(rigthNode)
            case "/" :
                return this.runNode(leftNode) / this.runNode(rigthNode)
            case "^":
                return Math.pow(this.runNode(leftNode), this.runNode(rigthNode))
            case "//":
                return Math.floor(this.runNode(leftNode) / this.runNode(rigthNode))
            case "%":
                return this.runNode(leftNode) % this.runNode(rigthNode)
            case "&" :
                return `${this.runNode(leftNode)}${this.runNode(rigthNode)}`
        }
    }

    /**
     * 
     * @param {FunctionNodeExpression} node 
     */
    runFunctionExpressionNode(node) {
        const nameFunction = node.name
        const argsNode = node.args
        let args = []

        argsNode.forEach((argNode) => {
            args.push(this.runNode(argNode))
        })
        
        return this.functionRunner.run(nameFunction, args)
    }
} 

class FunctionRunner {
    #functionList = {
        'СУММ': {FUNC: this.#funcSum, MIN_ARGS: 1, MAX_ARGS: Infinity},
        'ЕСЛИ': {FUNC: this.#funcIfElse, MIN_ARGS: 3, MAX_ARGS: 3}
    }

    run(name, args) {
        const func = this.#getAndCheckFuncForName(name, args)
        return func.FUNC(args)
    }

    /**
     * 
     * @param {string} name 
     * @param {Array} args 
     * @returns 
     */
    #getAndCheckFuncForName(name, args) {
        const func = this.#functionList[name]
        if (func !== undefined) {
            const countArgs = args.length
            if (countArgs >= func.MIN_ARGS && countArgs <= func.MAX_ARGS) {
                return func
            }
            throw Error(`Нужно передать от ${func.MIN_ARGS} до ${func.MAX_ARGS} аргументов`)
        }
        throw Error(`Функции с именем ${name} не найдено`)
    }

    /**
     * 
     * @param {Number[]} args 
     * @returns 
     */
    #funcSum(args) {
        let total = 0
        args.forEach((item) => {
            if (typeof item === 'number') {
                total += item
            } else {
                throw new Error('Аргументы должны быть чилами')
            }
        })
        return total
    }

    #funcIfElse(args) {

    }

}