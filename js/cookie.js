// Functions to interact with cookies

function setCookie(name, value, expire = '') {
    document.cookie = `${name}=${value}; ${expire !== '' ? `expires=${expire.toUTCString()}; ` : ''}`;
}

function getCookie(name) {
    let decoded = decodeURIComponent(document.cookie);
    let cookies = decoded.split(';');
    for (let c of cookies) {
        c = c.trim();
        if (c.split('=')[0] === name) {
            return c.split('=')[1];
        }
    }
    return '';
}