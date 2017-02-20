function children(el, filter) {
    var childs = [];
    el = el.parentNode.firstChild;

    do {
        if(!filter || filter(el)) {
            childs.push(el);
        }
    } while (el = el.nextSibling);

    return childs;
}
