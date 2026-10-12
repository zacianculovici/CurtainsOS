function initializeWindowDrag(window) {
    var initialX=0, initialY=0, offsetX=0, offsetY=0;
    if (window.querySelector(".window-header")) {
        window.querySelector(".window-header").addEventListener("mousedown", startDrag);
    } else {
        window.addEventListener("mousedown", startDrag);
    }

    function startDrag(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDrag;
        document.onmousemove = dragWindow;
        window.querySelector(".window-header").style.cursor = "grabbing";
    }

    function dragWindow(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        window.style.top = (window.offsetTop - currentY) + "px";
        window.style.left = (window.offsetLeft - currentX) + "px";
    }

    function stopDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
        window.querySelector(".window-header").style.cursor = "grab";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".window").forEach(function(window) {
        initializeWindowDrag(window);
    });
});


function openWindow(windowId) {
    var window = document.getElementById(windowId);
    if (window) {
        window.style.display = "block";
        window.style.zIndex = 1000; // Bring the window to the front
    }
}

function closeWindow(windowId) {
    var window = document.getElementById(windowId);
    if (window) {
        window.style.display = "none";
    }
}
