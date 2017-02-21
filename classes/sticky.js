/**
 * Sticky - Plain javaScript sticky navigation
 *
 * @description     Plain javaScript sticky navigation
 * @author          LupusCoding <https://github.com/LupusCoding/>
 * @version         0.1.0
 */
class Sticky {
	constructor() {
		this.selector = 'js-toggle-nav';
		this.attributeToSelect = 'id';
	}

	/* listener */
	start() {
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
		window.addEventListener('scroll', function() {
			if (window.pageYOffset > offsetNav 
				&& navElm.style.position != 'fixed') {
				self.stickNav(navElm);

			} else if ( window.pageYOffset < offsetNav 
						&& navElm.style.position == 'fixed') {
				self.unstickNav(navElm);

			}
		});
	}

	/* select navigation by ? */
	selectById() {
		this.attributeToSelect = 'id';
	}

	selectByClass() {
		this.attributeToSelect = 'class';
	}

	selectByName() {
		this.attributeToSelect = 'name';
	}

	selectByAttribute(attr) {
		this.attributeToSelect = attr;
	}

	/* prepare navigation */
	stickNav(elm) {
		elm.style.position	= 'fixed';
		elm.style.top		= '0';
		elm.style.left   	= '0';
		elm.style.width  	= '100%';
		elm.style.zIndex 	= '999999';
	}

	unstickNav(elm) {
		elm.style.position 	= 'relative';
		elm.style.top		= '';
		elm.style.left   	= '';
		elm.style.zIndex   	= '';
	}
}