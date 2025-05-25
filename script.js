import Lexer from "./Parser/Lexer.js"
import Parser from "./Parser/Parser.js"
import { tokenTypeList } from "./Parser/TokenType.js"


const divInputElement = document.querySelector('.input')
const divOutputElement = document.querySelector('.output')

const formula = `
a=3^(1/2)<br>
`
divInputElement.innerHTML = formula
const lexer = new Lexer(formula)
const tokenList = lexer.tokenize()

console.log(lexer.toType())

const parser = new Parser(tokenList)
parser.parseCode()

divInputElement.addEventListener('input', (event) => {
    let text = event.target.textContent
    divOutputElement.textContent = text
    if (text.length > 0 && text[0] === '=') {
        text = 'A=' + text  
        const lexer = new Lexer(text.substring(1))
        const tokenList =  lexer.tokenize()
        let newtext = ''
        tokenList.slice(1).forEach(token => {
            if (token.type === tokenTypeList.UNKNOWN) {
                newtext += `<span style='color: red;'>${token.text}</span>`
            } else {
                newtext += token.text
            }
        })
        divOutputElement.innerHTML = newtext
    }
})

divInputElement.addEventListener('keyup', (event) => {
    if (event.target.textContent.length === 0) {
        divOutputElement.innerHTML = ''
    }
})





