<template>
    <div class="contact-list">
        <h1>
            Olá, <span class="emphasize orange">{{ user.username }}</span
            >.
        </h1>
        <p>Busque pelos seus amigos, utilizando o nome de usuário deles:</p>
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Pesquise por nome de usuário"
            class="search-input"
        />
        <ul v-if="users.length > 0" class="user-list">
            <li
                v-for="userinfo in users"
                :key="userinfo.id"
                @click="showModal(userinfo)"
            >
                <img
                    :src="
                        userinfo.avatar ||
                        'https://placehold.co/50/d9d9d9/d9d9d9'
                    "
                    :alt="userinfo.username + ' Avatar'"
                    :draggable="false"
                />
                <span class="emphasize"
                    >@<span class="emphasize blurple">{{
                        userinfo.username
                    }}</span></span
                >
            </li>
        </ul>
        <ul>
            <li
                v-for="contact in contacts"
                :key="contact.id"
                class="contact-item"
                @click="$emit('open-chat', contact)"
            >
                <img
                    :src="
                        contact.avatar ||
                        'https://placehold.co/96/d9d9d9/d9d9d9'
                    "
                    alt="Avatar"
                    class="contact-avatar"
                    :draggable="false"
                />
                <div>
                    <h3 class="emphasize">@{{ contact.username }}</h3>
                    <p>
                        <span :class="{ emphasize: true, 'btn-blurple': contact.lastMessage.sender === this.user.id, 'btn-orange': contact.lastMessage.sender !== this.user.id }"
                            >{{
                                contact.lastMessage.sender === this.user.id
                                    ? "Você"
                                    : contact?.pronouns
                                    ? contact.pronouns.split("/")[0]
                                    : "Pessoa"
                            }}:</span
                        >
                        {{ contact.lastMessage.text }}
                    </p>
                </div>
            </li>
        </ul>

        <Transition name="fade" mode="out-in">
            <div v-if="isModalVisible" class="modal">
                <div class="profile-current">
                    <div>
                        <img
                            :src="
                                selectedUser.avatar ||
                                'https://placehold.co/256/d9d9d9/d9d9d9'
                            "
                            alt="Foto de perfil"
                            class="profile-picture"
                            :draggable="false"
                        />
                        <h2 class="emphasize orange">
                            @{{ selectedUser.username }}
                            <sup class="sup">{{
                                selectedUser.pronouns || ""
                            }}</sup>
                        </h2>
                        <span class="status">
                            <p>
                                {{
                                    selectedUser.status ||
                                    "Nenhum status definido"
                                }}
                            </p>
                        </span>
                    </div>
                    <div>
                        <p>
                            <strong>Gênero:</strong>
                            {{ selectedUser.gender || "Não especificado" }}
                        </p>
                        <p>
                            <strong>Data de nascimento:</strong>
                            {{
                                selectedUser.birthDate
                                    ? new Date(
                                          selectedUser.birthDate + "T00:00:00"
                                      ).toLocaleDateString("pt-BR")
                                    : "Não informado"
                            }}
                        </p>
                        <p>
                            <strong>Ocupação:</strong>
                            {{ selectedUser.occupation || "Não informada" }}
                        </p>
                        <div class="links">
                            <a
                                target="_blank"
                                class="instagram"
                                @click="$emit('open-chat', selectedUser)"
                                ><v-icon name="md-chat" scale="1.2" /> Chat</a
                            >
                            <a
                                v-if="selectedUser?.social?.instagram"
                                :href="selectedUser.social.instagram"
                                target="_blank"
                                class="instagram"
                                ><v-icon name="fa-instagram" scale="1.2" />
                                Instagram</a
                            >
                            <a
                                v-if="selectedUser?.social?.linkedin"
                                :href="selectedUser.social.linkedin"
                                target="_blank"
                                class="linkedin"
                                ><v-icon name="fa-linkedin" scale="1.2" />
                                LinkedIn</a
                            >
                            <a
                                v-if="selectedUser?.social?.website"
                                :href="selectedUser.social.website"
                                target="_blank"
                                class="personal"
                                ><v-icon name="fa-link" scale="1.2" /> Site
                                Pessoal</a
                            >
                        </div>
                    </div>
                </div>
                <button @click="closeModal" class="close">
                    <v-icon name="md-close-round" scale="2" />
                </button>
            </div>
        </Transition>
    </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import toastr from "toastr";
import { io } from "socket.io-client";

