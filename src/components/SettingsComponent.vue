<template>
    <div class="settings-page">
        <h1>Configurações</h1>
        <ul class="settings-options">
            <li v-for="(option, index) in settingsOptions" :key="index">
                <button @click="selectOption(option.action)">
                    {{ option.label }}
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SettingsComponent",
    data() {
        return {
            settingsOptions: [
                { label: "Alterar Senha", action: "changePassword" },
                { label: "Notificações", action: "notifications" },
            ],
        };
    },
    methods: {
        selectOption(action) {
            switch (action) {
                case "changePassword":
                    this.$router.push('/forgot');
                    break;
                case "notifications":
                    alert("Função de notificações em desenvolvimento!");
                    break;
                default:
                    alert("Ação desconhecida!");
            }
        },
    },
};
</script>

<style scoped>
.settings-page {
    padding: 2rem;
    background: var(--darkgrey);
    color: var(--white);
    height: 100vh;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.settings-options {
    list-style: none;
    padding: 0;
}

.settings-options li {
    margin-bottom: 10px;
}

.settings-options button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    background: var(--btn-blurple);
    color: var(--white);
    transition: all 0.4s ease;
}

.settings-options button:hover {
    background: var(--btn-orange);
}

/* Responsividade */
@media (max-width: 600px) {
    button {
        font-size: 14px;
    }
}
</style>
