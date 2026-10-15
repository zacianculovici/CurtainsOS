document.addEventListener("DOMContentLoaded", function() {
    let clickCount = 0;
    let clickTimer = null;

    const RESET_TIME = 500;
    const HINT_CLICKS = 7;
    const REQUIRED_CLICKS = 10;
    var welcomeWindow = null;
    document.querySelectorAll("app-window").forEach(window => {
        var id = window.getAttribute("winid");
        if (id === "welcome-window") {
            welcomeWindow = window.shadowRoot.querySelector(".window");
        }
    });
    welcomeWindow.querySelector(".window-header").addEventListener("click", function() {
        clickCount++;
        if (clickCount === HINT_CLICKS) {
            welcomeWindow.style.border = "2px dashed #ff0000";
        }
        if (clickCount === REQUIRED_CLICKS) {
            alert("You found an Easter Egg! Keep exploring!");
            clickCount = 0;
            welcomeWindow.style.border = "1px solid #000";
        } else {
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
                welcomeWindow.style.border = "1px solid #000";
            }, RESET_TIME);
        }
    });
});
