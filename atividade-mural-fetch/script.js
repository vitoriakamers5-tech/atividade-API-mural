const botao = document.querySelector("#btn-carregar");
const filtro = document.querySelector("#filtro");
const mensagem = document.querySelector("#mensagem");
const painel = document.querySelector("#lista-posts");

const URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";
let publicacoes = [];

function carregarPublicacoes() {
    mensagem.textContent = "Carregando publicações...";
botao.disabled = true;
    fetch(URL)
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }

            return resposta.json();
        })
        .then((dados) => {
            console.log(dados);

            publicacoes = dados;
            renderizarPublicacoes(publicacoes);
            mensagem.textContent = "";
        })

        .catch((erro) => {
    console.error(erro);

    mensagem.textContent = "Não foi possível carregar as publicações.";
    painel.replaceChildren();
})

.finally(() => {
    botao.disabled = false;
});
}

function renderizarPublicacoes(lista) {
    const painel = document.querySelector("#lista-posts");

    painel.replaceChildren();

    lista.forEach((publicacao) => {
        const cartao = document.createElement("article");
        cartao.classList.add("cartao");

        const titulo = document.createElement("h2");
        titulo.textContent = publicacao.title;

        const texto = document.createElement("p");
        texto.textContent = publicacao.body;

        const id = document.createElement("span");
        id.textContent = `Publicação #${publicacao.id}`;

        cartao.append(id, titulo, texto);

        painel.append(cartao);
    });
}

botao.addEventListener("click", () => {
    carregarPublicacoes();

});

filtro.addEventListener("input", () => {
    const termo = filtro.value.trim().toLowerCase();

    const encontradas = publicacoes.filter((item) => {
        return item.title.toLowerCase().includes(termo);
    });

    renderizarPublicacoes(encontradas);

    if (encontradas.length === 0) {
        mensagem.textContent = "Nenhuma publicação encontrada.";
    } else {
        mensagem.textContent = "";
    }
});