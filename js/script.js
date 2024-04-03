let abrir_modal = document.getElementById("abrir-modal");
let modal = document.getElementById("modal");
let titulo = document.getElementById("titulo");
let texto = document.getElementById("descricao");
let editando = false;

let notas = [];

if (localStorage.getItem("notas")) {
    notas = JSON.parse(localStorage.getItem("notas"));
    if (notas.length > 0) {
        mostrarNotas();
    }
}

function abrirModal() {
    modal.style.display = "block";
}

function fecharModal() {
    modal.style.display = "none";
}

function criarNota() {
    let nota = {
        titulo: titulo.value,
        texto: texto.value,
        data: new Date().toLocaleDateString(),
    };
    console.log(nota);
    notas.push(nota);
    mostrarNotas();
    fecharModal();
    titulo.value = "";
    texto.value = "";
    localStorage.setItem("notas", JSON.stringify(notas));
}

function excluirNota(index) {
    notas.splice(index, 1);
    mostrarNotas();
    localStorage.setItem("notas", JSON.stringify(notas));
}

function mostrarNotas() {
    console.log("entrou");
    let main = document.querySelector("main");
    main.innerHTML = "";

    return (main.innerHTML = notas
        .map((nota, index) => {
            return `
                    <div id="${index}" class="w-full h-24 mb-4 py-2 border-b-2 border-gray-200">
                            <span class="flex justify-between">
                                    <h2 class="text-xl p-1">${nota.titulo}</h2>
                                    <p class="text-sm" id="data">Ultima edição: ${nota.data}</p>
                            </span>
                            <section class="flex mt-4">
                                    <p class="text-sm w-5/6 p-1" id="texto">${nota.texto}</p>
                                    <span class="w-1/6 flex justify-end">
                                            <img
                                                    src="/static/caneta.svg"
                                                    class="p-2 hover:bg-gray-200 rounded-xl"
                                                    alt=""
                                                    onclick="editarNota(${index})"
                                                    id="edit"
                                            />
                                            <img
                                                    src="/static/lixo.svg"
                                                    class="p-2 hover:bg-gray-200 rounded-xl"
                                                    alt=""
                                                    onclick="excluirNota(${index})"
                                            />
                                    </span>
                            </section>
                    </div>  
            `;
        })
        .join(""));
}

function editarNota (index) {
        let nota = notas[index];
        let notaElement = document.getElementById(index);
        let tituloElement = notaElement.querySelector("h2");
        let textoElement = notaElement.querySelector("#texto");
        let edit = notaElement.querySelector("#edit");
        if (editando == false) {
        editando = true;
        console.log("save")
        edit.src = "/static/save.svg";
        tituloElement.contentEditable = true;
        textoElement.contentEditable = true;
        tituloElement.style.border = "1px solid black";
        textoElement.style.border = "1px solid black";

        tituloElement.addEventListener("blur", function () {
                nota.titulo = tituloElement.innerText;
                localStorage.setItem("notas", JSON.stringify(notas));
        });

        textoElement.addEventListener("blur", function () {
                nota.texto = textoElement.innerText;
                localStorage.setItem("notas", JSON.stringify(notas));
        });}
        else {
                editando = false;
                console.log("caneta")
                edit.src = "/static/caneta.svg";
                notas[index].titulo = tituloElement.innerText;
                notas[index].texto = textoElement.innerText;
                notas[index].data = new Date().toLocaleDateString();
                let dataElement = notaElement.querySelector("#data");
                dataElement.innerHTML = notas[index].data;
                tituloElement.contentEditable = false;
                textoElement.contentEditable = false;
                localStorage.setItem("notas", JSON.stringify(notas));
                tituloElement.style.border = "none";
                textoElement.style.border = "none";
        }
}