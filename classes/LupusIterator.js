LupusIterator = (function LupusIterator() {
    var instance;

    function init() {

        if(typeof LupusIterator !== 'object') {
            throw new Error("LupusIterator.js is required.");
        }

        return {
            iterate: function(selector, selection, operator=null, selectionclass=null) {
                var lastmatch = null;
                var matches = document.querySelectorAll(selector);
                if(selectionclass == null) {
                    var selectionclass = 'active';
                }
                if(operator == null) {
                    operator = 'eq';
                }

                for(var i=0; i<matches.length; i++) {
                    matches[i].classList.remove(selectionclass);
                    if(this.checkElement(matches[i].dataset.value, operator, selection)) {
                        matches[i].classList.add(selectionclass);

                        if(lastmatch != null) {
                            lastmatch.classList.remove(selectionclass);
                        }

                        lastmatch = matches[i];
                    }
                }
                return lastmatch;
            },
            checkElement: function(attribute, operator, selection) {
                switch(operator) {
                    case 'eq':
                        return (attribute == selection);
                        break;
                    case 'gt':
                        return (parseFloat(attribute) > parseFloat(selection));
                        break;
                    case 'ge':
                        return (parseFloat(attribute) >= parseFloat(selection));
                        break;
                    case 'lt':
                        return (parseFloat(attribute) < parseFloat(selection));
                        break;
                    case 'le':
                        return (parseFloat(attribute) <= parseFloat(selection));
                        break;
                    default:
                        return false;
                        break;
                }
            }
        }
    }

    if(!instance) {
        instance = init();
    }
 
    return instance;
})
