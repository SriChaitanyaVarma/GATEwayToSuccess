document.addEventListener("DOMContentLoaded", async function () {
    console.log("video-lectures.js loaded");

    const { auth, db } = await import("./firebase.js");
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js");
    const { getDoc, doc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");

    const videoContainer = document.getElementById("video-container");

    if (!videoContainer) {
        console.error("Error: video-container not found in DOM.");
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

            const stream = userData.stream;  // Get user's selected stream
            console.log("Fetching video lectures for stream:", stream);

            const streamRef = doc(db, "resources", stream);
            const streamSnap = await getDoc(streamRef);

            if (!streamSnap.exists()) {
                console.error("No videos found for this stream.");
                videoContainer.innerHTML = "<h2>No video lectures available.</h2>";
                return;
            }

            const videos = streamSnap.data().videos || [];
            console.log("Videos:", videos);

            videoContainer.innerHTML = ""; // Clear previous content

            videos.forEach((video) => {
                const videoCard = document.createElement("div");
                videoCard.classList.add("resource-category", "video-item");
                videoCard.innerHTML = `
                    <h2 class="video-title">🎥 ${video.name}</h2>
                    <p>Click below to watch the lecture.</p>
                    <a href="${video.url}" target="_blank">
                        Watch Video
                    </a>
                `;
                videoContainer.appendChild(videoCard);
            });
        } else {
            console.log("No user is logged in.");
            window.location.href = "signin.html"; // Redirect to login page
        }
    });
});
