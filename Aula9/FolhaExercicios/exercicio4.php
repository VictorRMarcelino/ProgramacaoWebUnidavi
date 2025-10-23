<!DOCTYPE html>
<html lang="ptBR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 4</title>
</head>
<body>
    <main>
        <form method="get" action="">
            <div>
                <label for="ladoA">
                <input type="number" name="ladoA" id="ladoA">
            </div>
            <div>
                <label for="ladoB">
                <input type="number" name="ladoB" id="ladoB">
            </div>
            <div>
                <input type="submit" name="Enviar" id="Enviar">
            </div>
        </form>
    </main>

    <?php
        $ladoA = (isset($_GET['ladoA'])) ? (int) $_GET['ladoA'] : '';
        $ladoB = (isset($_GET['ladoB'])) ? (int) $_GET['ladoB'] : '';

        if ($ladoA == '' || $ladoB == '') {
            return;
        }

        $metroQuadrado = calculaAreaRetangulo($ladoA, $ladoB);

        if ($metroQuadrado > 10) {
            echo "<h1>A área do retângulo de lados $ladoA e $ladoB é $metroQuadrado metros quadrados.</h1>";
        } else {
            echo "<h3>A área do retângulo de lados $ladoA e $ladoB é $metroQuadrado metros quadrados.</h3>";
        }
        
        function calculaAreaRetangulo(int $ladoA, int $ladoB) {
            $metroQuadrado = $ladoA * $ladoB;
            return $metroQuadrado;
        }
    ?>
</body>
</html>