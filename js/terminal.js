reWords = [
  "reabsorb",
  "react",
  "read",
  "ready",
  "real",
  "reason",
  "rebuild",
  "recenter",
  "recipe",
  "recognize",
  "reconnect",
  "record",
  "recover",
  "recycle",
  "reduce",
  "refer",
  "reflect",
  "reform",
  "refresh",
  "refund",
  "regard",
  "region",
  "regret",
  "regular",
  "rehearse",
  "reign",
  "reinforce",
  "reject",
  "rejoice",
  "relapse",
  "relate",
  "relax",
  "release",
  "reliable",
  "relief",
  "relieve",
  "religion",
  "relish",
  "reload",
  "relocate",
  "reluctant",
  "rely",
  "remain",
  "remember",
  "remind",
  "remote",
  "removal",
  "remove",
  "render",
  "renew",
  "renovate",
  "rent",
  "reopen",
  "reorder",
  "repair",
  "repay",
  "repeat",
  "replace",
  "reply",
  "report",
  "represent",
  "request",
  "require",
  "rescue",
  "research",
  "reserve",
  "resign",
  "resist",
  "resolve",
  "respect",
  "respond",
  "restore",
  "result",
  "retain",
  "retire",
  "return",
  "reveal",
  "review",
  "revise",
  "revive",
  "reward",
  "rewrite"
]

function help() {
    const helpText = `
Available commands:
- help: Show this help message
- echo [text]: Echo the provided text
- info: Display information about the system
- open [appname]: Open the specified application
- rr: You'll have to find out
- re: Spit out a random word starting with "re"
- shutdown: Shut down the system
- js [code]: Execute JavaScript code
- knockknock: Who's there?
- whyyyyyy: ANGER...
- deleteme: Delete you. Probably breaks the entire system. Are you gonna try it?...
- orph: W ORPHEUS!!!`;

    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value += helpText;
}

function echo(args) {
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value += '\n' + args.join(' ');
}
function info() {
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value += '\nCurtainsOS v2.0\nDeveloped by Zac Ianculovici\nAll rights reserved.';
}

function openWindow(windowId) {
    var myWindow = null;
    document.querySelectorAll("app-window").forEach(window => {
        console.log(window);
        var id = window.getAttribute("winid");
        if (id === windowId) {
            myWindow = window.shadowRoot.querySelector(".window");
        }
    });
    if (myWindow) {
        myWindow.rotation += 2 * 360;
        myWindow.style.transform = `rotate(${myWindow.rotation}deg) scale(1)`;
        myWindow.style.visibility = "visible"; // Show the window
        myWindow.style.zIndex = 900; // Bring the window to the front
        if (windowId !== "welcome-window" && localStorage.getItem("windowPositions") === null) {
            myWindow.style.top = (Math.random() * (window.innerHeight - myWindow.offsetHeight - document.querySelector("#top-bar").offsetHeight)) + document.querySelector("#top-bar").offsetHeight + "px";
            myWindow.style.left = (Math.random() * (window.innerWidth - myWindow.offsetWidth)) + "px";
        }
    } else {
        console.error(`Window with ID "${windowId}" not found.`);
        return false;
    }
    return true;
}

function my_open(args) {
    const terminalInput = document.getElementById('terminalInput');
    if (args.length === 0) {
        terminalInput.value += '\nPlease specify an application to open.';
        return;
    }
    const appName = args[0].toLowerCase() + '-window';
    const appWindow = document.querySelector(`app-window[winid="${appName}"]`);
    if (appWindow) {
        if (!openWindow(appName)) {
            terminalInput.value += `\nFailed to open ${appName}.`;
        } else {
            terminalInput.value += `\nOpened ${appName}.`;
        }
    } else {
        terminalInput.value += `\nApplication "${appName}" not found.`;
    }
}

function rr() {
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value += '\nPrepare to be rickrolled...';
    closeWindow('terminal-window');
    setTimeout(() => {
        document.location.href = 'https://zacianculovici.github.io/rrr/';
    }, 1000);
}

function re() {
    const terminalInput = document.getElementById('terminalInput');
    const randomIndex = Math.floor(Math.random() * reWords.length);
    const randomWord = reWords[randomIndex];
    terminalInput.value += `\n${randomWord}`;
}

function clear() {
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value = '';
}

function shutdown() {
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value += '\nShutting down...';
    document.getElementById('curtainOverlay').classList.remove('is-open');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1500);
}

function js(args) {
    const terminalInput = document.getElementById('terminalInput');
    const code = args.join(' ');
    try {
        const result = eval(code);
        terminalInput.value += `\nResult: ${result}`;
    } catch (error) {
        terminalInput.value += `\nError: ${error.message}`;
    }
}

function knockknock() {
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value += '\nWho\'s there?';
}

