/*
05102016
v1.1

Loading this class and calling the hiDPI_adjustment() from w/in the creative file function will solve the resolution issue for CreateJS ads

*** added IIFE
*** returns a public method 'hiDPI_adjustment' so it can be included via <script> tag and the method called when elements are ready
*** _hiDPI_adjustment() accepts a boolean arg to determing if the _extendDOMElementClass() method should be applied
*/

(function(){
 	var HiDPI_fix = function(){
		var pageCanvas = document.getElementById("canvas");
		var adWidth = parseInt(window.getComputedStyle(pageCanvas, null).getPropertyValue("width"));
		var adHeight = parseInt(window.getComputedStyle(pageCanvas, null).getPropertyValue("height"));
		var mql = window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5)");

		// this one will be a publically accessible method
		function _hiDPI_adjustment(bool){
			bool = !!bool;								// default false. If true, the _extendDomElementClass method will be applied - set to true if creative is using EaselJS' DOMElement Class
			if(bool){
				_extendDOMElementClass();				// DOM Element is associated to an on-stage symbol, DOMElement Class needs to be extended to account for DPR in property calculations
			}
			_resetCanvasForDPR();						// adjust canvas width/height attributes, factoring DPR
			mql.addListener(_resetCanvasForDPR, mql);	// listener function to listen to state changes
		};

		function _resetCanvasForDPR(){
			if (window.devicePixelRatio) {
				winDRP = window.devicePixelRatio;
				// console.log("hiDPI_adjustment winDRP: "+winDRP);
				// grab the width and height from canvas
				var height = pageCanvas.getAttribute('height');
				var width = pageCanvas.getAttribute('width');
				// // reset the canvas width and height with window.devicePixelRatio applied
				pageCanvas.setAttribute('width', Math.round(adWidth * winDRP));
				pageCanvas.setAttribute('height', Math.round( adHeight * winDRP));
				// // force the canvas back to the original size using css
				pageCanvas.style.width = adWidth+"px";
				pageCanvas.style.height = adHeight+"px";
				// // set CreateJS to render scaled
				stage.scaleX = stage.scaleY = winDRP;
			}
		};

		function _extendDOMElementClass() {
			// console.log("domExtender");
			var myDOMElement = function(htmlElement) {
			    this.DOMElement_constructor(htmlElement);
			};

			var p = createjs.extend(myDOMElement, createjs.DOMElement);

			/**
			 * @override
			 *
			 * Overrides default createjs DOMElement.
			 *
			 * overrides _handleDrawEnd
			 * 
			 */

			p._handleDrawEnd = function(evt) {
				var o = this.htmlElement;
				if (!o) { return; }
				var style = o.style;

				// ftslo insert dpr into calculations for css matrix
				var dprFactor = window.devicePixelRatio;		
				
				var props = this.getConcatenatedDisplayProps(this._props), mtx = props.matrix;
				
				var visibility = props.visible ? "visible" : "hidden";
				if (visibility != style.visibility) { style.visibility = visibility; }
				if (!props.visible) { return; }
				
				var oldProps = this._oldProps, oldMtx = oldProps&&oldProps.matrix;
				var n = 10000; // precision
				
				if (!oldMtx || !oldMtx.equals(mtx)) {
					var str = "matrix(" + ((mtx.a)/dprFactor*n|0)/n +","+ ((mtx.b)/dprFactor*n|0)/n +","+ ((mtx.c)/dprFactor*n|0)/n +","+ ((mtx.d)/dprFactor*n|0)/n +","+ ((mtx.tx/dprFactor)+0.5|0);
					style.transform = style.WebkitTransform = style.OTransform = style.msTransform = str +","+ ((mtx.ty/dprFactor)+0.5|0) +")";
					style.MozTransform = str +"px,"+ ((mtx.ty/dprFactor)+0.5|0) +"px)";
					if (!oldProps) { oldProps = this._oldProps = new createjs.DisplayProps(true, NaN); }
					oldProps.matrix.copy(mtx);

					// console.log("mtx.ty: "+mtx.ty);  // y value
					// console.log("mtx.tx: "+mtx.tx);  // x value			
				}

				if (oldProps.alpha != props.alpha) {
					style.opacity = ""+(props.alpha*n|0)/n;
					oldProps.alpha = props.alpha;
				}
			};
			 
			createjs.DOMElement = createjs.promote(myDOMElement, "DOMElement");


			// create event to dispatch when ready
			var event = new CustomEvent(
				"message", 
				{
					detail		: 	"ready",
					bubbles		: 	true,
					cancelable	: 	true
				}
			);

			this.dispatchEvent(event);

		}
		
		return {
				hiDPI_adjustment : _hiDPI_adjustment
			}
		//hiDPI_adjustment();
	}

	hiDPIFix = new HiDPI_fix();
}())


