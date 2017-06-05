/*
 * example (add class "my_class" to body-element) :
 * addClass(
 *     document.getElementsByTagName('body')[0],
 *     'my_class'
 * )
 *
 */
function addClass(refNode, classname) {
    refNode.classList.add(classname);
    return refNode;
}
