var tabela = document.getElementById("tabela")

var contas = [
    ['1', 'ATIVO', 0],
    ['1.1', 'ATIVO CIRCULANTE', 0],
    ['1.2', 'ATIVO NÃO-CIRCULANTE', 0],
    ['2', 'PASSIVO', 0],
    ['2.1', 'PASSIVO CIRCULANTE', 0],
    ['2.2', 'PASSIVO NÃO-CIRCULANTE', 0],
    ['2.3', 'PATRIMÔNIO LIQUIDO', 0]
]

let x = window.localStorage.getItem('contas');
if (x != null) contas = JSON.parse(x)
else window.localStorage.setItem('contas', JSON.stringify(contas))

function fazerTabela() {
    tabela.innerHTML = ""
    for (let i of contas) {
        if (i[0] == "2") tabela.innerHTML += "<tr><th>&nbsp;</th><td>&nbsp;</td><td>&nbsp;</td></tr>"
        tabela.innerHTML += `
            <tr>
                <th scope="row">${i[0]}</th>
                <td class="grau${i[0].split('.').length}">${i[1]}</td>
                <td>${i[2]}</td>
            </tr>
        `
    }
}
fazerTabela()

function valores() {
    let i = contas.length-1
    let grau = contas[i][0].split('.').length

    while (i >= 0) {
        let grauAtual = contas[i][0].split('.').length

        if (grauAtual < grau) {
            let re = new RegExp(`^${contas[i][0]}\\.\\d+$`)
            contas[i][2] = contas
                            .reduce((acc,c)=>
                                acc + (re.test(c[0]) ? c[2] : 0)
                            , 0)
            grau--
        } 
        else if (grauAtual > grau) {
            grau = grauAtual
        }

        i--
    }
}

function validacao() {
    let codigo = document.getElementById("codigo")
    let descricao = document.getElementById("descricao")
    let valor = document.getElementById("valor")

    codigo.classList.remove('is-invalid')
    descricao.classList.remove('is-invalid')
    valor.classList.remove('is-invalid')

    let valido = true

    valCod: {
        if (codigo.value == '') {
            document.getElementById('valCod').textContent = "Não pode ser vazio"
        }
        else if (!(/^(\d+\.?)*\d+$/.test(codigo.value))) {
            document.getElementById('valCod').textContent = "Deve ser um código válido"
        }
        else if (contas.filter(c=>c[0] == codigo.value).length) {
            document.getElementById('valCod').textContent = "Código já existe"
        } 
        else break valCod

        codigo.classList.add('is-invalid')
        valido = false
    }

    if (descricao.value == '') {
        descricao.classList.add('is-invalid')
        valido = false
    }
    
    valVal: {
        if (valor.value == '') {
            document.getElementById('valVal').textContent = "Não pode ser vazio"
        }
        else if (isNaN(valor.value)) {
            document.getElementById('valVal').textContent = "Deve ser um número"
        }
        else break valVal

        valor.classList.add('is-invalid')
        valido = false
    }

    return valido
}

function adicionar() {
    if (!validacao()) return

    let codigo = document.getElementById("codigo").value
    let descricao = document.getElementById("descricao").value.toUpperCase()
    let valor = Number(document.getElementById("valor").value)

    document.getElementById("codigo").value = ''
    document.getElementById("descricao").value = ''
    document.getElementById("valor").value = ''

    let x = codigo.split('.')
    if (x.length >= 4) {
        x[3] = x[3].padStart(2, '0')
    }
    if (x.length >= 5) {
        x[4] = x[4].padStart(3, '0')
    }
    codigo = x.join('.')

    inserir: {
        for (let i=0; i<contas.length; i++) {
            if (contas[i][0] > codigo) {
                contas.splice(i, 0, [codigo, descricao, valor])
                break inserir
            }
        }
        contas.push([codigo, descricao, valor])
    }

    valores()
    fazerTabela()
    window.localStorage.setItem('contas', JSON.stringify(contas))
}

function reiniciar() {
    contas = [
        ['1', 'ATIVO', 0],
        ['1.1', 'ATIVO CIRCULANTE', 0],
        ['1.2', 'ATIVO NÃO-CIRCULANTE', 0],
        ['2', 'PASSIVO', 0],
        ['2.1', 'PASSIVO CIRCULANTE', 0],
        ['2.2', 'PASSIVO NÃO-CIRCULANTE', 0],
        ['2.3', 'PATRIMÔNIO LIQUIDO', 0]
    ]
    window.localStorage.setItem('contas', JSON.stringify(contas))
    fazerTabela()
}
