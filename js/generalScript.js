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

function gotoPage() {
    var url = document.getElementById('gotoInput').value;
    if (url && !url.startsWith('javascript:')) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://google.com/search?q=' + url;
        }
        document.getElementById('curtainOverlay').classList.remove('is-open'); setTimeout(() => { window.location.href = url; }, 1500);
    } else {
        // run the javascipt code in the input field
        try {
            eval(url);
            if (confirm('Well done! You hacked it! Do you want to continue?')) {
                // rickroll the user. nice job if u found this, you are a hacker! :D
                document.getElementById('curtainOverlay').classList.remove('is-open'); setTimeout(() => { window.location.href = 'https://zacianculovici.github.io/rrr/'; }, 1500);
            }
        } catch (e) {
            console.error(e);
        }
    }
}