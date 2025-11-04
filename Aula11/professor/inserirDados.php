<!DOCTYPE html>
<html lang="ptBR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inserir Dados</title>
</head>
<body>
    <main>
        <form method="post" action="">
            <div>
                <label for="pesnome">Nome:</label>
                <input type="text" name="pesnome" id="pesnome" required>
            </div>
            <div>
                <label for="pessobrenome">Sobrenome:</label>
                <input type="text" name="pessobrenome" id="pessobrenome" required>
            </div>
            <div>
                <label for="pesemail">Email:</label>
                <input type="email" name="pesemail" id="pesemail" required>
            </div>
            <div>
                <label for="pespassword">Senha:</label>
                <input type="text" name="pespassword" id="pespassword" required>
            </div>
            <div>
                <label for="pescidade">Cidade:</label>
                <input type="text" name="pescidade" id="pescidade" required>
            </div>
            <div>
                <label for="pesestado">Estado:</label>
                <input type="text" name="pesestado" id="pesestado" required>
            </div>
            <div>
                <input type="submit" name="Enviar" id="Enviar" required>
            </div>
        </form>
    </main>
</body>
</html>

<?php

if (sizeof($_POST) == 0) {
    return;
}

$connectionString = "host=localhost port=5432 dbname=local user=postgres password=1309";
$connection = pg_connect($connectionString);

if ($connection) {
    $dadosPessoa = [$_POST['pesnome'], $_POST['pessobrenome'], $_POST['pesemail'], $_POST['pespassword'], $_POST['pescidade'], $_POST['pesestado']];
    $resultInsert = pg_query_params($connection, 'INSERT INTO TBPESSOA (pesnome, pessobrenome, pesemail, pespassword, pescidade, pesestado) VALUES ($1, $2, $3, $4, $5, $6)', $dadosPessoa);

    if ($resultInsert) {
        echo 'Dados inseridos com sucesso!';
    } else {
        echo 'Deu erro ao inserir';   
    }
} else {
    echo "Erro ao conectar no database.";
}