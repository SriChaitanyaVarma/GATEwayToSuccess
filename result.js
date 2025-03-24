document.addEventListener("DOMContentLoaded", () => {
    const score = parseInt(sessionStorage.getItem("score")) || 0;
    const totalQuestions = parseInt(sessionStorage.getItem("totalQuestions")) || 20;
    const attempted = parseInt(sessionStorage.getItem("attempted")) || 0;
    const notAttempted = parseInt(sessionStorage.getItem("notAttempted")) || 0;
    const weakAreas = JSON.parse(sessionStorage.getItem("weakAreas")) || {};

    // Display Weak Areas
    const weakAreasList = document.getElementById("weakAreasList");
    if (Object.keys(weakAreas).length > 0) {
        for (const topic in weakAreas) {
            const topicElement = document.createElement("h4");
            topicElement.textContent = `❌ ${topic}`;
            weakAreasList.appendChild(topicElement);
            
            weakAreas[topic].forEach(question => {
                const li = document.createElement("li");
                li.textContent = question;
                weakAreasList.appendChild(li);
            });
        }
    } else {
        weakAreasList.innerHTML = "<li>Great job! No weak areas detected.</li>";
    }

    // Pie Chart Data
    const wrongAnswers = totalQuestions - score;
    const ctx = document.getElementById("resultChart").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Correct Answers", "Wrong Answers", "Not Attempted"],
            datasets: [{
                data: [score, wrongAnswers, notAttempted],
                backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
            }]
        },
        options: {
            responsive: true
        }
    });
});

// Retake Test
function retakeTest() {
    sessionStorage.clear();
    window.location.href = "test.html";
}

// Review Test
function reviewTest() {
    alert("Review feature coming soon! Stay tuned.");
}
