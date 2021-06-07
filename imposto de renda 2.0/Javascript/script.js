const form = document.querySelector("form");
const tabela = document.querySelector("table")

//alert("Bem-Vindo");


form.addEventListener("submit",event =>{
    event.preventDefault();
    let nome = form.querySelector("input[name = 'nome']").value;   
    let dependentes = form.querySelector("input[name = 'dependentes']").value;
    let salarioB = form.querySelector("input[name = 'salarioB']").value;
    let tabelaFila = linha(nome,dependentes,salarioB);
    tabela.appendChild(tabelaFila);
})

function calculoInssRed(salarioB){
    if (salarioB <= 1100) {
        return salarioB*0.075;
    } else if (salarioB <= 2203.48){
        return salarioB*0.09;
    } else if (salarioB <= 3305.22){
        return salarioB*0.12;
    } else if (salarioB <= 6433.57) {
        return salarioB*0.14;
    } else {
        return 751.99;
    }
};

function calculoIrrfRed(salarioB,dependentes){
    let desconto, aliquota;
        let base = salarioB - dependentes * 189.59 - calculoInssRed(salarioB);
        if (base <= 1903.98){
            aliquota = 0;
            desconto = 0;
        } else if (base <= 2826.65){
            aliquota = 0.075;
            desconto = 142.8;
        } else if (base <= 3751.05){
            aliquota = 0.15;
            desconto = 354.8;
        } else if (base <= 4664.68){
            aliquota = 0.225;
            desconto = 636.13;
        } else {
            aliquota = 0.275;
            desconto = 869.36;
        }
        return base*aliquota-desconto;
    };

function linha (nome,dependentes,salarioB){
    let inssRed = calculoInssRed(salarioB);
    let irrfRed = calculoIrrfRed(salarioB,dependentes);
    let tabelaFila = document.createElement("tr");
    let tabelaCelula = [];
    let innerCelula = [
        nome,
        dependentes,
        salarioB,
        parseFloat(100*inssRed/salarioB).toFixed(2),
        parseFloat(inssRed).toFixed(2),
        parseFloat(100*irrfRed/salarioB).toFixed(2),
        parseFloat(irrfRed).toFixed(2),
        parseFloat(salarioB - inssRed - irrfRed).toFixed(2)
    ];

    for(index in innerCelula){
        tabelaCelula[index] = document.createElement("td");
        tabelaCelula[index].innerHTML = innerCelula[index];
        tabelaFila.appendChild(tabelaCelula[index]);
    }
    return tabelaFila
    
}