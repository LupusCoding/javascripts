(function() {
    var tmpMouseX, tmpMouseY;

    var dotStyle         = document.createElement('style');
    dotStyle.type        = 'text/css';
    dotStyle.textContent =  '.dot {'+
                            '   position: absolute;'+
                            '   display: block;'+
                            '   height: 2px;'+
                            '   width: 2px;'+
                            '   background-color: #000;'+
                            '}';
    document.body.appendChild(dotStyle);

    document.onmousemove = getMousePosition;

    function getMousePosition(event) {
        var eventDoc, doc, body, pageX, pageY;

        event = event || window.event;

        if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        if( (event.clientX != null && event.clientY != null) && 
            (tmpMouseX == null || 
            tmpMouseX != event.clientX ||
            tmpMouseY == null || 
            tmpMouseY != event.clientY) ) {
            tmpMouseX = event.clientX;
            tmpMouseY = event.clientY;
            var mouseSpan           = document.createElement('span');
            mouseSpan.className     = 'dot';
            mouseSpan.style.top     = tmpMouseY+'px';
            mouseSpan.style.left    = tmpMouseX+'px';
            document.body.appendChild(mouseSpan);
        }
    }
})();
