<?php

namespace Aula13\Exe1;

class Endereco {
    private $logradouro;
    private $bairro;
    private $cidade;
    private $estado;
    private $cep;

    /**
     * Get the value of logradouro
     * @return string
     */ 
    public function getLogradouro(){
        return $this->logradouro;
    }

    /**
     * Set the value of logradouro
     * @param string $logradouro
     */ 
    public function setLogradouro(string $logradouro){
        $this->logradouro = $logradouro;
    }

    /**
     * Get the value of bairro
     */ 
    public function getBairro()
    {
        return $this->bairro;
    }

    /**
     * Set the value of bairro
     * @param string $bairro
     */ 
    public function setBairro(string $bairro){
        $this->bairro = $bairro;
    }

    /**
     * Get the value of cidade
     * @return string
     */ 
    public function getCidade(){
        return $this->cidade;
    }

    /**
     * Set the value of cidade
     * @param string $cidade
     */ 
    public function setCidade(string $cidade){
        $this->cidade = $cidade;
    }

    /**
     * Get the value of estado
     * @return string
     */ 
    public function getEstado(){
        return $this->estado;
    }

    /**
     * Set the value of estado
     * @param string $estado
     */ 
    public function setEstado(string $estado){
        $this->estado = $estado;
    }

    /**
     * Get the value of cep
     * @return string
     */ 
    public function getCep(){
        return $this->cep;
    }

    /**
     * Set the value of cep
     * @param string $cep
     */ 
    public function setCep(string $cep){
        $this->cep = $cep;
    }
}