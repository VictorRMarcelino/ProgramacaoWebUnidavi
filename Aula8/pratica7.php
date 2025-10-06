<?php

$disciplinas = [
    'Matemática' => ['faltas' => 5, 'media' => 8.5],
    'Português' => ['faltas' => 2, 'media' => 9],
    'Geografia' => ['faltas' => 10, 'media' => 6],
    'Educação Física' => ['faltas' => 2, 'media' => 8]
];

echo '<table>';
echo '<thead>';
echo '<tr>';
echo '<th>Disciplina</th>';
echo '<th>Faltas</th>';
echo '<th>Média</th>';
echo '</thead>';
echo '<tbody>';

foreach ($disciplinas as $materia => $dados) {
    echo '<tr>';
    echo "<td>$materia</td>";
    echo "<td>" . $dados['faltas'] . "</td>";
    echo "<td>" . $dados['media'] . "</td>";
    echo '</tr>';
}

echo '</tbody>';
echo '</table>';