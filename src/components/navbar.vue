<template>
    <div>
        <header>
            <h2 v-on:click="fRedirect('/')" class="click">
                Echo<span class="emphasize blurple">Hub</span>
            </h2>
            <nav class="hidden">
                <ul>
                    <li><a href="/">Início</a></li>
                    <li><a href="/privacity">Privacidade</a></li>
                    <li><a href="/#support">Suporte</a></li>
                </ul>
            </nav>
            <button
                class="styled-button"
                :class="{ 'hidden-element': hidden, hidden: !hidden }"
                v-on:click="fRedirect('/login')"
            >
                Entrar
            </button>
            <!-- Botão hamburger para abrir/fechar o menu lateral -->
            <button class="hamburger" @click="toggleMenu">
                <span :class="{ bar: true, 'bar--open': isMenuOpen }"></span>
                <span :class="{ bar: true, 'bar--open': isMenuOpen }"></span>
                <span :class="{ bar: true, 'bar--open': isMenuOpen }"></span>
            </button>
        </header>

        <!-- Menu lateral -->
        <aside :class="{ active: isMenuOpen }">
            <div>
                <h2>Echo<span class="emphasize blurple">Hub</span></h2>
                <ul>
                    <li><a href="/">Início</a></li>
                    <li><a href="/privacity">Privacidade</a></li>
                    <li><a href="/#support">Suporte</a></li>
                </ul>
                <button
                    class="styled-button"
                    :class="{ 'hidden-element': hidden, hidden: hidden }"
                    v-on:click="fRedirect('/login')"
                >
                    Entrar
                </button>
            </div>
        </aside>
    </div>
</template>

<script>
export default {
    name: "navbarComponent",
    props: ["hidden"],
    data() {
        return {
            isMenuOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        fRedirect(path) {
            this.$router.push(path);
        },
    },
};
</script>

<style scoped>
/* Header */
header {
    width: 100%;
    padding: 0 2rem;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}

header nav {
    width: auto;
    height: auto;
    padding: 0.6rem 1.5rem;
    background: var(--darkgrey);
    border-radius: 160px;
}

header nav ul {
    display: flex;
    gap: 1.6rem;
    list-style: none;
}

header nav ul li {
    display: flex;
    align-items: center;
    justify-content: center;
}

header nav ul li a {
    position: relative;
    color: var(--lightgrey);
    text-decoration: none;
    transition: all 0.4s ease;
}

header nav ul li a::before {
    content: "";
    position: absolute;
    top: calc(100% + 1px);
    width: 0%;
    height: 1.2px;
    background: var(--btn-orange);
}

header nav ul li a:hover {
    color: var(--white);
}

header nav ul li a:hover::before {
    content: "";
    animation: width-bar 0.5s ease forwards;
}

@keyframes width-bar {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}

/* Hamburger Button */
.hamburger {
    display: none;
    position: absolute;
    top: 1rem;
    right: 2rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 30px;
    height: 21px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 11;
}

.hamburger .bar {
    width: 100%;
    height: 3px;
    background: var(--lightgrey);
    border-radius: 10px;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Transformação para o "X" */
.hamburger .bar--open:nth-child(1) {
    transform: rotate(45deg) translate(5px, 8px);
}

.hamburger .bar--open:nth-child(2) {
    opacity: 0;
}

.hamburger .bar--open:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -8px);
}

aside {
    display: none;
}

@media (max-width: 920px) {
    /* Display the hamburger button in mobile view */
    .hamburger {
        display: flex;
    }

    /* Menu lateral (inicialmente oculto) */
    aside {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background-color: var(--darkgrey);
        transition: all 0.4s ease;
        padding: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        z-index: 10;
    }

    aside div {
        margin: 1rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    /* Mostrar menu lateral quando estiver ativo */
    aside.active {
        left: 0;
    }

    aside ul {
        list-style: none;
        margin: 2rem 0;
        text-align: center;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    aside ul li a {
        color: var(--lightgrey);
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 600;
    }

    aside ul li a:hover {
        color: var(--white);
    }
}
</style>
