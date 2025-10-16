<?php

session_start();

if (!isset($_SESSION['usuario']) && !isset($_SESSION['senha'])) {
    $_SESSION['usuario'] = $_POST['usuario'];
    $_SESSION['senha'] = $_POST['senha'];
    echo "Sessão iniciada e usuário registrado";
} else {
    echo print_r($_SESSION);
}