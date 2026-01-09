// Background matrix canvas animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let drops = [];
const fontSize = 14;
const columns = canvas.width / fontSize;

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff41";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = String.fromCharCode(0x30A0 + Math.random() * 96);
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) drops[i] = 0;

    drops[i]++;
  }
}
setInterval(drawMatrix, 35);

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Sounds
const clickSound = document.getElementById("clickSound");
const bootSound = document.getElementById("bootSound");

// Start button scroll and sound
document.getElementById("startBtn").addEventListener("click", () => {
  clickSound.play();
  document.getElementById("whatKernel").scrollIntoView({ behavior: "smooth" });
});

// Terminal diagnostic typing effect
document.getElementById("diagBtn").addEventListener("click", () => {
  bootSound.play();
  const box = document.getElementById("terminalBox");
  const message = [
    "> Boot sequence initiated...",
    "> Checking kernel modules...",
    "> Verifying memory access...",
    "> Scheduling processes...",
    "> Kernel status: ONLINE and STABLE"
  ];

  box.innerHTML = "";
  let line = 0;

  function typeLine() {
    if (line >= message.length) return;
    let charIndex = 0;
    const current = message[line];
    const interval = setInterval(() => {
      box.innerHTML += current[charIndex];
      charIndex++;
      if (charIndex === current.length) {
        clearInterval(interval);
        box.innerHTML += "<br>";
        line++;
        setTimeout(typeLine, 300);
      }
    }, 30);
  }
  typeLine();
});
