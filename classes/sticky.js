/**
 * Sticky - Plain javaScript sticky navigation
 *
 * @description     Plain javaScript sticky navigation
 * @author          LupusCoding <https://github.com/LupusCoding/>
 * @version         0.2.0
 */
class Sticky {
	/*
	 * Example: 
	 * ST = new Sticky();
	 * ST.selector = 'navigation-top-bar';
	 * ST.getByClass();
	 * ST.center();
	 * ST.setStyle('backgroundColor', '#fff');
	 * ST.setStyle('border', '1px dotted red');
	 * ST.init();
	 */

	 /****************/
	 /* Main Section */
	 /****************/

	 /**
	  * constructor
	  */
	constructor() {
		this.selector = 'js-toggle-nav';
		this.attributeToSelect = 'id';
		this.center = false;
		this.styles = {
			default: {
				position: 			'fixed',
				display: 			'',
				border: 			'',
				top: 				'0',
				left: 				'0',
				bottom: 			'',
				right: 				'',
				height: 			'',
				backgroundColor: 	'',
				color: 				'',
				width: 				'100%',
				zIndex: 			'999999',
				marginLeft: 		'',
				marginTop: 			'',
				marginRight: 		'',
				marginBottom: 		''
			},
			original: {
				position: 			null,
				display: 			null,
				border: 			null,
				top: 				null,
				left: 				null,
				bottom: 			null,
				right: 				null,
				height: 			null,
				backgroundColor: 	null,
				color: 				null,
				width: 				null,
				zIndex: 			null,
				marginLeft: 		null,
				marginTop: 			null,
				marginRight: 		null,
				marginBottom: 		null
			},
			custom: {
				position: 			null,
				display: 			null,
				border: 			null,
				top: 				null,
				left: 				null,
				bottom: 			null,
				right: 				null,
				height: 			null,
				backgroundColor: 	null,
				color: 				null,
				width: 				null,
				zIndex: 			null,
				marginLeft: 		null,
				marginTop: 			null,
				marginRight: 		null,
				marginBottom: 		null
			}
		};

		/* start scroll handling */
		this.init 			= function() { this._start() };

		/* select navigation by id */
		this.getById 		= function() { this._selectById() };
		/* select navigation by class */
		this.getByClass 	= function() { this._selectByClass() };
		/* select navigation by name */
		this.getByName		= function() { this._selectByName() };
		/* select navigation by custom attribute */
		this.getByAttribute = function(attribute) { return this.selectByAttribute(attribute) };

		/* center sticky navigation */
		this.center 		= function() { return this._setCenter() };
		/* maximize sticky navigation */
		this.maximize 		= function() { return this._maximizeElement() };

		/* set temporary style for sticky nav */
		this.setStyle 		= function(style, value) { return this._setStyle(style, value) };
		/* get specific style from sticky nav */
		this.getStyle 		= function(style) { return this._getStyle(style) };
		/* unset specific style from sticky nav */
		this.unsetStyle 	= function(style) { return this._unsetStyle(style) };
	}

	/**
	 * scroll and offset handling
	 *
	 * @return void
	 */
	_start() {
		var self 	= this;
		var select 	= 'undefined';

		if(this.attributeToSelect == 'id') {
			select 	= '[id="'+this.selector+'"]';
		} else if(this.attributeToSelect == 'class') {
			select 	= '[class*="'+this.selector+'"]';
		} else if(this.attributeToSelect == 'name') {
			select 	= '[name="'+this.selector+'"]';
		} else  {
			select 	= '['+this.attributeToSelect+'="'+this.selector+'"]';
		}

		var navElm 	= document.querySelectorAll(select)[0];
		var offsetNav = navElm.offsetTop;
		this._setOrigStyles(navElm);
		if(this.center) {
			this._centerElement(navElm);
		}

		if (window.pageYOffset > offsetNav 
			&& navElm.style.position != 'fixed') {
			self._stickNav(navElm);

		} else if ( window.pageYOffset < offsetNav 
					&& navElm.style.position == 'fixed') {
			self._unstickNav(navElm);

		}
		window.addEventListener('scroll', function() {
			if (window.pageYOffset > offsetNav 
				&& navElm.style.position != 'fixed') {
				self._stickNav(navElm);

			} else if ( window.pageYOffset < offsetNav 
						&& navElm.style.position == 'fixed') {
				self._unstickNav(navElm);

			}
		});
	}

