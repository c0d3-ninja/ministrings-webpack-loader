const traverse =require("@babel/traverse").default
const parser =require("@babel/parser")
const generate = require("@babel/generator").default
/* variable to replace values */
let counter=1
module.exports= function (source,map){
    function generateRandomId(value) { // Public Domain/MIT
        if(value.length<=(''+counter+1).length){
            return  value
        }
        return  ""+(counter++)
    }
    /* create Abstract Syntax Tree */
    const ast =parser.parse(source,
        {
            sourceType: "module",
            plugins: [
                // enable jsx and flow syntax
                "jsx"
            ]
        })
    /* Traverse it to find the values */
    traverse(ast, {
        enter(path) {
            /*
              for variable initialization
              Ex: var goToListPage="GO_TO_LIST_PAGE"
             */
            if(path.isVariableDeclarator(path.node)){
                let initNode = path.node.init
                /*
                Simply it will replace when the value is string
                you can extend it if you want other types
                * */
                if(initNode && initNode.value && typeof  initNode.value=="string"){
                    initNode.value=generateRandomId(initNode.value)
                }
            }
            /*
             for Object initialization
             Ex: {GO_TO_LIST_PAGE:"GO_TO_LIST_PAGE"}
             */
            if(path.isObjectProperty(path.node)){
                let valueNode = path.node.value
                if(valueNode && valueNode.value && typeof valueNode.value=="string"){
                    valueNode.value=generateRandomId(valueNode.value)
                }
            }
        },
    });
    /* resetting env variable */
    counter=1
    return generate(ast).code;

}