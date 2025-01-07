<template>
    <div class="privacy-policy">
        <header class="privacy-header">
            <h1>Termos de Privacidade</h1>
            <p>Última atualização: 7 de janeiro de 2025</p>
        </header>
        <main class="privacy-content">
            <section>
                <h2>1. Informações Coletadas</h2>
                <p>
                    Coletamos as seguintes informações dos usuários ao utilizar
                    nossa plataforma:
                </p>
                <ul>
                    <li>Informações de cadastro, como email e senha.</li>
                    <li>
                        Dados fornecidos no perfil, como foto, gênero, ocupação
                        e recado.
                    </li>
                    <li>
                        Informações de uso, como mensagens enviadas e interações
                        dentro do aplicativo.
                    </li>
                </ul>
            </section>
            <section>
                <h2>2. Uso das Informações</h2>
                <p>As informações coletadas são usadas para:</p>
                <ul>
                    <li>Fornecer e melhorar nossos serviços.</li>
                    <li>Personalizar a experiência do usuário.</li>
                    <li>Garantir a segurança e a integridade da plataforma.</li>
                </ul>
            </section>
            <section>
                <h2>3. Compartilhamento de Dados</h2>
                <p>
                    Não compartilhamos informações pessoais com terceiros, a
                    menos que seja necessário para:
                </p>
                <ul>
                    <li>Conformidade com a lei ou solicitações legais.</li>
                    <li>Proteção contra fraude ou atividade maliciosa.</li>
                </ul>
            </section>
            <section>
                <h2>4. Direitos dos Usuários</h2>
                <p>Você tem o direito de:</p>
                <ul>
                    <li>
                        Acessar, corrigir ou solicitar via email a exclusão de
                        suas informações.
                    </li>
                    <li>
                        Solicitar via email a exclusão de sua conta e todos os
                        dados associados.
                    </li>
                </ul>
            </section>
            <section>
                <h2>5. Alterações nos Termos</h2>
                <p>
                    Reservamo-nos o direito de atualizar esta política a
                    qualquer momento. Notificaremos os usuários sobre alterações
                    significativas.
                </p>
            </section>
            <section>
                <h2>6. Contato</h2>
                <p>
                    Para dúvidas ou solicitações, entre em contato conosco pelo
                    email: <strong>cipherauthenticator@gmail.com</strong> ou
                    <strong>henrilima.contactme@gmail.com</strong>.
                </p>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: "privacityView",
};
</script>

<style scoped>
.privacy-policy {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: "Arial", sans-serif;
    line-height: 1.6;
}

.privacy-header {
    text-align: center;
    margin-bottom: 20px;
}

.privacy-header h1 {
    font-size: 2.5rem;
    color: var(--orange);
}

.privacy-header p {
    color: var(--lightgrey);
}

.privacy-content section {
    margin-bottom: 20px;
}

.privacy-content h2 {
    font-size: 1.5rem;
    color: var(--blurple);
    margin-bottom: 10px;
}

.privacy-content ul {
    margin: 10px 0;
    padding-left: 20px;
    list-style-type: disc;
}

.privacy-content ul li {
    margin-bottom: 5px;
}

.privacy-content p {
    margin-bottom: 10px;
    text-align: justify;
    color: var(--lightgrey);
}

@media (max-width: 768px) {
    .privacy-header h1 {
        font-size: 2rem;
    }

    .privacy-content h2 {
        font-size: 1.2rem;
    }
}
</style>