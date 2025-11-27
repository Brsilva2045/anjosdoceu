// Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Ano automático no footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Galeria (grid com filtro + lightbox)
const galleryItems = [
  { src: "assets/galeria-01.jpg", category: "sub-15", alt: "Treino Sub-15" },
  { src: "assets/galeria-02.jpg", category: "sub-17", alt: "Amistoso Sub-17" },
  { src: "assets/galeria-03.jpg", category: "sub-20", alt: "Partida Sub-20" },
  { src: "assets/galeria-04.jpg", category: "futsal", alt: "Treino de futsal" },
  { src: "assets/galeria-05.jpg", category: "sub-15", alt: "Jogo Sub-15" },
  { src: "assets/galeria-06.jpg", category: "sub-17", alt: "Preparação Sub-17" },
  { src: "assets/galeria-07.jpg", category: "sub-20", alt: "Finalização Sub-20" },
  { src: "assets/galeria-08.jpg", category: "sub-17", alt: "Campo Sub-17" },
  { src: "assets/galeria-09.jpg", category: "futsal", alt: "Treino de futsal" },
  { src: "assets/galeria-10.jpg", category: "sub-15", alt: "Partida Sub-15" },
  { src: "assets/galeria-11.jpg", category: "sub-20", alt: "Aquecimento Sub-20" },
  { src: "assets/galeria-12.jpg", category: "sub-17", alt: "Dia de jogo Sub-17" },
];

const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");

const renderGallery = (filter = "all") => {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = "";
  const filtered = galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.dataset.category = item.category;
    card.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy" />
      <span class="gallery-tag">${item.category.replace("-", " ")}</span>
    `;
    card.addEventListener("click", () => openLightbox(item));
    galleryGrid.appendChild(card);
  });
};

const openLightbox = (item) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightbox.classList.add("show");
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("show");
};

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
    closeLightbox();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") closeLightbox();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.filter);
  });
});

renderGallery();

// Instagram embed (rota posts manualmente)
const instagramFeed = document.getElementById("instagramFeed");
const instagramPosts = [
  "https://www.instagram.com/p/C2UlDqfuQ-w/?img_index=1",
  "https://www.instagram.com/p/DLIiMPlM3KR/",
  "https://www.instagram.com/p/DQ3y7-tjeLh/",
];

if (instagramFeed) {
  const instagramScript = document.createElement("script");
  instagramScript.src = "https://www.instagram.com/embed.js";
  instagramScript.async = true;
  document.body.appendChild(instagramScript);

  if (!instagramPosts.length) {
    instagramFeed.innerHTML = `<p class="instagram-placeholder">Adicione links de posts recentes do Instagram no arquivo <code>app.js</code>.</p>`;
  } else {
    instagramFeed.innerHTML = "";
    instagramPosts.forEach((url) => {
      const post = document.createElement("blockquote");
      post.className = "instagram-media";
      post.setAttribute("data-instgrm-permalink", url);
      post.setAttribute("data-instgrm-version", "14");
      post.style.margin = "0";
      instagramFeed.appendChild(post);
    });

    const tryProcess = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      } else {
        setTimeout(tryProcess, 200);
      }
    };
    tryProcess();
  }
}
