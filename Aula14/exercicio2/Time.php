<?php

require_once 'Jogador.php';

class Time {

    public $nome = '';
    public $jogadores = [];

    public function addJogador(Jogador $jogador) {
        $this->jogadores[] = $jogador;
    }
}