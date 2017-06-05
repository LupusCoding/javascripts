/*
 * example (remove class "my_class" from body) :
 * removeClass(
 *     document.getElementById('body'),
 *     'my_class'
 * )
 *
 */
function removeClass(refNode, classname) {
    refNode.classList.remove(classname);
    return refNode;
}
