/*
 * example (bind click-handler to button-element) :
 * bind(
 *     document.getElementsByTagName('button')[0],
 *     'click',
 *     function(event)  {
 *         // do something
 *     }
 * )
 *
 */
function bind(refNode, event, func) {
    refNode.addEventListener(event, function() { func; });
}
