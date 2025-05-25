import NodeExpression from "./NodeExpression.js";

export default class RootNode extends NodeExpression {
    addNode(node) {
        this.codeStrings.push(node);
    }
}