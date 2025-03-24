document.addEventListener("DOMContentLoaded", async function () {
    console.log("mocks.js loaded");

    const { auth } = await import("./firebase.js");
    const { onAuthStateChanged, signOut } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js");

    // Check if user is logged in
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "signin.html"; // Redirect to login page if not logged in
        }
    });

    // Logout functionality
    document.getElementById("logout-btn").addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "signin.html"; // Redirect to login page
    });

});

// Function to search mock tests
function searchMocks() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let mocks = document.querySelectorAll(".book-item");

    mocks.forEach(mock => {
        let title = mock.querySelector("h2").innerText.toLowerCase();
        mock.style.display = title.includes(input) ? "block" : "none";
    });
}

// Function to start test
function startTest(type) {
    localStorage.setItem("testType", type); // Store test type in local storage
    window.location.href = "test.html"; // Redirect to test page
}
