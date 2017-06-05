/*
 * example (toggle class "my_class" on body) :
 * toggleClass(
 *     document.getElementById('body'),
 *     'my_class'
 * )
 *
 */
function toggleClass(refNode, classname) {
    refNode.classList.toggle(classname, !(refNode.classList.contains(classname)));
    return refNode;
}
