const russianKeyboard = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift',
'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'OS', 'Ctrl'];

const englishKeyboard = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift',
'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'OS', 'Ctrl'];

function init() {
    let textArea = document.createElement('textarea');
    textArea.className = 'input';
    textArea.setAttribute('rows', '6');
    textArea.setAttribute('cols', '60');
    document.body.appendChild(textArea);

    let wrapper =document.createElement('div');
    wrapper.className = 'keyboard';
    document.body.appendChild(wrapper);

    for (let i = 0; i < 5; i++) {
        let row = document.createElement('div');
        row.className = 'keyboard__row';
        document.querySelector("body > div").appendChild(row);
    }

    for (let i = 0; i < russianKeyboard.length; i++) {
        let key = document.createElement('div');
        key.innerHTML = russianKeyboard[i];
        if (russianKeyboard[i] == 'Backspace') key.className = 'keyboard__backspace'
        else if (russianKeyboard[i] == 'Tab') key.className = 'keyboard__tab'
        else if (russianKeyboard[i] == 'Caps Lock') key.className = 'keyboard__caps-lock'
        else if (russianKeyboard[i] == 'Enter') key.className = 'keyboard__enter'
        else if (russianKeyboard[i] == 'Shift') key.className = 'keyboard__shift'
        else if (russianKeyboard[i] == 'Space') key.className = 'keyboard__space'
        else key.className = 'key'
        if (i < 14) document.querySelector("body > div > div:nth-child(1)").appendChild(key);
        else if (i < 28) document.querySelector("body > div > div:nth-child(2)").appendChild(key);
        else if (i < 41) document.querySelector("body > div > div:nth-child(3)").appendChild(key);
        else if (i < 53) document.querySelector("body > div > div:nth-child(4)").appendChild(key);
        else document.querySelector("body > div > div:nth-child(5)").appendChild(key);
    }
}

init()