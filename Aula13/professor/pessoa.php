<?php

class Pessoa {
    public $nome;
    public $sobrenome;

    public function getNomeCompleto() {
        return $this->nome . ' ' . $this->sobrenome;
    }
}