<?php

const VALOR_TOTAL_CARRO = 22500;
const QUANTIDADE_PARCELAS = 60;
const VALOR_PARCELA = 489.65;

$valorParcelamento = QUANTIDADE_PARCELAS * VALOR_PARCELA;
$valorJuros = VALOR_TOTAL_CARRO - $valorParcelamento;
echo $valorJuros;