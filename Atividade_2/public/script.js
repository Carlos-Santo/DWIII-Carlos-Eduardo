const API_URL = "http://localhost:3000/produtos";

const form = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");

let editandoId = null;

async function carregarProdutos() {
  const resp = await fetch(API_URL);
  const produtos = await resp.json();

  lista.innerHTML = "";

  produtos.forEach((produto) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${produto.nome} - R$ ${produto.valor}</span>

      <div class="acoes">
        <button class="btn-editar">Editar</button>
        <button class="btn-deletar">Excluir</button>
      </div>
    `;

    // botão deletar
    li.querySelector(".btn-deletar").addEventListener("click", async () => {
      await fetch(`${API_URL}/${produto._id}`, {
        method: "DELETE"
      });

      carregarProdutos();
    });

    // botão editar
    li.querySelector(".btn-editar").addEventListener("click", () => {
      document.getElementById("nome").value = produto.nome;
      document.getElementById("valor").value = produto.valor;

      editandoId = produto._id;
    });

    lista.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const produto = {
    nome: document.getElementById("nome").value,
    valor: document.getElementById("valor").value
  };

  if (editandoId) {
    // editar produto
    await fetch(`${API_URL}/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    editandoId = null;
  } else {
    // criar produto
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });
  }

  form.reset();
  carregarProdutos();
});

carregarProdutos();