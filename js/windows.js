function initializeWindow(anyWindow) {
    var initialX=0, initialY=0, offsetX=0, offsetY=0;
    if (anyWindow.querySelector(".window-header")) {
        anyWindow.querySelector(".window-header").addEventListener("mousedown", startDrag);
    } else {
        anyWindow.addEventListener("mousedown", startDrag);
    }

    function startDrag(e) {
        e = e || anyWindow.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDrag;
        document.onmousemove = dragWindow;
        anyWindow.querySelector(".window-header").style.cursor = "grabbing";
    }

    function dragWindow(e) {
        e = e || anyWindow.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        anyWindow.style.top = Math.min(Math.max((anyWindow.offsetTop - currentY), document.querySelector("#top-bar").offsetHeight), window.innerHeight - anyWindow.offsetHeight) + "px";
        anyWindow.style.left = Math.min(Math.max((anyWindow.offsetLeft - currentX), 0), window.innerWidth - anyWindow.offsetWidth) + "px";
    }

    function stopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
        anyWindow.querySelector(".window-header").style.cursor = "grab";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".window").forEach(function(window) {
        initializeWindow(window);
        window.querySelector(".window-header").querySelector(".close-button").addEventListener("click", function() {
            closeWindow(window.id);
        });
        window.addEventListener("mousedown", function() {
            console.log("Window clicked: " + window.id);
            window.style.zIndex = 910; // Bring the clicked window to the front
            document.querySelectorAll(".window").forEach(function(otherWindow) {
                if (otherWindow !== window) {
                    otherWindow.style.zIndex = 900; // Reset z-index for other windows
                }
            });
        });
    });
});

function openWindow(windowId) {
    var myWindow = document.getElementById(windowId);
    if (myWindow) {
        myWindow.style.visibility = "visible"; // Show the window
        myWindow.style.zIndex = 900; // Bring the window to the front
        if (windowId !== "window-1") {
            console.log("Randomizing position for window: " + windowId);
            myWindow.style.top = (Math.random() * (window.innerHeight - myWindow.offsetHeight - document.querySelector("#top-bar").offsetHeight)) + document.querySelector("#top-bar").offsetHeight + "px";
            myWindow.style.left = (Math.random() * (window.innerWidth - myWindow.offsetWidth)) + "px";
            // Hey github copilot, how to make sure the window doesn't go onto the top bar during randomization? I want to make sure the window is always fully visible on the screen, even if the user has resized their browser window.
            // Of course! You can ensure that the window doesn't overlap with the top bar by adjusting the randomization logic to account for the height of the top bar. Here's how you can do it:
            // var topBarHeight = document.querySelector("#top-bar").offsetHeight;
            // myWindow.style.top = (Math.random() * (window.innerHeight - myWindow.offsetHeight - topBarHeight)) + topBarHeight + "px";
        }
    }
}

function closeWindow(windowId) {
    var window = document.getElementById(windowId);
    if (window) {
        window.style.visibility = "hidden"; // Hide the window
        window.style.zIndex = 0; // Reset the z-index
    }
}
