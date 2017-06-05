/*
 * example (add click-handler to button) :
 * onClick(
 *     document.getElementsByTagName('button')[0],
 *     function(event)  {
 *         // do something
 *     }
 * )
 *
 */
function onClick(refNode, func) {
    refNode.addEventListener('click', function() { func; });
}
