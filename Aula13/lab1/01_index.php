<?php

require_once '01_pessoa.php';

$pessoa = new Pessoa();
$pessoa->nome = 'Victor';
$pessoa->sobrenome = 'Ramos';

echo $pessoa->getNomeCompleto();