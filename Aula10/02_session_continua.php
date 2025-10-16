<?php

session_start();

if (isset($_SESSION['usuario'])) {
    $_SESSION['usuario'] = 'user_name';

    echo 'Sessão iniciada. Usuário logado' . $_SESSION['usuario'] . '<br>';
    echo 'O seu identificador de sessão é: ' . session_id() . '<br>';
} else {
    echo 'Não foi identificada uma sessão de usuário deverá logar.';
    echo '<a href="02_session_init.php">Link</a>';
}