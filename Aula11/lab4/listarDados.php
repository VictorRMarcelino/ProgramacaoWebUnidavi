<?php

require_once '../Connection.php';

$pesquisar = '<form method="get" action="">';
$pesquisar .= '<input name="usuario" id="usuario" type="text" placeholder="usuário...">';
$pesquisar .= '<input type="submit">';
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
$sql = 'SELECT * FROM TBPESSOA';

if ($nomeUsuario != '') {
    $nomeUsuario = strtolower(filter_var($nomeUsuario, FILTER_SANITIZE_STRING));
    $sql .= 'WHERE lower(pesnome) = \'' . $nomeUsuario . '\'';
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