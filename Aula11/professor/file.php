<?php

define('arquivo', 'dados.txt');
define('arquivo2', 'dados2.txt');

if (file_exists(arquivo)) {
    echo 'Arquivo encontrado! <br>';

    $conteudo = file_get_contents(arquivo);
    echo 'Conteúdo do arquivo: <br>';
    echo '---------------------------------------- <br>';
    echo nl2br($conteudo);

    file_put_contents(arquivo2, serialize($conteudo));
} else {
    echo '';
}