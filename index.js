var resultado = document.querySelector('.resultado');

const { format: priceFormat } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

const { format: formatDecimal } = new Intl.NumberFormat('pt-br', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const { format: formatDecimalMax } = new Intl.NumberFormat('pt-br', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 100
});

const convertNumberBrToUSA = (number) => number.replace(/\./g, "").replace(",", ".");

const priceFormatBr = (number) => priceFormat(convertNumberBrToUSA(number));
const formatDecimalBr = (number) => formatDecimal(convertNumberBrToUSA(number));


function colocarDados() {

  var valorInvestidoMensal = document.querySelector('#valorInvestidoMensal').value;

  var periodoInvestimento = document.querySelector('#prazo').value;

  var rendimentoAnual = parseFloat(convertNumberBrToUSA(document.querySelector('#rendimento').value));

  var inflacaoAnual = parseFloat(convertNumberBrToUSA(document.querySelector('#inflacao').value));

  var rendimentoLiquido = rendimentoAnual - inflacaoAnual;

  var texto;

  texto = `<h2 class="titulo-resultado">${'resultado do calculo'.toUpperCase()}</h2> <br><br>`;

  texto += `Valor do Investimento Mensal: ${priceFormatBr(valorInvestidoMensal)}`;

  texto += `<br> Período de Investimento: ${periodoInvestimento} meses`;

  texto += `<br> Rendimento Anual do Investimento: ${formatDecimal(rendimentoAnual.toString())} %`;

  texto += `<br> Média de Inflação Anual: ${formatDecimal(inflacaoAnual.toString())}  %`;

  texto += '<p><br>';

  texto += `Rendimento Líquido Anual do Investimento: ${formatDecimal(rendimentoLiquido.toString())}  %`;

  var taxaMensal = rendimentoAnualParaMensal(rendimentoLiquido);

  texto += `<br> Rendimento Líquido Mensal do Investimento: ${formatDecimalMax(taxaMensal.toString())} %`;

  var montante = calcularMontanteInvestimento(valorInvestidoMensal, periodoInvestimento, taxaMensal);

  texto += `<p><br> Ao investir <span class="texto-destacado">${priceFormatBr(valorInvestidoMensal)}</span> mensalmente em um período de <span class="texto-destacado">${periodoInvestimento}</span> meses, com rendimento líquido mensal de <span class="texto-destacado">${formatDecimal(taxaMensal)} %</span>, <br> no final você conseguirá juntar um montante de <span class="texto-destacado">${priceFormat(montante.toString())}</span>`;

  resultado.innerHTML = texto;
}


function rendimentoAnualParaMensal(txAnual) {
  var x = 1 + (txAnual / 100);
  var resultado = (Math.pow(x, 1 / 12) - 1) * 100;

  return resultado;

}

function rendimentoMensalParaAnual(txMensal) {
  var x = 1 + (txMensal / 100);
  var resultado = x;

  for (var i = 1; i < 12; i++) {
    resultado *= x;
  }
  resultado = (resultado - 1) * 100;

  return resultado;

}

function calcularMontanteInvestimento(valorMensal, periodo, taxaMensal) {
  var montante = 0;
  var indice = (taxaMensal / 100) + 1;

  for (var i = 0; i < periodo; i++) {
    montante *= indice;
    montante += parseFloat(valorMensal);
    console.log('montante[' + i + ']: R$ ' + priceFormat(montante.toString()) + '   VALOR MENSAL: R$ ' + priceFormatBr(valorMensal));
  }

  return montante;
}


