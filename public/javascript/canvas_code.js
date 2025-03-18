//toDo:
// Instrutions and reasoning

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
const size_x = 1200;
const size_y = 667;
const origin_x = middle_x - (size_x / 2);
const origin_y = middle_y - (size_y / 2);

class Lever {
    lever_width = 300;
    lever_height = 50;
    angle;
    xPos = origin_x - this.lever_width; //make it seem like lever is inside camera
    yPos = middle_y;
    localY;

    constructor(y) {
        this.localY = y;
        this.angle = 125 - (y / 4.8); 
        context.fillStyle = '#C0C0C0';
        this.draw();
    }

    draw() {
        context.save();
        context.translate(origin_x + 40, this.yPos);
        context.rotate((this.angle + 117.5) * Math.PI / 180);
        context.fillRect(0,0, this.lever_width, this.lever_height);
        context.restore();
    }
    setAngle(angle,y) {
        this.angle = 125 - (y / 4.8);
        this.localY = y;
        this.draw();
    }
    inSquare(x, y) {
        return (x > this.xPos && x < this.xPos + this.lever_width) && (y > this.localY - 50 && y < this.localY + 50 + this.lever_height) //only works if you click in the levers area
    }
}

class Focus_Image {
    xPos = origin_x;
    yPos = origin_y;
    constructor(img, isBack,start) {
        this.img = img;
        this.isBack = isBack
        if (!isBack) {
            this.xPos += start - 300;
        }
        this.draw();
    }

    draw() {
        if (this.isBack) {
            context.drawImage(this.img, this.xPos, this.yPos, size_x, size_y); //last two do not change
        } else {
            context.globalAlpha = 0.4;
            context.drawImage(this.img, this.xPos, this.yPos, size_x, size_y); //last two do not change
            context.globalAlpha = 1;
        }
    }

    move(x) {
        this.xPos = x;
        this.draw();
    }
}

var drag = false;
var rand = Math.random() * (600);
var starting_point = 0;
var starting_click = 0;

function startFocus(event) {
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top;
    if (lever.inSquare(x,y)) { //only works if you click in the levers area
        drag = true;    
        starting_point = focus_image.xPos;
        starting_click = event.clientY - rect.top;
    }
 }
function stopFocus(event) {
    drag = false;    
}

function focus(event) {
    if (drag) {
        const initial_y = Math.floor(event.clientY - rect.top);
        let x = origin_x - 300 + initial_y - 30; 
        if (initial_y < 630 && initial_y > 30) { //300 +- so the 2nd image does not move to far
            // Actions based on click coordinates
            context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
            lever.setAngle(initial_y, initial_y);
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
    reset();
}

function snapPhoto() {
    let diff = Math.abs(focus_image.xPos - main_image.xPos);
    console.log(diff);
    let result = Math.floor((1 - (diff / 300)) * 100);
    console.log(result);
    result_screen.setAttribute('style','display: block');
    result_answer.textContent = "You got a score of " + result + "!";
}

function reset() {
    result_screen.setAttribute('style','display: none');
    rand = Math.random() * (600);
    context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
    lever.setAngle(0,rand + 20);
    main_image = new Focus_Image(image_main, true,rand); //main Image
    focus_image = new Focus_Image(image_other, false,rand); //focus Image
}

const rect = canvas.getBoundingClientRect();
const party_button = document.getElementById("party_button");
const openheimer_button = document.getElementById("openheimer_button");
const cute_button = document.getElementById("cute_button");
const result_screen = document.getElementById("result_screen");
const result_answer = document.getElementById("results");

function activate(a) {
    party_button.setAttribute('style', 'background-color: #115740');
    openheimer_button.setAttribute('style', 'background-color: #115740');
    cute_button.setAttribute('style', 'background-color: #115740');
    a.setAttribute('style', 'background-color: #117040;');
}

function loadHandler(event) {
    lever = new Lever(rand);
    main_image = new Focus_Image(image_main, true,rand); //main Image
    focus_image = new Focus_Image(image_other, false,rand); //focus Image
    canvas.addEventListener("mousedown", startFocus);
    canvas.addEventListener('mousemove', focus);
    canvas.addEventListener('mouseup', stopFocus)
}
