<template>
    <div class="login-page">
        <navbar :hidden="hidden" />
        <main>
            <div class="login-container">
                <h2>
                    Bem-vindo(a) ao
                    <span class="main-text main-text-min btn-orange"
                        >EchoHub</span
                    >
                </h2>
                <form @submit.prevent class="login-form">
                    <div class="input-group">
                        <label for="email">Seu email:</label>
                        <input
                            type="email"
                            id="email"
                            v-model="email"
                            placeholder="echohub@example.com"
                            required
                        />
                    </div>
                    <div class="input-group">
                        <label for="password">Sua senha:</label>
                        <input
                            :type="passwordVisible ? 'text' : 'password'"
                            id="password"
                            v-model="password"
                            placeholder="1234567890"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        @click="togglePasswordVisibility"
                        class="styled-button"
                    >
                        <span id="password-visibility">Mostrar senha</span>
                        <v-icon
                            :name="
                                passwordVisible
                                    ? 'hi-solid-eye-off'
                                    : 'hi-solid-eye'
                            "
                            scale="0.8"
                        />
                    </button>
                    <button
                        type="submit"
                        class="styled-button"
                        :disabled="!isFormValid"
                        @click="submitLogin()"
                    >
                        Entrar
                    </button>
                </form>
                <p class="password">
                    <a href="/register">Não tem uma conta</a>
                    ou
                    <a href="/forgot">Esqueceu a senha?</a>
                </p>
            </div>
        </main>
    </div>
</template>
  
<script>
import navbar from "@/components/navbar.vue";
import toastr from "toastr";
import axios from "axios";

export default {
    name: "LoginPage",
    components: { navbar },
    data() {
        return {
            email: "",
            password: "",
            hidden: true,
            passwordVisible: false,
            emailError: true,
            passwordError: true,
        };
    },
    computed: {
        isFormValid() {
            return (
                this.email !== "" &&
                this.password !== "" &&
                this.validateEmail() &&
                this.validatePassword()
            );
        },
    },
    methods: {
        async submitLogin() {
            if (this.isFormValid) {
                toastr.clear();
                try {
                    const request = await axios.post(
                        `${this.$baseUrl}/user/login`,
                        {
                            admin_pass_key: process.env.VUE_APP_ADMIN_PASS_KEY,
                            email: this.email,
                            password: this.password,
                        }
                    );

                    if (request.status === 200) {
                        toastr.success(
                            "Login realizado com sucesso, redirecionando!"
                        );
                        this.$store.dispatch("loginUser", request.data.data);

                        if (
                            !request.data.data.verified ||
                            request.data.data.verified !== true
                        ) {
                            setTimeout(() => {
                                this.$store.commit("setAccessVerify", true);
                                this.$router.push({
                                    name: "verify",
                                });
                            }, process.env.VUE_APP_TIMEOUT);
                        } else {
                            setTimeout(() => {
                                return this.$router.push({
                                    name: "app",
                                });
                            }, process.env.VUE_APP_TIMEOUT);
                        }
                    } else {
                        toastr.error("Erro desconhecido, tente novamente!");
                    }
                } catch (error) {
                    if (error.response) {
                        toastr.error(
                            error.response.data.message || "Erro desconhecido."
                        );
                    } else if (error.request) {
                        toastr.error("Erro de conexão com o servidor.");
                    } else {
                        toastr.error("Erro inesperado.", error);
                    }
                }
            } else {
                return;
            }
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
            const el = document.getElementById("password-visibility");
            if (this.passwordVisible) {
                el.innerHTML = "Ocultar Senha";
            } else {
                el.innerHTML = "Mostrar Senha";
            }
        },
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailRegex.test(this.email);
        },
        validatePassword() {
            const isStrong = this.$isStrongPassword(this.password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            });

            if (isStrong === false) {
                toastr.info("Sua senha é composta por 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo, com um mínimo de 8 dígitos.", "Informações sobre a senha", {
                    timeOut: 15000
                })
            }

            return isStrong;
        },
    },
    watch: {
        email: {
            handler() {
                this.emailError = !this.validateEmail();
            },
            immediate: false,
        },
        password: {
            handler() {
                this.passwordError = !this.validatePassword();
            },
            immediate: false,
        },
    },
};
</script>
  
  <style scoped>
.login-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
}

.login-container {
    background-color: var(--darkgrey);
    padding: 2rem;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

.login-container h2 {
    font-size: 28px;
    font-weight: 600;
    color: var(--dark-grey);
    margin-bottom: 2rem;
}

.input-group {
    margin-bottom: 1.5rem;
}

.input-group label {
    text-align: left;
    display: block;
    font-weight: 500;
    margin-block: 0.2rem;
    color: var(--dark-grey);
}

.styled-button {
    width: 100%;
    border-color: var(--orange);
}

.styled-button:nth-of-type(1) {
    margin-bottom: 0.5rem;
    background: var(--btn-orange);
    color: var(--black);
    display: flex;
    justify-content: center;
    align-items: center;
}

button.styled-button:hover, button:hover {
    background-color: var(--semidarkgrey);
    color: var(--white);
    cursor: pointer;
}

.password {
    margin-top: 1rem;
    font-size: 14px;
}

.password a {
    color: var(--orange);
    text-decoration: none;
}

.password a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .login-container {
        max-width: 90%;
    }
}
</style>
  