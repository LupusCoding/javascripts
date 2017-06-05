/*
 * example (insert new div after first div) :
 * var new_elm = document.createElement('div');
 * insertAfter(
 *     document.getElementsByTagName('div')[0],
 *     new_elm
 * )
 */
function insertAfter(refNode, newNode) {
    refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
}
