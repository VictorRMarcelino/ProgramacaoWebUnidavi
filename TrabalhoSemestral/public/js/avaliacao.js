var Avaliacao = {

    questoes: {},
    perguntaAtual: 0,
    respostas: {},

    /** Comportamento realizado ao carregar a tela */
    onLoadAvaliacao: function() {
        Avaliacao.loadScripts();
        let dispositivo = Cookies.get('dispositivo');

        if (dispositivo == undefined) {
            Avaliacao.carregaSetores();
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
        $('#areaPainelAdm').on('click', Avaliacao.onClickBotaoPainelAdministrador);
    },

    onClickBotaoDefinirDispositivo: function() {
        let dispositivo = $('#listaDispositivos').val();
        Cookies.set('dispositivo', dispositivo, { expires: 1});
        Avaliacao.carregaPerguntas(dispositivo);
    },

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
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/avaliacao/dispositivos',
            method: 'get',
            async: false,
            fnSucess: fnCarregaFiltroDispositivos
        });
    },

    /** Carrega as perguntas do formulário */
    carregaPerguntas: function(setor) {
        let fnSalvarPerguntas = function(response) {
            let perguntas = JSON.parse(response);
            Avaliacao.questoes = perguntas;
            Avaliacao.perguntaAtual = parseInt(Object.keys(perguntas)[0]);
            $('#definirSetor').css('display', 'none');
            $('#startQuiz').css('display', 'flex');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/avaliacao/perguntas',
            method: 'get',
            data: {setor: setor},
            fnSucess: fnSalvarPerguntas
        });
    },

    onClickStartQuiz: function() {
        Avaliacao.carregaProximaPergunta();
        $('#startQuiz').css('display', 'none'); 
        $('#questionnaire').css('display', 'flex'); 
    },

    carregaProximaPergunta: function() {
        $("#question").fadeOut(400, function() {
            $(this).html(Avaliacao.questoes[Avaliacao.perguntaAtual]);
            $(this).fadeIn(400);
        });
    },

    onClickButtonAnswer: function() {        
        Avaliacao.respostas[Avaliacao.perguntaAtual] = this.value;
        
        if (Avaliacao.perguntaAtual != Object.keys(Avaliacao.questoes).pop()) {
            Avaliacao.perguntaAtual++;
            Avaliacao.carregaProximaPergunta();
        } else {
            Avaliacao.exibeFeedback();
        }
    },

    exibeFeedback: function() {
        $('#questionnaire').css('display', 'none');
        $('#feedback').css('display', 'flex'); 
    },

    salvaQuestionario: function() {
        Avaliacao.respostas['feedback'] = $('#textoFeedback')[0].value;
        Avaliacao.respostas['setor'] = Cookies.get('setor');

        let fnExibirMensagemSucesso = function() {
            let tituloMensagemSucesso = 'Avaliação de Qualidade Finalizada';
            let mensagemSucesso = 'O Estabelecimento agradece sua resposta e ela é muito importante para nós, pois nos ajuda a melhorar continuamente nossos serviços.O Estabelecimento agradece sua resposta e ela é muito importante para nós, pois nos ajuda a melhorar continuamente nossos serviços.';
            Message.success(tituloMensagemSucesso, mensagemSucesso, function() {
                Avaliacao.reiniciaQuestionario();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/avaliacao/salvar',
            method: 'post',
            data: Avaliacao.respostas,
            fnSucess: fnExibirMensagemSucesso
        });
    },

    reiniciaQuestionario: function() {
        Avaliacao.perguntaAtual = parseInt(Object.keys(Avaliacao.questoes)[0]);
        $('#feedback').css('display', 'none'); 
        $('#questionnaire').css('display', 'none'); 
        $('#startQuiz').css('display', 'flex'); 
    },

    onClickBotaoPainelAdministrador: function() {
        $(location).attr('href', 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador');
    }
}

Avaliacao.onLoadAvaliacao();