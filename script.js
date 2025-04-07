let highestZ = 1;
let musicaTocando = false;
const musica = document.getElementById("musica");

function tocarMusica() {
  if (!musicaTocando) {
    musica.play().then(() => {
      musicaTocando = true;
    }).catch((error) => {
      console.error("Erro ao tocar música:", error);
    });
  }
}

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;
  }

  init(paper) {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (!this.rotating) {
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dx = e.clientX - this.mouseTouchX;
      const dy = e.clientY - this.mouseTouchY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const normX = dx / distance;
      const normY = dy / distance;
      const angle = Math.atan2(normY, normX);
      let degrees = (360 + Math.round(angle * 180 / Math.PI)) % 360;

      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      e.preventDefault(); // evita abrir o menu com botão direito
      tocarMusica();

      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;

      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
