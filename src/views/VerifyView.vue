<template>
    <div class="verify">
        <main>
            <h3 class="main-text main-text-min">
                Espera um pouco... <span class="orange emphasize">Você</span>, é
                você mesmo?
            </h3>
            <p>
                Para sua segurança, precisamos fazer a verificação da sua conta.
                Um código de 6 dígitos foi enviado para seu email de cadastro
                <span class="orange emphasize">{{ this.email }}</span
                >) no dia da criação da sua conta, busque na sua caixa de
                entrada por <span class="emphasize blurple">EchoHub</span>.
                Insira-o abaixo.
            </p>
            <form @submit.prevent>
                <label for="code" class="emphasize">Seu código:</label>
                <input
                    type="text"
                    placeholder="123456"
                    name="code"
                    id="code"
                    v-model="code"
                />
                <button
                    class="styled-button"
                    :disabled="disabled"
                    @click="submitVerification()"
                >
                    Verificar
                </button>
            </form>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";

export default {
    name: "verifyView",
    computed: {
        email() {
            return this.$store.state.user.email;
        },
    },
    data() {
        return {
            code: "",
            disabled: true,
        };
    },
    mounted() {
        this.$store.commit("setAccessVerify", false);
    },
    watch: {
        code: {
            handler() {
                this.code = this.code.trim().replace(/[^0-9]/g, "");

                if (this.code.length > 6) {
                    this.code = this.code.slice(0, 6);
                }
                if (this.code.length === 6) {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            immediate: false,
        },
    },
    methods: {
        async submitVerification() {
            try {
                const response = await axios.post(`${this.$baseUrl}/user/verify`, {
                    admin_pass_key: process.env.VUE_APP_ADMIN_PASS_KEY,
                    email: this.email,
                    verificationcode: this.code.trim().replace(/[^0-9]/g, ""),
                });
                if (response.status === 200) {
                    toastr.success(
                        "Sua validação foi concluída com sucesso, estamos te redirecionando!",
                        "Muito obrigado."
                    );
                    setTimeout(() => {
                        return this.$router.push({
                            name: "app",
                        });
                    }, process.env.VUE_APP_TIMEOUT);
                } else {
                    toastr.error("Código inválido.");
                }
            } catch (error) {
                console.error(error);
                toastr.error("Ocorreu um erro ao verificar o código.");
            } finally {
                this.code = "";
                this.disabled = true;
            }
        },
    },
};
</script>

<style scoped>
div.verify {
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
