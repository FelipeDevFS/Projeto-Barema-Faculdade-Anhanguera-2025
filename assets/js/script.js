document.addEventListener("DOMContentLoaded", function () {
  // Se já estiver logado e estiver na página login, redireciona para home
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "home.html";
  }

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    if (user === "admin" && password === "123") {
      localStorage.setItem("isLoggedIn", "true");

      const modal = document.getElementById("successModal");
      modal.style.display = "block";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    } else {
      const modal = document.getElementById("ModalFailed");
      modal.style.display = "block";
    }
  });
});

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const icon = document.querySelector(".toggle-password");

  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";

  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";

  if (modalId === "ModalFailed") {
    document.getElementById("user").value = "";
    document.getElementById("password").value = "";
    document.getElementById("user").focus();
  }
}
