import ASTRunner from "./Parser/ASTRunner.js"
import Lexer from "./Parser/Lexer.js"
import AST from "./Parser/Parser.js"
import { tokenTypeList } from "./Parser/TokenType.js"


const divInputElement = document.querySelector('.input')
const divOutputElement = document.querySelector('.output')

const formula = `
a=A1<br>
`
divInputElement.innerHTML = formula
const lexer = new Lexer(formula)
const tokenList = lexer.tokenize()

console.log(lexer.toClearType())

const parser = new AST(tokenList)
const nodeList = parser.parseCode()

console.log(nodeList)

const runCode = new ASTRunner(nodeList)
runCode.run()

// let tokenList = null

// divInputElement.addEventListener('input', (event) => {
//     let text = event.target.textContent
//     divOutputElement.textContent = text

//     if (tokenList !== null) {
//         tokenList = null
//     }
 
//     if (text.length > 0 && text[0] === '=') {
//         text = 'a1' + text  + '<br>'

//         const lexer = new Lexer(text)
//         tokenList = lexer.tokenize()
//         let newtext = ''
//         tokenList.slice(1).forEach(token => {
//             if (token.type === tokenTypeList.UNKNOWN) {
//                 newtext += `<span style='color: red;'>${token.text}</span>`
//             } else {
//                 newtext += token.text
//             }
//         })
//         divOutputElement.innerHTML = newtext
//     }
// })

// divInputElement.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//         event.preventDefault()
//         console.log(tokenList)
//         if (tokenList) {
//             const parser = new Parser(tokenList)
//             parser.parseCode()
//         }
//     }
// })

// divInputElement.addEventListener('keyup', (event) => {
//     if (event.target.textContent.length === 0) {
//         divOutputElement.innerHTML = ''
//     }
// })





