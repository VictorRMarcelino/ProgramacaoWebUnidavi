<?php

$disciplinas = [
    'Estrutura de Dados 2' => 'Fernando', 
    'Engenharia de Software 2' => 'Julian',
    'Sistemas de Informação e Administração' => 'Maciel',
    'Programação Web 1' => 'Cleber',
    'Banco de Dados 2' => 'Marco'
];

foreach ($disciplinas as $disciplina => $professor) {
    echo 'Disciplina: ' . $disciplina . ', Professor: ' . $professor;
    echo '<br>';
}