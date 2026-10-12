function updateTime() {
    document.querySelector('#time-top-bar').textContent = new Date().toLocaleString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}
setInterval(updateTime, 1000);
