var TabelaNotas = {

    calculaMediaNotas: function () {
        let tabelaNotas = document.getElementById('tabelaNotas');
        let itemLinhaMediaNotas = document.createElement('tr');
        let itemTituloMediaNotas = document.createElement('td');
        itemTituloMediaNotas.classList.add('mediaNota');
        itemTituloMediaNotas.textContent = 'Média Nota';
        itemLinhaMediaNotas.appendChild(itemTituloMediaNotas);

        let linhasNotasAlunos = document.getElementsByTagName('tr');

        for (let i = 1; i < 10; i++) {
            let quantidadeNotas = 0;
            let mediaNota = 0;

            for (let j = 2; j < 7; j++) {
                let nota = linhasNotasAlunos[j].cells[i].textContent;

                if (nota == '') {
                    continue;
                }

                mediaNota += parseFloat(nota.replace(',', '.'));
                quantidadeNotas++;
            }

            let itemMedia = document.createElement('td');

            if (quantidadeNotas > 0) {
                debugger
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
        debugger
        let linhasNotasAlunos = document.getElementsByTagName('tr');
        let tituloMediaAluno = document.createElement('td');
        tituloMediaAluno.textContent = 'Média Aluno';
        tituloMediaAluno.classList.add('mediaAluno');
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