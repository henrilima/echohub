<template>
    <div class="bottom-nav">
        <button
            @click="$emit('change-page', 'contacts')"
            :class="{ active: currentPage === 'contacts' }"
        >
            <v-icon name="md-chat-round" scale="1" /> Chats
        </button>
        <button
            @click="$emit('change-page', 'profile')"
            :class="{ active: currentPage === 'profile' }"
        >
        <v-icon name="md-personoutline" scale="1" /> Perfil
        </button>
        <button
            @click="$emit('change-page', 'settings')"
            :class="{ active: currentPage === 'settings' }"
        >
        <v-icon name="md-settings-round" scale="1" /> Configurações
        </button>
    </div>
</template>

<script>
export default {
    name: "BottomNav",
    props: {
        currentPage: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.bottom-nav {
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
    background: var(--semidarkgrey);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
}

.bottom-nav button {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--lightgrey);
    font-size: 16px;
    cursor: pointer;
}

.bottom-nav button.active {
    color: var(--white);
    font-weight: bold;
}

/* Responsividade */
@media (max-width: 600px) {
    .bottom-nav button {
        font-size: 14px;
    }
}
</style>
