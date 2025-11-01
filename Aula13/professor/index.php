<?php

require_once 'pessoa.php';

$pessoa = new Pessoa();
$pessoa->nome = 'Victor';
$pessoa->sobrenome = 'Ramos';

echo $pessoa->getNomeCompleto();