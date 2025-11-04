<?php

require_once '../Connection.php';

$pesquisar = '<form method="get" action="">';
$pesquisar .= '<input name="usuario" id="usuario" type="text" placeholder="usuário...">';
$pesquisar .= '<input type="submit" value="Pesquisar">';
$pesquisar .= '</form>';

echo $pesquisar;

$table = '<table>';
$table .= '<thead>';
$table .= '<tr>';
$table .= '<th>Nome</th>';
$table .= '<th>Sobrenome</th>';
$table .= '<th>Email</th>';
$table .= '<th>Cidade</th>';
$table .= '<th>Estado</th>';
$table .= '</tr>';
$table .= '</thead>';
$table .= '<tbody>';

echo $table;

$nomeUsuario = isset($_GET['usuario']) ? $_GET['usuario'] : '';

if ($nomeUsuario != '') {
    $sql = 'SELECT * FROM TBPESSOA WHERE pesnome = \'' . $nomeUsuario . '\'';
} else {
    $sql = 'SELECT * FROM TBPESSOA';
}

$result = Connection::query($sql);

if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $novoRegistro = '<tr>';
        $novoRegistro .= '<td>' . $row['pesnome'] . '</td>';
        $novoRegistro .= '<td>' . $row['pessobrenome'] . '</td>';
        $novoRegistro .= '<td>' . $row['pesemail'] . '</td>';
        $novoRegistro .= '<td>' . $row['pescidade'] . '</td>';
        $novoRegistro .= '<td>' . $row['pesestado'] . '</td>';
        $novoRegistro .= '</tr>';
        echo $novoRegistro;
    }
}

echo '</tbody>';
echo '</table>';

?>

<style>
    th, td {
        border: 1px solid black;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 35vw;
        row-gap: 2vh;
    }
</style>