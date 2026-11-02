
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ===== CONFIGURAÇÃO DO FIREBASE =====

const firebaseConfig = {
    apiKey: "AIzaSyCN62XhqjOsF5stLkhkzT6wUDMPLZGnNvs",
    authDomain: "lapis-de-cor-intranet.firebaseapp.com",
    projectId: "lapis-de-cor-intranet",
    storageBucket: "lapis-de-cor-intranet.firebasestorage.app",
    messagingSenderId: "989188927600",
    appId: "1:989188927600:web:3827763cb41a88b45c84b5"
};

// ===== INICIALIZAR FIREBASE =====

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provedorGoogle = new GoogleAuthProvider();

// ===== ELEMENTOS DA TELA =====

const btnGoogle = document.getElementById("btnGoogle");

const mensagem = document.getElementById("mensagem");

// ===== LOGIN COM GOOGLE =====

btnGoogle.addEventListener("click", async () => {

    btnGoogle.disabled = true;

    btnGoogle.textContent = "Conectando ao Google...";

    mensagem.textContent = "";

    try {

        const resultado = await signInWithPopup(
            auth,
            provedorGoogle
        );

        const usuario = resultado.user;

        console.log("Login realizado:", usuario);

        mensagem.style.color = "#1565c0";

        mensagem.textContent =
            `Login realizado com sucesso! Bem-vindo(a), ${usuario.displayName}.`;

        // Na próxima etapa, verificaremos o perfil
        // e redirecionaremos para a página correspondente.

    } catch (erro) {

        console.error("Erro no login:", erro);

        mensagem.style.color = "#e53945";

        if (erro.code === "auth/popup-closed-by-user") {

            mensagem.textContent =
                "A janela de login foi fechada antes da conclusão.";

        } else if (erro.code === "auth/unauthorized-domain") {

            mensagem.textContent =
                "Este domínio não está autorizado no Firebase.";

        } else if (erro.code === "auth/popup-blocked") {

            mensagem.textContent =
                "O navegador bloqueou a janela. Permita pop-ups.";

        } else {

            mensagem.textContent =
                "Não foi possível entrar. Tente novamente.";

        }

    } finally {

        btnGoogle.disabled = false;

        btnGoogle.innerHTML = `
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
            >
            Entrar com Google
        `;

    }

});
