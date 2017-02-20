function insertAfter(refNode, newNode) {
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
}
