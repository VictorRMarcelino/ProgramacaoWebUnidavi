<!DOCTYPE html>
<html lang="ptBR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 1</title>
</head>
<body>
    <main>
        <form method="get" action="">
            <div>
                <label for="number1">
                <input type="number" name="number1" id="number1">
            </div>
            <div>
                <label for="number2">
                <input type="number" name="number2" id="number2">
            </div>
            <div>
                <label for="number3">
                <input type="number" name="number3" id="number3">
            </div>
            <div>
                <input type="submit" name="Enviar" id="Enviar">
            </div>
        </form>
    </main>

    <?php

        $number1 = (isset($_GET['number1'])) ? $_GET['number1'] : '';
        $number2 = (isset($_GET['number2'])) ? $_GET['number2'] : '';
        $number3 = (isset($_GET['number3'])) ? $_GET['number3'] : '';

        if ($number1 == '' || $number2 == '' || $number3 == '') {
            return;
        }

        $corResultado = 'black';
        $resultadoSoma = $number1 + $number2 + $number3;

        if ($number1 > 10) {
            $corResultado = 'blue';
        }
        
        if ($number2 < $number3) {
            $corResultado = 'green';
        }
        
        if ($number3 < $number1 && $number3 < $number2) {
            $corResultado = 'red';
        }

        echo '<span style="color: ' . $corResultado . '">' . $resultadoSoma . '</p>';

    ?>
</body>
</html>