	 /*********************/
	 /* Selection Section */
	 /*********************/

	/**
	 * select navigation by id
	 *
	 * @return bool true
	 */
	_selectById() {
		this.attributeToSelect = 'id';
		return true;
	}

	/**
	 * select navigation by class
	 *
	 * @return bool true
	 */
	_selectByClass() {
		this.attributeToSelect = 'class';
		return true;
	}

	/**
	 * select navigation by name
	 *
	 * @return bool true
	 */
	_selectByName() {
		this.attributeToSelect = 'name';
		return true;
	}

	/**
	 * select navigation by custom attribute
	 *
	 * @param string attr
	 * @return bool
	 */
	_selectByAttribute(attr) {
		if(typeof attr == 'undefined') {
			return false;
		}
		this.attributeToSelect = attr;
		return true;
	}

	 /*****************/
	 /* Style Section */
	 /*****************/

	 /**
	  * save original navigation style
	  *
	  * @param object elm Navigation element
	  * @return void
	  */
	_setOrigStyles(elm) {
		this.styles.original.display 			= elm.style.display;
		this.styles.original.position 			= elm.style.position;
		this.styles.original.border 			= elm.style.border;
		this.styles.original.top 				= elm.style.top;
		this.styles.original.left 				= elm.style.left;
		this.styles.original.right 				= elm.style.right;
		this.styles.original.bottom 			= elm.style.bottom;
		this.styles.original.width 				= elm.style.width;
		this.styles.original.height				= elm.style.height;
		this.styles.original.backgroundColor	= elm.style.backgroundColor;
		this.styles.original.color				= elm.style.color;
		this.styles.original.zIndex 			= elm.style.zIndex;
		this.styles.original.marginLeft 		= elm.style.marginLeft;
		this.styles.original.marginTop 			= elm.style.marginTop;
		this.styles.original.marginRight 		= elm.style.marginRight;
		this.styles.original.marginBottom 		= elm.style.marginBottom;
	}

	/**
	 * set custom style for sticky nav
	 *
	 * @param string style
	 * @param string value
	 * @return bool
	 */
	_setStyle(style, value) {
		if(typeof style != 'undefined' && typeof value != 'undefined') {
			if(typeof this.styles.custom[style] != 'undefined') {
				this.styles.custom[style] = value;
				return true;
			}
		}
		return false;
	}

	/**
	 * unset custom style
	 *
	 * @param string style
	 * @return bool
	 */
	_unsetStyle(style) {
		if(typeof style != 'undefined' && typeof this.styles.custom[style] != 'undefined') {
			this.styles.custom[style] = null;
			return true;
		}
		return false;
	}

	/**
	 * get specific custom style
	 *
	 * @param string style
	 * @return bool
	 */
	_getStyle(style) {
		if(typeof style != 'undefined' && typeof this.styles.custom[style] != 'undefined') {
			return this.styles.custom[style];
		}
		return false;
	}

	/**
	 * choose to center sticky navigation
	 *
	 * @return void
	 */
	_setCenter() {
		this.center = true;
	}

	/**
	 * set style to center sticky navigation
	 *
	 * @param object elm
	 * @return void
	 */
	_centerElement(elm) {
		this.styles.custom.left 		 = '50%';
		this.styles.custom.marginLeft = '-'+(elm.offsetWidth / 2)+'px';
	}

	_maximizeElement() {
		this.styles.custom.width = document.getElementsByTagName('body')[0].offsetWidth+'px';
		return this.styles.custom.width;
	}


	 /*******************/
	 /* Prepare Section */
	 /*******************/

