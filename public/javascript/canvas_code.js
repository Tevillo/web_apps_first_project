//toDo:
// Make square Outline
// make image move

console.log("here");

window.addEventListener("load", loadHandler);

let canvas = document.getElementById("RangeFinder");
let parent = document.getElementById("canvas_container");

canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

let context = canvas.getContext("2d");
let image_main = document.getElementById("img1");
let image_other = document.getElementById("img1_dist");

var middle_x = canvas.width / 2;
var middle_y = canvas.height / 2;

class Focus_Image {
    xPos = middle_x - 450;
    yPos = middle_y - 250;

    constructor(img, isFocus) {
        this.img = img;
        this.focus = isFocus;
        this.draw();
    }

    draw() {
        if (!this.focus) {
            context.drawImage(this.img, this.xPos, this.yPos, 900, 500)
        } else {
            context.drawImage(this.img, this.xPos + 100, this.yPos, 900, 500)
        }
    }

    move(x) {
        this.xPos = x;
    }

}

function focus(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;

    // Actions based on click coordinates
    console.log('Click at x: ' + x );
     
}

function loadHandler(event) {
    main_image = new Focus_Image(image_main, false); //main Image
    focus_image = new Focus_Image(image_other, true); //focus Image
    canvas.addEventListener("mousedown",focus);
}
