// Componentes (Elementos HTML)
function AcoesTarefa(tarefa) {
    // Criando Div
    let divAcoes = document.createElement('div')
    
    // Criando Checkbox
    const checkboxTarefa = document.createElement("input");
    checkboxTarefa.type = "checkbox";
    checkboxTarefa.checked = tarefa.completa;

    checkboxTarefa.addEventListener(
        "click", () => switchFinalizarTarefa(tarefa.id))

    // Criando botão de editar
    const botaoEditar = document.createElement('button')

    const iconeEditar = document.createElement('ion-icon')
    iconeEditar.name = 'create-outline'
    botaoEditar.appendChild(iconeEditar)
    
    botaoEditar.addEventListener(
        "click", () => editarTarefa(tarefa.id))

    // Criando botão de excluir
    const botaoExcluir = document.createElement('button')

    const iconeExcluir = document.createElement('ion-icon')
    iconeExcluir.name = 'trash-bin-outline'
    botaoExcluir.appendChild(iconeExcluir)
    
    botaoExcluir.addEventListener(
        "click", () => excluirTarefa(tarefa.id))

    divAcoes.appendChild(checkboxTarefa)
    divAcoes.appendChild(botaoEditar)
    divAcoes.appendChild(botaoExcluir)
    divAcoes.classList.add('acoes')

    return divAcoes
}

function Tarefa(tarefa) {
  // Construindo LI
  const liTarefa = document.createElement("li");
  // liTarefa.textContent = `${tarefa} - ${descricao} -> `

  const h2Tarefa = document.createElement("h2");
  h2Tarefa.textContent = tarefa.nome;

  const pDescricao = document.createElement("p");
  pDescricao.textContent = tarefa.descricao;

  const divInfo = document.createElement("div");
  divInfo.appendChild(h2Tarefa);
  divInfo.appendChild(pDescricao);

  const divAcoes = AcoesTarefa(tarefa)

  liTarefa.appendChild(divInfo);
  liTarefa.appendChild(divAcoes);
  liTarefa.classList.add("tarefa");
  
  if (tarefa.completa) {
    liTarefa.classList.add("concluida");
  } else {
    liTarefa.classList.remove("concluida");
  }

  return liTarefa;
}

// -----------------------------------
// Utilitarios
function criarId(tarefas) {
    let maiorId;
    
    for (let tarefa of tarefas) {
        if (maiorId == undefined || tarefa.id > maiorId) {
            maiorId = tarefa.id
        }
    }

    return maiorId + 1
}

// Lógica da Tela
let tarefasState = [
  {
    id: 1,
    nome: "Estudar AWS",
    descricao: "Realizar curso do andré iacono",
    completa: true,
  },
  {
    id: 2,
    nome: "Nginx para Deploy",
    descricao: "Na marra",
    completa: false,
  },
];

// Listar Tarefas
function listarTarefas(tarefas) {
  const ulTarefas = document.getElementById("tarefas");
  ulTarefas.textContent = "";

  if (tarefas.length == 0) {
    ulTarefas.textContent = "Não foram encontrados resultados...";
    return;
  }

  tarefas.map((tarefa) => {
    const liTarefa = Tarefa(tarefa);
    ulTarefas.appendChild(liTarefa);
  });

//   for (let tarefa of tarefas) {
//     const liTarefa = Tarefa(tarefa);
//     ulTarefas.appendChild(liTarefa);
//   }
}

function handleListarTarefas() {
  // Logica para buscar as tarefas de outro lugar.
  listarTarefas(tarefasState);
}

window.addEventListener("load", handleListarTarefas);

// Pesquisar Tarefas
const inputPesquisar = document.getElementById("pesquisar");

function handlePesquisarTarefas() {
  let pesquisa = inputPesquisar.value.toLowerCase();

  let resultado = tarefasState.filter((tarefa) =>
    tarefa.nome.toLowerCase().includes(pesquisa)
  );

  listarTarefas(resultado);
}

inputPesquisar.addEventListener("input", handlePesquisarTarefas);

// Adicionar Nova Tarefa
const formulario = document.getElementById("form-tarefa");

function handleAdicionarTarefa(event) {
  event.preventDefault();

  // Capturando do Formulário
  let novaTarefa = {
    id: criarId(tarefasState),
    nome: formulario.tarefa.value,
    descricao: formulario.descricao.value,
    completa: false,
  };

  tarefasState.push(novaTarefa);
  listarTarefas(tarefasState);

  formulario.reset();
}

formulario.addEventListener("submit", handleAdicionarTarefa);

// Excluir tarefa
function excluirTarefa(tarefaId) {
    let confirmacao = confirm('Deseja realmente excluir a tarefa?');

    if (confirmacao) {
        tarefasState = tarefasState.filter((tarefa) => tarefa.id !== tarefaId);
        listarTarefas(tarefasState);
    }
}

// Editar tarefa
function editarTarefa(tarefaId) {
    let tarefa = tarefasState.find((tarefa) => tarefa.id === tarefaId);

    let novoNome = prompt('Digite o novo nome da tarefa:', tarefa.nome);
    if (novoNome !== null && novoNome.trim() !== "") {
        tarefa.nome = novoNome;
    }

    let novaDescricao = prompt('Digite a nova descrição da tarefa:', tarefa.descricao);
    if (novaDescricao !== null && novaDescricao.trim() !== "") {
        tarefa.descricao = novaDescricao;
    }

    listarTarefas(tarefasState);
}

// Switch Finalizar Tarefa
function switchFinalizarTarefa(tarefaId) {
    let tarefa = tarefasState.find((tarefa) => tarefa.id === tarefaId);

    tarefa.completa = !tarefa.completa;
    listarTarefas(tarefasState);
}
