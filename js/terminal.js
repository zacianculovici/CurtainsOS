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
- /kill @e: Kill all entities
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
    }
}

function my_open(args) {
    const terminalInput = document.getElementById('terminalInput');
    if (args.length === 0) {
        terminalInput.value += '\nPlease specify an application to open.';
        return;
    }
    const appName = args[0].toLowerCase();
    const appWindow = document.querySelector(`app-window[winid="${appName}-window"]`);
    if (appWindow) {
        openWindow(appName);
        terminalInput.value += `\nOpened ${appName}.`;
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

var commands = {
    "help": help,
    "echo": echo,
    "info": info,
    "open": my_open,
    "rr": rr,
    "re": re,
    "clear": clear,
    "shutdown": shutdown,
    // "/kill @e": kill,
    // "js": js,
    // "knockknock": knockknock,
    // "whyyyyy": whyyyyy,
    // "deleteme": deleteme,
    // "orph": orph,
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
