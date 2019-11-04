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

window.onload = function init() {
    let textArea = document.createElement('textarea');
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
        document.querySelector("body > div").appendChild(row);
    }

    for (let i = 0; i < russianKeyboard.length; i++) {
        let key = document.createElement('div');
        key.setAttribute('data-keyCode', keyCode[i]);
        key.innerHTML = russianKeyboard[i];
        if (russianKeyboard[i] == 'Backspace') key.className = 'keyboard__backspace'
        else if (russianKeyboard[i] == 'Tab') key.className = 'keyboard__tab'
        else if (russianKeyboard[i] == 'Caps Lock') key.className = 'keyboard__caps-lock'
        else if (russianKeyboard[i] == 'Enter') key.className = 'keyboard__enter'
        else if (russianKeyboard[i] == 'Shift') key.className = 'keyboard__shift'
        else if (russianKeyboard[i] == 'Space') key.className = 'keyboard__space'
        key.classList.add('key');
        if (i < 14) document.querySelector("body > div > div:nth-child(1)").appendChild(key);
        else if (i < 28) document.querySelector("body > div > div:nth-child(2)").appendChild(key);
        else if (i < 41) document.querySelector("body > div > div:nth-child(3)").appendChild(key);
        else if (i < 53) document.querySelector("body > div > div:nth-child(4)").appendChild(key);
        else document.querySelector("body > div > div:nth-child(5)").appendChild(key);
    }

    let language = document.createElement('div');
    language.className = 'language';
    language.innerHTML = 'Change language: ';
    document.body.appendChild(language);
    language = document.createElement('select');
    document.querySelector("body > div.language").appendChild(language);
    language = document.createElement('option');
    language.innerHTML = 'Rus';
    document.querySelector("body > div.language > select").appendChild(language);
    language = document.createElement('option');
    language.innerHTML = 'Eng';
    document.querySelector("body > div.language > select").appendChild(language);
    changeLang();
    keyboardInput();
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
                key[i].innerHTML = russianKeyboard[i];
            }
        }
        else if (this.value == 'Eng') {
            for (let i = 0; i < englishKeyboard.length; i++) {
                let key = document.getElementsByClassName('key');
                key[i].innerHTML = englishKeyboard[i];
            }
        }
        localStorage.setItem('lang', this.value);
    })
}

function keyboardInput() {
    let select = document.getElementsByClassName('key');
    let textArea = document.getElementsByClassName('input');
    for (let i = 0; i < select.length; i++) {
        select[i].addEventListener('click', function() {
            if (select[i].textContent == 'Backspace') textArea[0].value;
            else if (select[i].textContent == 'Space') textArea[0].value += ' '
            else if (select[i].textContent == 'Caps Lock') {
                for(let i = 0; i < select.length; i++) {
                    select[i].classList.toggle('key__uppercase');
                }
            }
            else textArea[0].value += select[i].textContent; 
        })
    }
}
