export default class Token {
    /**
     * 
     * @param {String} type 
     * @param {String} text 
     * @param {Number} pos 
     */
    constructor(type, text, pos) {
        this.type = type
        this.text = text
        this.pos = pos
    }
}