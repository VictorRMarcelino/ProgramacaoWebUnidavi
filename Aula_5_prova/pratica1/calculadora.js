var Calculadora = {
    /**
     * Evento chamado ao clicar no botão de um número
     * @param {object} event 
     */
    onClickButtonNumber: function(event) {
        let botao = event.currentTarget;
        let value = botao.innerHTML;
        let result = document.getElementById('resultValue');
        result.value += value;
    },
    
    /**
     * Evento chamado ao clicar em um botão de operação
     * @param {object} event 
     */
    onClickOperationButton: function(event) {
        let result = document.getElementById('resultValue');
        let regexSimbolosOperacoes = /[^0-9]/;
        
        if (regexSimbolosOperacoes.test(result.value)) {
            Calculadora.calculaOperacao();   
        }

        let botao = event.currentTarget;
        let value = botao.innerHTML;
        result.value += ' ' + value + ' ';
    },
    
    /**
     * calcula a operação do valor atual do result
     */
    calculaOperacao: function() {
        let result = document.getElementById('resultValue');
        debugger
        result.value = eval(result.value);  
        let backgroudColor = null;

        if (result.value > 0) {
            backgroudColor = 'green';
        } else if (result.value < 0) {
            backgroudColor = 'red';
        } else {
            backgroudColor = 'gray';
        }
        
        result.style.backgroundColor = backgroudColor;
    },
    
    /**
     * Comportamento chamado ao clicar no botão limpar
    */
   onClickButtonLimpar() {
       let result = document.getElementById('resultValue');
       result.value = '';
       result.style.backgroundColor = '';
    }
}