export default {
    name: "ContactList",
    data() {
        return {
            isModalVisible: false,
            user: null,
            searchQuery: "",
            selectedUser: null,
            users: [],
            contacts: [],
        };
    },
    created() {
        const userData = Cookies.get("user");
        if (userData) {
            this.user = JSON.parse(userData);
        }
    },
    mounted() {
        this.socket = io(this.$baseUrl);
        this.fetchContacts();

        this.socket.on("receiveMessage", () => {
            this.fetchContacts();
        });
    },
    methods: {
        showModal(user) {
            this.selectedUser = user;
            console.log(user);
            this.isModalVisible = true;
        },
        closeModal() {
            this.selectedUser = null;
            this.isModalVisible = false;
        },
        async searchUsers() {
            if (this.searchQuery.length === 0) {
                this.users = [];
                return;
            }

            try {
                const response = await axios.post(
                    `${this.$baseUrl}/user/fetchbyusername?username=${String(
                        this.searchQuery
                    )
                        .trim()
                        .toLowerCase()}`,
                    {
                        admin_pass_key: process.env.VUE_APP_ADMIN_PASS_KEY,
                    }
                );

                if (response.status === 200) {
                    this.users = [];
                    if (this.searchQuery.length > 0) {
                        for (let user in response.data) {
                            this.users.push(response.data[user]);
                        }
                    } else {
                        this.users = [];
                    }
                } else {
                    return toastr.error(
                        "Um erro interno ocorreu, tente novamente em breve."
                    );
                }
            } catch (err) {
                if (this.searchQuery.length > 0) {
                    return toastr.error(
                        "Não foi encontrado nenhum usuário com esse username."
                    );
                } else {
                    return;
                }
            }
        },
        async fetchContacts() {
            try {
                const response = await axios.post(
                    `${this.$baseUrl}/user/fetchcontacts`,
                    {
                        admin_pass_key: process.env.VUE_APP_ADMIN_PASS_KEY,
                        user: this.user.id,
                    }
                );

                if (response.status === 200) {
                    this.contacts = response.data.contacts;
                } else {
                    return toastr.error(
                        "Um erro interno ocorreu, tente novamente em breve."
                    );
                }
            } catch (err) {
                console.log(err);
                return toastr.error(
                    "Um erro interno ocorreu, tente novamente em breve."
                );
            }
        },
    },
    watch: {
        searchQuery: {
            handler() {
                this.searchUsers();
            },
            immediate: true,
        },
    },
};
</script>

<style scoped>
.user-search {
    padding: 20px;
    background: var(--semidarkgrey);
    color: var(--white);
    border-radius: 8px;
}

.search-input {
    margin: 0.4rem 0;
    width: 100%;
    padding: 0.5rem;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid var(--grey);
}

.user-list {
    margin: 0 0 0.5rem 0;
    list-style: none;
    background: var(--semidarkgrey);
    border-radius: 0.5rem;
    padding: 0.4rem;
}

.user-list li {
    background: var(--darkgrey);
    cursor: pointer;
    padding: 0.4rem;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
}

.user-list li img {
    width: 30px;
    height: 30px;
    border-radius: 25%;
}

.user-list li:first-of-type {
    border-radius: 5px 5px 0 0;
}

.user-list li:last-of-type {
    border-radius: 0 0 5px 5px;
}

.user-list li:hover {
    background: var(--semidarkgrey);
}

.contact-list {
    padding: 2rem;
}

.contact-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 5px;
    margin-bottom: 5px;
    background: var(--darkgrey);
    cursor: pointer;
    transition: background 0.2s ease-in-out;
}

.contact-item:hover {
    background: var(--semidarkgrey);
}

.contact-item div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.2rem;
}

.contact-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    z-index: 666;

    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--darkgrey);
}

.modal .profile-current {
    width: 100%;
    padding: 1.5rem;
    border-radius: 8px;
    color: var(--white);

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
}

.modal .profile-current > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.modal .profile-current > div span.status {
    padding: 0.4rem 1rem;
    margin-top: 0.5rem;
    background-color: var(--semidarkgrey);
    border-radius: 2rem;
    max-width: 90%;
}

.modal p {
    word-wrap: break-word;
    word-break: break-all;
    overflow-wrap: break-word;
}

.modal .profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1rem;
}

.modal .links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.modal .links a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-top: 0.5rem;
    color: var(--blurple);
    text-decoration: none;
    font-weight: 700;
}

.modal .links a svg {
    fill: var(--lightgrey);
    margin-bottom: 0.2rem;
}

.modal .links a:hover {
    cursor: pointer !important;
}

.modal button.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: var(--white);
    background: var(--darkgrey);
    border: none;
    border-radius: 50%;
    padding: 5px;
}

/* Responsividade */
@media (max-width: 600px) {
    h3 {
        font-size: 14px;
    }
}
</style>
