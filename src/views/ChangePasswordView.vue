<template>
    <div class="change">
        <main>
            <h3 class="main-text main-text-min">
                Hora de escolher sua nova
                <span class="emphasize orange">senha</span>.
            </h3>
            <p>Escolha sua nova senha com segurança.</p>
            <form @submit.prevent>
                <label for="password" class="emphasize">Sua nova senha:</label>
                <input
                    :type="passwordVisible ? 'text' : 'password'"
                    placeholder="12345678"
                    name="password"
                    id="password"
                    v-model="password"
                />
                <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="styled-button"
                >
                    <span id="password-visibility">Ocultar senha</span>
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
                    class="styled-button"
                    :disabled="disabled"
                    @click="submitChangePasswordForm()"
                >
                    Alterar senha
                </button>
            </form>
        </main>
    </div>
</template>

<script>
import toastr from "toastr";
import axios from "axios";

export default {
    name: "ChangePasswordView",
    data() {
        return {
            password: "",
            passwordVisible: true,
            disabled: true,
            request: "",
        };
    },
    mounted() {
        this.request = this.$route.query.request;
    },
    methods: {
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
            const el = document.getElementById("password-visibility");
            if (this.passwordVisible) {
                el.innerHTML = "Ocultar Senha";
            } else {
                el.innerHTML = "Mostrar Senha";
            }
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
                toastr.info(
                    "Sua senha deve ser composta por 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo, com um mínimo de 8 dígitos.",
                    "Informações sobre a senha",
                    {
                        timeOut: 15000,
                    }
                );
            }

            return isStrong;
        },
        async submitChangePasswordForm() {
			toastr.clear();
            try {
                const response = await axios.post(
                    `${this.$baseUrl}/user/changepassword?request=${this.request}`,
                    {
                        admin_pass_key: process.env.VUE_APP_ADMIN_PASS_KEY,
                        password: this.password,
                    }
                );

                if (response.status === 200) {
                    toastr.success("Sua senha foi alterada com sucesso.");
                    setTimeout(() => {
                        return this.$router.push({
                            name: "login",
                        });
                    }, process.env.VUE_APP_TIMEOUT);
                } else {
                    toastr.error(
                        "Sua solicitação de troca de senha é inválida."
                    );
                }
            } catch (error) {
                console.error(error);
                toastr.error(error.response.data.message);
            } finally {
                this.password = "";
                this.disabled = true;
            }
        },
    },
    watch: {
        password: {
            handler() {
                this.disabled = !this.validatePassword();
            },
            immediate: false,
        },
    },
};
</script>

<style scoped>
div.change {
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

.styled-button:nth-of-type(1) {
    border-color: var(--orange);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>