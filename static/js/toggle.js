var body = document.body;
var switcher = document.getElementsByClassName('js-toggle')[0];
var darkCSSFilePath = "css/style-dark.css"
var classicCSSFilePath = "css/style-classic.css"

//Click on dark mode icon. Add dark mode classes and wrappers. Store user preference through sessions
switcher.addEventListener("click", function() {
    this.classList.toggle('js-toggle--checked');
    this.classList.add('js-toggle--focus');
    //If dark mode is selected
    if (this.classList.contains('js-toggle--checked')) {
        // body.classList.add('dark-mode');
        changeCSS(getThemeCSSPath("dark"))
        //Save user preference in storage
        localStorage.setItem('darkMode', 'true');
    } else {
        changeCSS(getThemeCSSPath("classic"))
        // body.classList.remove('dark-mode');
        setTimeout(function() {
            localStorage.removeItem('darkMode');
        }, 100);
    }
})

function isUserAtHome() {
    window.homepagecheck = function() {
        var check = false;
        if(document.location.pathname === "/"){
            check=true;
            }
        return check;
        }
    return window.homepagecheck()
}

function getThemeCSSPath(cssTheme){
    var path = "";
    if (!isUserAtHome()) {
        path = "../";
    }

    if (cssTheme == "dark") {
        return path + darkCSSFilePath;
    } else {
        return path + classicCSSFilePath;
    }

}

function changeCSS(cssFile) {
    if (document.getElementById("theme-css")) {
        var oldlink = document.getElementById("theme-css");
        oldlink.href = cssFile
    }
}

//Check Storage. Keep user preference on page reload
if (localStorage.getItem('darkMode')) {
    changeCSS(getThemeCSSPath("dark"))
    //body.classList.add('dark-mode');
    switcher.classList.add('js-toggle--checked');
    body.classList.add('dark-mode');
}else {
    changeCSS(getThemeCSSPath("classic"))
}