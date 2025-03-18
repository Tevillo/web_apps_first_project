//toDo:
// Instrutions and reasoning

window.addEventListener("load", loadHandler);

let canvas = document.getElementById("Rangefinder");
let parent = document.getElementById("canvas_container");

canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

let context = canvas.getContext("2d");
let image_main = document.getElementById("party_front");
let image_other = document.getElementById("party_back");


var middle_x = canvas.width / 2;
var middle_y = canvas.height / 2;
const size_y = canvas.height;
const size_x = size_y * 1.8;
const origin_x = middle_x - (size_x / 2);
const origin_y = middle_y - (size_y / 2);

class Lever {
    lever_width = size_y / 2;
    lever_height = size_y / 10;
    angle;
    xPos = origin_x - this.lever_width; //make it seem like lever is inside camera
    yPos = middle_y;
    localY;
    range = canvas.height * .9;
    conversion = this.range / 150;

    constructor(y) {
        this.localY = y;
        this.angle = 125 - (y / this.conversion); 
        context.fillStyle = '#C0C0C0';
        this.draw();
    }

    draw() {
        context.save();
        context.translate(origin_x + (size_x / 15), this.yPos); ///15 so lever is not too far inside image
        context.rotate((this.angle + 135) * Math.PI / 180);
        context.fillRect(0,0, this.lever_width, this.lever_height);
        context.restore();
    }
    setAngle(y) {
        this.angle = 125 - (y / this.conversion);
        this.localY = y;
        this.draw();
    }
    inSquare(x, y) {
        return (x > this.xPos && x < this.xPos + this.lever_width && this.inBounds(y))  //only works if you click in the levers area
    }
    inBounds(y) {
        return (y < this.range + 20 && y > canvas.height - this.range -20) //plus and minus 20 for leeway
    }

}

class Focus_Image {
    xPos = origin_x;
    yPos = origin_y;
    range;

    constructor(img, isBack,start) {
        this.img = img;
        this.isBack = isBack
        if (!isBack) {
            this.range = size_x / 4;
            this.xPos += start - this.range;
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
var rand = 0;
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
        let x = origin_x - focus_image.range + initial_y + lever.range - size_y; 
        if (lever.inBounds(initial_y)) { //300 +- so the 2nd image does not move to far
            // Actions based on click coordinates
            context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
            lever.setAngle(initial_y);
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
    let result = Math.floor((1 - (diff / focus_image.range)) * 100);
    result_screen.setAttribute('style','display: block');
    result_answer.textContent = "You got a score of " + result + "!";
}

function reset() {
    result_screen.setAttribute('style','display: none');
    rand = Math.random() * (size_x / 2);
    context.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
    lever.setAngle(rand);
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
    rand = Math.random() * (size_x / 2);
    lever = new Lever(rand);
    main_image = new Focus_Image(image_main, true,rand); //main Image
    focus_image = new Focus_Image(image_other, false,rand); //focus Image
    canvas.addEventListener("mousedown", startFocus);
    canvas.addEventListener('mousemove', focus);
    canvas.addEventListener('mouseup', stopFocus)
}
