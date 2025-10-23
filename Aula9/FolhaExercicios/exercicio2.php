<!DOCTYPE html>
<html lang="ptBR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 2</title>
</head>
<body>
    <main>
        <form method="get" action="">
            <div>
                <label for="numero">
                <input type="number" name="numero" id="numero">
            </div>
            <div>
                <input type="submit" name="Enviar" id="Enviar">
            </div>
        </form>
    </main>

    <?php
        $numero = (isset($_GET['numero'])) ? $_GET['numero'] : '';

        if ($numero == '') {
            return;
        }

        $isDivisivel = verificaNumeroDivisivelPorDois($numero);

        if ($isDivisivel) {
            echo 'Valor divisível por 2';
        } else {
            echo 'O valor não é divisível por 2';
        }
        
        function verificaNumeroDivisivelPorDois($numeroValidacao) {
            $isDisivel = $numeroValidacao % 2 == 0;
            return $isDisivel;
        }
    ?>
</body>
</html>