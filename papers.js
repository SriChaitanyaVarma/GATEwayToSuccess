document.addEventListener("DOMContentLoaded", async function () {
    console.log("papers.js loaded");

    const { auth, db } = await import("./firebase.js");
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js");
    const { getDoc, doc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");

    const papersContainer = document.getElementById("papers-container");

    if (!papersContainer) {
        console.error("Error: papers-container not found in DOM.");
        return;
    }

    // Listen for Auth State
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User logged in:", user.uid);
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {
                console.error("User data not found!");
                return;
            }

            const userData = userDoc.data();
            console.log("User data:", userData);

            const stream = userData.stream;  // Get the user's selected stream
            console.log("Fetching previous year papers for stream:", stream);

            const streamRef = doc(db, "resources", stream);
            const streamSnap = await getDoc(streamRef);

            if (!streamSnap.exists()) {
                console.error("No previous year papers found for this stream.");
                papersContainer.innerHTML = "<h2>No papers available.</h2>";
                return;
            }

            const papers = streamSnap.data().papers || [];
            console.log("Papers:", papers);

            papersContainer.innerHTML = ""; // Clear previous content

            papers.forEach((paper) => {
                const paperCard = document.createElement("div");
                paperCard.classList.add("resource-category", "paper-item");
                paperCard.innerHTML = `
                    <h2 class="paper-title">📄 ${paper.name}</h2>
                    <p>Click below to download the paper.</p>
                    <a href="${paper.url}" target="_blank" class="view-paper-button">
                        Download Paper
                    </a>
                `;
                papersContainer.appendChild(paperCard);
            });

        } else {
            console.log("No user is logged in.");
            window.location.href = "signin.html"; // Redirect to login page
        }
    });

});

// Function to search papers
function searchPapers() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let papers = document.querySelectorAll(".paper-item");

    papers.forEach(paper => {
        let title = paper.querySelector(".paper-title").innerText.toLowerCase();

        if (title.includes(input)) {
            paper.style.display = "block"; // Ensure correct display style
        } else {
            paper.style.display = "none";
        }
    });
}
