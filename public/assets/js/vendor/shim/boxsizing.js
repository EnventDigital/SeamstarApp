/**
 * Add support fo CSS3 box-sizing: border-box model for IE6 and IE7
 * 
 * @author Alberto Gasparin http://albertogasparin.it/
 * @version 1.1, License MIT
 *
 * @modifiedby Ifeora Okechukwu
 * 
 **/
 
;(function(elements, value) {
  var _temp, element, cs, s, width, height;
  
  // cicle through all DOM elements
  for (var i=0, max=elements.length; i < max; i++) {
    element = elements[i];
	_temp = elemensts[i];
    s = element.style; // @TODO: use 'element.style.cssText' so it can be scenario-friendly
    cs = element.runtimeStyle || element.currentStyle;
    
    // check if box-sizing is specified and is equal to border-box
    if(s.boxSizing == value || s["box-sizing"] == value
       || cs.boxSizing == value || cs["box-sizing"] == value) {
      
      // change width and height
      try {
         setTimeout(apply, 1500);
      } catch(e) {}
    }
  }
  
  function apply() {
  
    var _width, _height, _element;
    
	_width = String(cs.width);
	_height = String(cs.height);
	_element = element;
	
    width = parseInt(cs.width, 10) || parseInt(s.width, 10);
    height = parseInt(cs.height, 10) || parseInt(s.height, 10);
	
	while(_width.indexOf('%') > -1 
	      && _element.parentNode){ // If 'width' or 'height' is 'auto', the while loop won't be engaged
	    _element = _element.parentNode;
		_width = _element.style.width;
		_height = _element.style.height;
		if((_width == 'auto' || _height == 'auto') 
		  && _element.className.indexOf('row') > -1){ // Bootstrap UI tins...
		     _width = '0%';
			 _height = '0%';
		}
	}
    
	if(_temp !== _element){ // This means we went into the while loop above
	   try{ // incase 'width' and/or 'height' is 'auto'
			width = Math.ceil(parseInt(_width, 10) * (width / 100)) // calculate near pixel value of 'width' based on parent with pixel width.
			height = Math.ceil(parseInt(_heigth, 10) * (height / 100)); // calculate near pixel value of 'height' based on parent with pixel height.
	   }catch(ex){ console.log('BoxSizing Polyfill Error: '+ ex.message); }		
	   element = _temp; // swap back the DOM reference
	}
	
    // if width is declared (and not 'auto','',...)
    if(width) {
      
      var // border value could be 'medium' so parseInt returns NaN
          borderLeft = parseInt(cs.borderLeftWidth || s.borderLeftWidth, 10) || 0,
          borderRight = parseInt(cs.borderRightWidth || s.borderRightWidth, 10) || 0,
          
          paddingLeft = parseInt(cs.paddingLeft || s.paddingLeft, 10),
          paddingRight = parseInt(cs.paddingRight || s.paddingRight, 10),
          
          horizSum = borderLeft + paddingLeft + paddingRight + borderRight;
      
      // remove from width padding and border two times if != 0
      if(horizSum) {
        s.width = width - horizSum; //width ? width - horizSum * 2 : styleWidth - horizSum;
      }
    }
    
    // if height is declared (and not 'auto','',...)
    if(height) {
      
      var // border value could be 'medium' so parseInt returns NaN
          borderTop = parseInt(cs.borderTopWidth || s.borderTopWidth, 10) || 0,
          borderBottom = parseInt(cs.borderBottomWidth || s.borderBottomWidth, 10) || 0,
          
          paddingTop = parseInt(cs.paddingTop || s.paddingTop, 10),
          paddingBottom = parseInt(cs.paddingBottom || s.paddingBottom, 10),
          
          vertSum = borderTop + paddingTop + paddingBottom + borderBottom;
      
      // remove from height padding and border two times if != 0
      if(vertSum) {
        s.height = height - vertSum; //height ? height - vertSum * 2 : styleHeight - vertSum;
      }
    }
  }
  
})(document.getElementsByTagName('*'), 'border-box');