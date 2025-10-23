<!DOCTYPE html>
<html lang="ptBR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 5</title>
</head>
<body>
    <main>
        <form method="get" action="">
            <div>
                <label for="base">
                <input type="number" name="base" id="base">
            </div>
            <div>
                <label for="altura">
                <input type="number" name="altura" id="altura">
            </div>
            <div>
                <input type="submit" name="Enviar" id="Enviar">
            </div>
        </form>
    </main>

    <?php
        $base = (isset($_GET['base'])) ? (int) $_GET['base'] : '';
        $altura = (isset($_GET['altura'])) ? (int) $_GET['altura'] : '';

        if ($base == '' || $altura == '') {
            return;
        }

        $areaTriangulo = calculaAreaTrianguloRetangulo($base, $altura);
        echo "A área do triângulo retângulo é igual a {$areaTriangulo} metros quadrados";
        
        function calculaAreaTrianguloRetangulo(int $base, int $altura) {
            $areaTriangulo = ($base * $altura) / 2;
            return $areaTriangulo;
        }
    ?>
</body>
</html>