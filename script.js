// Filtering functionality
const filterButtons = document.querySelectorAll('.filters button');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and add to current
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = 1;
        }, 100);
      } else {
        item.style.opacity = 0;
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Search functionality: Filter gallery items based on search query in image alt text
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  galleryItems.forEach(item => {
    const imgAlt = item.querySelector('img').alt.toLowerCase();
    if (imgAlt.includes(query)) {
      item.style.display = 'block';
      setTimeout(() => {
        item.style.opacity = 1;
      }, 100);
    } else {
      item.style.opacity = 0;
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevArrow = document.querySelector('.prev');
const nextArrow = document.querySelector('.next');
const downloadBtn = document.getElementById('download-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');

let currentIndex = 0;
// Create an array from gallery items for navigation
const images = Array.from(document.querySelectorAll('.gallery-item img'));

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = 'block';
  updateLightbox();
}

function updateLightbox() {
  const imgElement = images[currentIndex];
  lightboxImg.src = imgElement.src;
  captionText.innerText = imgElement.alt;
}

// Open lightbox when image is clicked
images.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Next and previous functionality
nextArrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
});

prevArrow.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
});

// Download functionality
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = lightboxImg.src;
  link.download = lightboxImg.alt || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Fullscreen functionality
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    lightboxImg.requestFullscreen().catch(err => {
      alert(`Error attempting full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', e => {
  if (lightbox.style.display === 'block') {
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    } else if (e.key === 'Escape') {
      lightbox.style.display = 'none';
    }
  }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
