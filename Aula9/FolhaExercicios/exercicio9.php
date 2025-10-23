<?php

const VALOR_TOTAL_MOTO = 8654;

function calculaValorParcelas($quantidadeParcelas) {
    switch ($quantidadeParcelas) {
        case 24:
            $porcentagem = 2;
        case 36:
            $porcentagem = 2.3;
        case 48:
            $porcentagem = 2.6;
        case 60:
            $porcentagem = 2.9;
    }

    $valorJuros = VALOR_TOTAL_MOTO * (1 + $porcentagem) * $quantidadeParcelas;
    $valorParcelas = (VALOR_TOTAL_MOTO + $valorJuros) / $quantidadeParcelas;
    return number_format($valorParcelas, 2, ',', '.');
}

$valor24Vezes = calculaValorParcelas(24);
$valor36Vezes = calculaValorParcelas(36);
$valor48Vezes = calculaValorParcelas(48);
$valor60Vezes = calculaValorParcelas(60);

echo "Valor das parcelas em 24 vezes: R$ {$valor24Vezes} \n";
echo "Valor das parcelas em 36 vezes: R$ {$valor36Vezes} \n";
echo "Valor das parcelas em 48 vezes: R$ {$valor48Vezes} \n";
echo "Valor das parcelas em 60 vezes: R$ {$valor60Vezes}";