<?php

class Session {
    
    private $sessionId;
    private $ativo;
    private $usuario;
    private $dataHoraInicio;
    private $dataHoraUltimoAcesso;

    public function __construct() {
        $this->iniciaSessao();
    }

    public function iniciaSessao() {
        session_start();
        $this->sessionId = session_id();
        $this->dataHoraInicio = date('d-m-Y h:i:s');
    }

    public function encerraSessao() {
        
    }
}