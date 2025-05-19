import Lexer from "./Parser/Lexer.js"
import { tokenTypeList } from "./Parser/TokenType.js"



const divInputElement = document.querySelector('.input')
const divOutputElement = document.querySelector('.output')

// const formula = 'B1'
// const lexer = new Lexer(formula)
// const tokenList =  lexer.tokenize()

// console.log(tokenList)

divInputElement.addEventListener('input', (event) => {
    const text = event.target.textContent
    if (text.length > 0 && text[0] === '=') {
        const lexer = new Lexer(text.substring(1))
        const tokenList =  lexer.tokenize()
        let newtext = ''
        tokenList.forEach(token => {
            // newtext += `[${token.text}] `
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





