/**
 * Sticky - Plain javaScript sticky navigation
 *
 * @description     Plain javaScript sticky navigation
 * @author          LupusCoding <https://github.com/LupusCoding/>
 * @version         0.1.1
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

		this.init 			= function() { this._start() };

		this.getById 		= function() { this._selectById() };
		this.getByClass 	= function() { this._selectByClass() };
		this.getByName		= function() { this._selectByName() };
		this.getByAttribute = function(attribute) { return this.selectByAttribute(attribute) };

		this.center 		= function() { return this._setCenter() };
		this.maximize 		= function() { return this._maximizeElement() };

		this.setStyle 		= function(style, value) { return this._setStyle(style, value) };
		this.getStyle 		= function(style) { return this._getStyle(style) };
		this.unsetStyle 	= function(style) { return this._unsetStyle(style) };
	}

	/* listener */
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

	/* select navigation by ? */
	_selectById() {
		this.attributeToSelect = 'id';
		return true;
	}

	_selectByClass() {
		this.attributeToSelect = 'class';
		return true;
	}

	_selectByName() {
		this.attributeToSelect = 'name';
		return true;
	}

	_selectByAttribute(attr) {
		if(typeof attr == 'undefined') {
			return false;
		}
		this.attributeToSelect = attr;
		return true;
	}

	/* style controls */
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

	_setStyle(style, value) {
		if(typeof style != 'undefined' && typeof value != 'undefined') {
			if(typeof this.styles.custom[style] != 'undefined') {
				this.styles.custom[style] = value;
				return true;
			}
		}
		return false;
	}

	_unsetStyle(style) {
		if(typeof style != 'undefined' && typeof this.styles.custom[style] != 'undefined') {
			this.styles.custom[style] = null;
			return true;
		}
		return false;
	}

	_getStyle(style) {
		if(typeof style != 'undefined' && typeof this.styles.custom[style] != 'undefined') {
			return this.styles.custom[style];
		}
		return false;
	}

	_setCenter() {
		this.center = true;
	}

	_centerElement(elm) {
		this.styles.custom.left 		 = '50%';
		this.styles.custom.marginLeft = '-'+(elm.offsetWidth / 2)+'px';
	}

	_maximizeElement() {
		this.styles.custom.width = document.getElementsByTagName('body')[0].offsetWidth+'px';
		return this.styles.custom.width;
	}


	/* prepare navigation */
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