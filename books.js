document.addEventListener("DOMContentLoaded", async function () {
    console.log("books.js loaded");

    const { auth, db } = await import("./firebase.js");
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js");
    const { getDoc, doc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");

    let currentUser = null; // Store user status

    onAuthStateChanged(auth, async (user) => {
        currentUser = user; // Store user globally

        if (user) {
            console.log("User logged in:", user.uid);
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {
                console.error("User data not found! Logging out...");
                window.location.href = "signin.html"; // Redirect if user data is missing
                return;
            }

            const userData = userDoc.data();
            console.log("User data:", userData);

            const stream = userData.stream; // Get user-selected stream
            console.log("Fetching books for stream:", stream);

            const streamRef = doc(db, "resources", stream);
            const streamSnap = await getDoc(streamRef);

            if (!streamSnap.exists()) {
                console.error("No books found for this stream.");
                document.getElementById("books-container").innerHTML = "<h2>No books available.</h2>";
                return;
            }

            const subjects = streamSnap.data().subjects || [];
            console.log("Subjects:", subjects);

            const bookContainer = document.getElementById("books-container");
            bookContainer.innerHTML = ""; // Clear previous content

            subjects.forEach((subject) => {
                const bookCard = document.createElement("div");
                bookCard.classList.add("resource-category", "book-item");
                bookCard.innerHTML = `
                    <h2 class="book-title">📖 ${subject.name}</h2>
                    <p>Click below to access study materials.</p>
                    <a href="${subject.url}" class="view-book-btn" target="_blank">
                        View Book
                    </a>
                `;
                bookContainer.appendChild(bookCard);
            });

            // Attach click event to View Book buttons
            document.querySelectorAll(".view-book-btn").forEach((button) => {
                button.addEventListener("click", (event) => {
                    if (!currentUser) {
                        event.preventDefault(); // Prevent access
                        alert("You need to sign in to view this resource!");
                        window.location.href = "signin.html"; // Redirect to sign-in page
                    }
                });
            });
        }
    });
});
function searchBooks() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let books = document.querySelectorAll(".book-item");

    books.forEach(book => {
        let title = book.querySelector(".book-title").innerText.toLowerCase();

        if (title.includes(input)) {
            book.style.display = "block"; // Ensure correct display style
        } else {
            book.style.display = "none";
        }
    });
}

