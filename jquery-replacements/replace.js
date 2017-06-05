/*
 * example (replace p-element with span-element) :
 * var new_span = document.createElement('span');
 * append(
 *     document.getElementsByTagName('p')[0],
 *     new_span
 * )
 *
 */
function replace(refNode, newNode) {
    refNode.parentNode.replaceChild(newNode, refNode);
}
