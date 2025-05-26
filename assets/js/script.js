document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const user = document.getElementById("user").value;
        const password = document.getElementById("password").value;

        if(user === "admin" && password === "123") {
            alert("Login efetuado com sucesso!");
            window.location.href = "home.html"; // Redireciona para a página de dashboard
        } else {
            alert("Usuário ou senha inválidos.");
        }
    });
});

function togglePasswordVisibility() {
        const passwordInput = document.getElementById("password");
        const icon = document.querySelector(".toggle-password");

        const isPasswordVisible = passwordInput.type === "text";
        passwordInput.type = isPasswordVisible ? "password" : "text";

        // Alterna os ícones
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
        console.log("Visibilidade da senha alterada:", !isPasswordVisible);
    }

    