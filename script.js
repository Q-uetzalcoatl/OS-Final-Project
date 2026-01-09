// Background canvas animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];

for (let i = 0; i < 60; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  });
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff41";

  dots.forEach(d => {
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();

// Sound effects
const clickSound = document.getElementById("clickSound");
const bootSound = document.getElementById("bootSound");

// Start button
document.getElementById("startBtn").addEventListener("click", () => {
  bootSound.play();
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
});

// Diagnostics terminal
document.getElementById("diagBtn").addEventListener("click", () => {
  clickSound.play();

  const box = document.getElementById("terminalBox");
  box.innerText = "> Running diagnostic...\n";

  let msg = [
    "Kernel detected",
    "Memory map stable",
    "Process scheduler active",
    "System secure",
    "All systems online"
  ];

  let i = 0;
  let interval = setInterval(() => {
    if (i >= msg.length) {
      clearInterval(interval);
      return;
    }
    box.innerText += msg[i] + "\n";
    i++;
  }, 500);
});
