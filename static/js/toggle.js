var body = document.body;
var switcher = document.getElementsByClassName('js-toggle')[0];

//Click on dark mode icon. Add dark mode classes and wrappers. Store user preference through sessions
switcher.addEventListener("click", function() {
    this.classList.toggle('js-toggle--checked');
    this.classList.add('js-toggle--focus');
    //If dark mode is selected
    if (this.classList.contains('js-toggle--checked')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        //Save user preference in storage
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'classic');
        localStorage.setItem('theme', 'classic');
    }
})