function initializeWindows(anyWindow) {
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
        initializeWindows(window);
    });
});


function openWindow(windowId) {
    var window = document.getElementById(windowId);
    if (window) {
        window.style.display = "block";
        window.style.zIndex = 999; // Bring the window to the front
    }
}

function closeWindow(windowId) {
    var window = document.getElementById(windowId);
    if (window) {
        window.style.display = "none";
        window.style.zIndex = 0; // Reset the z-index
    }
}
