<template>
    <div class="chat-area">
        <div class="chat-header">
            <button class="back-button" @click="$emit('close-chat')">
                <v-icon name="md-arrowcircleleft-outlined" />Voltar
            </button>
            <div>
                <h2>{{ contact.username }}</h2>
                <img
                    :src="
                        contact.avatar ||
                        'https://placehold.co/256/d9d9d9/d9d9d9'
                    "
                    :alt="contact.username + ' Avatar'"
                    :draggable="false"
                />
            </div>
        </div>
        <div class="messages">
            <div
                v-for="(message, index) in allMessages"
                :key="index"
                :class="[
                    'message',
                    message.sender === 'me' ? 'sent' : 'received',
                ]"
            >
                {{ message.text }}
            </div>
        </div>
        <div class="message-input">
            <input
                type="text"
                v-model="newMessage"
                placeholder="Digite sua mensagem..."
                @keyup.enter="handleKeyupEnter"
            />
            <button @click="sendMessage()" :disabled="!newMessage.trim()">
                Enviar<v-icon name="md-send-round" />
            </button>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
import toastr from "toastr";
import Cookies from "js-cookie";

export default {
    name: "ChatComponent",
    props: {
        contact: {
            type: Object,
            required: true,
        },
    },
    computed: {
        allMessages() {
            return [...this.messages].reverse();
        },
    },
    data() {
        return {
            user: null,
            messages: [],
            newMessage: "",
            chatId: "",
        };
    },
    created() {
        const userData = Cookies.get("user");
        if (userData) {
            this.user = JSON.parse(userData);
        }
    },
    mounted() {
        this.socket = io(this.$baseUrl, {
            withCredentials: true,
        });
        this.fetchMessages();

        this.socket.on("receiveMessage", () => {
            this.fetchMessages();
        });
    },
    methods: {
        handleKeyupEnter(event) {
            if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault();
            } else if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                this.sendMessage();
            }
        },
        async fetchMessages() {
            try {
                const response = await axios.post(
                    `${this.$baseUrl}/messages/fetch`,
                    {
                        admin_pass_key: process.env.VUE_APP_ADMIN_PASS_KEY,
                        user: this.user.id,
                        contact: this.contact.id,
                    }
                );

                if (response.data.type) {
                    toastr.info(response.data.message);
                }

                const messagesLoaded = [];

                for (const message in response.data.messages) {
                    messagesLoaded.push({
                        sender:
                            response.data.messages[message].sender ===
                            this.user.id
                                ? "me"
                                : "them",
                        text: response.data.messages[message].text,
                        timestamp: response.data.messages[message].timestamp,
                    });
                }

                this.chatId = response.data.chat;
                this.messages = messagesLoaded;
            } catch (error) {
                console.error("Error fetching messages:", error);
                toastr.error(
                    "Um erro ocorreu ao carregar as suas mensagens. Por favor, não envie novas mensagens e tente novamente mais tarde."
                );
            }
        },
        async sendMessage() {
            if (this.newMessage.trim()) {
                await axios
                    .post(`${this.$baseUrl}/messages/send`, {
                        admin_pass_key: process.env.VUE_APP_ADMIN_PASS_KEY,
                        sender: this.user.id,
                        receiver: this.contact.id,
                        text: this.newMessage,
                        chat: this.chatId,
                    })
                    .then((response) => {
                        this.chatId = response.data.chat;
                        this.socket.emit("sendMessage", response.data.message);
                        this.fetchMessages();
                    })
                    .catch((err) => {
                        console.error("Error sending message:", err);
                        toastr.error(
                            "Um erro ocorreu ao enviar a sua mensagem. Por favor, tente novamente mais tarde."
                        );
                    })
                    .finally(() => {
                        this.newMessage = "";
                    });
            }
        },
    },
};
</script>

<style scoped>
.chat-area {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--darkgrey);
    color: var(--lightgrey);
    overflow: hidden;
}

.chat-header {
    padding: 1rem 2rem;
    background: var(--black);

    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chat-header button {
    background-color: transparent;
    border-color: transparent;
}

button {
    font-size: 1rem;
    background: var(--darkgrey);
    border: solid 2px var(--darkgrey);
    color: var(--lightgrey);
    padding: 0.75rem 2rem;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

button:hover {
    background-color: var(--semidarkgrey);
    color: var(--white);
    border-color: var(--blurple);
    transition: all 0.4s ease;
}

button:disabled {
    background: var(--darkgrey);
    border: solid 2px var(--darkgrey);
    color: var(--lightgrey);
    cursor: auto;
}

button svg {
    fill: var(--lightgrey);
}

button:hover svg {
    fill: var(--white);
    transition: all 0.4s ease;
}

button:hover:disabled svg {
    fill: var(--lightgrey);
}

.chat-header div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.chat-header div img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.messages {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem 10rem;

    display: flex;
    flex-direction: column-reverse !important;
}

.message {
    margin: 2.5px 0;
    padding: 0.5rem 1rem;
    border-radius: 0;
    border-radius: 8px;
    font-weight: 500;
}

.sent {
    display: inline-flex;
    align-self: flex-end;
    max-width: 50%;
    text-align: left;
    color: var(--orange);
    background-color: var(--semidarkgrey);
}

.received {
    display: inline-flex;
    align-self: flex-start;
    max-width: 50%;
    text-align: left;
    color: var(--white);
    background-color: var(--grey);
}

.message-input {
    display: flex;
    padding: 1rem 2rem;
    background: var(--semidarkgrey);
}

input {
    resize: none;
    flex: 1;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-right: 10px;
    background-color: var(--darkgrey);
}

/* Responsividade */
@media (max-width: 600px) {
    .chat-header h2 {
        font-size: 16px;
    }
    input {
        font-size: 14px;
    }
}
</style>
