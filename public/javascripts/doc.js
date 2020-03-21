fetch('/docs').then(e => e.text()).then(e => {
    document.getElementById("docs").innerHTML = e;
});