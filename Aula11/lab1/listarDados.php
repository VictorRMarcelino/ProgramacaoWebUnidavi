<?php

require_once '../Connection.php';

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

$result = Connection::query('SELECT * FROM TBPESSOA');

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
</style>