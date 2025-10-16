<?php

setcookie("usuario", 'nome_user', time() + (60 * 5), '/');
setcookie("dataHoraInicio", date('d-m-Y h:i:s'), time() + (60 * 5), '/');

?>

<html>
<body>
    <?php
        if (!isset($_COOKIE["usuario"]) || !isset($_COOKIE['dataHoraInicio'])) {
            echo 'Os dados da sessão foram perdidos';
        } else {
            echo 'Cookies "Usuário: ' . $_COOKIE["usuario"] . '<br>';
            echo 'Cookies "Data/Hora Início: ' . $_COOKIE["dataHoraInicio"];
        }
    ?>
</body>
</html>