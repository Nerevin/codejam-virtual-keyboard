const russianKeyboard = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift',
'Ctrl', 'Win', 'Alt', 'Space', 'AltGr', 'Win', 'OS', 'Ctrl'];

const englishKeyboard = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift',
'Ctrl', 'Win', 'Alt', 'Space', 'AltGr', 'Win', 'OS', 'Ctrl'];

const keyCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
'ControlLeft', 'OSLeft', 'AltLeft', 'Space', 'AltRight', 'OSRight', 'ContextMenu', 'ControlRight'];

const languageValue = ['Rus', 'Eng'];
let shiftKey = false;
let altKey = false;

window.onload = function init() {
    const rows = [];
    const textArea = document.createElement('textarea');
    textArea.className = 'input';
    textArea.setAttribute('rows', '6');
    textArea.setAttribute('cols', '60');
    textArea.setAttribute('autofocus', '');
    textArea.addEventListener('blur', textArea.focus);
    document.body.appendChild(textArea);

    let wrapper = document.createElement('div');
    wrapper.className = 'keyboard';
    document.body.appendChild(wrapper);

    for (let i = 0; i < 5; i++) {
        let row = document.createElement('div');
        row.className = 'keyboard__row';
        rows.push(row);
    }

    for (let i = 0; i < russianKeyboard.length; i++) {
        let key = document.createElement('div');
        key.setAttribute('data-keyCode', keyCode[i]);
        if (localStorage.getItem('lang') == 'Eng') key.textContent = englishKeyboard[i]
        else key.textContent = russianKeyboard[i]
        if (key.textContent == 'Backspace') key.className = 'keyboard__backspace'
        else if (key.textContent == 'Tab') key.className = 'keyboard__tab'
        else if (key.textContent == 'Caps Lock') key.className = 'keyboard__caps-lock'
        else if (key.textContent == 'Enter') key.className = 'keyboard__enter'
        else if (key.textContent == 'Shift') key.className = 'keyboard__shift'
        else if (key.textContent == 'Space') key.className = 'keyboard__space'
        key.classList.add('key');
        if (i < 14) rows[0].appendChild(key);
        else if (i < 28) rows[1].appendChild(key);
        else if (i < 41) rows[2].appendChild(key);
        else if (i < 53) rows[3].appendChild(key);
        else rows[4].appendChild(key);
    }

    for (let i = 0; i < rows.length; i++) {
        document.querySelector("body > div").appendChild(rows[i]);
    }

    let language = document.createElement('div');
    let select = document.createElement('select');
    language.className = 'language';
    language.textContent = 'Change language: ';
    language.appendChild(select);
    for (let i = 0; i < languageValue.length; i++) {
        let option = document.createElement('option');
        option.textContent = languageValue[i]
        select.appendChild(option);
    }
    document.body.appendChild(language);
    let langText = document.createElement('div');
    langText.textContent = 'To change language press left Shift and left Alt';
    document.body.appendChild(langText);
    if (localStorage.getItem('lang') == 'Eng')  select.selectedIndex = 1;
    changeLang();
    keyboardInput();
    changeLangKey();
}

document.addEventListener('keydown', function(event){
    let key = document.getElementsByClassName('key');
    if (event.code == 'ShiftLeft' || event.code == 'ShiftRight')  {
        for(let i = 0; i < key.length; i++) {
            key[i].classList.add('key__uppercase');
        }
    }
    if (event.code == 'CapsLock') {
        for(let i = 0; i < key.length; i++) {
            key[i].classList.toggle('key__uppercase');
        }
    }
    for(let i = 0; i < key.length; i++) {
        if (key[i].getAttribute('data-keyCode') == event.code) key[i].classList.add('key__keydown');
    }
});

document.addEventListener('keyup', function(event){
    shiftKey = false;
    altKey = false;
    event.preventDefault();
    let key = document.getElementsByClassName('key');
    if (event.code == 'ShiftLeft' || event.code == 'ShiftRight')  {
        for(let i = 0; i < key.length; i++) {
            key[i].classList.remove('key__uppercase');
        }
    }
    for(let i = 0; i < key.length; i++) {
        if (key[i].getAttribute('data-keyCode') == event.code) key[i].classList.remove('key__keydown');
    }
});

function changeLang() {
    let select = document.querySelector('body > div.language > select');
    select.addEventListener('change', function() {
        if (this.value == 'Rus') {
            for (let i = 0; i < russianKeyboard.length; i++) {
                let key = document.getElementsByClassName('key');
                key[i].textContent = russianKeyboard[i];
            }
        }
        else if (this.value == 'Eng') {
            for (let i = 0; i < englishKeyboard.length; i++) {
                let key = document.getElementsByClassName('key');
                key[i].textContent = englishKeyboard[i];
            }
        }
        localStorage.setItem('lang', this.value);
    })
}

function changeLangKey() {
    document.addEventListener('keydown', function(event) {
        let select = document.querySelector('body > div.language > select');
        if (event.code == 'ShiftLeft') shiftKey = true;
        else if (event.code == 'AltLeft') altKey = true;
        if (shiftKey && altKey){ if (select.value == 'Rus') {
            select.value = 'Eng';
            for (let i = 0; i < englishKeyboard.length; i++) {
                let key = document.getElementsByClassName('key');
                key[i].textContent = englishKeyboard[i];
            }
        }
        else {
            select.value = 'Rus';
            for (let i = 0; i < russianKeyboard.length; i++) {
                let key = document.getElementsByClassName('key');
                key[i].textContent = russianKeyboard[i];
            }
        }
        localStorage.setItem('lang', select.value);
    }
    })
}

function keyboardInput() {
    const select = document.getElementsByClassName('keyboard');
    const textArea = document.getElementsByClassName('input');
    select[0].addEventListener('click', function() {
        let target = event.target;
        if (target.textContent == 'Backspace') textArea[0].value
        else if (target.textContent == 'Space') textArea[0].value += ' '
        else if (target.textContent == 'Caps Lock') select[0].classList.toggle('key__uppercase')
        else if (target.className !== 'key') return
        else textArea[0].value += target.textContent; 
    })
}
