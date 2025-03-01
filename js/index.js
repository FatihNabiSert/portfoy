const canvas = document.getElementById("background-effect");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < this.size/2 || this.x > canvas.width - this.size/2) this.speedX *= -1;
        if (this.y < this.size/2 || this.y > canvas.height - this.size/2) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function getDist (a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < particles.length; index++) {
        let particle = particles[index];
        for (let other = index+1; other < particles.length; other++) {
            let other_particle = particles[other];

            let dist = getDist(particle, other_particle);

            if (dist < 130) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other_particle.x, other_particle.y);

                ctx.stroke();
            }

        }
    }

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.length = 0;
    init();
});