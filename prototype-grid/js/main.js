var isTouchDevice = 'ontouchstart' in document.documentElement,
    enterAction = isTouchDevice ? "click" : "mouseenter",
    exitAction = isTouchDevice ? "click" : "mouseleave";

function addListenerToHTMLCollection (els, event, func) {
    // adds event listeners for "event" on "els" with the handler "func"
    for (i = 0; i < els.length; i += 1) {
	els[i].addEventListener(event, func)
    }
}

function swapEventTargetAttribute(attrA, attrB) {
    return function (event) {
        console.log("click");
	var a = event.target.getAttribute(attrA);
	event.target.setAttribute(attrA, event.target.getAttribute(attrB));
	event.target.setAttribute(attrB, a);
    }
}

function isImageWithAlt (el) {
    return el.nodeName === "IMG" && el.getAttribute("data-alt-src") !== null;
}

var swapImage = swapEventTargetAttribute("src", "data-alt-src");

// get all the project imageelements with alt images and attach the event listeners to them
var projectsWithAlts = Array.prototype.filter.call(
    document.getElementsByClassName("swap"),
    isImageWithAlt);

// mouseover events from projects change the image to it's alt
addListenerToHTMLCollection(projectsWithAlts, enterAction, swapImage);

if (enterAction !== exitAction) {
    // mouseexit events from projects change the alt image back to the original
    addListenerToHTMLCollection(projectsWithAlts, exitAction, swapImage);
}