	 /**
	  * set navigation sticky
	  *
	  * @param object elm
	  * @return void
	  */
	_stickNav(elm) {
		elm.style.display 				= this.styles.default.display;
		if(this.styles.custom.display != null) {
			elm.style.display 			= this.styles.custom.display;
		}
		elm.style.position	 			= this.styles.default.position;
		if(this.styles.custom.position != null) {
			elm.style.position 			= this.styles.custom.position;
		}
		elm.style.border	 			= this.styles.default.border;
		if(this.styles.custom.border != null) {
			elm.style.border 			= this.styles.custom.border;
		}
		elm.style.top 					= this.styles.default.top;
		if(this.styles.custom.top != null) {
			elm.style.top 				= this.styles.custom.top;
		}
		elm.style.left 					= this.styles.default.left;
		if(this.styles.custom.left != null) {
			elm.style.left 				= this.styles.custom.left;
		}
		elm.style.right 				= this.styles.default.right;
		if(this.styles.custom.right != null) {
			elm.style.right 			= this.styles.custom.right;
		}
		elm.style.bottom 				= this.styles.default.bottom;
		if(this.styles.custom.bottom != null) {
			elm.style.bottom 			= this.styles.custom.bottom;
		}
		elm.style.width 				= this.styles.default.width;
		if(this.styles.custom.width != null) {
			elm.style.width 			= this.styles.custom.width;
		}
		elm.style.height 				= this.styles.default.height;
		if(this.styles.custom.height != null) {
			elm.style.height 			= this.styles.custom.height;
		}
		elm.style.backgroundColor 		= this.styles.default.backgroundColor;
		if(this.styles.custom.backgroundColor != null) {
			elm.style.backgroundColor 	= this.styles.custom.backgroundColor;
		}
		elm.style.color 				= this.styles.default.color;
		if(this.styles.custom.color != null) {
			elm.style.color 			= this.styles.custom.color;
		}
		elm.style.zIndex 				= this.styles.default.zIndex;
		if(this.styles.custom.zIndex != null) {
			elm.style.zIndex 			= this.styles.custom.zIndex;
		}
		elm.style.marginLeft 			= this.styles.default.marginLeft;
		if(this.styles.custom.marginLeft != null) {
			elm.style.marginLeft 		= this.styles.custom.marginLeft;
		}
		elm.style.marginTop 			= this.styles.default.marginTop;
		if(this.styles.custom.marginTop != null) {
			elm.style.marginTop 		= this.styles.custom.marginTop;
		}
		elm.style.marginRight 			= this.styles.default.marginRight;
		if(this.styles.custom.marginRight != null) {
			elm.style.marginRight 		= this.styles.custom.marginRight;
		}
		elm.style.marginBottom 			= this.styles.default.marginBottom;
		if(this.styles.custom.marginBottom != null) {
			elm.style.marginBottom 		= this.styles.custom.marginBottom;
		}
	}

	/**
	 * set navigation back to normal
	 *
	 * @param object elm
	 * @return void
	 */
	_unstickNav(elm) {
		elm.style.display 			= this.styles.original.display;
		elm.style.position 			= this.styles.original.position;
		elm.style.border 			= this.styles.original.border;
		elm.style.top 				= this.styles.original.top;
		elm.style.left 				= this.styles.original.left;
		elm.style.right 			= this.styles.original.right;
		elm.style.bottom 			= this.styles.original.bottom;
		elm.style.width 			= this.styles.original.width;
		elm.style.height 			= this.styles.original.height;
		elm.style.backgroundColor 	= this.styles.original.backgroundColor;
		elm.style.color 			= this.styles.original.color;
		elm.style.zIndex 			= this.styles.original.zIndex;
		elm.style.marginLeft 		= this.styles.original.marginLeft;
		elm.style.marginTop 		= this.styles.original.marginTop;
		elm.style.marginRight 		= this.styles.original.marginRight;
		elm.style.marginBottom 		= this.styles.original.marginBottom;
	}
}