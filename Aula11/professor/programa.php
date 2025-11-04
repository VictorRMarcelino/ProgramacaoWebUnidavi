<?php

// $connection = new PDO('pgsql:host=localhost;port=5432;dbname=local', 'postgres', '1309'); --Versão mais bonita


$connectionString = "host=localhost port=5432 dbname=local user=postgres password=1309";
$connection = pg_connect($connectionString);

if ($connection) {
    echo "Database conectada com sucesso! <br>";

    $result = pg_query($connection, 'SELECT COUNT(*) AS QTDTABS FROM PG_TABLES');

    if ($result) {
        $row = pg_fetch_assoc($result);
        echo "Quantidade de tabelas na database: " . $row['qtdtabs'];
    }

    $result = pg_query($connection, 'SELECT COUNT(1) AS QTDPESSOAS FROM TBPESSOA');

    if ($result) {
        $row = pg_fetch_assoc($result);
        echo "Quantidade de pessoas: " . $row['qtdpessoas'];
    }

    // Inserir dados na tabela TBPESSOA
    $dadosPessoa = ['João', 'Silva', 'joao.silva@gmail.com', '123456', 'São Paulo', 'SP'];
    $resultInsert = pg_query_params($connection, 'INSERT INTO TBPESSOA (pesnome, pessobrenome, pesemail, pespassword, pescidade, pesestado) VALUES ($1, $2, $3, $4, $5, $6)', $dadosPessoa);

    if ($resultInsert) {
        echo 'Dados inseridos com sucesso!';
    } else {
        
    }
} else {
    echo "Erro ao conectar no database.";
}