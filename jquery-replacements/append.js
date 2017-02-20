function append(refNode, newNode) {
    refNode.insertBefore(newNode, refNode.children[refNode.children.length-1].nextSibling);
}
