var Message = {

    /**
     * Exibe uma mensagem
     * @param {object} options
     */
    show: function(options) {
        let settings = $.extend({
            title: 'Título',
            icon: 'info',
            text: 'Mensagem Base',
            target: document.body,
        }, options);

        Swal.fire(settings).then((result) => {
            if (result.isConfirmed && options.fnOk != undefined) {
                options.fnOk.apply(this, [result]);
                return;
            }
        })
    },

    /**
     * Exibe uma mensagem de erro
     * @param {string} text 
     */
    error: function(text) {
        Message.show({
            title: 'Erro',
            icon: 'error',
            text: text,
        });
    },

    /**
     * Exibe uma mensagem de sucesso
     * @param {string} text 
     * @param {function} fnOk 
     */
    success: function(text, fnOk) {
        Message.show({
            title: 'Sucesso',
            icon: 'success',
            text: text,
            fnOk: fnOk
        });
    },

    /**
     * Exibe uma mensagem de alerta
     * @param {string} text 
     * @param {function} fnOk 
     */
    warn: function(text, fnOk) {
        Message.show({
            title: 'Alerta',
            icon: 'warning',
            text: text,
            fnOk: fnOk
        });
    },

    /**
     * Exibe uma mensagem de alerta
     * @param {string} text 
     * @param {function} fnOk 
     */
    confirm: function(text, fnOk) {
        Message.show({
            title: 'Pergunta',
            icon: 'question',
            text: text,
            fnOk: fnOk,
            showCancelButton: true,
            showCloseButton: true
        });
    }
}