document.addEventListener("DOMContentLoaded", async function () {
    console.log("auth.js loaded");

    // Import Firebase authentication and Firestore
    const { auth, db } = await import("./firebase.js");
    const { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } =
        await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js");
    const { setDoc, doc } = await import("https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js");

    // Function to show messages
    function showErrorMessage(element, message, isSuccess = false) {
        let errorMessage = element.querySelector(".error-message");
        if (!errorMessage) {
            errorMessage = document.createElement("p");
            errorMessage.className = "error-message";
            element.appendChild(errorMessage);
        }
        errorMessage.innerText = message;
        errorMessage.style.color = isSuccess ? "#005f5f" : "#d9534f"; // Green for success, Red for error
    }

    // Function to update authentication button (Sign In / Logout)
    function updateAuthButton(user) {
        const authButton = document.getElementById("auth-button");
        if (!authButton) return;

        if (user) {
            authButton.innerHTML = `<button id="logout-btn">Log out</button>`;
            document.getElementById("logout-btn").addEventListener("click", async () => {
                await signOut(auth);
                localStorage.removeItem("lastPage");
                window.location.href = "gate1.html"; // Redirect to home after logout
            });
        } else {
            authButton.innerHTML = `<a href="signin.html">Sign In</a>`;
        }
    }

    // ✅ Fix for "Start Your Journey" button redirection issue
    onAuthStateChanged(auth, (user) => {
        updateAuthButton(user);

        console.log("Auth State Changed. User:", user);

        const startJourneyButton = document.querySelector(".option-box a[href='signin.html']");
        if (startJourneyButton) {
            startJourneyButton.addEventListener("click", function (event) {
                if (user) {
                    event.preventDefault(); // Prevent redirection
                    alert("You are already signed in! Redirecting to Dashboard...");
                    window.location.href = "gate1.html"; // Redirect to dashboard
                }
            });
        }
    });

    
    // ✅ Ensure restricted pages are only accessible by logged-in users
    function checkRestrictedAccess() {
        const restrictedPages = ["lectures.html", "papers.html", "books.html", "roadmap.html"]; // Add more if needed
        const currentPage = window.location.pathname.split("/").pop();

        onAuthStateChanged(auth, (user) => {
            updateAuthButton(user);

            if (!user && restrictedPages.includes(currentPage)) {
                localStorage.setItem("lastPage", window.location.href);
                window.location.href = "signin.html"; // Redirect to login page
            }
        });
    }

    checkRestrictedAccess();

    // ✅ LOGIN FUNCTION
    document.querySelector(".login-box .clkbtn")?.addEventListener("click", async (event) => {
        event.preventDefault();

        let email = document.querySelector(".login-box input[type='email']").value.trim();
        let password = document.querySelector(".login-box input[type='password']").value.trim();
        let loginBox = document.querySelector(".login-box");

        if (!email || !password) {
            showErrorMessage(loginBox, "Please enter both email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            showErrorMessage(loginBox, "Login successful!", true);
            console.log("User signed in:", user);

            setTimeout(() => {
                const lastPage = localStorage.getItem("lastPage");
                window.location.href = lastPage ? lastPage : "gate1.html";
            }, 1000);

        } catch (error) {
            let errorMsg = "Invalid Credentials";

            if (error.code === "auth/user-not-found") {
                errorMsg = "No account found with this email.";
            } else if (error.code === "auth/wrong-password") {
                errorMsg = "Incorrect password.";
            } else if (error.code === "auth/invalid-email") {
                errorMsg = "Invalid email format.";
            }

            showErrorMessage(loginBox, errorMsg);
        }
    });

    // ✅ SIGNUP FUNCTION
    document.querySelector(".signup-box .clkbtn")?.addEventListener("click", async (event) => {
        event.preventDefault();

        let fullName = document.querySelector(".signup-box input[type='text']").value.trim();
        let stream = document.querySelector(".signup-box select").value;
        let email = document.querySelector(".signup-box input[type='email']").value.trim();
        let password = document.querySelector(".signup-box input[type='password']").value.trim();
        let signupBox = document.querySelector(".signup-box");

        if (!fullName || !stream || !email || !password) {
            showErrorMessage(signupBox, "Please fill in all fields!");
            return;
        }

        if (password.length < 6) {
            showErrorMessage(signupBox, "Password must be at least 6 characters.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                email: email,
                stream: stream,
            });

            showErrorMessage(signupBox, "Signup successful!", true);
            console.log("User signed up:", user);

            setTimeout(() => {
                window.location.href = "gate1.html";
            }, 1000);

        } catch (error) {
            let errorMsg = "Signup failed! Try again.";

            if (error.code === "auth/email-already-in-use") {
                errorMsg = "Email already registered.";
            } else if (error.code === "auth/invalid-email") {
                errorMsg = "Invalid email format.";
            } else if (error.code === "auth/weak-password") {
                errorMsg = "Weak password. Use at least 6 characters.";
            }

            showErrorMessage(signupBox, errorMsg);
        }
    });
});
