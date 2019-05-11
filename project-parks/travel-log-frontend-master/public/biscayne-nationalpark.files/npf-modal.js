/*

National Park Foundation Modal Code
- Detects if the user is using a mobile browser and if not, displays the newsletter modal signup form
- Assumes jQuery has already loaded on the page
- Assumes jQuery Cookies plugin has already loaded on the page

Created By: Trevor Cole
Original Date: April 2, 2015

Modifications;
DATE		NAME		DESC
2015/04/02	Trevor Cole Initial Release
2016/03/23	Trevor Cole	Changed URL to SSL and changed e.origin for "handshaking"
*/

var isMobile = {
    Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

if( !isMobile.any() ) {
	jQuery(document).ready(function() {
		// This page hosts a modal that will require a postMessage from NPF so we must listen for it
		window.addEventListener("message", function(e){
			if ( e.origin !== "https://donate.nationalparks.org" )
				return;
			console.log(e);
			if ( e.data == 'closeModal'){
				jQuery.colorbox.close();
			} else {
				alert('invalid message');
			}
		}, false);
		if (jQuery.cookie('npf_newsletter_shown') == null) {
			jQuery.cookie('npf_newsletter_shown', 'yes', { expires: 30, path: '/' });
			jQuery.colorbox({
				fixed:true, 
				iframe:true, 
				transition:'none', 
				title:'National Park Foundation', 
				scrolling:true, 
				returnFocus:true, 
				trapFocus:true, 
				width:"620", 
				height:"580",  
				maxWidth:'95%', 
				maxHeight:'95%',  
				href:'https://donate.nationalparks.org/page/25557/data/1'
			});
		}
	});
}