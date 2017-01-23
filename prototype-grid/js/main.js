function addListenerToHTMLCollection (els, event, func) {
    // adds event listeners for "event" on "els" with the handler "func"
    for (i = 0; i < els.length; i += 1) {
	els[i].addEventListener(event, func)
    }
}



function swapEventTargetAttribute(attrA, attrB) {
    return function (event) {
	var a = event.target.getAttribute(attrA);
	var b = event.target.getAttribute(attrB);
	event.target.setAttribute(attrA, b);
	event.target.setAttribute(attrB, a);
    }
}

var swapImage = swapEventTargetAttribute("src", "data-alt-src");
// get all the project imageelements with alt images and attach the event listeners to them
var projectsWithAlts = Array.prototype.filter.call(
    document.getElementsByClassName("project"),
    function (el) { return el.nodeName === "IMG" && el.getAttribute("data-alt-src") !== null; });
// mouseover events from projects change the image to it's alt
addListenerToHTMLCollection(projectsWithAlts, "mouseenter", swapImage);
// mouseexit events from projects change the alt image back to the original
addListenerToHTMLCollection(projectsWithAlts, "mouseleave", swapImage);
