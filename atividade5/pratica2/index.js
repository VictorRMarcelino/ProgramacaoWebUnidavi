var TabelaNotas = {

    calculaMediaNotas: function () {
        debugger
        let tabelaNotas = document.getElementById('tabelaNotas');
        let itemTituloMediaNotas = document.createElement('tr');
        itemTituloMediaNotas.textContent = 'Média Nota';

        let linhasNotasAlunos = document.getElementsByTagName('tr');

        for (let i = 2; i < linhasNotasAlunos.length; i++) {
            for (let j = 1; j < 9; j++) {
                let notas = linhasNotasAlunos[j].cells[i];
            }

            let media = 0;

            let nota = notas[j].textContent;

            if (nota == '') {
                nota = 0;
            }

            media = media + parseFloat(nota);

            media = (media / (notas.length - 1));

            let itemMedia = document.createElement('td');
            itemMedia.textContent = media;
            tabelaNotas.appendChild(itemMedia);
        }

        tabelaNotas.appendChild(itemTituloMediaNotas);
    },

    /**
     * Calcula a média dos alunos
     */
    calculaMediaAlunos: function () {
        let linhasNotasAlunos = document.getElementsByTagName('tr');

        let itemMedia = document.createElement('td');
        itemMedia.textContent = 'Média Aluno';
        linhasNotasAlunos[1].appendChild(itemMedia);

        for (let i = 2; i < linhasNotasAlunos.length; i++) {
            let notas = linhasNotasAlunos[i].cells
            let media = 0;

            for (let j = 1; j < notas.length; j++) {
                let nota = notas[j].textContent;

                if (nota == '') {
                    nota = 0;
                }

                media = media + parseFloat(nota);
            }

            media = (media / (notas.length - 1));

            let celulaNotaMedia = document.createElement('td');
            celulaNotaMedia.textContent = media;
            linhasNotasAlunos[i].appendChild(celulaNotaMedia);
        }
    }
}