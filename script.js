// CONTROLE DO MODAL ADMIN
const modal = document.getElementById('adminModal');
const openBtn = document.getElementById('openAdmin');
const closeBtn = document.querySelector('.close');
const loginArea = document.getElementById('loginArea');
const excelArea = document.getElementById('excelArea');

openBtn.onclick = () => { modal.style.display = "flex"; }
closeBtn.onclick = () => { modal.style.display = "none"; }

// CHECAGEM DE SENHA
function checkPass() {
    const pass = document.getElementById('adminPass').value;
    if(pass === "prcnbcguith") {
        loginArea.style.display = "none";
        excelArea.style.display = "block";
        loadData();
    } else {
        alert("Senha incorreta!");
    }
}

// FUNÇÕES DA TABELA (Excel)
function addRow(data = "", cam = "", ori = "", des = "", km = "", val = "", st = "") {
    const tbody = document.getElementById('tableBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td contenteditable="true">${data}</td>
        <td contenteditable="true">${cam}</td>
        <td contenteditable="true">${ori}</td>
        <td contenteditable="true">${des}</td>
        <td contenteditable="true">${km}</td>
        <td contenteditable="true">${val}</td>
        <td contenteditable="true">${st}</td>
        <td><button class="btn-del" onclick="this.parentElement.parentElement.remove()">X</button></td>
    `;
    tbody.appendChild(tr);
}

function saveData() {
    const rows = document.querySelectorAll('#tableBody tr');
    let dados = [];
    rows.forEach(row => {
        let cols = row.querySelectorAll('td');
        dados.push({
            data: cols[0].innerText,
            cam: cols[1].innerText,
            ori: cols[2].innerText,
            des: cols[3].innerText,
            km: cols[4].innerText,
            val: cols[5].innerText,
            st: cols[6].innerText
        });
    });
    localStorage.setItem('campra_db_v3', JSON.stringify(dados));
    alert("Dados da Tr. CAMPRA salvos com sucesso!");
}

function loadData() {
    const salvo = localStorage.getItem('campra_db_v3');
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = "";
    if(salvo) {
        JSON.parse(salvo).forEach(item => {
            addRow(item.data, item.cam, item.ori, item.des, item.km, item.val, item.st);
        });
    } else {
        // Linha inicial de exemplo
        addRow("20/03", "Scania Branco", "Pato Branco", "Itajaí", "540", "3.200", "Carregado");
    }
}

// ANIMAÇÃO DE REVEAL (OPCIONAL)
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        var windowHeight = window.innerHeight;
        var revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.transition = "1s ease";
        }
    });
}
window.addEventListener('scroll', reveal);
document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
});