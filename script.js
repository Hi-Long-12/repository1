const spawnButton = document.getElementById('spawnButton');
const saveButton = document.getElementById('saveButton');
const buttonContainer = document.getElementById('buttonContainer');

let buttonCounter = 0;

function spawnNewButton() {
    const newButton = document.createElement('button');
    buttonCounter++;
    newButton.innerText = 'Nút ' + buttonCounter;
    newButton.classList.add('draggable');
    newButton.style.left = '0px';
    newButton.style.top = '0px';

    newButton.onmousedown = function (event) {
        dragElement(newButton, event);
    };

    newButton.ondblclick = function () {
        editButtonName(newButton);
    };

    buttonContainer.appendChild(newButton);
}

function editButtonName(button) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = button.innerText;
    button.replaceWith(input);
    input.focus();

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            button.innerText = input.value;
            input.replaceWith(button);
        }
    });

    input.addEventListener('blur', function () {
        button.innerText = input.value;
        input.replaceWith(button);
    });
}

function dragElement(element, event) {
    event.preventDefault();
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
    };
}

function savePage() {
    const buttons = document.querySelectorAll('.draggable');
    let pageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lưu trang web</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div id="buttonContainer">`;

    buttons.forEach(button => {
        const text = button.innerText;
        const left = button.style.left;
        const top = button.style.top;

        pageContent += `<button class="draggable" style="left: ${left}; top: ${top};">${text}</button>\n`;
    });

    pageContent += `
    </div>

    <script src="script.js"></script>
</body>
</html>
`;

    const blob = new Blob([pageContent], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'saved_page.html';
    a.click();
}

spawnButton.onclick = spawnNewButton;
saveButton.onclick = savePage;
