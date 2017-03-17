var isTouchDevice = 'ontouchstart' in document.documentElement,
    enterAction = isTouchDevice ? "click" : "mouseenter",
    exitAction = isTouchDevice ? "click" : "mouseleave";

function addListenerToHTMLCollection (els, event, func) {
    // adds event listeners for "event" on "els" with the handler "func"
    for (i = 0; i < els.length; i += 1) {
	els[i].addEventListener(event, func);
    }
}

function toggleText(event) {
    var text = event.target.nextElementSibling;
    text.classList.toggle("hidden");
}

function swapImage (event) {
    event.target.children[0].classList.toggle("hidden");
    event.target.children[1].classList.toggle("hidden");
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
addListenerToHTMLCollection(
    projectsWithAlts, exitAction, both(swapImage, toggleText));
