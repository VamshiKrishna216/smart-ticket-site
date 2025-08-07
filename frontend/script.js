document.addEventListener("DOMContentLoaded", () => {
  // Signup Form Handling
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const user = {
        id: Date.now().toString(),
        Name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      };

      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const result = await res.text();
      alert(result);

      if (res.ok) {
        window.location.href = "index.html"; // Go to login page
      }
    });
  }

  // Login Form Handling
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const loginData = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
      };

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        window.location.href = "home.html";
      }
    });
  }
});
