var TabelaNotas = {

    /**
     * Comportamento executado ao carregar a tela da tabela de notas
     */
    onload: function() {
        let tabelaNotas = document.getElementById('tabelaNotas');
        let conteudoOriginal = tabelaNotas.innerHTML;
        tabelaNotas.setAttribute('conteudoOriginal', conteudoOriginal);
    },

    /**
     * Calcula a média das notas
     */
    calculaMediaNotas: function () {
        let tabelaNotas = document.getElementById('tabelaNotas');
        tabelaNotas.innerHTML = tabelaNotas.getAttribute('conteudoOriginal');
        let itemLinhaMediaNotas = document.createElement('tr');
        let itemTituloMediaNotas = document.createElement('td');
        itemTituloMediaNotas.classList.add('mediaNota');
        itemTituloMediaNotas.textContent = 'Média Nota';
        itemLinhaMediaNotas.appendChild(itemTituloMediaNotas);

        let linhasNotasAlunos = document.getElementsByTagName('tr');
        let quantidadeLinhas = linhasNotasAlunos.length;
        let indicePrimeiraLinhaAlunos = 2;
        let quantidadeColunas = linhasNotasAlunos[indicePrimeiraLinhaAlunos].cells.length;

        for (let i = 1; i < quantidadeColunas; i++) {
            let quantidadeNotas = 0;
            let mediaNota = 0;

            for (let j = 2; j < quantidadeLinhas; j++) {
                let nota = linhasNotasAlunos[j].cells[i].textContent;

                if (nota == '') {
                    continue;
                }

                mediaNota += parseFloat(nota.replace(',', '.'));
                quantidadeNotas++;
            }

            let itemMedia = document.createElement('td');

            if (quantidadeNotas > 0) {
                mediaNota = (mediaNota / (quantidadeNotas));
                mediaNota = Math.round(mediaNota * 100) / 100;
                itemMedia.textContent = mediaNota;
            } 

            itemLinhaMediaNotas.appendChild(itemMedia);
        }

        tabelaNotas.appendChild(itemLinhaMediaNotas);
    },

    /**
     * Calcula a média dos alunos
     */
    calculaMediaAlunos: function () {
        let tabelaNotas = document.getElementById('tabelaNotas');
        tabelaNotas.innerHTML = tabelaNotas.getAttribute('conteudoOriginal');
        let linhasNotasAlunos = document.getElementsByTagName('tr');
        
        let tituloNotaFinal = document.createElement('th');
        tituloNotaFinal.textContent = 'Nota Final';
        tituloNotaFinal.classList.add('titulo-semestre');
        linhasNotasAlunos[0].appendChild(tituloNotaFinal);

        let tituloMediaAluno = document.createElement('th');
        tituloMediaAluno.textContent = 'Média Aluno';
        linhasNotasAlunos[1].appendChild(tituloMediaAluno);

        for (let i = 2; i < linhasNotasAlunos.length; i++) {
            let quantidadeNotas = 0;
            let notas = linhasNotasAlunos[i].cells
            let media = 0;

            for (let j = 1; j < notas.length; j++) {
                let nota = notas[j].textContent;

                if (nota == '') {
                    continue;
                }

                media += parseFloat(nota);
                quantidadeNotas++;
            }

            let celulaNotaMedia = document.createElement('td');

            if (quantidadeNotas > 0) {
                media = (media / quantidadeNotas);
                media = Math.round(media * 100) / 100;
                celulaNotaMedia.textContent = media;
            }

            linhasNotasAlunos[i].appendChild(celulaNotaMedia);
        }
    }
}