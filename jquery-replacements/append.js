/*
 * example (add new li-element to ul-element as last item) :
 * var new_li = document.createElement('li');
 * append(
 *     document.getElementsByTagName('ul')[0],
 *     new_li
 * )
 *
 */
function append(refNode, newNode) {
    refNode.insertBefore(newNode, refNode.children[refNode.children.length-1].nextSibling);
}
