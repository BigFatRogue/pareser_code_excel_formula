import TokenType, { tokenTypeList } from "./TokenType.js"
import Token from "./Token.js"


export default class Lexer {
    /**
     * 
     * @param {string} code 
     */
    constructor(code) {
        this.code = code
        this.pos = 0
        this.tokenList = []
    }

    matchToken(tokenTypesValues) {
        for (let i = 0; i < tokenTypesValues.length; i++) {
            const tokenType = tokenTypesValues[i]
            if (tokenType === tokenTypeList.UNKNOWN) continue
            const regex = tokenType.regex
            const result = this.code.substring(this.pos).match(regex)

            if (result && result[0]) {
                if (tokenType === tokenTypeList.SPACE || tokenType === tokenTypeList.NEWSTRING || tokenType === tokenTypeList.TABULATION) {
                    this.pos++
                    return false
                }
                const token = new Token(tokenType, result[0], this.pos)
                this.pos += result[0].length
                this.tokenList.push(token)
                return true
            }
        }

        this.tokenList.push(new Token(tokenTypeList.UNKNOWN, this.code[this.pos], this.pos))
        this.pos++
    }

    tokenize() {
        const tokenTypesValues = Object.values(tokenTypeList)
        while (this.pos < this.code.length) {
            this.matchToken(tokenTypesValues)
        }
        return this.tokenList
    }
}