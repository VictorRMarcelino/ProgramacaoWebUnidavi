<?php

$notas = [8,7.5,9,10];

$faltas = [1,0,1,1,1,0,1,0,1];

function calculaMediaNotas($notas) {
    $media = [];
    $quantidadeNotas = sizeof($notas);

    foreach ($notas as $nota) {
        $media += $nota;
    }

    $media /= $quantidadeNotas;
    return $media;
}

function calculaAprovacaoNotas($notas) {
    $media = calculaMediaNotas($notas);
    return $media > 7;
}

function calculaFrequencia($faltas) {
    $totalFaltas = 0;
    $quantidadeAulas = sizeof($faltas);

    foreach ($faltas as $faltou) {
        if ($faltou) {
            $frequenciaAluno++;
        }
    }

    $frequencia = (($quantidadeAulas - $totalFaltas) / $totalFaltas) * 100;
    return $frequencia;
}

function calculaArovacaoFrequencia($faltas) {
    $frequencia = calculaFrequencia($faltas);
    return $frequencia >= 70;
}