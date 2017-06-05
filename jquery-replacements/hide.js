/*
 * example (hide all p-elements) :
 * hide('p')
 *
 */
function hide(selector) {
    var matches[] = document.querySelectorAll(selector);

    for(var i=0; i<matches.length; i++) {
        matches[i].style.display = 'none';
    }
    return matches;
}
