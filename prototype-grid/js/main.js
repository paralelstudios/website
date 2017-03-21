var isTouchDevice = "ontouchstart" in document.documentElement,
    enterAction = isTouchDevice ? "touchend" : "mouseenter",
    exitAction = isTouchDevice ? null : "mouseleave";

function addListenerToHTMLCollection (els, event, func) {
    // adds event listeners for "event" on "els" with the handler "func"
    for (i = 0; i < els.length; i += 1) {
	els[i].addEventListener(event, func);
    }
}


function getSwapElement (event) {
    // touch event's target the img, not the swap
    return event instanceof TouchEvent ? event.target.parentElement : event.target;
}

function toggleHidden (el) {
    el.classList.toggle("hidden");
}

function toggleText(event) {
    var description = getSwapElement(event).nextElementSibling;
    toggleHidden(description);
}


function swapImage (event) {
    var swapElement = getSwapElement(event),
	image = swapElement.children[0],
	altImage = swapElement.children[1];
    toggleHidden(image);
    toggleHidden(altImage);

}

function both (a, b) {
    return function (e) {
	a(e);
	b(e);
    };
}

// get all the project imageelements with alt images and attach the event listeners to them
var projectsWithAlts = document.getElementsByClassName("swap");

// mouseover events from projects change the image to it's alt
addListenerToHTMLCollection(
    projectsWithAlts, enterAction, both(swapImage, toggleText));

if (!isTouchDevice) {
    addListenerToHTMLCollection(
	projectsWithAlts, exitAction, both(swapImage, toggleText));
}
