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
        if ($('#navegacao').css('display') == 'none') {
            $('#navegacao').css('display', 'flex');
        } else {
            $('#navegacao').css('display', 'none');
        }
    }
}

Header.loadScripts();