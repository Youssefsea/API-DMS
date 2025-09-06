const API_URL = "http://localhost:5001"; // غيّرها حسب الباك اند




// ✅ Show Register Form
function showRegister() {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("register-form").classList.remove("hidden");
}

// ✅ Show Login Form
function showLogin() {
  document.getElementById("register-form").classList.add("hidden");
  document.getElementById("login-form").classList.remove("hidden");
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token); // ✅ تخزين التوكن
      window.location.href = "dashboard.html";  // ✅ يوديك على صفحة تانية
    } else {
      document.getElementById("response").innerText = JSON.stringify(data, null, 2);
    }
  } catch (err) {
    document.getElementById("response").innerText = "❌ Error: " + err.message;
  }
}


async function register() {
  const username = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    document.getElementById("response").innerText = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("response").innerText = "❌ Error: " + err.message;
  }
}
