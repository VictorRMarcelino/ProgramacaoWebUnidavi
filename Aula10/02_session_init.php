<?php

session_start();

if (!isset($_SESSION['usuario'])) {
    $_SESSION['usuario'] = 'user_name';

    echo 'Sessão iniciada e usuário registrado . <br>';
    echo '<a href="02_session_continua.php">Clique aqui para entrar</a>';
} else {
    echo 'O seu identificador de sessão é: ' . session_id() . '<br>';
    echo '<a href="02_session_continua.php">Acessar</a>';
}