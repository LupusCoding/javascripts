/**
 * CookieControl - Plain javaScript cookie tool
 *
 * @description     Plain javaScript cookie tool
 * @author          LupusCoding <https://github.com/LupusCoding/>
 * @version         0.1.0
 */
class CookieControl {
	/**
	 * constructor
	 */
	constructor() {
		this.cookies 	= {};

		this.load 		= function() { return this._loadCookies() };
		this.set 		= function(cname, cval, expire=null, path='/') { return this._setCookie(cname, cval, expire, path) };
		this.get 		= function(name) { return this._getCookie(name) };
		this.remove 	= function(name) { return this._removeCookie(name) };

		this.load();
	}

	/**
	 * create cookie object
	 *
	 * @return object
	 */
	_createCookie() {
		return {
			name:  null,
			value: null,
			expiration: null,
			path: null
		};
	}

	/**
	 * load all active cookies in global object
	 *
	 * @return object
	 */
	_loadCookies() {
		var decookie = decodeURIComponent(document.cookie);
		var cookies = decookie.split('; ')
		for(var i=0; i<cookies.length; i++) {
			var cnew = this._createCookie();
			cnew.name = cookies[i].split('=')[0];
			cnew.value = cookies[i].split('=')[1];
			this.cookies[cnew.name] = cnew;
		}
		return this.cookies;
	}

	/**
	 * test if cookie exist
	 *
	 * @param string cname
	 * @return bool
	 */
	_exist(cname) {
		if(typeof this.cookies[cname] == 'undefined') {
			this._loadCookies();
		}
		if(typeof this.cookies[cname] != 'undefined') {
			return true;
		}
		return false;
	}

	/**
	 * set a new cookie or edit any existing
	 *
	 * @param string cname
	 * @param string cval
	 * @param string expire
	 * @param string path
	 * @return object
	 */
	_setCookie(cname, cval, expire=null, path='/') {
		if(expire == null) {
			var d = new Date();
    		expire = d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
		}
		document.cookie = cname+'='+cval+';'+expire+';path='+path;
		var cnew = this._createCookie();
		cnew.name = cname;
		cnew.value = cval;
		cnew.expiration = expire;
		cnew.path = path;
		this.cookies[cname] = cnew;
		return cnew;
	}

	/**
	 * get existing cookie
	 *
	 * @param string cname
	 * @return mixed object if cookie exist
	 *               otherwise false
	 */
	_getCookie(cname) {
		if(this._exist(cname)) {
			return this.cookies[cname];
		}
		return false;
	}

	/**
	 * remove cookie
	 *
	 * @param string cname
	 * @return bool
	 */
	_removeCookie(cname) {
		if(this._exist(cname)) {
			var cookie = this.cookies[cname];
			if(cookie.path == null) {
				cookie.path = '/';
			}

			var d = new Date();
    		var expire = d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));
			cookie.expiration = expire;

			document.cookie = cookie.cname+'=;'+cookie.expiration+';path='+cookie.path;
			delete this.cookies[cname];
			return true;
		}
		return false;
	}
}