const questions = [
    {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        answer: 1,
        topic: "Algorithms"
    },
    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: 1,
        topic: "Data Structures"        
    },
    {
        question: "What is the default return type of main() in C?",
        options: ["int", "void", "float", "char"],
        answer: 0,
        topic:  "Programming"
    },
    {
        question: "Which sorting algorithm has the worst-case complexity of O(n²)?",
        options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"],
        answer: 2,
        topic: "Algorithms"
    },
    {
        question: "Which of these is not an OOPS concept?",
        options: ["Encapsulation", "Polymorphism", "Recursion", "Inheritance"],
        answer: 2,
        topic: "OOPS"
    },
    {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Sequential Query Language", "Simple Query Language", "Standard Query Logic"],
        answer: 0,
        topic:"DataBases"
    },
    {
        question: "Which of the following is not a NoSQL database?",
        options: ["MongoDB", "Redis", "PostgreSQL", "Cassandra"],
        answer: 2,
        topic:"DataBases"
    },
    {
        question: "Which programming language is mainly used for data science?",
        options: ["Python", "Java", "C++", "Go"],
        answer: 0,
        topic:"Programming"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "Hyper Tabular Markup Language", "None of the above"],
        answer: 1,
        topic:"Web Technologies"
    },
    {
        question: "Which protocol is used for secure communication over the internet?",
        options: ["HTTP", "FTP", "SSH", "HTTPS"],
        answer: 3,
        topic:"Web Technologies"

    },
    {
        question: "Which of the following is a functional programming language?",
        options: ["Python", "Haskell", "Java", "C"],
        answer: 1,
        topic:"Programming"

    },
    {
        question: "What is the space complexity of an adjacency matrix?",
        options: ["O(1)", "O(V)", "O(E)", "O(V²)"],
        answer: 3,
        topic:"Data Structures"

    },
    {
        question: "Which is not a component of DBMS?",
        options: ["Database Engine", "Query Processor", "Compiler", "Transaction Manager"],
        answer: 2,
        topic:"DataBases"

    },
    {
        question: "Which programming paradigm does Java follow?",
        options: ["Procedural", "Object-Oriented", "Functional", "Declarative"],
        answer: 1,
        topic:"Programming"
    },
    {
        question: "What is the full form of CSS?",
        options: ["Cascading Style Sheet", "Computer Styling Sheet", "Creative Style System", "Color Styling Sheet"],
        answer: 0,
        topic:"Web Technologies"

    },
    {
        question: "Which is the core language of Android development?",
        options: ["Swift", "Dart", "Java", "Kotlin"],
        answer: 3,
        topic:"App Development"

    },
    {
        question: "Which is a cloud computing service model?",
        options: ["IaaS", "TaaS", "PaaS", "Both IaaS & PaaS"],
        answer: 3,
        topic:"Cloud Computing"
    },
    {
        question: "Which JavaScript framework is developed by Facebook?",
        options: ["Angular", "Vue", "React", "Svelte"],
        answer: 2,
        topic:"Web Technologies"

    },
    {
        question: "Which data structure is used for LRU cache?",
        options: ["Stack", "Queue", "HashMap & Doubly Linked List", "Heap"],
        answer: 2,
        topic:"Data Structures"

    },
    {
        question: "Which algorithm is used in Dijkstra’s shortest path?",
        options: ["Greedy", "Divide & Conquer", "Dynamic Programming", "Backtracking"],
        answer: 0,
        topic:"Algorithms"
    }
];

// Timer - 1 Hour
let timeLeft = 3600; // 1 Hour (3600 seconds)
const timerElement = document.getElementById("timer");

function startTimer() {
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest(); // Auto-submit on timeout
        }
        timeLeft--;
    }, 1000);
}

startTimer();


// Load Questions
const questionContainer = document.getElementById("question-container");
questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<h3>${index + 1}. ${q.question}</h3>`;

    q.options.forEach(option => {
        questionDiv.innerHTML += `
            <label>
                <input type="radio" name="q${index}" value="${option}"> ${option}
            </label>
        `;
    });
    questionContainer.appendChild(questionDiv);
});

// Submit Test Function
function submitTest() {
    let score = 0;
    let attempted = 0;
    let notAttempted = 0;
    let weakAreas = {};

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            attempted++;
            const selectedIndex = q.options.indexOf(selectedOption.value); // Get index of selected answer
            if (selectedIndex === q.answer) {  
                score++;
            } else {
                // Store weak areas with topic
                if (!weakAreas[q.topic]) {
                    weakAreas[q.topic] = [];
                }
                weakAreas[q.topic].push(q.question);
            }
        } else {
            notAttempted++;
        }
    });

    // Confirmation Alert
    const confirmSubmit = confirm(
        `You attempted ${attempted} out of ${questions.length} questions.\n` +
        `Not attempted: ${notAttempted}.\n` +
        `Do you want to submit?`
    );
    if (!confirmSubmit) return;

    // Store Data in sessionStorage
    sessionStorage.setItem("score", score);
    sessionStorage.setItem("totalQuestions", questions.length);
    sessionStorage.setItem("attempted", attempted);
    sessionStorage.setItem("notAttempted", notAttempted);
    sessionStorage.setItem("weakAreas", JSON.stringify(weakAreas));

    // Redirect to Results Page
    window.location.href = "results.html";
}
