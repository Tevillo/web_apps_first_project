//toDo:
// Lever to move img
// Instrutions and reasoning
// Buttons to take photo
// Rating of image focus
// Camera lens lookthrough
// Shutter Effect?


console.log("here");

window.addEventListener("load", loadHandler);

let canvas = document.getElementById("Rangefinder");
let parent = document.getElementById("canvas_container");

canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

let context = canvas.getContext("2d");
let image_main = document.getElementById("openheimer_front");
let image_other = document.getElementById("openheimer_back");


var middle_x = canvas.width / 2;
var middle_y = canvas.height / 2;

class Focus_Image {
    xPos = middle_x - 450;
    yPos = middle_y - 250;

    constructor(img, isBack) {
        this.img = img;
        this.isBack = isBack
        if (!isBack) {
            this.xPos += 100;
        }
        this.draw();
    }

    draw() {
        if (this.isBack) {
            context.drawImage(this.img, this.xPos, this.yPos, 900, 500); //last two do not change
        } else {
            context.globalAlpha = 0.4;
            context.drawImage(this.img, this.xPos, this.yPos, 900, 500); //last two do not change
            context.globalAlpha = 1;
        }
    }

    move(x) {
        this.xPos = x;
        this.draw();
    }

}
var drag = false;
var starting_point = 0;
var starting_click = 0;

function startFocus(event) {
    drag = true;    
    starting_point = focus_image.xPos;
    const rect = canvas.getBoundingClientRect();
    starting_click = event.clientX - rect.left;
    console.log(drag);
    console.log(starting_point);
}
function stopFocus(event) {
    drag = false;    
    console.log(drag);
    console.log(focus_image.xPos);
}

function focus(event) {
    if (drag) {
        const rect = canvas.getBoundingClientRect();
        const initial_x = event.clientX - rect.left;
        let x = initial_x - starting_click + starting_point; 
        if (x > middle_x - 650 && x < middle_x - 250) { //middle x - 450 is the left point, so 200 +-
            // Actions based on click coordinates
            context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
            main_image.draw();
            focus_image.move(x);
        }
    }
}

function changeImage(name) {
    image_main = document.getElementById(name + "_front");
    image_other = document.getElementById(name + "_back");
    button = document.getElementById(name + "_button");
    activate(button);

    context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
    main_image = new Focus_Image(image_main, true); //main Image
    focus_image = new Focus_Image(image_other, false); //focus Image
}

const party_button = document.getElementById("party_button");
const openheimer_button = document.getElementById("openheimer_button");
const cute_button = document.getElementById("cute_button");

function activate(a) {
    party_button.setAttribute('style', 'background-color: #115740');
    openheimer_button.setAttribute('style', 'background-color: #115740');
    cute_button.setAttribute('style', 'background-color: #115740');
    a.setAttribute('style', 'background-color: #117040;');

}

function loadHandler(event) {
    main_image = new Focus_Image(image_main, true); //main Image
    focus_image = new Focus_Image(image_other, false); //focus Image
    canvas.addEventListener("mousedown", startFocus);
    canvas.addEventListener('mousemove', focus);
    canvas.addEventListener('mouseup', stopFocus)
}
