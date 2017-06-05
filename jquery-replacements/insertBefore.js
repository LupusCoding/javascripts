/*
 * example (insert new div before first div) :
 * var new_elm = document.createElement('div');
 * insertBefore(
 *     document.getElementsByTagName('div')[0],
 *     new_elm
 * )
 */
function insertBefore(refNode, newNode) {
    refNode.parentNode.insertBefore(newNode, refNode);
}
