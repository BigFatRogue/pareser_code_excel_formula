export default class TokenType {
    /**
     * 
     * @param {string} name 
     * @param {tokenCategoryList[]} category
     * @param {string} regex 
     * @param {number} priority 
     */
    constructor(name, category, regex, priority=1) {
        this.name = name
        this.category = category
        this.regex = regex
        this.priority = priority
    }
}

export const tokenCategoryList = {
    DATA: 'DATA',
    BINARY_OPERATOR: 'BINARY_OPERATOR',
    UNARY_OPERATOR: 'UNARY_OPERATOR',
    MARK: 'MARK',
    FUNCTION: 'FUNCTION',
    MATH_EXPRESSION: 'MATH_EXPRESSION',
    STRING_EXPRESSION: 'STRING_EXPRESSION',
    UNKNOWN: 'UNKNOWN'
}

export const tokenTypeList = {
    RANGE: new TokenType('RANGE: ', [tokenCategoryList.DATA], /^[A-Z]+\d+:[A-Z]+\d+/),
    CELL: new TokenType('CELL', [tokenCategoryList.DATA], /^[A-Z]+[0-9]+/),
    NUMBER: new TokenType('NUMBER', [tokenCategoryList.DATA], /^[-]?\d+[.,]?\d*/),
    STRING: new TokenType('STRING', [tokenCategoryList.DATA], /^".*?"/),
    VARIABLE: new TokenType('VARIABLE', [tokenCategoryList.DATA], /^[a-z]?\d?/),
    EXPONENTIATION: new TokenType('EXPONENTIATION', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION], /^\^/, 3),
    ASSIGN: new TokenType('ASSIGN', [tokenCategoryList.BINARY_OPERATOR], /^=/),
    PLUS: new TokenType('PlUS', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION], /^\+/),
    MINUS: new TokenType('MINUS', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION], /^-/),
    DIVISION: new TokenType('DIVISION', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION],/^\//, 2),
    MULTIPLICATION: new TokenType('MULTIPLICATION', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION], /^\*/, 2),
    INTEGER_DIVISION: new TokenType('INTEGER_DIVISION', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION], /^\/\//, 2),
    REMAINDER_DIVISION: new TokenType('REMAINDER_DIVISION', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION], /^%/, 2),
    CONCATENATION: new TokenType('CONCATENATION', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.STRING_EXPRESSION], /^&/),
    LCOMPARE: new TokenType('LCOMPARE', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION], /^<[^b]/),
    RCOMPARE: new TokenType('RCOMPARE', [tokenCategoryList.BINARY_OPERATOR, tokenCategoryList.MATH_EXPRESSION], /^[^r]>/),
    LPAR: new TokenType('LPAR', [tokenCategoryList.MARK], /^\(/),
    RPAR: new TokenType('RPAR', [tokenCategoryList.MARK], /^\)/),
    FUNCTION: new TokenType('FUNCTION', [tokenCategoryList.FUNCTION], /^[А-Я]+/),
    SPACE: new TokenType('SPACE', [tokenCategoryList.MARK], /^\s/),
    ENDSTRING: new TokenType('ENDSTRING', [tokenCategoryList.MARK], /^<br>/), 
    TABULATION: new TokenType('TABULATION', [tokenCategoryList.MARK], /^[\\t]/),
    SEMICOLON: new TokenType('SEMICOLON', [tokenCategoryList.MARK], /^;/),
    UNKNOWN: new TokenType('UNKNOWN', [tokenCategoryList.UNKNOWN], '')
}


