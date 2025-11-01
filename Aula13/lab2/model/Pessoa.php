<?php

class Pessoa {
    private $nome;
    private $sobrenome;
    private $dataNascimento;
    private $cpfcnpj;
    private $tipo;
    private $telefone;
    private $endereco;
    
    private function __construct() {
        $this->tipo = 1;
    }

    /**
     * Get the value of nome
     * @return string
     */ 
    public function getNome(){
        return $this->nome;
    }

    /**
     * Set the value of nome
     * @param string $nome
     */ 
    public function setNome($nome){
        $this->nome = $nome;
    }

    /**
     * Get the value of sobrenome
     * @return string
     */ 
    public function getSobrenome(){
        return $this->sobrenome;
    }

    /**
     * Set the value of sobrenome
     * @param string $sobrenome
     */ 
    public function setSobrenome($sobrenome){
        $this->sobrenome = $sobrenome;
    }

    /**
     * Get the value of dataNascimento
     * @return string
     */ 
    public function getDataNascimento(){
        return $this->dataNascimento;
    }

    /**
     * Set the value of dataNascimento
     * @param string $dataNascimento
     */ 
    public function setDataNascimento($dataNascimento){
        $this->dataNascimento = $dataNascimento;
    }

    /**
     * Get the value of cpfcnpj
     * @return string
     */ 
    public function getCpfcnpj(): string{
        return $this->cpfcnpj;
    }

    /**
     * Set the value of cpfcnpj
     * @param string
     */ 
    public function setCpfcnpj($cpfcnpj){
        $this->cpfcnpj = $cpfcnpj;
    }

    /**
     * Get the value of tipo
     * @return int
     */ 
    public function getTipo(): int{
        return $this->tipo;
    }

    /**
     * Set the value of tipo
     * @param int $tipo
     */ 
    public function setTipo(int $tipo){
        $this->tipo = $tipo;
    }

    public function getNomeCompleto() {}

    public function getIdade() {}

    public function inicializaClasse() {}
}