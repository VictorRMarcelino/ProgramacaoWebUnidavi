<?php

namespace Aula13\Exe1;

use DateTime;

class Pessoa {
    private $nome;
    private $sobrenome;
    private $dataNascimento;
    private $tipo;
    private $telefone;
    private $endereco;

    public function __construct() {
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
     */ 
    public function getDataNascimento()
    {
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
     * Get the value of telefone
     * @return Contato
     */ 
    public function getTelefone(){
        if (!isset($this->telefone)) {
            $this->setTelefone(new Contato());
        }

        return $this->telefone;
    }

    /**
     * Set the value of telefone
     * @param Contato $telefone
     */ 
    public function setTelefone(Contato $telefone){
        $this->telefone = $telefone;
    }

    /**
     * Get the value of endereco
     */ 
    public function getEndereco(){
        if (!isset($this->endereco)) {
            $this->setEndereco(new Endereco());
        }

        return $this->endereco;
    }

    /**
     * Set the value of endereco
     * @param Endereco $endereco
     */ 
    public function setEndereco($endereco){
        $this->endereco = $endereco;
    }

    public function getNomeCompleto() {
        return sprintf('%s %s', $this->nome, $this->sobrenome);
    }

    public function getIdade() {
        $dateTimeAtual = new DateTime('d-m-Y');
        $dateTimeNascimento = new DateTime($this->dataNascimento);
        return date_diff($dateTimeAtual, $dateTimeNascimento);
    }

    public function inicializaClasse() {

    }
}