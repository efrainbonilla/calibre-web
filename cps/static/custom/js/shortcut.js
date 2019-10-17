document.onkeydown = function (e) {
    e = e || window.event;//Get event
    if (e.ctrlKey) {
        var c = e.which || e.keyCode;//Get key code
        switch (c) {
            case 80://Block Ctrl+P
                return false;
            case 83://Block Ctrl+S
            case 87://Block Ctrl+W --Not work in Chrome
                e.preventDefault();
                e.stopPropagation();
            break;
        }
    }
};
document.oncontextmenu = function(e) {
    e.preventDefault();

    return false;
};

