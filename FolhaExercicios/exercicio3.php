<!DOCTYPE html>
<html lang="ptBR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 3</title>
</head>
<body>
    <main>
        <form method="get" action="">
            <div>
                <label for="lado">
                <input type="number" name="lado" id="lado">
            </div>
            <div>
                <input type="submit" name="Enviar" id="Enviar">
            </div>
        </form>
    </main>

    <?php
        $lado = (isset($_GET['lado'])) ? $_GET['lado'] : '';

        if ($lado == '') {
            return;
        }

        $metroQuadrado = calculaAreaQuadrado($lado);

        echo "A área do quadrado de lado $lado metros é $metroQuadrado metros quadrados.";
        
        function calculaAreaQuadrado(int $lado) {
            $metroQuadrado = $lado * $lado;
            return $metroQuadrado;
        }
    ?>
</body>
</html>