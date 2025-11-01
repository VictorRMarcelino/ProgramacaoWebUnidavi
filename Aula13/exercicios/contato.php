<?php

namespace Aula13\Exe1;

class Contato {

    private $tipo;
    private $nome;
    private $valor;

    /**
     * Get the value of tipo
     */ 
    public function getTipo(){
        return $this->tipo;
    }

    /**
     * Set the value of tipo
     * @param int $tipo
     */ 
    public function setTipo($tipo){
        $this->tipo = $tipo;
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
     * Get the value of valor
     * 
     */ 
    public function getValor(){
        return $this->valor;
    }

    /**
     * Set the value of valor
     * @param string $valor
     */ 
    public function setValor($valor){
        $this->valor = $valor;
    }
}