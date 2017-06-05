/*
 * example (add new li-element to ul-element as first item) :
 * var new_li = document.createElement('li');
 * append(
 *     document.getElementsByTagName('ul')[0],
 *     new_li
 * )
 *
 */
function prepend(refNode, newNode) {
    refNode.insertBefore(newNode, refNode.firstChild);
}
