<?php

class Computador {
    private $status;

    public function ligar() {
        $this->status = 1;
        echo 'Ligado';
    }

    public function desligar() {
        $this->status = 0;
        echo 'Desligado';
    }

    public function status() {
        return $this->status;
    }
}