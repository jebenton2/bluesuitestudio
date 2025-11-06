// Simplified JavaScript - Navigation and basic functionality

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  // Navigation toggle
  const navButtons = document.querySelectorAll('.nav-toggle');
  const navMenus = document.querySelectorAll('.nav-menu');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Find the nav menu - could be in navbar, navbar1_component, or nav
      const navbar = this.closest('.navbar1_component, .navbar, .nav');
      const menu = navbar ? navbar.querySelector('.nav-menu') : null;
      if (menu) {
        menu.classList.toggle('is-open');
        this.classList.toggle('is-active');
        // Prevent body scroll when menu is open
        if (menu.classList.contains('is-open')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.navbar1_component, .navbar, .nav')) {
      navMenus.forEach(menu => {
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
      navButtons.forEach(btn => btn.classList.remove('is-active'));
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          navMenus.forEach(menu => menu.classList.remove('is-open'));
          navButtons.forEach(btn => btn.classList.remove('is-active'));
        }
      }
    });
  });

  // Form submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const successMsg = this.querySelector('.form-success');
      const errorMsg = this.querySelector('.form-error');
      
      // Basic validation
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (isValid) {
        // Show success message (in real implementation, submit to server)
        if (successMsg) {
          successMsg.style.display = 'block';
          this.style.display = 'none';
        }
        // Reset form after 3 seconds
        setTimeout(() => {
          this.reset();
          if (successMsg) successMsg.style.display = 'none';
          this.style.display = 'block';
        }, 3000);
      } else {
        if (errorMsg) {
          errorMsg.style.display = 'block';
          setTimeout(() => {
            errorMsg.style.display = 'none';
          }, 3000);
        }
      }
    });
  });

  // Background video handling
  const bgVideos = document.querySelectorAll('.bg-video');
  bgVideos.forEach(video => {
    const videoElement = video.querySelector('video');
    if (videoElement) {
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.play().catch(() => {
        // Autoplay failed, show poster image
        const poster = videoElement.getAttribute('poster');
        if (poster) {
          video.style.backgroundImage = `url(${poster})`;
        }
      });
    }
  });
});

