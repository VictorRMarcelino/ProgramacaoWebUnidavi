<?php

namespace src\core;

/**
 * Sessão
 * @package src
 * @subpackage core
 * @author Victor Ramos <httpsvictorramos@gmail.com>
 * @since 08/11/2025
 */
class Sessao {

    /** Inicia ou continua com uma sessão */
    public static function iniciaSessao() {
        session_start();
    }
    
    /** Finaliza a sessão atual */
    public static function finalizaSessao() {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
        session_destroy();
    }

    /**
     * Verifica se há uma sessão ativa
     * @return int
     */
    public static function isUsuarioLogado() {
        return $_SESSION['logado'] == true;
    }

    public static function setUsuarioLogado() {
        $_SESSION['logado'] = true;
    }
}