<?php

use Aula13\Exe1\Contato;
use Aula13\Exe1\Endereco;
use Aula13\Exe1\Pessoa;

$pessoa = new Pessoa();
$pessoa->setNome('Victor');
$pessoa->setSobrenome('Ramos');
$pessoa->setDataNascimento('03-06-2004');

$endereco = new Endereco();
$endereco->setLogradouro('Manoel Livramento');
$endereco->setBairro('Centro');
$endereco->setCidade('Rio do Sul');
$endereco->setEstado('Santa Catarina');
$endereco->setCep('89160-079');

$telefone = new Contato();
$telefone->setTipo(2);
$telefone->setNome('Telefone');
$telefone->setValor('(47) 98861-0433');

$pessoa->setTelefone($telefone);
$pessoa->setEndereco($endereco);