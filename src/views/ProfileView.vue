<template>
    <div class="profile-view">
        <div class="profile-container">
            <div class="profile-current">
                <div>
                    <img
                        :src="user.avatar"
                        alt="Foto de perfil"
                        class="profile-picture"
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
                            ><v-icon name="fa-instagram" scale="1.2" />
                            Instagram</a
                        >
                        <a
                            v-if="user?.social?.linkedin"
                            :href="user.social.linkedin"
                            target="_blank"
                            class="linkedin"
                            ><v-icon name="fa-linkedin" scale="1.2" />
                            LinkedIn</a
                        >
                        <a
                            v-if="user?.social?.website"
                            :href="user.social.website"
                            target="_blank"
                            class="personal"
                            ><v-icon name="fa-link" scale="1.2" /> Site
                            Pessoal</a
                        >
                    </div>
                    <button class="styled-button" @click="back">Voltar</button>
                </div>
            </div>

            <div class="profile-edit">
                <h3>Edite seu perfil</h3>
                <label>
                    Foto de perfil:
                    <input
                        type="file"
                        @change="updateProfilePicture"
                        id="profile-picture"
                    />
                </label>
                <label>
                    Status personalizado:
                    <input
                        type="text"
                        v-model="userinfos.status"
                        placeholder="Digite seu status"
                    />
                </label>
                <label>
                    Gênero:
                    <select v-model="userinfos.gender">
                        <option disabled value="">Selecione...</option>
                        <option>Masculino</option>
                        <option>Feminino</option>
                        <option>Não binário</option>
                        <option>Prefiro não informar</option>
                    </select>
                </label>
                <label>
                    Pronomes:
                    <select v-model="userinfos.pronouns">
                        <option disabled value="">Selecione...</option>
                        <option>Ele/Dele</option>
                        <option>Ela/Dela</option>
                        <option>Elu/Delu</option>
                    </select>
                </label>
                <label>
                    Data de nascimento:
                    <input
                        type="date"
                        v-model="userinfos.birthDate"
                        id="birthDate"
                        max=""
                    />
                </label>
                <label>
                    Ocupação:
                    <input
                        type="text"
                        v-model="userinfos.occupation"
                        placeholder="Digite sua ocupação"
                    />
                </label>
                <h4>Redes sociais</h4>
                <label>
                    Instagram:
                    <input
                        type="url"
                        v-model="userinfos.social.instagram"
                        placeholder="https://instagram.com/seuusuario"
                    />
                </label>
                <label>
                    LinkedIn:
                    <input
                        type="url"
                        v-model="userinfos.social.linkedin"
                        placeholder="https://linkedin.com/in/seuusuario"
                    />
                </label>
                <label>
                    Site pessoal:
                    <input
                        type="url"
                        v-model="userinfos.social.website"
                        placeholder="https://seusite.com"
                    />
                </label>
                <button @click="saveChanges">Salvar alterações</button>
            </div>
        </div>
    </div>
</template>
  
  <script>
import Cookies from "js-cookie";
import toastr from "toastr";
import axios from "axios";

