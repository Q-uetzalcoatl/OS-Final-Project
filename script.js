// --- THE MATRIX RAIN EFFECT ---
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

// Make canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Japanese Katakana + Latin + Numbers
const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

// Array for drops
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

const draw = () => {
    // Translucent black for trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Green Text
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
};

setInterval(draw, 30);

// Fix canvas size if window is resized
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// --- SOUNDS & INTERACTIVITY ---
const clickSound = document.getElementById("clickSound");
const bootSound = document.getElementById("bootSound");

// Start System Button
const startBtn = document.getElementById("startBtn");
if (startBtn) {
    startBtn.addEventListener("click", () => {
        if(bootSound) bootSound.play().catch(e => console.log("Audio error:", e));
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    });
}

// Terminal Diagnostics Button
const diagBtn = document.getElementById("diagBtn");
if (diagBtn) {
    diagBtn.addEventListener("click", () => {
        // Reset and play click sound
        if(clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log("Audio error:", e));
        }

        const box = document.getElementById("terminalBox");
        box.innerText = "> INITIALIZING DIAGNOSTIC...\n";

        const msg = [
            "Kernel Integrity... [OK]",
            "Memory Blocks... [SECURE]",
            "User Permissions... [ROOT]",
            "System Status... [ONLINE]"
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i >= msg.length) {
                clearInterval(interval);
                return;
            }
            box.innerText += "> " + msg[i] + "\n";
            i++;
        }, 600);
    });
}
