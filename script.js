const musica = document.getElementById('musica');
const botao = document.getElementById('playButton');

// Tenta tocar automaticamente ao carregar a página
window.addEventListener('load', () => {
  musica.play().then(() => {
    botao.style.display = 'none'; // Esconde o botão se tocou com sucesso
  }).catch(() => {
    console.log("Autoplay bloqueado. Clique no botão para tocar a música.");
  });
});

function tocarMusica() {
  musica.play();
  botao.style.display = 'none';
}
