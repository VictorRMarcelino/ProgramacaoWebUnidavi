var Ajax = {

    loadAjax: function(options) {
        let settings = $.extend({
            async: false
        }, options);

        $.ajax(settings).then(function(response) {
            setTimeout(function() {
                if (response != undefined && response != '') {
                    let resposta = JSON.parse(response);
        
                    if (resposta['error'] != undefined) {
                        Message.error(resposta['error']);
                        return;
                    }
                }
    
                settings.fnSucess.apply(this, [response]);
            }, 1000)
        });
    }
}