var Message = {

    /**
     * Exibe uma mensagem
     * @param {string} text 
     * @param {function} fnOk 
     */
    show: function(title, icon, text, fnOk) {
        Swal.fire({
            title: title,
            icon: icon,
            text: text,
            target: document.body,
        }).then((result) => {
            if (fnOk == undefined) {
                return;
            }
            
            fnOk.apply(this, [result]);
        })
    },

    /**
     * Exibe uma mensagem de erro
     * @param {string} text 
     */
    error: function(text) {
        Message.show('Erro', 'error', text);
    },

    /**
     * Exibe uma mensagem de sucesso
     * @param {string} text 
     * @param {function} fnOk 
     */
    success: function(text, fnOk) {
        Message.show('Sucesso', 'success', text, fnOk);
    },

    /**
     * Exibe uma mensagem de alerta
     * @param {string} text 
     * @param {function} fnOk 
     */
    warn: function(text, fnOk) {
        Message.show('Alerta', 'warning', text, fnOk);
    }
}