function whyyyyy() {
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value += '\nArghhhh!';
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function deleteChildElements(element) {
    while (element.firstChild) {
        if (element.firstChild.firstChild) {
            await deleteChildElements(element.firstChild);
            await delay(100);
        }
        if (element.computedStyleMap().get('visibility').toString() !== 'hidden' && element.computedStyleMap().get('display').toString() !== 'none') {
            element.removeChild(element.firstChild);
            await delay(100);
        } else {
            element.removeChild(element.firstChild);
        }
    }
}

async function deleteme() {
    const terminalInput = document.getElementById('terminalInput');
    await document.querySelector('body').querySelectorAll('*').forEach(async (element) => {
        await deleteChildElements(element);
    });
    terminalInput.value += '\nAll elements deleted.';
    await delay(5000);
    document.location.href = '../html/run.html';
}

async function orph() {
    const terminalInput = document.getElementById('terminalInput');
    terminalInput.value += '\nW ORPHEUS!!!';
    let delayTime = 500; // Initial delay time in milliseconds
    for (let i = 0; i < 1000; i++) {
        const orphElement = document.createElement('img');
        orphElement.src = '../assets/images/orph.png';
        orphElement.alt = 'Orpheus';
        orphElement.style.position = 'fixed';
        orphElement.style.bottom = Math.random() * window.innerHeight - 100 + 'px';
        orphElement.style.right = Math.random() * window.innerWidth - 100 + 'px';
        orphElement.style.width = '100px';
        orphElement.style.height = '100px';
        orphElement.style.zIndex = '9999';
        orphElement.style.cursor = 'pointer';
        orphElement.addEventListener('click', () => {
            orphElement.remove();
            if (document.querySelectorAll('img[alt="Orpheus"]').length === 0) {
                terminalInput.value += '\n*Gasp*!\nYou brutally slaughtered all the Orpheus clones!\nYou\nAre\nEvilll!\n$CurtainsOS > ';
            }
        });
        document.body.appendChild(orphElement);
        await delay(delayTime);
        delayTime = delayTime / 1.1;
    }
}

var commands = {
    "help": help,
    "echo": echo,
    "info": info,
    "open": my_open,
    "rr": rr,
    "re": re,
    "clear": clear,
    "shutdown": shutdown,
    "js": js,
    "knockknock": knockknock,
    "whyyyyy": whyyyyy,
    "deleteme": deleteme,
    "orph": orph,
}

function executeCommand(command) {
    console.log(`Executing command: ${command}`);
    if (!command) {
        return;
    }
    const terminalInput = document.getElementById('terminalInput');
    const args = command.split(' ');
    const cmd = args.shift();
    
    if (commands[cmd]) {
        console.log(`Found command: ${cmd}, executing with args: ${args}`);
        commands[cmd](args);
    } else {
        terminalInput.value += `\nCommand not found: ${cmd}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminalInput');

    function lockCursorToEnd() {
        const length = terminalInput.value.length;

        if (terminalInput.selectionStart !== length || terminalInput.selectionEnd !== length) {
            terminalInput.setSelectionRange(length, length);
        }
    }

    document.addEventListener('selectionchange', () => {
        if (document.activeElement === terminalInput) {
            lockCursorToEnd();
        }
    });

    terminalInput.addEventListener('mousedown', () => {
        lockCursorToEnd();
    });

    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = terminalInput.value.slice(terminalInput.value.lastIndexOf('$CurtainsOS > ') + 14, terminalInput.value.length).trim();
            executeCommand(command);
            if (command !== 'clear') {
                terminalInput.value += '\n';
            }
            terminalInput.value += '$CurtainsOS > ';
            lockCursorToEnd();
            terminalInput.scrollTop = terminalInput.scrollHeight;
        } else if (event.key === 'Backspace') {
            event.preventDefault();
            const currentValue = terminalInput.value;
            const lastPromptIndex = currentValue.lastIndexOf('$CurtainsOS > ');
            if (lastPromptIndex !== -1) {
                const commandStartIndex = lastPromptIndex + 14;
                if (terminalInput.selectionStart > commandStartIndex) {
                    const newValue = currentValue.slice(0, terminalInput.selectionStart - 1) + currentValue.slice(terminalInput.selectionEnd);
                    terminalInput.value = newValue;
                    terminalInput.setSelectionRange(terminalInput.selectionStart - 1, terminalInput.selectionStart - 1);
                }
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const lastPromptIndex = terminalInput.value.lastIndexOf('$CurtainsOS > ');
            const secondLastPromptIndex = terminalInput.value.lastIndexOf('$CurtainsOS > ', lastPromptIndex - 1);
            if (lastPromptIndex !== -1 && secondLastPromptIndex !== -1) {
                const previousCommand = terminalInput.value.slice(secondLastPromptIndex + 14, lastPromptIndex).trim();
                terminalInput.value += previousCommand.split('\n')[0];
                lockCursorToEnd();
            }
        }
    });
});
