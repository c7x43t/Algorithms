function getTextNodes(root,result=[]){
    var children=root.childNodes;
    for(var i=0;i<children.length;i++){
        if(children[i].nodeType===3){
            result.push(children[i]);
        }else{
            getTextNodes(children[i],result);
        }
    }
    return result;
}
function getElementByTextContent(root=document.body,query){
    var nodes=getTextNodes(root)
    .filter(e=>e.textContent.match(query)!==null)
    .map(e=>e.parentElement);
    return nodes;
}
