// ==========================================
// CONTENIDO DEL SOBRE (Carta Inicial + 13 Fotos + Carta Final)
// ==========================================
const SLIDES = [
  // --- CARTA INICIAL ---
  {
    type: "letter",
    badge: "Carta Inicial",
    title: "Para Ti, Con Todo Mi Cariño",
    paragraphs: [
      "Quise armar este pequeño rincón digital para guardar algunos de nuestros momentos favoritos.",
      "Cada una de estas fotos tiene una canción, una historia y una sonrisa detrás. Desliza para recorrerlos juntos..."
    ],
    signature: "Con amor ❤️"
  },

  // --- LAS 13 FOTOS CON SUS FRASES Y AUTORES ---
  {
    type: "photo",
    title: "Fito Páez",
    text: "“Tengo tu amor y me basta para ser feliz.”",
    img: "./assets/foto1.jpeg"
  },
  {
    type: "photo",
    title: "Los Piojos",
    text: "“Sé que te acordás de mí, yo no me olvido más de vos.”",
    img: "./assets/foto2.jpeg"
  },
  {
    type: "photo",
    title: "Las Pastillas del Abuelo",
    text: "“Sos el paisaje más soñado y en cualquier clima te elijo.”",
    img: "./assets/foto3.jpeg"
  },
  {
    type: "photo",
    title: "Gustavo Cerati",
    text: "“Tu amor es un templo, un refugio en la tormenta.”",
    img: "./assets/foto4.jpeg"
  },
  {
    type: "photo",
    title: "Andrés Calamaro",
    text: "“Si no te tuviera a vos, el mundo sería tan gris.”",
    img: "./assets/foto5.jpeg"
  },
  {
    type: "photo",
    title: "Charly García",
    text: "“Quiero ver, quiero entrar, y ser parte de tu historia.”",
    img: "./assets/foto6.jpeg"
  },
  {
    type: "photo",
    title: "Luis Alberto Spinetta",
    text: "“Cada vez que te miro, vuelvo a creer en los milagros.”",
    img: "./assets/foto7.jpeg"
  },
  {
    type: "photo",
    title: "Fito Páez",
    text: "“Te quiero tanto que me hace daño amarte más.”",
    img: "./assets/foto8.jpeg"
  },
  {
    type: "photo",
    title: "Gustavo Cerati",
    text: "“Un amor real es lo único que nos va a salvar.”",
    img: "./assets/foto9.jpeg"
  },
  {
    type: "photo",
    title: "Andrés Calamaro",
    text: "“Brindo por las noches que me das, por tu mirada infinita.”",
    img: "./assets/foto10.jpeg"
  },

  {
    type: "photo",
    title: "Soda Stereo",
    text: "“Mereces lo que sueñas, y sos todo lo que alguna vez soñé.”",
    img: "./assets/foto11.jpeg"
  },
  {
    type: "photo",
    title: "Charly García",
    text: "“Y si mañana es como ayer otra vez, lo que fue hermoso será hermoso también.”",
    img: "./assets/foto12.jpeg"
  },
  {
    type: "photo",
    title: "Fito Páez",
    text: "“Quién dijo que todo está perdido, yo vengo a ofrecer mi corazón.”",
    img: "./assets/foto13.jpeg"
  },

  // --- CARTA FINAL ---
  {
    type: "letter",
    badge: "Carta Final",
    title: "Por Muchos Más Capítulos",
    paragraphs: [
      "Gracias por ser parte de mi vida y por cada momento compartido.",
      "Este sobre se cierra, pero nuestra historia sigue sumando recuerdos todos los días. ¡Te quiero muchísimo!"
    ],
    signature: "Siempre juntos ✨"
  }
];

