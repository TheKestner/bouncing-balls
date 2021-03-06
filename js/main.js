// canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerWidth;

// Function for random number generator

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function for random color generator

function randomRGB() {
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`;
}

// Create ball class and functions to draw the ball / update ball data to move position

class Ball {

    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
            // checks to see if ball is going off the right edge

        if ((this.x + this.size) >= width){
            this.velX = -(this.velX);
        }
            // checks to see if ball is going off the left edge

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
            // checks to see if ball is going off the bottom edge

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
            // checks to see if ball is going off the top edge

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

        // checks to see if two different balls pass through one another
        // if true then changes to randomRGB color
    collisionDetect() {
        for (const ball of balls) {
            if(!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

// Array to store balls to be animated to the canvas

const balls = [];

while (balls.length < 25) {
    const size = random(10,20);
    const ball = new Ball(
        // ball position always drawn at least one ball width
        //away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7,7),
        random(-7,7),
        randomRGB(),
        size    
    );

     balls.push(ball);
    }

// animation loop

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();