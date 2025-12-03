var PainelAdministrador = {

    /** Comportamento realizado ao carregar a tela */
    onLoadPainelAdministrador: function() {
        PainelAdministrador.loadScripts();
    },

    /** Carrega os comportamentos iniciais dos componentes */
    loadScripts: function() {
        $('#navegacaoItemAvaliacao').on('click', PainelAdministrador.onClickBotaoAvalicao);
        $('#navegacaoItemResetarEscolhaDispositivo').on('click', PainelAdministrador.onClickBotaoResetarDispositivo);
        $('#navegacaoItemDeslogar').on('click', PainelAdministrador.onClickBotaoDeslogar);
        $('#dashboardMenuOptionSetores').on('click', PainelAdministrador.onClickOpcaoMenuSetores);
        $('#dashboardMenuOptionPerguntas').on('click', PainelAdministrador.onClickOpcaoMenuPerguntas);
        $('#dashboardMenuOptionAvaliacoes').on('click', PainelAdministrador.onClickOpcaoMenuAvaliacoes);
        $('#dashboardMenuOptionDispositivos').on('click', PainelAdministrador.onClickOpcaoMenuDispositivos);
        $('#modalHeaderAcoesFechar').on('click', PainelAdministrador.onCloseModal);
    },

    /** Comportamento chamado ao clicar no atalho para a página de avaliação */
    onClickBotaoAvalicao: function() {
        $(location).attr('href', 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/avaliacao');
    },

    /** Comportamento chamado ao clicar no atalho para a página de avaliação */
    onClickBotaoResetarDispositivo: function() {
        Message.confirm('Você tem certeza que deseja resetar a escolha do dispositivo?', function() {
            if (Cookies.get('dispositivo') != undefined) {
                Cookies.remove('dispositivo');
                Message.success('Escolha do dispositivo resetada com sucesso!');
            } else {
                Message.warn('Nenhum dispositivo definido!');
            }
        });
    },

    /** Comportamento chamado ao clicar no atalho para a página de avaliação */
    onClickBotaoDeslogar: function() {
        Message.confirm('Você tem certeza que deseja deslogar do Painel de Administrador?', function() {
            Ajax.loadAjax({
                url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/login/deslogar',
                method: 'get',
                async: false,
                fnSucess: function() {
                    Message.success('Deslogado com sucesso!', function() {
                        $(location).attr('href', 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/login');
                    });
                }
            });
        });
    },

    /** 
     * Copia o conteúdo de uma div para outra
     * @param {string} divOrigem
     * @param {string} divDestino
     */
    copiaConteudoParaOutraDiv: function(divOrigem, divDestino) {
        let conteudo = $(divOrigem).html();
        $(divDestino).html(conteudo.replaceAll('estrutura', ''));
    },

    /**
     * ================================================================================================================================ 
     * =========================================================== DASHBOARD ========================================================== 
     * ================================================================================================================================ 
     */

    /** Limpa o conteúdo atual do dashboard */
    limpaDashboardMenuItens: function() {
        $('#dashboardMenuItens').empty();  
    },

    /** Atualiza as classes do CSS ao selecionar uma opção do dashboard */
    alteraClasseDashboardMenuOptionSelecionado: function(idOpcaoSelecionada) {
        $('.dashboardMenuOption').each(function(index, opcaoMenuDashboard) {
            let classesOpcaoMenuDashboard = opcaoMenuDashboard.classList;

            if (classesOpcaoMenuDashboard.contains('dashboardMenuOptionSelecionado')) {
                opcaoMenuDashboard.classList.remove('dashboardMenuOptionSelecionado');
            }
        });

        $('#' + idOpcaoSelecionada)[0].classList.add('dashboardMenuOptionSelecionado');
    },

    /**
     * ================================================================================================================================ 
     * ============================================================ SETORES =========================================================== 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no item "Setores" do menu */
    onClickOpcaoMenuSetores: function() {
        PainelAdministrador.alteraClasseDashboardMenuOptionSelecionado('dashboardMenuOptionSetores');
        PainelAdministrador.limpaDashboardMenuItens();
        PainelAdministrador.copiaConteudoParaOutraDiv('#setores', '#dashboardMenuItens');
        PainelAdministrador.menuSetoresCarregaTabelaSetores();
    },

    /** Realiza o carregamento da tabela de setores */
    menuSetoresCarregaTabelaSetores: function() {
        PainelAdministrador.menuSetoresLimpaMenu();
        $('#tabelaSetores > tbody').empty();
        let fnCarregaTabelaSetores = function(response) {
            let setores = Object.values(JSON.parse(response));

            for (let i = 0; i < setores.length; i++) {
                let novaLinhaSetor = `
                    <tr>
                        <td>${setores[i]['id']}</td>
                        <td>${setores[i]['nome']}</td>
                        <td><button class="btn btn-warning btn-sm" name="tabelaSetorBotaoAlterar${setores[i]['id']}" id="tabelaSetorBotaoAlterar${setores[i]['id']}">Alterar</button></td>
                        <td><button class="btn btn-danger btn-sm" name="tabelaSetorBotaoExcluir${setores[i]['id']}" id="tabelaSetorBotaoExcluir${setores[i]['id']}">Excluir</button></td>
                    </tr>
                `;

                $('#tabelaSetores > tbody').append(novaLinhaSetor);
                $(`#tabelaSetorBotaoAlterar${setores[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuSetoresOnClickBotaoAlterarSetor.apply(PainelAdministrador, [setores[i]]);
                });
                $(`#tabelaSetorBotaoExcluir${setores[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuSetoresOnClickBotaoExcluirSetor.apply(PainelAdministrador, [setores[i]['id']]);
                });
            }

            $('#totalSetores')[0].innerHTML = 'Total: ' + setores.length;
            PainelAdministrador.menuSetoresLoadComportamentos();
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnCarregaTabelaSetores
        });
    },

    /** Carrega os comportamentos da aba de setores */
    menuSetoresLoadComportamentos: function() {
        $('#btnIncluirSetor').on('click', PainelAdministrador.menuSetoresOnClickBotaoIncluirSetor);
    },

    /** Comportamento chamado ao clicar no botão para incluir um novo setor */
    menuSetoresOnClickBotaoIncluirSetor: function(registro) {
        $('#modalHeaderTitulo')[0].innerHTML = 'Incluir Setor';
        PainelAdministrador.copiaConteudoParaOutraDiv('#modalContentSetor', '#modalContent');
        $('#app').css('opacity', '0.1');
        $('#modalFooterBotaoConfirmar').on('click', PainelAdministrador.modalSetorOnClickBotaoConfirmarInclusao);
        $('#modal').css('display', 'flex');
    },

    /** 
     * Comportamento chamado ao clicar no botão para alterar um setor
     * @param {object} registro 
     */
    menuSetoresOnClickBotaoAlterarSetor: function(registro) {
        $('#modalHeaderTitulo')[0].innerHTML = 'Alterar Setor';
        PainelAdministrador.copiaConteudoParaOutraDiv('#modalContentSetor', '#modalContent');
        $('#app').css('opacity', '0.1');
        $('#modalFooterBotaoConfirmar').on('click', PainelAdministrador.modalSetorOnClickBotaoConfirmarAlteracao);
        $('#modalSetorIdSetor')[0].value = registro['id'];
        $('#modalSetorNomeSetor')[0].value = registro['nome'];
        $('#modal').css('display', 'flex');
    },

    /** 
     * Comportamento chamado ao clicar para excluir um setor 
     * @param {int} idSetor 
     */
    menuSetoresOnClickBotaoExcluirSetor: function(idSetor) {
        let fnAfterClickBotaoDeletar = function() {
            Message.success('Setor removido com sucesso!', function() {
                PainelAdministrador.menuSetoresCarregaTabelaSetores();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setor/deletar',
            method: 'delete',
            data: {idSetor: idSetor},
            fnSucess: fnAfterClickBotaoDeletar
        });
    },

    /** Realiza a limpeza dos componetes do menu dos setores */
    menuSetoresLimpaMenu: function() {
        $('#totalSetores')[0].innerHTML = '';
        $('#tabelaSetores > tbody').empty();
    },

    /**
     * ================================================================================================================================ 
     * =========================================================== PERGUNTAS ========================================================== 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no item "Perguntas" do menu */
    onClickOpcaoMenuPerguntas: function() {
        PainelAdministrador.alteraClasseDashboardMenuOptionSelecionado('dashboardMenuOptionPerguntas');
        PainelAdministrador.limpaDashboardMenuItens();
        PainelAdministrador.copiaConteudoParaOutraDiv('#perguntas', '#dashboardMenuItens');
        PainelAdministrador.menuPerguntasLoadComportamentos();
        PainelAdministrador.menuPerguntasCarregaMenuPerguntas();
    },
    
    /** Realiza o carregamento inicial do menu das perguntas */
    menuPerguntasCarregaMenuPerguntas: function() {
        let fnCarregaFiltroSetores = function(response) {
            let setores = Object.values(JSON.parse(response));
            $('#filtrosPerguntaslistaSetores').append('<option value="0">Selecione...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#filtrosPerguntaslistaSetores').append(novaOpcaoSetor);
            }
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnCarregaFiltroSetores
        });
    },

    /** Carrega os comportamentos da aba de perguntas */
    menuPerguntasLoadComportamentos: function() {
        $('#btnCarregarPerguntas').on('click', PainelAdministrador.menuPerguntasOnClickBotaoPesquisar);
        $('#btnIncluirPergunta').on('click', PainelAdministrador.menuPerguntasOnClickBotaoIncluirPergunta);
    },

    /** Comportamento chamado ao clicar no botão para pesquisar as perguntas de um setor */
    menuPerguntasOnClickBotaoPesquisar: function() {
        let setor = $('#filtrosPerguntaslistaSetores').val();
        
        if (parseInt(setor) == 0) {
            Message.warn('Selecione um setor para consultar as perguntas.');
            return;
        }

        PainelAdministrador.menuPerguntasLimparMenu();

        let fnCarregaTabelaPerguntas = function(response) {
            let perguntas = JSON.parse(response);
            
            for (let i = 0; i < perguntas.length; i++) {
                let isAtivo = (parseInt(perguntas[i]['ativa']) == 1) ? 'Sim' : 'Não';
                let novaLinhaPergunta = `
                    <tr>
                        <td>${perguntas[i]['id']}</td>
                        <td>${perguntas[i]['pergunta']}</td>
                        <td>${isAtivo}</td>
                        <td><button class="btn btn-warning btn-sm" name="tabelaPerguntaBotaoAlterar${perguntas[i]['id']}" id="tabelaPerguntaBotaoAlterar${perguntas[i]['id']}">Alterar</button></td>
                        <td><button class="btn btn-danger btn-sm" name="tabelaPerguntaBotaoExcluir${perguntas[i]['id']}" id="tabelaPerguntaBotaoExcluir${perguntas[i]['id']}">Excluir</button></td>
                    </tr>
                `;

                $('#tabelaPerguntas > tbody').append(novaLinhaPergunta);
                $(`#tabelaPerguntaBotaoAlterar${perguntas[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuPerguntasOnClickBotaoAlterarPergunta.apply(PainelAdministrador, [perguntas[i]]);
                });
                $(`#tabelaPerguntaBotaoExcluir${perguntas[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuPerguntasOnClickBotaoDeletar.apply(PainelAdministrador, [perguntas[i]['id']]);
                });
            }

            $('#totalPerguntas')[0].innerHTML = 'Total: ' + perguntas.length;
            $('#tabelaPerguntas').css('display', 'table');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/perguntas',
            method: 'get',
            data: {idSetor: setor},
            fnSucess: fnCarregaTabelaPerguntas
        });
    },

    /** Comportamento chamado ao clicar para alterar uma pergunta */
    menuPerguntasOnClickBotaoIncluirPergunta: function() {
        let fnModalPerguntaCarregaSetores = function(response) {
            PainelAdministrador.copiaConteudoParaOutraDiv('#modalContentPergunta', '#modalContent');
            $('#app').css('opacity', '0.1');
            $('#modalFooterBotaoConfirmar').on('click', PainelAdministrador.modalPerguntaOnClickBotaoConfirmarInclusao);
            $('#modalPerguntaSetor').empty();
            let setores = Object.values(JSON.parse(response));
            $('#modalPerguntaSetor').append('<option value="0">Selecione o setor...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#modalPerguntaSetor').append(novaOpcaoSetor);
            }

            $('#modalHeaderTitulo')[0].innerHTML = 'Incluir Pergunta';
            $('#modal').css('display', 'flex'); 
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setores',
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
            PainelAdministrador.copiaConteudoParaOutraDiv('#modalContentPergunta', '#modalContent');
            $('#modalPerguntaSetor').prop("disabled", true);
            $('#app').css('opacity', '0.1');
            $('#modalFooterBotaoConfirmar').on('click', PainelAdministrador.modalPerguntaOnClickBotaoConfirmarAlteracao);
            $('#modalPerguntaSetor').empty();
            let setores = Object.values(JSON.parse(response));
            $('#modalPerguntaSetor').append('<option value="0">Selecione o setor...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#modalPerguntaSetor').append(novaOpcaoSetor);
            }

            $('#modalPerguntaId')[0].value = registro['id'];
            $('#modalPerguntaSetor')[0].value = registro['id_setor'];
            $('#modalPerguntaAtivo').val(registro['ativa']);
            $('#modalPerguntaQuestao')[0].value = registro['pergunta'];
            $('#modalHeaderTitulo')[0].innerHTML = 'Alterar Pergunta';
            $('#modal').css('display', 'flex');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setores',
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
            Message.success('Pergunta removida com sucesso!', function() {
                PainelAdministrador.menuPerguntasOnClickBotaoPesquisar();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/pergunta/deletar',
            method: 'delete',
            data: {idPergunta: idPergunta},
            fnSucess: fnAfterClickBotaoDeletar
        });
    },

    /** Limpa os componetes do menu de perguntas */
    menuPerguntasLimparMenu: function() {
        $('#totalPerguntas')[0].innerHTML = '';
        $('#tabelaPerguntas > tbody').empty();
    },

    /**
     * ================================================================================================================================ 
     * =========================================================== AVALIAÇÕES ========================================================= 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no item "Perguntas" do menu */
    onClickOpcaoMenuAvaliacoes: function() {
        PainelAdministrador.alteraClasseDashboardMenuOptionSelecionado('dashboardMenuOptionAvaliacoes');
        PainelAdministrador.limpaDashboardMenuItens();
        PainelAdministrador.menuAvaliacoesCarregaMenuAvaliacoes();
    },
    
    /** Realiza o carregamento inicial do menu das avaliações */
    menuAvaliacoesCarregaMenuAvaliacoes: function() {
        let fnCarregaFiltroSetores = function(response) {
            PainelAdministrador.copiaConteudoParaOutraDiv('#avaliacoes', '#dashboardMenuItens');
            PainelAdministrador.menuAvaliacoesLoadComportamentos();
            let setores = Object.values(JSON.parse(response));
            $('#filtrosAvaliacoesListaSetores').append('<option value="0">Selecione...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#filtrosAvaliacoesListaSetores').append(novaOpcaoSetor);
            }
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnCarregaFiltroSetores
        });
    },

    /** Carrega os comportamentos da aba de avaliacoes */
    menuAvaliacoesLoadComportamentos: function() {
        $('#btnCarregarAvaliacoes').on('click', PainelAdministrador.menuAvaliacoesOnClickBotaoPesquisar);
    },

    /** Comportamento chamado ao clicar no botão para pesquisar as avaliações de um setor */
    menuAvaliacoesOnClickBotaoPesquisar: function() {
        let setor = $('#filtrosAvaliacoesListaSetores').val();
        
        if (parseInt(setor) == 0) {
            Message.warn('Selecione um setor para consultar as perguntas.');
            return;
        }

        PainelAdministrador.menuAvaliacoesLimparConsulta();

        let fnCarregaTabelaAvaliacoes = function(response) {
            $('#tabelaAvaliacoes > thead').empty();
            $('#tabelaAvaliacoes > tbody').empty();
            let retorno = JSON.parse(response);
            let perguntas = retorno['perguntas'];
            let avaliacoes = retorno['avaliacoes'];
            let mediaPergunta = {};
            let colunas = '<tr>';
            colunas += '<td>Avaliação</td>';
            
            for (let i = 0; i < perguntas.length; i++) {
                let idPergunta = perguntas[i]['id'];
                colunas += `<td>P${idPergunta}</td>`;
                mediaPergunta[idPergunta] = {media: 0, quantidadeAvaliacoes: 0};
            }

            colunas += '<td>Média Avaliação</td>';
            $('#tabelaAvaliacoes > thead').append(colunas);


            for (let i = 0; i < avaliacoes.length; i++) {
                let novaLinhaAvaliacao = `<tr><td>${avaliacoes[i]['avaliacao']}</td>`;

                for (let j = 0; j < perguntas.length; j++) {
                    let idPergunta = perguntas[j]['id'];
                    let notaResposta = avaliacoes[i]['p' + idPergunta];
                    novaLinhaAvaliacao += `<td>${notaResposta}</td>`;

                    if (notaResposta != 'N/R') {
                        mediaPergunta[idPergunta].media += parseInt(notaResposta);
                        mediaPergunta[idPergunta].quantidadeAvaliacoes++;
                    }
                }

                novaLinhaAvaliacao += `<td>${avaliacoes[i]['mediaavaliacao']}</td></tr>`;

                $('#tabelaAvaliacoes > tbody').append(novaLinhaAvaliacao);
            }

            let linhaMediaRespostas = '<tr><td>Média Respostas</td>'

            for (let i = 0; i < perguntas.length; i++) {
                let idPergunta = perguntas[i]['id'];
                linhaMediaRespostas += '<td>' + Math.floor((mediaPergunta[idPergunta].media / mediaPergunta[idPergunta].quantidadeAvaliacoes)) + '</td>';
            }

            linhaMediaRespostas += '</tr>';
            $('#tabelaAvaliacoes > tbody').append(linhaMediaRespostas);

            $('#totalAvaliacoes')[0].innerHTML = 'Total: ' + avaliacoes.length;
            $('#tabelaAvaliacoes').css('display', 'table');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/avaliacoes',
            method: 'get',
            data: {idSetor: setor},
            fnSucess: fnCarregaTabelaAvaliacoes
        });
    },

    /** Limpa os componetes da consulta de avaliações */
    menuAvaliacoesLimparConsulta: function() {
        $('#totalAvaliacoes')[0].innerHTML = '';
        $('#tabelaAvaliacoes > thead').empty();
        $('#tabelaAvaliacoes > tbody').empty();
    },

    /**
     * ================================================================================================================================ 
     * ========================================================= DISPOSITIVOS  ======================================================== 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no item "Perguntas" do menu */
    onClickOpcaoMenuDispositivos: function() {
        PainelAdministrador.alteraClasseDashboardMenuOptionSelecionado('dashboardMenuOptionDispositivos');
        PainelAdministrador.limpaDashboardMenuItens();
        PainelAdministrador.copiaConteudoParaOutraDiv('#dispositivos', '#dashboardMenuItens');
        PainelAdministrador.menuPerguntasCarregaMenuDispositivos();
    },

    /** Realiza o carregamento inicial do menu dos dispositivos */
    menuPerguntasCarregaMenuDispositivos: function() {
        PainelAdministrador.menuDispositivoLimparMenu();
        let fnCarregaFiltroSetores = function(response) {
            let dispositivos = Object.values(JSON.parse(response));

            for (let i = 0; i < dispositivos.length; i++) {
                let novaLinhaDispositivo = `
                    <tr>
                        <td>${dispositivos[i]['id']}</td>
                        <td>${dispositivos[i]['nome']}</td>
                        <td>${dispositivos[i]['ativo']}</td>
                        <td>${dispositivos[i]['setor']}</td>
                        <td><button class="btn btn-warning btn-sm" name="tabelaDispositivoBotaoAlterar${dispositivos[i]['id']}" id="tabelaDispositivoBotaoAlterar${dispositivos[i]['id']}">Alterar</button></td>
                        <td><button class="btn btn-danger btn-sm" name="tabelaDispositivoBotaoExcluir${dispositivos[i]['id']}" id="tabelaDispositivoBotaoExcluir${dispositivos[i]['id']}">Excluir</button></td>
                    </tr>
                `;

                $('#tabelaDispositivos > tbody').append(novaLinhaDispositivo);
                $(`#tabelaDispositivoBotaoAlterar${dispositivos[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuDispositivosOnClickBotaoAlterar.apply(PainelAdministrador, [dispositivos[i]]);
                });
                $(`#tabelaDispositivoBotaoExcluir${dispositivos[i]['id']}`).on('click', function() {
                    PainelAdministrador.menuDispositivosOnClickBotaoDeletar.apply(PainelAdministrador, [dispositivos[i]['id']]);
                });
            }

            $('#totalDispositivos')[0].innerHTML = 'Total: ' + dispositivos.length; 
            PainelAdministrador.menuDispositivosLoadComportamentos();
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/dispositivos',
            method: 'get',
            async: false,
            fnSucess: fnCarregaFiltroSetores
        });
    },

    /** Carrega os comportamentos da aba de dispositivos */
    menuDispositivosLoadComportamentos: function() {
        $('#btnIncluirDipositivo').on('click', PainelAdministrador.menuDispositivosOnClickBotaoIncluirDispositivo);
    },

    /** Comportamento chamado ao clicar no botão para incluir um novo setor */
    menuDispositivosOnClickBotaoIncluirDispositivo: function() {
        let fnModalPerguntaCarregaSetores = function(response) {
            $('#modalHeaderTitulo')[0].innerHTML = 'Incluir Dispositivo';
            PainelAdministrador.copiaConteudoParaOutraDiv('#modalContentDispositivo', '#modalContent');
            $('#app').css('opacity', '0.1');
            $('#modalFooterBotaoConfirmar').on('click', PainelAdministrador.modalDispositivoOnClickBotaoConfirmarInclusao);
            $('#modalDispositivoSetor').empty();
            let setores = Object.values(JSON.parse(response));
            $('#modalDispositivoSetor').append('<option value="0">Selecione o setor...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#modalDispositivoSetor').append(novaOpcaoSetor);
            }

            $('#modal').css('display', 'flex');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnModalPerguntaCarregaSetores
        });
    },

    /** 
     * Comportamento chamado ao clicar para alterar um dispositivo 
     * @param {object} registro 
     */
    menuDispositivosOnClickBotaoAlterar: function(registro) {
        let fnModalPerguntaCarregaSetores = function(response) {
            PainelAdministrador.copiaConteudoParaOutraDiv('#modalContentDispositivo', '#modalContent');
            $('#modalHeaderTitulo')[0].innerHTML = 'Alterar Dispositivo';
            $('#modalDispositivoSetor').prop("disabled", true);
            $('#app').css('opacity', '0.1');
            $('#modalFooterBotaoConfirmar').on('click', PainelAdministrador.modalDispositivoOnClickBotaoConfirmarAlteracao);
            $('#modalDispositivoSetor').empty();
            let setores = Object.values(JSON.parse(response));
            $('#modalDispositivoSetor').append('<option value="0">Selecione o setor...</option>');

            for (let i = 0; i < setores.length; i++) {
                let novaOpcaoSetor = `<option value="${setores[i]['id']}">${setores[i]['nome']}</option>`;
                $('#modalDispositivoSetor').append(novaOpcaoSetor);
            }

            $('#modalDispositivoId')[0].value = registro['id'];
            $('#modalDispositivoSetor')[0].value = registro['idsetor'];
            $('#modalDispositivoAtivo').val(registro['ativa']);
            $('#modalDispositivoNome')[0].value = registro['nome'];
            $('#modal').css('display', 'flex');
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setores',
            method: 'get',
            async: false,
            fnSucess: fnModalPerguntaCarregaSetores
        });
    },

    /**
     * Comportamento chamado ao clicar no botão para deletar um dispositivo
     * @param {int} idDispositivo 
     */
    menuDispositivosOnClickBotaoDeletar: function(idDispositivo) {
        let fnAfterClickBotaoDeletar = function() {
            Message.success('Dispositivo removido com sucesso!', function() {
                PainelAdministrador.menuPerguntasCarregaMenuDispositivos();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/dispositivo/deletar',
            method: 'delete',
            data: {idDispositivo: idDispositivo},
            fnSucess: fnAfterClickBotaoDeletar
        });
    },

    /** Limpa os componetes do menu de dispositivos */
    menuDispositivoLimparMenu: function() {
        $('#totalDispositivos')[0].innerHTML = '';
        $('#tabelaDispositivos > tbody').empty();
    },

    /**
     * ================================================================================================================================ 
     * ============================================================= MODAL ============================================================ 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao fechar o modal */
    onCloseModal: function() {
        $('#modalHeaderTitulo')[0].innerHTML = '';
        $('#modal').css('display', 'none');
        $('#modalFooterBotaoConfirmar').off('click');
        $('#modalContent').empty();
        $('#app').css('opacity', '1');
    },

    /**
     * ================================================================================================================================ 
     * ========================================================== MODAL SETOR ========================================================= 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no botão de confirmar inclusão de um setor */
    modalSetorOnClickBotaoConfirmarInclusao: function() {
        let nomeSetor = $('#modalSetorNomeSetor').val();

        if (nomeSetor == '') {
            Message.warn('O nome do setor não pode ficar em branco!');
            return;
        }

        let fnAfterClickBotaoConfirmar = function() {
            Message.success('Setor inserido com sucesso!', function() {
                PainelAdministrador.modalSetorOnClicaoBotaoFechar();
                PainelAdministrador.menuSetoresCarregaTabelaSetores();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setor/incluir',
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
            Message.warn('O nome do setor não pode ficar em branco!');
            return;
        }

        fnAfterClickBotaoConfirmar = function() {
            Message.success('Setor alterado com sucesso!', function() {
                PainelAdministrador.modalSetorOnClicaoBotaoFechar();
                PainelAdministrador.menuSetoresCarregaTabelaSetores();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/setor/alterar',
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

    /** Comportamento chamado ao confirmar a inclusão da pergunta */
    modalPerguntaOnClickBotaoConfirmarInclusao: function() {
        let idSetor = $('#modalPerguntaSetor').val();
        let questao = $('#modalPerguntaQuestao').val();
        let ativa = $('#modalPerguntaAtivo').val();

        if (questao == '') {
            Message.warn('O texto da pergunta não pode ficar em branco!');
            return;
        }

        if (idSetor == '') {
            Message.warn('É necessário selecionar um setor para a pargunta!');
            return;
        }

        let fnAfterClickBotaoConfirmar = function() {
            Message.success('Pergunta inserida com sucesso!', function() {
                PainelAdministrador.onCloseModal();
                PainelAdministrador.menuPerguntasOnClickBotaoPesquisar();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/pergunta/incluir',
            method: 'post',
            data: {idSetor: idSetor, pergunta: questao, ativa: ativa},
            async: false,
            fnSucess: fnAfterClickBotaoConfirmar
        });
    },

    /** Comportamento chamado ao confirmar a alteração da pergunta */
    modalPerguntaOnClickBotaoConfirmarAlteracao: function() {
        let idPergunta = $('#modalPerguntaId').val();
        let questao = $('#modalPerguntaQuestao').val();
        let ativa = $('#modalPerguntaAtivo').val();

        if (questao == '') {
            Message.warn('O texto da pergunta não pode ficar em branco!');
            return;
        }

        fnAfterClickBotaoConfirmar = function() {
            Message.success('Pergunta alterada com sucesso!', function() {
                PainelAdministrador.onCloseModal();
                PainelAdministrador.menuPerguntasOnClickBotaoPesquisar();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/pergunta/alterar',
            method: 'put',
            data: {idPergunta: idPergunta, pergunta: questao, ativa: ativa},
            fnSucess: fnAfterClickBotaoConfirmar
        });
    },

    /**
     * ================================================================================================================================ 
     * ======================================================= MODAL DISPOSITIVO ====================================================== 
     * ================================================================================================================================ 
     */

    /** Comportamento chamado ao clicar no botão de confirmar inclusão de um dispositivo */
    modalDispositivoOnClickBotaoConfirmarInclusao: function() {
        let idSetor = $('#modalDispositivoSetor').val();
        let ativo = $('#modalDispositivoAtivo').val();
        let nomeDispositivo = $('#modalDispositivoNome').val();

        if (nomeDispositivo == '') {
            Message.warn('O nome do dispositivo não pode ficar em branco!');
            return;
        }

        if (idSetor == '') {
            Message.warn('É necessário informar um setor para prosseguir com a inclusão!');
            return;
        }

        let fnAfterClickBotaoConfirmar = function() {
            Message.success('Dispositivo inserido com sucesso!', function() {
                PainelAdministrador.onCloseModal();
                PainelAdministrador.menuPerguntasCarregaMenuDispositivos();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/dispositivo/incluir',
            method: 'post',
            data: {idSetor: idSetor, nomeDispositivo: nomeDispositivo, ativo: ativo},
            fnSucess: fnAfterClickBotaoConfirmar
        });
    },

    /** Comportamento chamado ao clicar no botão de confirmar alteração de um setor */
    modalDispositivoOnClickBotaoConfirmarAlteracao: function() {
        let idDispositivo = $('#modalDispositivoId').val();
        let ativo = $('#modalDispositivoAtivo').val();
        let nomeDispositivo = $('#modalDispositivoNome').val();

        if (nomeDispositivo == '') {
            Message.warn('O nome do dispositivo não pode ficar em branco!');
            return;
        }

        let fnAfterClickBotaoConfirmar = function() {
            Message.success('Dispositivo alterado com sucesso!', function() {
                PainelAdministrador.onCloseModal();
                PainelAdministrador.menuPerguntasCarregaMenuDispositivos();
            });
        }

        Ajax.loadAjax({
            url: 'http://localhost/ProgramacaoWebUnidavi/TrabalhoSemestral/public/painelAdministrador/dispositivo/alterar',
            method: 'put',
            data: {idDispositivo: idDispositivo, nomeDispositivo: nomeDispositivo, ativo: ativo},
            fnSucess: fnAfterClickBotaoConfirmar
        });
    },
}

PainelAdministrador.onLoadPainelAdministrador();