<template>
    <div class="home">
        <navbar />
        <main>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 200"
                class="centered-svg"
                preserveAspectRatio="xMidYMid meet"
            >
                <text
                    class="stroke-text"
                    x="50%"
                    y="50%"
                    text-anchor="middle"
                    alignment-baseline="middle"
                >
                    Echo Hub
                </text>
            </svg>
            <div class="content">
                <div data-aos="fade-up-right" data-aos-duration="1600">
                    <h2>
                        Bem-vindo(a) ao
                        <span class="main-text main-text-min btn-orange"
                            >EchoHub</span
                        >;
                    </h2>
                    <p>
                        O EchoHub é a plataforma que facilita sua comunicação em
                        tempo real. Com uma interface simples e eficiente, você
                        pode se conectar, compartilhar ideias e gerenciar
                        projetos de forma ágil e segura.
                    </p>
                    <button
                        class="styled-button"
                        v-on:click="fRedirect('/register')"
                    >
                        Quero me registrar
                    </button>
                </div>
                <img
                    :src="image"
                    alt="Main Image"
                    class="main-image"
                    :draggable="false"
                    data-aos="fade-up-left"
                    data-aos-duration="800"
                />
            </div>
        </main>

        <section class="features-section">
            <h3>Confira as funcionalidades da EchoHub</h3>
            <div class="features-container">
                <div class="feature-box">
                    <v-icon name="md-login" class="feature-icon" scale="2" />
                    <h4>Cadastro e Login</h4>
                    <p>
                        Gerencie sua conta de forma segura e simples com nosso
                        sistema de autenticação.
                    </p>
                </div>
                <div class="feature-box">
                    <v-icon name="fa-users" class="feature-icon" scale="2" />
                    <h4>Busca de Usuários</h4>
                    <p>
                        Encontre amigos facilmente com a busca pelo nome de
                        usuário.
                    </p>
                </div>
                <div class="feature-box">
                    <v-icon name="md-message" class="feature-icon" scale="2" />
                    <h4>Mensagens em Tempo Real</h4>
                    <p>
                        Envie e receba mensagens instantaneamente em um ambiente
                        confiável.
                    </p>
                </div>
                <div class="feature-box">
                    <v-icon
                        name="la-brush-solid"
                        class="feature-icon"
                        scale="2"
                    />
                    <h4>Perfil Personalizável</h4>
                    <p>
                        Adicione redes sociais, altere sua foto, defina seu
                        recado e muito mais.
                    </p>
                </div>
                <div class="feature-box">
                    <v-icon name="gi-resize" class="feature-icon" scale="2" />
                    <h4>Responsivo</h4>
                    <p>
                        Aproveite a experiência perfeita, seja no desktop ou no
                        celular.
                    </p>
                </div>
            </div>
        </section>

        <footer class="footer" id="support">
            <div class="footer-content">
                <div class="footer-section">
                    <h4><strong>EchoHub</strong></h4>
                    <p>
                        A sua plataforma para comunicação em tempo real.
                        Conecte-se, colabore e compartilhe ideias de forma
                        simples e segura.
                    </p>
                </div>
                <div class="footer-section">
                    <h4><strong>Suporte</strong></h4>
                    <ul>
                        <li>
                            <strong>Email:</strong>
                            cipherauthenticator@gmail.com
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>
                    <strong
                        >© 2025 EchoHub. Todos os direitos reservados.</strong
                    >
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import navbar from "@/components/navbar.vue";
import image from "@/assets/images/unboxing.png";

export default {
    name: "HomeView",
    components: { navbar },
    data() {
        return {
            image,
        };
    },
    methods: {
        fRedirect(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

main {
    position: relative;
    min-height: 100vh !important;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--lightgrey);
}

.centered-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
}

.stroke-text {
    font-size: 130px;
    font-family: "Red Hat Display";
    font-weight: 900;
    fill: transparent;
    stroke: var(--orange);
    stroke-width: 1;
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: draw-text 4s forwards;
    opacity: 0.05;
}

.content {
    position: relative;
    padding: 1rem;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6rem;
}

.content div {
    max-width: 560px;
}

.content div h2 {
    font-weight: 600;
    color: var(--white);
}

.content div button {
    margin-top: 2rem;
    border-color: var(--orange);
}

button.styled-button:hover,
button:hover {
    background-color: var(--semidarkgrey);
    color: var(--white);
    cursor: pointer;
}

.content .main-image {
    width: 440px;
    min-width: 340px;
    height: auto;
    object-fit: cover;
}

@media (max-width: 920px) {
    .stroke-text {
        display: none;
    }

    .content .main-image {
        display: none;
    }

    .content {
        flex-direction: column;
        gap: 3rem;
        text-align: center;
    }

    .content div h2 {
        font-size: 24px;
    }

    .content div p {
        font-size: 16px;
    }
}

@media (max-width: 480px) {
    .content div h2 {
        font-size: 20px;
    }

    .content div p {
        font-size: 14px;
    }
}

@keyframes draw-text {
    to {
        stroke-dashoffset: 0;
    }
}

section {
    min-height: 100vh;
    height: 100vh !important;
    padding: 2rem;
}

section h3 {
    font-size: 1.4rem;
    text-align: center;
    font-weight: 700;
    margin-bottom: 2rem;
    padding: 0 1rem;
}

section.features-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #d9d9d921;
    border-left: none;
    border-right: none;
}

.features-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.feature-box {
    min-height: 320px;
    width: 240px;
    padding: 2rem 1.2rem;
    border-radius: 5px;
    background-color: var(--darkgrey);

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    transition: 0.5s ease;
}

.feature-icon {
    color: var(--orange);
    margin-bottom: 0.5rem;
}

.feature-box h4 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--lightgrey);
    font-weight: 700;
}

.feature-box p {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;
}

.feature-box:hover {
    transform: translateY(-1rem);
    box-shadow: 0.25rem 0.25rem 0.25rem rgba(142, 89, 19, 0.275);
}

/* Outros Estilos (mesmo do exemplo anterior) */
.about-section {
    padding: 40px 20px;
    background-color: #ffffff;
}

.support-section {
    padding: 40px 20px;
    background-color: #f4f4f4;
}

.support-section a.link {
    color: var(--orange);
    text-decoration: none;
}

.support-section a.link:hover {
    text-decoration: underline;
}

.footer {
    background-color: var(--darkgrey);
    color: #f5f5f5;
    padding: 20px 10px;
    font-size: 0.9rem;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-section {
    flex: 1 1 30%;
    min-width: 200px;
}

.footer-section h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--orange);
}

.footer-section p,
.footer-section ul {
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 1.6;
}

.footer-section ul li {
    margin-bottom: 10px;
}

.footer-section ul li a {
    color: #f5f5f5;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-section ul li a:hover {
    color: var(--orange);
}

.footer-bottom {
    text-align: center;
    margin-top: 20px;
    border-top: 1px solid #333;
    padding-top: 10px;
}

@media (max-width: 768px) {
    .features-section {
        min-height: auto !important;
        height: auto !important;
    }

    .footer-content {
        flex-direction: column;
        align-items: center;
    }

    .footer-section {
        text-align: center;
    }

    .footer-section ul li a v-icon {
        margin-right: 5px;
    }
}
</style>
