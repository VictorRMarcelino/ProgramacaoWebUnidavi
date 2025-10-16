<?php

$pasta = [
    'bsn' => [
        '3a Fase' => [
            'desenvWeb', 'bancoDados 1', 'engSoft 1'
        ], 
        '4a Fase' => [
            'Intro Web', 'bancoDados 2', 'engSoft 2'
        ]
    ]
];

function escreveArvore(mixed $elemento, $profundidade = 1) {
    foreach ($elemento as $titulo => $value) {
        if (is_int($titulo) && is_string($value)) {
            printaElementoArvore($value, $profundidade);
        } else if (is_array($elemento)) {
            printaElementoArvore($titulo, $profundidade);
            escreveArvore($value, $profundidade + 1);
        }
    }
}

function printaElementoArvore($elemento, $profundidade) {
    echo str_repeat('-', $profundidade) . $elemento . '<br>';
}

escreveArvore($pasta);