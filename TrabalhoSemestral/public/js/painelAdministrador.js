var PainelAdministrador = {

    /** Comportamento realizado ao carregar a tela */
    onLoadPainelAdministrador: function() {
        PainelAdministrador.loadScripts();
    },

    /** Carrega os comportamentos iniciais dos componentes */
    loadScripts: function() {
        $('#areaAvaliacao').on('click', PainelAdministrador.onClickBotaoAvalicao);
        $('#menuOptionSetores').on('click', PainelAdministrador.onClickOpcaoMenuSetores);
        $('#btnIncluirSetor').on('click', PainelAdministrador.menuSetoresOnClickBotaoIncluirSetor);
        $('#modalSetorBotaoFechar').on('click', PainelAdministrador.modalSetorOnClicaoBotaoFechar);
        $('#menuOptionPerguntas').on('click', PainelAdministrador.onClickOpcaoMenuPerguntas);
        $('#btnCarregarPerguntas').on('click', PainelAdministrador.menuPerguntasonClickBotaoPesquisar);
        $('#btnIncluirPergunta').on('click', PainelAdministrador.menuPerguntasOnClickBotaoIncluirPergunta);
        $('#modalPerguntaBotaoFechar').on('click', PainelAdministrador.modalPerguntaOnClicaoBotaoFechar);
    },

    /** Comportamento chamado ao clicar no atalho para a página de avaliação */
    onClickBotaoAvalicao: function() {
        $(location).attr('href', 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/avaliacao');
    },

    /**
     * ================================================================================================================================ 
     * ============================================================ SETORES =========================================================== 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no item "Setores" do menu */
    onClickOpcaoMenuSetores: function() {
        PainelAdministrador.menuSetoresLimpaMenu();
        PainelAdministrador.menuPerguntasLimparMenu();
        PainelAdministrador.menuSetoresCarregaTabelaSetores();
    },

    /** Realiza o carregamento da tabela de setores */
    menuSetoresCarregaTabelaSetores: function() {
        PainelAdministrador.menuSetoresLimpaMenu();
        let fnCarregaTabelaSetores = function(response) {
            let setores = Object.values(JSON.parse(response));

            for (let i = 0; i < setores.length; i++) {
                let novaLinhaSetor = `
                    <tr>
                        <td>${setores[i]['id']}</td>
                        <td>${setores[i]['nome']}</td>
                        <td><button class="btn btn-warning btn-sm" name="modalSetorBotaoAlterar${setores[i]['id']}" id="modalSetorBotaoAlterar${setores[i]['id']}">Alterar</button></td>
                        <td><button class="btn btn-danger btn-sm" name="modalSetorBotaoExcluir${setores[i]['id']}" id="modalSetorBotaoExcluir${setores[i]['id']}">Excluir</button></td>
                    </tr>
                `;

                $('#tebelaSetores > tbody').append(novaLinhaSetor);
                $(`#modalSetorBotaoAlterar${setores[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuSetoresOnClickBotaoAlterarSetor.apply(PainelAdministrador, [setores[i]]);
                });
                $(`#modalSetorBotaoExcluir${setores[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuSetoresOnClickBotaoExcluirSetor.apply(PainelAdministrador, [setores[i]['id']]);
                });
            }

            $('#totalSetores')[0].innerHTML = 'Total: ' + setores.length; 
            $('#menuItensAguarde').css('display', 'none'); 
            $('#setores').css('display', 'flex'); 
        }

        $('#setores').css('display', 'none'); 
        $('#perguntas').css('display', 'none'); 
        $('#menuItensAguarde').css('display', 'flex'); 
        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnCarregaTabelaSetores
        });
    },

    /** Comportamento chamado ao clicar no botão para incluir um novo setor */
    menuSetoresOnClickBotaoIncluirSetor: function(registro) {
        $('#modalSetorTitulo')[0].innerHTML = 'Incluir Setor';
        $('#app').css('opacity', '0.1');
        $('#modalSetorBotaoConfirmar').off('click');
        $('#modalSetorBotaoConfirmar').on('click', PainelAdministrador.modalSetorOnClickBotaoConfirmarInclusao);
        $('#areaModal').css('display', 'flex');
        $('#modalSetor').css('display', 'flex');
    },

    /** 
     * Comportamento chamado ao clicar no botão para alterar um setor
     * @param {object} registro 
     */
    menuSetoresOnClickBotaoAlterarSetor: function(registro) {
        $('#modalSetorIdSetor')[0].value = registro['id'];
        $('#modalSetorNomeSetor')[0].value = registro['nome'];
        $('#modalSetorTitulo')[0].innerHTML = 'Alterar Setor';
        $('#app').css('opacity', '0.1');
        $('#modalSetorBotaoConfirmar').off('click');
        $('#modalSetorBotaoConfirmar').on('click', PainelAdministrador.modalSetorOnClickBotaoConfirmarAlteracao);
        $('#areaModal').css('display', 'flex');
        $('#modalSetor').css('display', 'flex');
    },

    /** 
     * Comportamento chamado ao clicar para excluir um setor 
     * @param {int} idSetor 
     */
    menuSetoresOnClickBotaoExcluirSetor: function(idSetor) {
        let fnAfterClickBotaoDeletar = function() {
            Message.success('Sucesso!', 'Setor removido com sucesso!', function() {
                PainelAdministrador.menuSetoresCarregaTabelaSetores();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/setor/deletar',
            method: 'delete',
            data: {idSetor: idSetor},
            fnSucess: fnAfterClickBotaoDeletar
        });
    },

    /** Realiza a limpeza dos componetes do menu dos setores */
    menuSetoresLimpaMenu: function() {
        $('#totalSetores')[0].innerHTML = '';
        $('#tebelaSetores > tbody').empty();
    },

    /**
     * ================================================================================================================================ 
     * =========================================================== PERGUNTAS ========================================================== 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no item "Perguntas" do menu */
    onClickOpcaoMenuPerguntas: function() {
        PainelAdministrador.menuSetoresLimpaMenu();
        PainelAdministrador.menuPerguntasLimparMenu();
        PainelAdministrador.menuPerguntasCarregaMenuPerguntas();
    },
    
    /** Realiza o carregamento inicial do menu das perguntas */
    menuPerguntasCarregaMenuPerguntas: function() {
        let fnCarregaFiltroSetores = function(response) {
            $('#tebelaPerguntas > tbody').empty();
            let setores = Object.values(JSON.parse(response));
            $('#listaSetores').append('<option value="0">Selecione...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#listaSetores').append(novaOpcaoSetor);
            }

            $('#menuItensAguarde').css('display', 'none'); 
            $('#perguntas').css('display', 'flex'); 
            $('#setores').css('display', 'none'); 
        }

        $('#setores').css('display', 'none'); 
        $('#perguntas').css('display', 'none');
        $('#menuItensAguarde').css('display', 'flex');
        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnCarregaFiltroSetores
        });
    },

    /** Comportamento chamado ao clicar no botão para pesquisar as perguntas de um setor */
    menuPerguntasonClickBotaoPesquisar: function() {
        let setor = $('#listaSetores').val();
        
        if (parseInt(setor) == 0) {
            Message.warn('Alerta', 'Selecione um setor para consultar as perguntas.');
            return;
        }

        PainelAdministrador.menuPerguntasLimparMenu();

        let fnCarregaTabelaPerguntas = function(response) {
            let perguntas = JSON.parse(response);
            
            for (let i = 0; i < perguntas.length; i++) {
                let novaLinhaSetor = `
                    <tr>
                        <td>${perguntas[i]['id']}</td>
                        <td>${perguntas[i]['id_setor']}</td>
                        <td>${perguntas[i]['pergunta']}</td>
                        <td><button class="btn btn-warning btn-sm" name="tabelaPerguntaBotaoAlterar${perguntas[i]['id']}" id="tabelaPerguntaBotaoAlterar${perguntas[i]['id']}">Alterar</button></td>
                        <td><button class="btn btn-danger btn-sm" name="tabelaPerguntaBotaoExcluir${perguntas[i]['id']}" id="tabelaPerguntaBotaoExcluir${perguntas[i]['id']}">Excluir</button></td>
                    </tr>
                `;

                $('#totalPerguntas')[0].innerHTML = 'Total: ' + perguntas.length; 
                $('#tebelaPerguntas > tbody').append(novaLinhaSetor);
                $(`#tabelaPerguntaBotaoAlterar${perguntas[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuPerguntasOnClickBotaoAlterarPergunta.apply(PainelAdministrador, [perguntas[i]]);
                });
                $(`#tabelaPerguntaBotaoExcluir${perguntas[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuPerguntasOnClickBotaoDeletar.apply(PainelAdministrador, [perguntas[i]['id']]);
                });
            }
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/perguntas',
            method: 'get',
            data: {idSetor: setor},
            fnSucess: fnCarregaTabelaPerguntas
        });
    },

    /** Comportamento chamado ao clicar para alterar uma pergunta */
    menuPerguntasOnClickBotaoIncluirPergunta: function() {
        let fnModalPerguntaCarregaSetores = function(response) {
            $('#modalPerguntaSetor').empty();
            let setores = Object.values(JSON.parse(response));
            $('#modalPerguntaSetor').append('<option value="0">Selecione o setor...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#modalPerguntaSetor').append(novaOpcaoSetor);
            }

            $('#modalPerguntaTitulo')[0].innerHTML = 'Incluir Pergunta';
            $('#app').css('opacity', '0.1');
            $('#modalPerguntaBotaoConfirmar').off('click');
            $('#modalPerguntaBotaoConfirmar').on('click', PainelAdministrador.modalPerguntaOnClickBotaoConfirmarInclusao);
            $('#areaModal').css('display', 'flex'); 
            $('#modalPergunta').css('display', 'flex'); 
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnModalPerguntaCarregaSetores
        });
    },

    /** 
     * Comportamento chamado ao clicar para alterar uma pergunta 
     * @param {object} registro 
     */
    menuPerguntasOnClickBotaoAlterarPergunta: function(registro) {
        let fnModalPerguntaCarregaSetores = function(response) {
            $('#modalPerguntaSetor').empty();
            let setores = Object.values(JSON.parse(response));
            $('#modalPerguntaSetor').append('<option value="0">Selecione o setor...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#modalPerguntaSetor').append(novaOpcaoSetor);
            }

            $('#modalPerguntaId')[0].value = registro['id'];
            $('#modalPerguntaSetor')[0].value = registro['id_setor'];
            $('#modalPerguntaQuestao')[0].value = registro['pergunta'];
            $('#modalPerguntaTitulo')[0].innerHTML = 'Alterar Pergunta';
            $('#modalPerguntaBotaoConfirmar').off('click');
            $('#modalPerguntaBotaoConfirmar').on('click', PainelAdministrador.modalPerguntaOnClickBotaoConfirmarInclusao);
            $('#app').css('opacity', '0.1');
            $('#areaModal').css('display', 'flex'); 
            $('#modalPergunta').css('display', 'flex'); 
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnModalPerguntaCarregaSetores
        });
    },

    /**
     * Comportamento chamado ao clicar no botão para deletar uma pergunta
     * @param {int} idPergunta 
     */
    menuPerguntasOnClickBotaoDeletar: function(idPergunta) {
        let fnAfterClickBotaoDeletar = function() {
            Message.success('Sucesso!', 'Pergunta removida com sucesso!', function() {
                PainelAdministrador.menuPerguntasonClickBotaoPesquisar();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/pergunta/deletar',
            method: 'delete',
            data: {idPergunta: idPergunta},
            fnSucess: fnAfterClickBotaoDeletar
        });
    },

    /** Limpa os componetes do menu de perguntas */
    menuPerguntasLimparMenu: function() {
        $('#totalPerguntas')[0].innerHTML = '';
        $('#tebelaPerguntas > tbody').empty();
    },

    /**
     * ================================================================================================================================ 
     * ========================================================== MODAL SETOR ========================================================= 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no botão para fechar o modal do setor */
    modalSetorOnClicaoBotaoFechar: function() {
        $('#app').css('opacity', '1');
        $('#areaModal').css('display', 'none'); 
        $('#modalSetor').css('display', 'none'); 
        $('#modalSetorIdSetor')[0].value = '';
        $('#modalSetorNomeSetor')[0].value = '';
    },

    /** Comportamento chamado ao clicar no botão de confirmar inclusão de um setor */
    modalSetorOnClickBotaoConfirmarInclusao: function() {
        let nomeSetor = $('#modalSetorNomeSetor').val();

        if (nomeSetor == '') {
            Message.warn('Alerta', 'O nome do setor não pode ficar em branco!');
            return;
        }

        let fnAfterClickBotaoConfirmar = function() {
            Message.success('Sucesso!', 'Setor inserido com sucesso!', function() {
                PainelAdministrador.modalSetorOnClicaoBotaoFechar();
                PainelAdministrador.menuSetoresCarregaTabelaSetores();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/setor/incluir',
            method: 'post',
            data: {nome: nomeSetor},
            fnSucess: fnAfterClickBotaoConfirmar
        });
    },

    /** Comportamento chamado ao clicar no botão de confirmar alteração de um setor */
    modalSetorOnClickBotaoConfirmarAlteracao: function() {
        let idSetor = $('#modalSetorIdSetor').val();
        let nomeSetor = $('#modalSetorNomeSetor').val();

        if (nomeSetor == '') {
            Message.warn('Alerta', 'O nome do setor não pode ficar em branco!');
            return;
        }

        fnAfterClickBotaoConfirmar = function() {
            Message.success('Sucesso!', 'Setor alterado com sucesso!', function() {
                PainelAdministrador.modalSetorOnClicaoBotaoFechar();
                PainelAdministrador.menuSetoresCarregaTabelaSetores();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/setor/alterar',
            method: 'put',
            data: {idSetor: idSetor, nome: nomeSetor},
            fnSucess: fnAfterClickBotaoConfirmar
        });
    },

    /**
     * ================================================================================================================================ 
     * ========================================================= MODAL PERGUNTA ======================================================= 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao apertar para fechar o modal de pergunta */
    modalPerguntaOnClicaoBotaoFechar: function() {
        $('#app').css('opacity', '1');
        $('#areaModal').css('display', 'none'); 
        $('#modalPergunta').css('display', 'none');
        $('#modalPerguntaId')[0].value = '';
        $('#modalPerguntaSetor')[0].value = '';
        $('#modalPerguntaQuestao')[0].value = '';
        $('#modalPerguntaTitulo')[0].value = ''; 
    },

    /** Comportamento chamado ao confirmar a inclusão da pergunta */
    modalPerguntaOnClickBotaoConfirmarInclusao: function() {
        let idSetor = $('#modalPerguntaSetor').val();
        let questao = $('#modalPerguntaQuestao').val();
        let fnAfterClickBotaoConfirmar = function() {
            Message.success('Sucesso!', 'Pergunta inserida com sucesso!', function() {
                PainelAdministrador.modalPerguntaOnClicaoBotaoFechar();
                PainelAdministrador.menuPerguntasonClickBotaoPesquisar();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/pergunta/incluir',
            method: 'post',
            data: {idSetor: idSetor, pergunta: questao},
            async: false,
            fnSucess: fnAfterClickBotaoConfirmar
        });
    },

    /** Comportamento chamado ao confirmar a alteração da pergunta */
    modalPerguntaOnClickBotaoConfirmarAlteracao: function() {
        let idPergunta = $('#modalPerguntaId').val();
        let idSetor = $('#modalPerguntaSetor').val();
        let questao = $('#modalPerguntaQuestao').val();
        fnAfterClickBotaoConfirmar = function() {
            Message.success('Sucesso!', 'Pergunta alterada com sucesso!', function() {
                PainelAdministrador.modalPerguntaOnClicaoBotaoFechar();
                PainelAdministrador.menuPerguntasonClickBotaoPesquisar();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWeb/TrabalhoSemestral/public/painelAdministrador/pergunta/alterar',
            method: 'put',
            data: {idPergunta: idPergunta, idSetor: idSetor, pergunta: questao},
            async: false,
            fnSucess: fnAfterClickBotaoConfirmar
        });
    }
}

PainelAdministrador.onLoadPainelAdministrador();