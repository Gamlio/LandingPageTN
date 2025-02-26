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
     // Lấy giá trị của trường name
     const nameInput = form.querySelector('#name');
     const name = nameInput.value;

     // Lấy giá trị của trường email
     const emailInput = form.querySelector('#email');
     const email = emailInput.value;

     // Lấy giá trị của trường phone
     const phoneInput = form.querySelector('#phone');
     const phone = phoneInput.value;

     // Lấy giá trị của trường address
     const addressInput = form.querySelector('#address');
     const address = addressInput.value;

     // Lấy giá trị của trường dob
     const dobInput = form.querySelector('#dob');
     const dob = dobInput.value;

     // Lấy giá trị của trường numPeople
     const numPeopleInput = form.querySelector('#numPeople');
     const numPeople = numPeopleInput.value;

     // Lấy giá trị của trường tourType
     const tourTypeInput = form.querySelector('#tourType');
     const tourType = tourTypeInput.value;

     // Bạn có thể làm gì đó với các giá trị này (ví dụ: log ra console)
     console.log("Họ và tên:", name);
     console.log("Email:", email);
     console.log("Số điện thoại:", phone);
     console.log("Địa chỉ:", address);
     console.log("Ngày tháng đi:", dob);
     console.log("Số người:", numPeople);
     console.log("Loại tour:", tourType);
           // Formspree sẽ tự động nhận giá trị từ các trường input
    });
}); 
