/**
 * IframeConnector - Communicate between iframe and parent
 *
 * @description     Initialize IframeConnector at iframe and parent, to communicate in 
 *                  most simple between them. If you want to send messages or data from
 *                  one to the other, simply let the receiver listen() and use post()
 *                  at the sender.
 * @author          LupusCoding <https://github.com/LupusCoding/>
 * @version         0.1.0
 *
 * EXAMPLES:
 * simple connect:
 *   connector = new IframeConnector();
 *
 * connect with identifier:
 *   connector = new IframeConnector('identifier');
 *
 * send message from iframe to parent window
 *   connector.post('message', parent.window);
 *
 * send data object
 *   connector.post({'param':'value'}, target);
 *
 * set listener
 *   connector.listen(function(event) { doSomeStuff(); });
 *
 * secure listener with key
 *   connector.listen(function(event) {
 *     if(typeof event.data == "object" && event.data.key == 'mySecureEventKey') {
 *       // do some cool stuff...
 *     }
 *   });
 *
 * send data to secured listener
 *   connector.post({'key':'mySecureEventKey'}, target);
 *
 * secure all new listeners
 *   connector.secure('mySecureEventKey');
 *
 * unsecure all new listeners
 *   connector.unsecure('mySecureEventKey');
 *
 */
function IframeConnector(targetname) {
	this.window = window;
	this.name = targetname;
	this.secure = null;
	this.eventList = [];
}

IframeConnector.prototype = {
	listen: function(callback) {
		self = this;
		this.window.addEventListener('message', function(event) {
			// we don't decide between http and https
			clean_origin = this.window.origin.replace(new RegExp('(http|https)://'),'');
			clean_event_origin = event.origin.replace(new RegExp('(http|https)://'),'');
			if(clean_event_origin === clean_origin || clean_event_origin === '*') {
				if(this.secure !== null && this.secure !== secureKey) {
					return;
				}
				self.eventList.push({'callback': callback});
				callback.call(callback, event);
			}
		}, false);
	},

	post: function(message, target = null, domain = '*') {
		if(target === null) {
			target = this.window;
		}
		target.postMessage(message, domain);
	},

	secure: function(secureKey) {
		if(this.secure === null) {
			this.secure = secureKey;
		}
	},

	unsecure: function(secureKey) {
		if(this.secure !== null && this.secure === secureKey) {
			this.secure = null;
		}
	}
}