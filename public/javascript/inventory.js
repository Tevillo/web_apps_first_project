function grey_image(x) {       
    let c,n;
    switch (x) {
        case 1:
            c = document.getElementById("camera_1");
            n = document.getElementById("notes_1");
            break;
        case 2:
            c = document.getElementById("camera_2");
            n = document.getElementById("notes_2");
            break;
        case 3:
            c = document.getElementById("camera_3");
            n = document.getElementById("notes_3");
            break;
    }
    c.style.filter = "grayscale(100%)";
    c.style.opacity = ".2";
    n.style.color = "rgba(0,0,0,1)"
}
function normal_image(x) {
    let c,n;
    switch (x) {
        case 1:
            c = document.getElementById("camera_1");
            n = document.getElementById("notes_1");
            break;
        case 2:
            c = document.getElementById("camera_2");
            n = document.getElementById("notes_2");
            break;
        case 3:
            c = document.getElementById("camera_3");
            n = document.getElementById("notes_3");
            break;
    }
    c.style.filter = "grayscale(0%)";
    c.style.opacity = "1";
    n.style.color = "rgba(0,0,0,0)"
}