export default class TokenType {
    /**
     * 
     * @param {string} name 
     * @param {string} regex 
     */
    constructor(name, regex) {
        this.name = name
        this.regex = regex
    }
}

export const tokenTypeList = {
    RANGE: new TokenType('RANGE: ', /^[A-Z]+\d+:[A-Z]+\d+/),
    CELL: new TokenType('CELL', /^[A-Z]+[0-9]+/),
    NUMBER: new TokenType('NUMBER', /^[-+]?\d+[.,]?\d*/),
    STRING: new TokenType('STRING', /^".*?"/),
    VARIABLE: new TokenType('VARIABLE', /^[a-z]?\d?/),
    ASSIGN: new TokenType('ASSIGN', /^=/),
    OPERATOR: new TokenType('OPERATOR', /^[+\-*/^%&|]/),
    LPAR: new TokenType('OPERATOR', /^\(/),
    RPAR: new TokenType('OPERATOR', /^\)/),
    FUNCTION: new TokenType('OPERATOR', /^[А-Я]+/),
    SPACE: new TokenType('SPACE', /^\s/),
    NEWSTRING: new TokenType('NEWSTRING', /^[\\n]/), 
    TABULATION: new TokenType('TABULATION', /^[\\t]/),
    UNKNOWN: new TokenType('UNKNOWN', '')
}