<?php

const DINHEIRO_DISPONIVEL = 50;

$produtos = [
    "Maçã"      => ["preco_kg" => 6.50, "quantidade" => 1.5],
    "Melancia"  => ["preco_kg" => 2.00, "quantidade" => 4  ],
    "Laranja"   => ["preco_kg" => 3.20, "quantidade" => 2  ],
    "Repolho"   => ["preco_kg" => 4.80, "quantidade" => 0.5],
    "Cenoura"   => ["preco_kg" => 5.50, "quantidade" => 1  ],
    "Batatinha" => ["preco_kg" => 7.00, "quantidade" => 1.5] 
];

$gastoTotal = calculaGastoTotalCompras($produtos);

$diferenca = DINHEIRO_DISPONIVEL - $gastoTotal;
$mensagem = "";
$cor = "black"; 

if ($gastoTotal > DINHEIRO_DISPONIVEL) {
    $cor = "red";
    $mensagem = "O Joãozinho gastou R$ " . number_format($diferenca, 2, ',', '.') . 
                      " a mais do que tinha disponível.!";
} else if ($gastoTotal < DINHEIRO_DISPONIVEL) {
    $valorSobrando = $diferenca;
    $cor = "blue";
    $mensagem = "O Joãozinho conseguiu economizar R$ " . number_format($valorSobrando, 2, ',', '.');
} else {
    $cor = "green";
    $mensagem = "O valor da compra foi exatamente R$ " . number_format(DINHEIRO_DISPONIVEL, 2, ',', '.');
}

echo '<span style="color: ' . $cor . '">' . $mensagem . '</p>';

function calculaGastoTotalCompras(array $compras) {
    $gastoTotal = 0;

    foreach ($compras as $dados) {
        $precoUnitario = $dados["preco_kg"];
        $quantidade = $dados["quantidade"];
        $valorGastoProduto = $precoUnitario * $quantidade;
        $gastoTotal += $valorGastoProduto;
    }

    return $gastoTotal;
}