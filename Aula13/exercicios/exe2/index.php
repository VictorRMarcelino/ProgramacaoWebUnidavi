<?php

use Aula13\Exe1\Contato;
use Aula13\Exe1\Endereco;
use Aula13\Exe1\Pessoa;

$familia = [];


// Eu
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

$familia[] = $pessoa;


//Irmão
$pessoa = new Pessoa();
$pessoa->setNome('Leandro');
$pessoa->setSobrenome('Ramos');
$pessoa->setDataNascimento('09-10-1993');

$endereco = new Endereco();
$endereco->setLogradouro('Manoel Livramento');
$endereco->setBairro('Centro');
$endereco->setCidade('Rio do Sul');
$endereco->setEstado('Santa Catarina');
$endereco->setCep('89160-079');

$telefone = new Contato();
$telefone->setTipo(2);
$telefone->setNome('Telefone');
$telefone->setValor('(47) 98853-4231');

$pessoa->setTelefone($telefone);
$pessoa->setEndereco($endereco);

$familia[] = $pessoa;

$pessoa = new Pessoa();
$pessoa->setNome('Elisagela');
$pessoa->setSobrenome('Ramos');
$pessoa->setDataNascimento('11-10-1973');

$endereco = new Endereco();
$endereco->setLogradouro('Manoel Livramento');
$endereco->setBairro('Centro');
$endereco->setCidade('Rio do Sul');
$endereco->setEstado('Santa Catarina');
$endereco->setCep('89160-079');

$telefone = new Contato();
$telefone->setTipo(2);
$telefone->setNome('Telefone');
$telefone->setValor('(47) 98814-7002');

$pessoa->setTelefone($telefone);
$pessoa->setEndereco($endereco);

$familia[] = $pessoa;

$pessoa = new Pessoa();
$pessoa->setNome('Leonilson');
$pessoa->setSobrenome('Marcelino');
$pessoa->setDataNascimento('14-11-1971');

$endereco = new Endereco();
$endereco->setLogradouro('Manoel Livramento');
$endereco->setBairro('Centro');
$endereco->setCidade('Rio do Sul');
$endereco->setEstado('Santa Catarina');
$endereco->setCep('89160-079');

$telefone = new Contato();
$telefone->setTipo(2);
$telefone->setNome('Telefone');
$telefone->setValor('(47) 98853-9728');

$pessoa->setTelefone($telefone);
$pessoa->setEndereco($endereco);

$familia[] = $pessoa;

if (file_exists('familia.txt')) {
    foreach ($familia as $pessoaFamilia) {
        
    }
}