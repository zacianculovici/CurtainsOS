function changeBackgroundImage(event) {
    const file = event.target.files[0];
    const name = event.target.files[0].name;
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            document.body.style.backgroundImage = `url(${imageUrl})`;
        };
        reader.readAsDataURL(file);
    }
    saveBackgroundImage(name);
}

function saveBackgroundImage(name) {
    const backgroundImage = document.body.style.backgroundImage;
    localStorage.setItem('backgroundImage', backgroundImage);
    localStorage.setItem('backgroundImageName', name);
}

function loadBackgroundImage() {
    const backgroundImage = localStorage.getItem('backgroundImage');
    const backgroundName = localStorage.getItem('backgroundImageName');
    if (backgroundImage) {
        document.body.style.backgroundImage = backgroundImage;
    }
    document.getElementById('currentBackgroundImageName').textContent = backgroundName || 'No image selected';
}

document.addEventListener('DOMContentLoaded', () => {
    loadCurtainAnimationSetting();
    loadBackgroundImage();
    loadBackgroundFit();
});

function changeBackgroundFit(fit) {
    if (fit === 'Width') {
        document.getElementById('osbody').style.backgroundSize = '100% auto';
        localStorage.setItem('backgroundFit', 'Width');
    } else if (fit === 'Height') {
        document.getElementById('osbody').style.backgroundSize = 'auto 100%';
        localStorage.setItem('backgroundFit', 'Height');
    }
}

function loadBackgroundFit() {
    const backgroundFit = localStorage.getItem('backgroundFit');
    if (backgroundFit) {
        document.getElementById('osbody').style.backgroundSize = backgroundFit === 'Width' ? '100% auto' : 'auto 100%';
    }
}

function toggleCurtainAnimation() {
    const curtainAnimationCheckbox = document.getElementById('curtain-animation-toggle');
    const curtainAnimationEnabled = curtainAnimationCheckbox.checked;
    localStorage.setItem('curtainAnimationEnabled', curtainAnimationEnabled);
}

function loadCurtainAnimationSetting() {
    if (localStorage.getItem('curtainAnimationEnabled') === null) {
        localStorage.setItem('curtainAnimationEnabled', 'true');
    }
    const curtainAnimationEnabled = localStorage.getItem('curtainAnimationEnabled') === 'true';
    document.getElementById('curtain-animation-toggle').checked = curtainAnimationEnabled;
}
