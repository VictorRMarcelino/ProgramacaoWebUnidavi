<?php

require_once '../pessoa.php';
require_once '../endereco.php';
require_once '../contato.php';

use Aula13\Exercicios\Pessoa;
use Aula13\Exercicios\Endereco;
use Aula13\Exercicios\Contato;

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