export default {
    name: "ProfileView",
    data() {
        return {
            user: {},
            userinfos: {
                status: "",
                gender: "",
                pronouns: "",
                birthDate: "",
                occupation: "",
                social: {
                    instagram: "",
                    linkedin: "",
                    website: "",
                },
            },
        };
    },
    created() {
        const userData = Cookies.get("user");
        if (userData) {
            this.user = JSON.parse(userData);
            Object.assign(this.userinfos, this.user);
            if (!this.user.avatar) {
                this.user.avatar = "https://placehold.co/256/d9d9d9/d9d9d9";
            }
        }
    },
    mounted() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const todayFormatted = `${year}-${month}-${day}`;
        document
            .getElementById("birthDate")
            .setAttribute("max", todayFormatted);
    },
    methods: {
        back() {
            this.fRedirect("/app");
        },
        updateProfilePicture(event) {
            const file = event.target.files[0];
            if (file) {
                this.user.avatar = URL.createObjectURL(file);
                toastr.warning(
                    'Para salvar a imagem e todos os outros dados de maneira pernamente, clique em "Salvar alterações", no fim desta página.',
                    "",
                    {
                        timeOut: 8000,
                    }
                );
            }
        },
        autoUpdateChanges() {
            Object.assign(this.user, this.userinfos);
        },
        async saveChanges() {
            const fileInput = document.getElementById("profile-picture");
            const file = fileInput.files[0];

            if (file) {
                const MAX_SIZE = 4 * 1024 * 1024;
                if (file.size > MAX_SIZE) {
                    return toastr.error("O arquivo não pode exceder 4MB.");
                }
            }

            try {
                const formData = new FormData();
                if (file) {
                    formData.append("avatar", fileInput.files[0]);
                }
                formData.append(
                    "admin_pass_key",
                    process.env.VUE_APP_ADMIN_PASS_KEY
                );
                formData.append("id", this.user.id);
                formData.append("data", JSON.stringify(this.user));

                const response = await axios.post(
                    `${this.$baseUrl}/user/insertdata`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (response.status === 200) {
                    if (response?.data?.data?.avatar) {
                        this.user.avatar = response.data.data.avatar;
                    }

                    this.$store.dispatch("loginUser", this.user);
                    toastr.success(response.data.message);
                } else {
                    return toastr.error(
                        "Um erro ocorreu, tente novamente em breve."
                    );
                }
            } catch (error) {
                console.log(error);
                return toastr.error("Ocorreu um erro ao enviar seus dados.");
            }
        },
        fRedirect(path) {
            this.$router.push(path);
        },
    },
    watch: {
        userinfos: {
            handler() {
                this.autoUpdateChanges();
            },
            deep: true,
            immediate: true,
        },
    },
};
</script>
  
<style scoped>
label {
    font-weight: 600;
}

.profile-view {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    gap: 2rem;
    padding: 2rem;
}

.profile-container {
    width: 100%;
    gap: 2rem;
    position: relative;

    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.profile-current {
    width: 100%;
    background: var(--darkgrey);
    padding: 1.5rem;
    border-radius: 8px;
    color: var(--white);
    flex: 1;

    position: sticky;
    top: 2rem;

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
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
    text-align: center;
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
    margin: 1rem 0;
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

.profile-edit {
    width: 100%;
    background: var(--darkgrey);
    padding: 1.5rem;
    border-radius: 8px;
    color: var(--white);
    flex: 1;
}

.profile-edit h3,
.profile-edit h4 {
    margin-bottom: 1rem;
}

.profile-edit label {
    display: block;
    margin-bottom: 1rem;
}

.profile-edit input,
.profile-edit select {
    width: 100%;
    border: 1px solid var(--darkgrey);
    padding: 0.5rem;
    border-radius: 4px;
    outline: none;
    background-color: var(--semidarkgrey);
    color: var(--lightgrey);
}

.profile-edit button {
    margin-top: 1rem;
    padding: 0.7rem;
    background: var(--darkgrey);
    border: solid 2px var(--orange) !important;
    border: none;
    color: var(--lightgrey);
    font-weight: 700;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.4s ease;
}

.profile-edit button:hover {
    background-color: var(--semidarkgrey);
    color: var(--white);
}

/* RESPONSIVIDADE */
@media (max-width: 1024px) {
    .profile-container {
        flex-direction: column;
    }

    .profile-current {
        margin-bottom: 2rem;
        position: static;
    }
}

@media (max-width: 920px) {
    .profile-view {
        padding: 1rem;
    }

    .profile-picture {
        width: 120px;
        height: 120px;
    }

    .profile-edit h3,
    .profile-edit h4 {
        font-size: 1.2rem;
    }

    .profile-edit input,
    .profile-edit select {
        padding: 0.4rem;
    }

    .profile-edit button {
        padding: 0.6rem;
        font-size: 0.9rem;
    }
}

@media (max-width: 480px) {
    .profile-current {
        padding: 1rem;
    }

    .profile-edit {
        padding: 1rem;
    }

    .profile-picture {
        width: 100px;
        height: 100px;
    }

    .profile-edit label {
        font-size: 0.9rem;
    }

    .profile-edit input,
    .profile-edit select {
        font-size: 0.9rem;
    }

    .profile-edit button {
        font-size: 0.85rem;
    }
}
</style>
  