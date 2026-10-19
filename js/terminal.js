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
});
