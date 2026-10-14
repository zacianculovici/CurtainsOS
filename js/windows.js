class AppWindow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['title', 'startopened', 'contentstyle'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot) {
            const titleSpan = this.shadowRoot.querySelector('.window-title');
            if (titleSpan) {
                titleSpan.textContent = newValue;
            }
            if (name === 'contentstyle') {
                const windowContent = this.shadowRoot.querySelector('.window-content');
                if (windowContent) {
                    windowContent.setAttribute('style', newValue);
                }
            }
        }
    }

    render() {
        // Renders directly into the main page's DOM tree
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../style.css">
            <div id="${this.getAttribute('id')}" class="window"${
                this.getAttribute('startopened') === 'true' ? ' style="visibility: visible !important;"' : ''
            }>
                <div class="window-header no-select">
                    <span class="window-title">${this.getAttribute('title')}</span>
                    <button class="close-button"><img class="close-icon" src="../assets/images/close.svg" alt="Close"></button>
                </div>
                <div class="window-content" style="${this.getAttribute('contentstyle') || ''}">
                    <slot></slot>
                </div>
            </div>
        `;
        console.log(this.shadowRoot.styleSheets.length);
    }
}

customElements.define('app-window', AppWindow);

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
    var elements = document.querySelectorAll("app-window");
    elements.forEach(function(element) {
        initializeWindow(element.shadowRoot.querySelector(".window"));
        element.shadowRoot.querySelector(".window-header").querySelector(".close-button").addEventListener("click", function() {
            console.log("Close button clicked for window: " + element.getAttribute('id'));
            closeWindow(element.getAttribute('id'));
        });
        element.shadowRoot.querySelector(".window").addEventListener("mousedown", function() {
            console.log("Window clicked: " + element.getAttribute('id'));
            element.shadowRoot.querySelector(".window").style.zIndex = 910; // Bring the clicked window to the front
            elements.forEach(function(otherElement) {
                if (otherElement !== element) {
                    otherElement.shadowRoot.querySelector(".window").style.zIndex = 900; // Reset z-index for other windows
                }
            });
        });
    });
});

function openWindow(windowId) {
    var myWindow = document.getElementById(windowId).shadowRoot.querySelector(".window");
    if (myWindow) {
        myWindow.style.visibility = "visible"; // Show the window
        myWindow.style.zIndex = 900; // Bring the window to the front
        if (windowId !== "window-1") {
            console.log("Randomizing position for window: " + windowId);
            myWindow.style.top = (Math.random() * (window.innerHeight - myWindow.offsetHeight - document.querySelector("#top-bar").offsetHeight)) + document.querySelector("#top-bar").offsetHeight + "px";
            myWindow.style.left = (Math.random() * (window.innerWidth - myWindow.offsetWidth)) + "px";
        }
    }
}

function closeWindow(windowId) {
    var window = document.getElementById(windowId).shadowRoot.querySelector(".window");
    console.log(window);
    if (window) {
        window.style.visibility = "hidden"; // Hide the window
        window.style.zIndex = 0; // Reset the z-index
    }
}