// ==========================================
// LÓGICA DE LA APLICACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const waxSeal = document.getElementById("wax-seal");
  const btnMainAction = document.getElementById("btn-main-action");
  
  const slideContent = document.getElementById("slide-content");
  const slideBadge = document.getElementById("slide-badge");
  const memoryCounter = document.getElementById("memory-counter");
  const dotsIndicator = document.getElementById("dots-indicator");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  const viewLetter = document.getElementById("view-letter");
  const letterTitle = document.getElementById("letter-title");
  const letterBody = document.getElementById("letter-body");
  const letterSign = document.getElementById("letter-sign");

  const viewPhoto = document.getElementById("view-photo");
  const memoryImg = document.getElementById("memory-img");
  const memoryTitle = document.getElementById("memory-title");
  const memoryText = document.getElementById("memory-text");

  const audio = document.getElementById("local-audio");
  const btnToggleMusic = document.getElementById("btn-toggle-music");
  const musicStateText = document.getElementById("music-state-text");
  const eqIndicator = document.getElementById("eq-indicator");

  let isOpen = false;
  let currentIndex = 0;
  let userPausedManually = false;

  audio.volume = 0.3;

  function renderProgressBar(activeIdx) {
    const percent = Math.round(((activeIdx + 1) / SLIDES.length) * 100);
    dotsIndicator.innerHTML = `
      <div class="w-20 sm:w-28 h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div class="h-full bg-rose-500 rounded-full transition-all duration-300" style="width: ${percent}%"></div>
      </div>
    `;
  }

  function renderSlide(index) {
    const item = SLIDES[index];
    slideContent.style.opacity = "0";

    setTimeout(() => {
      if (item.type === "photo") {
        const photoIndex = SLIDES.slice(0, index + 1).filter(s => s.type === "photo").length;
        const totalPhotos = SLIDES.filter(s => s.type === "photo").length;
        slideBadge.textContent = `Recuerdo ${photoIndex} de ${totalPhotos}`;
      } else {
        slideBadge.textContent = item.badge;
      }

      memoryCounter.textContent = `${index + 1} / ${SLIDES.length}`;
      renderProgressBar(index);

      if (item.type === "letter") {
        viewPhoto.classList.add("hidden");
        viewLetter.classList.remove("hidden");

        letterTitle.textContent = item.title;
        letterBody.innerHTML = item.paragraphs.map(p => `<p>${p}</p>`).join("");
        letterSign.textContent = item.signature || "";
      } else {
        viewLetter.classList.add("hidden");
        viewPhoto.classList.remove("hidden");

        memoryImg.src = item.img;
        // En las fotos mostramos la frase arriba en cursiva y el autor como firma abajo
        memoryTitle.textContent = item.text;
        memoryTitle.className = "font-handwriting text-2xl sm:text-[26px] font-bold text-stone-800 leading-snug";
        memoryText.textContent = `— ${item.title}`;
        memoryText.className = "text-xs font-bold uppercase tracking-wider text-rose-600 mt-1.5";
      }

      btnPrev.disabled = index === 0;
      btnNext.textContent = index === SLIDES.length - 1 ? "Volver al inicio ↺" : "Siguiente →";

      if (isOpen && index === SLIDES.length - 1 && typeof confetti === "function") {
        confetti({ particleCount: 55, spread: 70, origin: { y: 0.6 } });
      }

      slideContent.style.opacity = "1";
    }, 150);
  }

  function playMusic() {
    audio.volume = 0.3;
    audio.play().then(() => {
      musicStateText.textContent = "Sonando";
      eqIndicator.classList.remove("opacity-40");
      eqIndicator.children[0].classList.add("animate-pulse");
      eqIndicator.children[1].classList.add("animate-ping");
      eqIndicator.children[2].classList.add("animate-pulse");
    }).catch(() => {
      musicStateText.textContent = "Toca para activar";
    });
  }

  function pauseMusic() {
    audio.pause();
    musicStateText.textContent = "Música Pausada";
    eqIndicator.classList.add("opacity-40");
    Array.from(eqIndicator.children).forEach(bar => {
      bar.classList.remove("animate-pulse", "animate-ping");
    });
  }

  playMusic();

  const unlockAudioOnFirstInteraction = () => {
    if (audio.paused && !userPausedManually) playMusic();
    document.removeEventListener("click", unlockAudioOnFirstInteraction);
    document.removeEventListener("touchstart", unlockAudioOnFirstInteraction);
  };
  document.addEventListener("click", unlockAudioOnFirstInteraction);
  document.addEventListener("touchstart", unlockAudioOnFirstInteraction);

  btnToggleMusic.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) {
      userPausedManually = false;
      playMusic();
    } else {
      userPausedManually = true;
      pauseMusic();
    }
  });

  function toggleEnvelope() {
    if (!isOpen) {
      envelope.classList.remove("envelope-closing");
      envelope.classList.add("envelope-open");
      document.body.classList.add("is-open");
      btnMainAction.textContent = "Cerrar Sobre";
      isOpen = true;

      if (typeof confetti === "function") {
        confetti({ particleCount: 75, spread: 65, origin: { y: 0.65 } });
      }

      if (audio.paused && !userPausedManually) playMusic();
    } else {
      envelope.classList.remove("envelope-open");
      envelope.classList.add("envelope-closing");
      document.body.classList.remove("is-open");
      btnMainAction.textContent = "Abrir Sobre";
      isOpen = false;
    }
  }

  btnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderSlide(currentIndex);
    }
  });

  btnNext.addEventListener("click", () => {
    if (currentIndex < SLIDES.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    renderSlide(currentIndex);
  });

  waxSeal.addEventListener("click", toggleEnvelope);
  btnMainAction.addEventListener("click", toggleEnvelope);

  renderSlide(currentIndex);
});