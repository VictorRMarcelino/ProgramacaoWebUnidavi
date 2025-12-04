var Avaliacao = {

    questoes: {},
    perguntaAtual: 0,
    respostas: {},

    /** Comportamento realizado ao carregar a tela */
    onLoadAvaliacao: function() {
        Avaliacao.loadScripts();
        let dispositivo = Cookies.get('dispositivo');

        if (dispositivo == undefined) {
            Avaliacao.carregaDispositivos();
        } else {
            Avaliacao.carregaPerguntas(dispositivo)
        }
    },

    /** Carrega os comportamentos iniciais dos componentes */
    loadScripts: function() {
        $('#btnDefinirDispositivo').on('click', Avaliacao.onClickBotaoDefinirDispositivo);
        $('#btnStartQuiz').on('click', Avaliacao.onClickStartQuiz);
        $('.button').on('click', Avaliacao.onClickButtonAnswer);
        $('#btnFinalizarAvaliacao').on('click', Avaliacao.salvaQuestionario);
        $('#navegacaoItemPainelAdm').on('click', Avaliacao.onClickBotaoPainelAdministrador);
    },

    onClickBotaoPainelAdministrador: function() {
        $(location).attr('href', 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador');
    },

    /**
     * ================================================================================================================================ 
     * ===================================================  DEFINIÇÃO DO DISPOSITIVO ==\================================================
     * ================================================================================================================================ 
     */

    /** Realiza o carregamento dos setores disponíveis */
    carregaDispositivos: function() {
        let fnCarregaFiltroDispositivos = function(response) {
            let dispositivos = Object.values(JSON.parse(response));
            $('#listaDispositivos').append('<option value="0">Selecione...</option>');

            for (let i = 0; i < dispositivos.length; i++) {
                let novaOpcaoDispositivo = `<option value="${dispositivos[i]['id']}">${dispositivos[i]['nome']}</option>`;
                $('#listaDispositivos').append(novaOpcaoDispositivo);
            }

            $('#definirDispositivo').css('display', 'flex');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/avaliacao/dispositivos',
            method: 'get',
            async: false,
            fnSucess: fnCarregaFiltroDispositivos
        });
    },

    /** Comportamento chamado ao clicar no botão "Definir Dispositivo" */
    onClickBotaoDefinirDispositivo: function() {
        let dispositivo = $('#listaDispositivos').val();

        if (dispositivo == 0) {
            Message.warn('É necessário selecionar um dispositivo para poder prosseguir.');
            $('#listaDispositivos').focus();
            return;
        }

        Cookies.set('dispositivo', dispositivo);
        Avaliacao.carregaPerguntas(dispositivo);
    },

    /** Carrega as perguntas do formulário */
    carregaPerguntas: function(dispositivo) {
        let fnSalvarPerguntas = function(response) {
            let perguntas = JSON.parse(response);
            Avaliacao.questoes = perguntas;
            Avaliacao.perguntaAtual = parseInt(Object.keys(perguntas)[0]);
            $('#definirDispositivo').css('display', 'none');
            $('#startQuiz').css('display', 'flex');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/avaliacao/perguntas',
            method: 'get',
            data: {dispositivo: dispositivo},
            fnSucess: fnSalvarPerguntas
        });
    },

    /**
     * ================================================================================================================================ 
     * ==========================================================  AVALIAÇÃO ========================================================== 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no botão para iniciar a avaliação */
    onClickStartQuiz: function() {
        Avaliacao.carregaProximaPergunta();
        $('#startQuiz').css('display', 'none'); 
        $('#questionnaire').css('display', 'flex'); 
    },

    /** Realiza o carregamento da próxima pergunta */
    carregaProximaPergunta: function() {
        $("#question").fadeOut(400, function() {
            $(this).html(Avaliacao.questoes[Avaliacao.perguntaAtual]);
            $(this).fadeIn(400);
        });
    },

    /** Comportamento chamado ao responder uma pergunta da avaliação */
    onClickButtonAnswer: function() {        
        Avaliacao.respostas[Avaliacao.perguntaAtual] = this.value;
        
        if (Avaliacao.perguntaAtual != Object.keys(Avaliacao.questoes).pop()) {
            Avaliacao.perguntaAtual++;
            Avaliacao.carregaProximaPergunta();
        } else {
            Avaliacao.exibeFeedback();
        }
    },

    /** Exibe a área para o usuário deixar seu feedback final */
    exibeFeedback: function() {
        $('#questionnaire').css('display', 'none');
        $('#feedback').css('display', 'flex'); 
    },

    /** Salva a avaliação */
    salvaQuestionario: function() {
        Avaliacao.respostas['feedback'] = $('#textoFeedback')[0].value;
        Avaliacao.respostas['dispositivo'] = Cookies.get('dispositivo');

        let fnExibirMensagemSucesso = function() {
            let mensagemSucesso = 'Avaliação de Qualidade Finalizada! O Estabelecimento agradece sua resposta e ela é muito importante para nós, pois nos ajuda a melhorar continuamente nossos serviços.O Estabelecimento agradece sua resposta e ela é muito importante para nós, pois nos ajuda a melhorar continuamente nossos serviços.';
            Message.success(mensagemSucesso, function() {
                Avaliacao.reiniciaQuestionario();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/avaliacao/salvar',
            method: 'post',
            data: Avaliacao.respostas,
            fnSucess: fnExibirMensagemSucesso
        });
    },

    /** Reinicia a avaliação */
    reiniciaQuestionario: function() {
        Avaliacao.perguntaAtual = parseInt(Object.keys(Avaliacao.questoes)[0]);
        $('#feedback').css('display', 'none'); 
        $('#questionnaire').css('display', 'none'); 
        $('#startQuiz').css('display', 'flex'); 
    }
}

Avaliacao.onLoadAvaliacao();