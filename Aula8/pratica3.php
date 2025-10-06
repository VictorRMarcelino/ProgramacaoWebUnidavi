<?php

//Declarar duas variáveis com os nomes: SALARIO1 e SALARIO2;
$SALARIO1;
$SALARIO2;

//Atribuir 1000 para a variável SALARIO1;
$SALARIO1 = 1000;

//Atribuir 2000 para a variável SALARIO2;
$SALARIO2 = 2000;

//Atribuir o valor da variável SALARIO1 para SALARIO2
$SALARIO2 = $SALARIO1;

//Incrementar 1 na variável SALARIO2;
$SALARIO2++;

//Adicionar 10% de aumento para SALARIO1;
$SALARIO1 += ($SALARIO1 * 0.1);

if ($SALARIO1 > $SALARIO2) {
    echo "O valor da variável 1 é maior que o valor da variável 2";
} else if ($SALARIO2 > $SALARIO1) {
    echo "O valor da variável 2 é maior que o valor da variável 1";
} else {
    echo 'Os valor são iguais';
}