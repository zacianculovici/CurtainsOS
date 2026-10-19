function loadWindowPositions() {
    const windowPositions = JSON.parse(localStorage.getItem('windowPositions')) || {};
    for (const winid in windowPositions) {
        const position = windowPositions[winid];
        const appWindow = document.querySelector(`app-window[winid="${winid}"]`);
        const windowElement = appWindow?.shadowRoot?.querySelector('.window');
        if (windowElement) {
            windowElement.style.left = position.left;
            windowElement.style.top = position.top;
        }
    }
}

function saveWindowPositions() {
    const windowPositions = {};
    const appWindows = document.querySelectorAll('app-window');
    appWindows.forEach(appWindow => {
        const winid = appWindow.getAttribute('winid');
        const windowElement = appWindow.shadowRoot?.querySelector('.window');
        if (windowElement) {
            const computedStyle = window.getComputedStyle(windowElement);
            const left = windowElement.style.left || computedStyle.left;
            const top = windowElement.style.top || computedStyle.top;
            windowPositions[winid] = {
                left: left,
                top: top
            };
        }
        console.log(`Saved position for window ${winid}: left=${windowPositions[winid].left}, top=${windowPositions[winid].top}`);
        console.log(appWindow.style);
    });
    localStorage.setItem('windowPositions', JSON.stringify(windowPositions));
}

function loadWindowStates() {
    const windowStates = JSON.parse(localStorage.getItem('windowStates')) || {};
    for (const winid in windowStates) {
        const state = windowStates[winid];
        const appWindow = document.querySelector(`app-window[winid="${winid}"]`);
        const windowElement = appWindow?.shadowRoot?.querySelector('.window');
        if (windowElement) {
            windowElement.style.visibility = state.visible ? 'visible' : 'hidden';
            windowElement.style.zIndex = state.zIndex;
        }
    }
}

function saveWindowStates() {
    const windowStates = {};
    const appWindows = document.querySelectorAll('app-window');
    appWindows.forEach(appWindow => {
        const winid = appWindow.getAttribute('winid');
        const windowElement = appWindow.shadowRoot?.querySelector('.window');
        if (windowElement) {
            windowStates[winid] = {
                visible: windowElement.style.visibility === 'visible',
                zIndex: windowElement.style.zIndex
            };
        }
    });
    localStorage.setItem('windowStates', JSON.stringify(windowStates));
}

document.addEventListener('DOMContentLoaded', () => {
    loadWindowPositions();
    loadWindowStates();
});

window.addEventListener('beforeunload', () => {
    saveWindowPositions();
    saveWindowStates();
    console.log('Window positions saved to localStorage.');
});
