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
          // Adding animation effect on filter change
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