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
                    <button class="styled-button" v-on:click="fRedirect('/register')">Quero me registrar</button>
                </div>
                <img :src="image" alt="Main Image" class="main-image" :draggable="false" data-aos="fade-up-left" data-aos-duration="800" />
            </div>
        </main>
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
    }
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
    height: 100%;
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

button.styled-button:hover, button:hover {
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

@media (max-width: 768px) {
    .stroke-text {
        display: none;
    }

    .content .main-image {
        width: 100%;
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
</style>
