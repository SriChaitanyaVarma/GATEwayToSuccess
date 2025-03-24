const slider = document.querySelector(".slider");
const loginBtn = document.querySelector(".login");
const signupBtn = document.querySelector(".signup");
const formSection = document.querySelector(".form-section");

// Move slider and switch form
signupBtn.addEventListener("click", () => {
    slider.style.left = "150px"; // Moves to right
    formSection.classList.add("form-section-move");
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
});

loginBtn.addEventListener("click", () => {
    slider.style.left = "0"; // Moves to left
    formSection.classList.remove("form-section-move");
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
});

// Set initial state
loginBtn.classList.add("active");
