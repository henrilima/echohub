<template>
    <div class="chat-app">
        <div class="main-content">
            <ContactList
                v-if="currentPage === 'contacts' && !activeChat"
                @open-chat="handleOpenChat"
            />
            <Chat
                v-if="activeChat"
                :contact="activeChat"
                @close-chat="handleCloseChat"
            />
            <Profile v-if="currentPage === 'profile' && !activeChat" />
            <Settings v-if="currentPage === 'settings' && !activeChat" />
        </div>

        <!-- Bottom Navigation -->
        <BottomNav
            v-if="!activeChat"
            :current-page="currentPage"
            @change-page="handleChangePage"
        />
    </div>
</template>

<script>
import ContactList from "@/components/ContactList.vue";
import Chat from "@/components/ChatComponent.vue";
import Profile from "@/components/ProfileComponent.vue";
import Settings from "@/components/SettingsComponent.vue";
import BottomNav from "@/components/BottomNav.vue";

export default {
    data() {
        return {
            currentPage: "contacts",
            activeChat: null,
        };
    },
    methods: {
        handleOpenChat(contact) {
            this.activeChat = contact;
        },
        handleCloseChat() {
            this.activeChat = null;
        },
        handleChangePage(page) {
                this.currentPage = page;
                this.activeChat = null;
        },
    },
    components: {
        ContactList,
        Chat,
        Profile,
        Settings,
        BottomNav,
    },
};
</script>

<style scoped>
.chat-app {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: var(--darkgrey);
    color: var(--white);
}
.main-content {
    flex: 1;
    overflow-y: auto;
}
</style>