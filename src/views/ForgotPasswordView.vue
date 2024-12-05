<template>
    <div class="forgot">
        <main>
            <h3 class="main-text main-text-min">
                Qual o seu <span class="emphasize orange">email</span>?
            </h3>
            <p>
                Nós iremos te enviar um email com um link para recuperação de
                senha. Para sua segurança,
                <span class="emphasize orange">NÃO COMPARTILHE</span> esse link
                com ninguém, caso contrário, outras pessoas poderão acessar sua
                conta.
            </p>
            <form @submit.prevent>
                <label for="email" class="emphasize">Seu email:</label>
                <input
                    type="email"
                    placeholder="example@example.com"
                    name="email"
                    id="email"
                    v-model="email"
                />
                <button
                    class="styled-button"
                    :disabled="disabled"
                    @click="submitForgotEmail()"
                >
                    Enviar email
                </button>
            </form>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";

export default {
    name: "forgotPasswordView",
    data() {
        return {
            email: "",
            disabled: true,
        }
    },
    methods: {
        validateEmail() {
            const emailRegex =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailRegex.test(this.email);
        },
        async submitForgotEmail() {
            try {
                const response = await axios.post(`${this.$baseUrl}/user/resetpassword`, {
                    admin_pass_key: process.env.VUE_APP_ADMIN_PASS_KEY,
                    email: (this.email).trim().toLowerCase(),
                });

                if (response.status === 200) {
                    toastr.warning(
                        "Cheque seu email."
                    );
                    setTimeout(() => {
                        return this.$router.push({
                            name: "login",
                        });
                    }, process.env.VUE_APP_TIMEOUT);
                } else {
                    toastr.error("Código inválido.");
                }
            } catch (error) {
                console.error(error);
                toastr.error("Ocorreu um erro ao enviar o email.");
            } finally {
                this.email = "";
                this.disabled = true;
            }
        }
    },
    watch: {
        email: {
            handler() {
                this.disabled = !this.validateEmail();
            },
            immediate: true,
        },
    },
};
</script>

<style scoped>
div.forgot {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 480px;
    padding: 1rem;
    text-align: center;
    color: var(--lightgrey);
}

main h3 {
    color: var(--white);
}

main form {
    margin-top: 1.6rem;
    text-align: left;
}

main form > * {
    width: 100%;
}

main form input {
    margin-top: 0.4rem;
}

main form button {
    margin-top: 0.5rem;
}
</style>
