var isTouchDevice = 'ontouchstart' in document.documentElement,
    enterAction = isTouchDevice ? "click" : "mouseenter",
    leaveAction = isTouchDevice ? "click" : "mouseleave";
function addListenerToHTMLCollection (els, event, func) {
    // adds event listeners for "event" on "els" with the handler "func"
    for (i = 0; i < els.length; i += 1) {
	els[i].addEventListener(event, func)
    }
}



function swapEventTargetAttribute(attrA, attrB) {
    return function (event) {
	var a = event.target.getAttribute(attrA);
	event.target.setAttribute(attrA, event.target.getAttribute(attrB));
	event.target.setAttribute(attrB, a);
    }
}

var swapImage = swapEventTargetAttribute("src", "data-alt-src");
// get all the project imageelements with alt images and attach the event listeners to them
var projectsWithAlts = Array.prototype.filter.call(
    document.getElementsByClassName("swap"),
    function (el) { return el.nodeName === "IMG" && el.getAttribute("data-alt-src") !== null; });
// mouseover events from projects change the image to it's alt
addListenerToHTMLCollection(projectsWithAlts, enterAction, swapImage);
// mouseexit events from projects change the alt image back to the original
addListenerToHTMLCollection(projectsWithAlts, leaveAction, swapImage);

function swapVisibility (el1, el2) {
    return function (event) {
	el1Style = el1.style.display;
	el1.style.display = el2.style.display;
	el2.style.display = el1Style;
    }
}

var text = document.getElementById("logo-text");
var logo = document.getElementById("logo");

var swapAbout = swapVisibility(text, logo);
var aboutSection = document.getElementById("about")
aboutSection.addEventListener(enterAction, swapAbout);
aboutSection.addEventListener(leaveAction, swapAbout);
