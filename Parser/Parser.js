import TokenType, { tokenCategoryList, tokenTypeList } from './TokenType.js'

import NodeExpression from './AST/NodeExpression.js'
import NumberNode from './AST/NumberNode.js'
import StringNode from './AST/StringNode.js'
import VariableNode from './AST/VariableNode.js'
import CellNode from './AST/CellNode.js'
import RangeNode from './AST/RangeNode.js'
import BinaryNodeExpression from './AST/BinaryNodeExpression.js'
import FunctionNodeExpression from './AST/FunctionNodeExpression.js'


export default class AST {
    /**
     * Парсер кода
     * @param {TokenType[]} tokinList 
     */
    constructor(tokinList) {
        this.tokenList = tokinList
        this.currentNode = null
        this.pos = 0
        this.nodeList = []
    }

    getCurrentToken() {
        if (this.pos < this.tokenList.length) {
            const currenToken = this.tokenList[this.pos]
            this.pos++
            return currenToken
        }
        return null
    }

    getTokenAndCheckType(...typeTokens) {
        const token = this.getCurrentToken()
        if (typeTokens.find(type => type.name === token.type.name) !== undefined) {
            return token
        }
        return null
    }

    getTokenAndCheckCategory(...categoryTokens) {
        const token = this.getCurrentToken()
        if (categoryTokens.find(category => token.type.category.includes(category)) !== undefined) {
            return token
        }
        return null
    }

    parseFunction() {
        let token = this.getTokenAndCheckType(tokenTypeList.LPAR)
        if (token) {
            let args = []
            let argNode
            while (true) {
                token = this.getTokenAndCheckType(tokenTypeList.SEMICOLON)
                if (token) {

                    args.push(argNode)
                } else {
                    this.pos--
                }

                token = this.getTokenAndCheckType(tokenTypeList.RPAR)
                if (token) {
                    args.push(argNode)
                    return args
                } else {
                    this.pos--
                }
                argNode = this.parseFormula()
            }
        } else {
            throw new Error(`На позиции ${this.pos} ожидалась отрывающая скобка`)
        }
    }
        
    parseLeaf() {
        const token = this.getCurrentToken()
        if (token.type === tokenTypeList.NUMBER) {
            return new NumberNode(token.text)
        } 
        else if (token.type === tokenTypeList.STRING) {
            return new StringNode(token.text)
        } 
        else if (token.type === tokenTypeList.VARIABLE) {
            return new VariableNode(token.text)
        }
        else if (token.type === tokenTypeList.CELL) {
            return new CellNode(token.text)
        }
        else if (token.type === tokenTypeList.RANGE) {
            return new RangeNode(token.text)
        }
        else if (token.type === tokenTypeList.FUNCTION) {
            const functionNode = new FunctionNodeExpression(token.text)
            functionNode.addArgs(this.parseFunction())
            return functionNode
        }
        return null
    }

    parseBinaryExpression() {
        const token = this.getTokenAndCheckCategory(tokenCategoryList.BINARY_OPERATOR)
        if (token) {
            const binaryNode = new BinaryNodeExpression(token.text, token.type.category)
            binaryNode.priority = token.type.priority
            return binaryNode
        }
        return null
    }
    
    parseBracket() {
        if (this.getTokenAndCheckType(tokenTypeList.LPAR)) {
            const node = this.parseFormula()
            const token = this.getTokenAndCheckType(tokenTypeList.RPAR)
            if (token) {
                node.priority = 4
                return node
            } else {
                throw new Error(`На позиции ${this.pos} ожидалась закрывающая скобка`)
            }
        } else {
            this.pos--
            return this.parseLeaf()
        }        
    }

    parseFormula() {
        const node = this.parseBracket()
        const binarynNode = this.parseBinaryExpression()
        if (binarynNode) {
            binarynNode.leftNode = node
            const rigthNode = this.parseFormula()

            if (rigthNode instanceof BinaryNodeExpression) {
                if (rigthNode.priority < binarynNode.priority) {
                    binarynNode.rigthNode = rigthNode.leftNode
                    rigthNode.leftNode = binarynNode
                    return rigthNode
                } 
            }
            binarynNode.rigthNode = rigthNode
            return binarynNode
        } else {
            this.pos--
        }
        return node
    }
    
    parseExpression() {
        const variableToken = this.getTokenAndCheckType(tokenTypeList.VARIABLE)
        if (variableToken) {
            const assignToken = this.getTokenAndCheckType(tokenTypeList.ASSIGN) 
            if (assignToken) {
                return new BinaryNodeExpression(assignToken.text, assignToken.type.category, new VariableNode(variableToken.text), this.parseFormula())
            }
            throw new Error(`На позиции ${this.pos} ожидался оператор присваивания`)
        }
        throw new Error(`На позиции ${this.pos} ожидалась переменная`)
    }

    parseCode() {
        this.tokenList = this.tokenList.filter(token => token.type !== tokenTypeList.TABULATION && token.type !== tokenTypeList.SPACE)
        while (this.pos < this.tokenList.length) {
            const codeStringNode = this.parseExpression();
            const tokenEndString = this.getTokenAndCheckType(tokenTypeList.ENDSTRING)
            if (tokenEndString) {
                this.nodeList.push(codeStringNode);
            } else {
                throw new Error(`На позиции ${this.pos} ожидался конец строки`)
            }
        }
        return this.nodeList;
    }

}