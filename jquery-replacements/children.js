/*
 * example (get all li-elements of ul with id "my_list") :
 * children(
 *     document.getElementById('my_list'),
 *     function(el) { 
 *         return (typeof el.tagName != 'undefined' && el.tagName.toLowerCase() == 'li') 
 *     }
 * )
 *
 */
function children(el, filter) {
    var childs = [];
    el = el.firstChild;

    do {
        if(!filter || filter(el)) {
            childs.push(el);
        }
    } while (el = el.nextSibling);

    return childs;
}
