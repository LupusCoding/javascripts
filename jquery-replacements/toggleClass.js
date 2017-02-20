function toggleClass(refNode, classname) {
    refNode.classList.toggle(classname, !(refNode.classList.contains(classname)));
    return refNode;
}
