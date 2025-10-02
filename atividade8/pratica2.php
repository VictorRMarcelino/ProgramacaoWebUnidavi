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

$SALARIO1 = number_format($SALARIO1, 2);
$SALARIO2 = number_format($SALARIO2, 2);

//Produzir uma saída com o texto: “Valor Salário 1: XX e Valor Salário: XX”;
echo "Valor Salário 1: R$$SALARIO1 e Valor Salário 2: R$$SALARIO2";