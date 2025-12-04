<?php

namespace src\controller;

use database\Query;
use src\core\Sessao;

/**
 * Controller Login
 * @package src
 * @subpackage controller
 * @author Victor Ramos <httpsvictorramos@gmail.com>
 * @since 05/11/2025
 */
class ControllerLogin extends Controller {

    /** Retorna a view de avaliação */
    public function getView() {
        $this->view('login.html');
    }

    /** Realiza o login no sistema de administrador */
    public function login() {
        $logado = false;
        $usuario = htmlspecialchars($_GET['usuario'], ENT_QUOTES, 'UTF-8');
        $senha = htmlspecialchars($_GET['senha'], ENT_QUOTES, 'UTF-8');;

        $result = Query::select('administrador', ['usuario', 'senha'], ['usuario = $1'], [filter_var($usuario, FILTER_SANITIZE_STRING)]);

        if ($result) {
            $usuarioBanco = pg_fetch_assoc($result);

            if (password_verify($senha, $usuarioBanco['senha'])) {
                Sessao::setUsuarioLogado();
                $logado = true;
            }
        }

        echo json_encode(['logado' => $logado]);
    }

    /** Desloga um usuário do sistema */
    public function deslogar() {
        Sessao::finalizaSessao();
    }
}