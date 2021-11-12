var tabela = document.getElementById("tabela").children[1]

for (let i of tabela.children) {
    for (let j of i.children) {
        console.log(j.innerHTML, )

    }
    // console.log(i.innerHTML)
}

function adicionar() {
    let codigo = document.getElementById("codigo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value
   
    console.log(`${codigo} ${descricao} ${valor}`)

    for (let i of tabela.children) {
        console.log(i.children[0]. )

        // console.log(i.innerHTML)
    }
}


