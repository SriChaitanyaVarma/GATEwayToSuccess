import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBy0t-RjzwZS97UT2sgUbLzU2W-91683j8",
    authDomain: "gatewaytosuccess-12fce.firebaseapp.com",
    projectId: "gatewaytosuccess-12fce",
    storageBucket: "gatewaytosuccess-12fce.appspot.com",
    messagingSenderId: "387573643859",
    appId: "1:387573643859:web:8afa12dd6c47c4596064a6",
    measurementId: "G-GQM9BTXR7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

document.getElementById("generate-roadmap").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission

    let roadmapContainer = document.getElementById("roadmap-container");

    // Clear previous roadmap (if any)
    roadmapContainer.innerHTML = "";

    // Get user inputs
    let interests = document.getElementById("interest").value;
    let strongSubjects = document.getElementById("strong-subjects").value || "Revise Basics";
    let weakSubjects = document.getElementById("weak-subjects").value || "Identify Weak Areas";
    let studyHours = parseFloat(document.getElementById("study-hours").value);

    // Validate study hours
    if (!interests || !studyHours || studyHours <= 0 || studyHours > 24) {
        alert("Please enter valid interests and study hours (1 to 24 hours)!");
        return;
    }

    // Calculate study time distribution
    let strongTime = (0.4 * studyHours).toFixed(1);
    let weakTime = (0.5 * studyHours).toFixed(1);
    let revisionTime = (0.1 * studyHours).toFixed(1);

    // Create Roadmap Structure
    roadmapContainer.innerHTML = `
        <h2>Your Personalized Study Plan</h2>
        <div class="roadmap-flowchart">
            <div class="roadmap-step">
                <p><strong>Focus on Strong Subjects</strong></p>
                <p>${strongSubjects}</p>
                <p>⏳ Study Time: ${strongTime} hours/day</p>
            </div>
            <div class="roadmap-arrow">⬇</div>
            <div class="roadmap-step">
                <p><strong>Improve Weak Subjects</strong></p>
                <p>${weakSubjects}</p>
                <p>⏳ Study Time: ${weakTime} hours/day</p>
            </div>
            <div class="roadmap-arrow">⬇</div>
            <div class="roadmap-step">
                <p><strong>Mock Tests & Revision</strong></p>
                <p>Practice Problems & Previous Papers</p>
                <p>⏳ Study Time: ${revisionTime} hours/day</p>
            </div>
            <div class="roadmap-arrow">⬇</div>
            <div class="roadmap-step">
                <p><strong>Success 🎯</strong></p>
                <p>Stay Consistent and Achieve Your Goals!</p>
            </div>
        </div>
    `;

    // Show the roadmap container
    roadmapContainer.style.display = "block";
});
