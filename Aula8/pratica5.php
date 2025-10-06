<?php

$idade = ['Joao' => "35", "Maria" => "37", "José" => 43];

// echo "João tem " . $idade['Joao'] . ' anos';

foreach ($idade as $chave => $valor) {
    echo "Chave=" . $chave . ", valor=" . $valor;
    echo "<br>";
}