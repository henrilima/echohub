<template>
    <div class="profile-page">
        <div class="profile-current">
            <div>
                <img
                    :src="user.avatar"
                    alt="Foto de perfil"
                    class="profile-avatar"
                    :draggable="false"
                />
                <h2 class="emphasize orange">
                    @{{ user.username }}
                    <sup class="sup">{{ user.pronouns || "" }}</sup>
                </h2>
                <span class="status">
                    <p>{{ user.status || "Nenhum status definido" }}</p>
                </span>
            </div>
            <div>
                <p>
                    <strong>Gênero:</strong>
                    {{ user.gender || "Não especificado" }}
                </p>
                <p>
                    <strong>Data de nascimento:</strong>
                    {{
                        user.birthDate
                            ? new Date(
                                  user.birthDate + "T00:00:00"
                              ).toLocaleDateString("pt-BR")
                            : "Não informado"
                    }}
                </p>
                <p>
                    <strong>Ocupação:</strong>
                    {{ user.occupation || "Não informada" }}
                </p>
                <div class="links">
                    <a
                        v-if="user?.social?.instagram"
                        :href="user.social.instagram"
                        target="_blank"
                        class="instagram"
                        ><v-icon name="fa-instagram" scale="1.2" /> Instagram</a
                    >
                    <a
                        v-if="user?.social?.linkedin"
                        :href="user.social.linkedin"
                        target="_blank"
                        class="linkedin"
                        ><v-icon name="fa-linkedin" scale="1.2" /> LinkedIn</a
                    >
                    <a
                        v-if="user?.social?.website"
                        :href="user.social.website"
                        target="_blank"
                        class="personal"
                        ><v-icon name="fa-link" scale="1.2" /> Site Pessoal</a
                    >
                </div>
                <div class="profile-actions">
                    <button @click="editProfile" class="edit-button">
                        Editar Perfil
                    </button>
                    <button @click="logout" class="logout-button">Sair</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
    name: "ProfileComponent",
    data() {
        return {
            user: null,
        };
    },
    created() {
        const userData = Cookies.get("user");
        if (userData) {
            this.user = JSON.parse(userData);
            if (!this.user.avatar) {
                this.user.avatar = "https://placehold.co/256/d9d9d9/d9d9d9";
            }
        }
    },
    methods: {
        editProfile() {
            this.$router.push("profile");
        },
        logout() {
            this.$store.dispatch("logoutUser");
            this.$router.go(0);
        },
    },
};
</script>

<style scoped>
.profile-current {
    width: 100%;
    height: auto;
    background: var(--darkgrey);
    padding: 2rem;
    border-radius: 8px;
    color: var(--white);

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
}

.profile-current > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.profile-current > div span.status {
    padding: 0.4rem 1rem;
    margin-top: 0.5rem;
    background-color: var(--semidarkgrey);
    border-radius: 2rem;
    max-width: 90%;
}

p {
    word-wrap: break-word;
    word-break: break-all;
    overflow-wrap: break-word;
}

.profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 1rem;
}

.links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.links a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-top: 0.5rem;
    color: var(--blurple);
    text-decoration: none;
    font-weight: 700;
}

.links a svg {
    fill: var(--lightgrey);
    margin-bottom: 0.2rem;
}

.profile-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--darkgrey);
    color: var(--white);
    height: auto;
}

.profile-header {
    text-align: center;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.profile-avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin-bottom: 1rem;
}

.profile-actions {
    margin: 3rem 0;
}

.profile-actions button {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: var(--lightgrey);
    background-color: var(--darkgrey);
}

button:hover {
    background-color: var(--semidarkgrey);
    color: var(--white);
    cursor: pointer;
    transition: all 0.4s ease;
}

.edit-button {
    border: solid 2px var(--orange) !important;
}

.logout-button {
    border: solid 2px var(--blurple) !important;
}

/* Responsividade */
@media (max-width: 600px) {
    .profile-avatar {
        width: 180px;
        height: 180px;
    }

    .profile-actions button {
        font-size: 14px;
    }
}
</style>
