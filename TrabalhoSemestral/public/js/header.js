var Header = {

    /** Comportamento realizado ao carregar a tela */
    onLoadHeader: function() {
        Header.loadScripts();
    },

    /** Carrega os comportamentos iniciais dos componentes */
    loadScripts: function() {
        $('#menu').on('click', Header.onClickMenu);
    },

    /** Comportamento executado ao clicar no menu do header */
    onClickMenu: function() {
        let classesNavegacao = $('#navegacao')[0].classList;

        if (!classesNavegacao.contains('navegacaoVisivel')) {
            $('#navegacao')[0].classList.add('navegacaoVisivel');
        } else {
            $('#navegacao')[0].classList.remove('navegacaoVisivel');
        }
    }
}

Header.loadScripts();