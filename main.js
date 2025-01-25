//Header
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let headerVisible = true;

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

    if (window.scrollY > lastScrollY && headerVisible) {
        document.body.classList.add('scrolled');
        headerVisible = false;
    } else if (window.scrollY < lastScrollY && !headerVisible) {
        document.body.classList.remove('scrolled');
        headerVisible = true;
    }
    lastScrollY = window.scrollY;
});
//contenfm
const contenWrapper = document.querySelector('.conten-wrapper');
const contenItems = document.querySelectorAll('.conten-item');
let currentIndex = 0;

function showConten(index) {
  if (index < 0) {
    index = contenItems.length - 1;
  } else if (index >= contenItems.length) {
    index = 0;
  }
  currentIndex = index;
  contenWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;
}
/* fm */
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.content');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');
const sliderContainer = document.querySelector('.slider-container');

let currentSlide = 0;
let slideWidth;
let isDragging = false;
let startX;
let startTranslateX;

function updateSlideWidth() {
    slideWidth = slides[0].offsetWidth;
}
function showSlide(n) {
    updateSlideWidth();
    if (n < 0) {
        currentSlide = slides.length - 1; 
    } else if (n >= slides.length) {
        currentSlide = 0; 
    } else {
        currentSlide = n;
    }
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}
window.addEventListener('load', updateSlideWidth);
window.addEventListener('resize', updateSlideWidth);

prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});
// Kéo chuột (swipe)
slider.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startTranslateX = parseFloat(slider.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    slider.style.transition = 'none';
});
slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    slider.style.transform = `translateX(${startTranslateX + diff}px)`;
});
slider.addEventListener('mouseup', (e) => {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-in-out'
    let diff = e.clientX - startX;
    if(Math.abs(diff) > 50){
        if(diff > 0){
            showSlide(currentSlide - 1);
        } else {
            showSlide(currentSlide + 1);
        }
    } else {
        showSlide(currentSlide)
    }
});
slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-in-out'
    showSlide(currentSlide)
});

/* btn */
const btns = document.querySelectorAll(".tour-button");
const modals = {};
document.querySelectorAll(".modal").forEach(modal => modals[modal.id] = modal);
const spans = document.querySelectorAll(".close-button");
const forms = document.querySelectorAll("#registrationForm")

btns.forEach(btn => {
    btn.onclick = function() {
        const modalId = btn.dataset.modal;
        modals[modalId].style.display = "block";
    }
});
spans.forEach(span => {
    span.onclick = function() {
        const modal = span.closest('.modal');
        modal.style.display = "none";
        modal.querySelector('form').reset(); 
    }
});
window.onclick = function(event) {
    for (const modalId in modals) {
        if (event.target == modals[modalId]) {
            modals[modalId].style.display = "none";
            modals[modalId].querySelector('form').reset();
        }
    }
}
forms.forEach(form => {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const modal = form.closest('.modal'); 
        fetch('/your-server-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Đăng ký thành công!");
            modal.style.display = "none";
            form.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        });
    });
});