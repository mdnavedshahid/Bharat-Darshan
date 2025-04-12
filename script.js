document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
  this.classList.toggle('active');
  navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
  });
  });
  
  // Booking Modal Functionality
  const bookTourBtn = document.querySelector('.book-tour-btn');
  const bookingModal = document.getElementById('bookingModal');
  const closeModal = document.querySelector('.close-modal');
  const bookingForm = document.getElementById('bookingForm');
  
  // Open modal when Book Tour button is clicked
  bookTourBtn.addEventListener('click', (e) => {
  e.preventDefault();
  bookingModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  bookingModal.scrollTo(0, 0);
  });
  
  // Close modal when X is clicked
  closeModal.addEventListener('click', () => {
  bookingModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside or pressing ESC
  window.addEventListener('click', (e) => {
  if (e.target === bookingModal) {
  bookingModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  }
  });
  
  document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
  bookingModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  }
  });
  
  // Form submission handling
  bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
  name: document.getElementById('fullName').value,
  email: document.getElementById('email').value,
  phone: document.getElementById('phone').value,
  people: document.getElementById('people').value,
  destination: document.getElementById('destination').value,
  date: document.getElementById('tourDate').value,
  message: document.getElementById('message').value,
  timestamp: new Date().toISOString()
  };
  
  try {
  // Check if Firebase is properly initialized
  if (!window.firebase || !window.firebase.addDoc || !window.firebase.db) {
  throw new Error('Firebase is not properly initialized');
  }
  
  // Save to Firestore
  const docRef = await window.firebase.addDoc(
  window.firebase.collection(window.firebase.db, "bookings"),
  formData
  );
  
  console.log("Document written with ID: ", docRef.id);
  
  // Show success
  bookingModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  
  const successPopup = document.getElementById('successPopup');
  successPopup.style.display = 'block';
  setTimeout(() => {
  successPopup.style.display = 'none';
  }, 3000);
  
  bookingForm.reset();
  } catch (error) {
  console.error("Error adding document: ", error);
  alert('Error saving booking. Please check console for details.');
  }
  });
  
  // Enhanced click effect that won't interfere with modal opening
  document.querySelector('.book-tour-btn').addEventListener('click', function(e) {
  if (!this.style.transform || this.style.transform === 'scale(1)') {
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
  this.style.transform = 'scale(1)';
  }, 200);
  }
  });
  
  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  currentSlide = (n + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  }
  
  // Auto slide change
  setInterval(() => {
  showSlide(currentSlide + 1);
  }, 3000);
  
  // Destination Filter
  const tabButtons = document.querySelectorAll('.tab-btn');
  const destinationCards = document.querySelectorAll('.destination-card');
  
  tabButtons.forEach(button => {
  button.addEventListener('click', () => {
  // Remove active class from all buttons
  tabButtons.forEach(btn => btn.classList.remove('active'));
  // Add active class to clicked button
  button.classList.add('active');
  
  const city = button.getAttribute('data-city');
  
  destinationCards.forEach(card => {
  if (city === 'all' || card.getAttribute('data-city') === city) {
  card.style.display = 'block';
  } else {
  card.style.display = 'none';
  }
  });
  });
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href');
  if (targetId === '#') return;
  
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
  window.scrollTo({
  top: targetElement.offsetTop - 80,
  behavior: 'smooth'
  });
  }
  });
  });
  
  // Animation on Scroll
  function animateOnScroll() {
  const elements = document.querySelectorAll('.featured-card, .service-card, .destination-card');
  
  elements.forEach(element => {
  const elementPosition = element.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.2;
  
  if (elementPosition < screenPosition) {
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
  }
  });
  }
  
  // Set initial state for animated elements
  document.querySelectorAll('.featured-card, .service-card, .destination-card').forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s ease-out';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Form Submission Handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
  data[key] = value;
  });
  
  // Here you would typically send the data to a server
  console.log('Form submitted:', data);
  
  // Show success message
  alert('Thank you for your message! We will get back to you soon.');
  this.reset();
  });
  }
  
  // Newsletter Subscription
  const newsletterForm = document.querySelector('.newsletter-form form');
  if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = this.querySelector('input[type="email"]').value;
  
  // Here you would typically send the email to a server
  console.log('Newsletter subscription:', email);
  
  // Show success message
  alert('Thank you for subscribing to our newsletter!');
  this.reset();
  });
  }
  
  // Destination Card Hover Effect Enhancement
  document.querySelectorAll('.destination-card').forEach(card => {
  const image = card.querySelector('.card-image');
  const content = card.querySelector('.card-content');
  
  card.addEventListener('mouseenter', () => {
  image.style.transform = 'scale(1.05)';
  content.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  });
  
  card.addEventListener('mouseleave', () => {
  image.style.transform = 'scale(1)';
  content.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  });
  });
  
  // Back to Top Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.classList.add('back-to-top');
  document.body.appendChild(backToTopBtn);
  
  window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
  backToTopBtn.style.opacity = '1';
  backToTopBtn.style.visibility = 'visible';
  } else {
  backToTopBtn.style.opacity = '0';
  backToTopBtn.style.visibility = 'hidden';
  }
  });
  
  backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
  top: 0,
  behavior: 'smooth'
  });
  });
  
  // Add some custom styles for the back to top button
  const style = document.createElement('style');
  style.textContent = `
  .back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  z-index: 999;
  }
  
  .back-to-top:hover {
  background-color: #ff5252;
  transform: translateY(-5px);
  }
  `;
  document.head.appendChild(style);
  
  // Current Year in Footer
  document.querySelector('.footer-bottom p').innerHTML =
  `&copy; ${new Date().getFullYear()} Bharat Darshan. All Rights Reserved.`;
  });