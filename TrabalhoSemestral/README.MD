Requisitos 
- PHP 8.4.2
- Composer
- PgAdmin4
- Apache ou Xampp


1° - Realize o clone do projeto da pasta htdocs do xampp/apache24.
2° - Abra o projeto dentro VSCode e no terminal insira o comando "composer install"
3° - Insira o trecho a seguir no arquivo httpd.conf (Arquivo encontrado dentro da pasta conf do apache/xampp):

<Directory "${SRVROOT}/ProgramacaoWebUnidavi/TrabalhoSemestral/public/">
    AllowOverride All
    Require all granted
</Directory>

-- Lembrar de recarregar o xampp ou o apache após alterar o arquivo

4° - No banco de dados, crie um servidor com o nome de voting e execute o SQL encontrado dentro do arquivo setup.sql
-- Caso queira, pode ser utilizado outro nome para o banco.
-- Lembre de acessar o arquivo Conexao.php e configurar os dados para conexão no banco


Link de Acesso: http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/avaliacao