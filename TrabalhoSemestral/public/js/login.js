var Login = {

    /** Comportamento realizado ao carregar a tela */
    onLoadLogin: function() {
        Login.loadScripts();
    },

    /** Carrega os comportamentos iniciais dos componentes */
    loadScripts: function() {
        $('#navegacaoItemAvaliacao').on('click', Login.onClickBotaoAvalicao);
        $('#btnAcessar').on('click', Login.onClickBotaoAcessar);
    },

    /** Comportamento chamado ao clicar no atalho para a página da avalição */
    onClickBotaoAvalicao: function() {
        $(location).attr('href', 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/avaliacao');
    },

    /** Comportamento chamado ao clicar no botão "Acessar" */
    onClickBotaoAcessar: function() {
        let usuario = $('#usuario').val();
        let senha = $('#senha').val();

        if ((usuario == '') || (senha == '')) {
            Message.warn('É necessário preencher o usuário e a senha para poder acessar o sistema!');
            return;
        }

        let fnVerificaLogin = function(response) {
            let retorno = JSON.parse(response);

            if (retorno.logado) {
                $(location).attr('href', 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador');
                return;
            }

            Message.warn('Usuário ou senha incorretos!');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/login/verificar',
            method: 'get',
            data: {usuario: usuario, senha: senha},
            fnSucess: fnVerificaLogin
        });
    }
}

Login.onLoadLogin();