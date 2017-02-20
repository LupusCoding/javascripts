function bind(refNode, event, func) {
    refNode.addEventListener(event, function() { func; });
}
