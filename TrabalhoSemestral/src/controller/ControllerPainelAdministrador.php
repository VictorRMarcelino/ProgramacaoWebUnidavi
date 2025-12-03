<?php

namespace src\controller;

use database\Query;
use Exception;
use src\core\Sessao;
use Symfony\Component\HttpFoundation\Response;

class ControllerPainelAdministrador extends Controller {

    /** Retorna a view de painel do administrador */
    public function getView() {
        if (Sessao::isUsuarioLogado()) {
            $this->view('painelAdministrador.html');
        } else {
            $this->view('login.html');
        }
    }

    /**
     * ================================================================================================================================ 
     * ============================================================= SETOR ============================================================ 
     * ================================================================================================================================ 
     */

    /**
     * Retorna todos os setores
     * @return Response
     */
    public function getSetores() {
        $setores = [];
        $result = Query::select('setor', ['*']);

        if ($result) {
            while ($setor = pg_fetch_assoc($result)) {
                $setores[] = $setor;
            }
        }

        return new Response(json_encode($setores));
    }

    /**
     * Insere um novo setor
     * @return void
     */
    public function inserirSetor() {
        $nomeSetor = $_POST['nome'];
        Query::insertQueryPrepared('setor', ['nome'], [$nomeSetor]);
    }

    /**
     * Realiza o update de um setor
     * @return void
     */
    public function alterarSetor() {
        parse_str(file_get_contents("php://input"), $_PUT);
        $idSetor = $_PUT['idSetor'];
        $nomeSetor = $_PUT['nome'];
        Query::update('setor', ["nome = $1"], ["id = $2"], [$nomeSetor, $idSetor]);
    }

    /**
     * Realiza a exclusão de um setor
     * @throws \Exception
     * @return void
     */
    public function excluirSetor() {
        parse_str(file_get_contents("php://input"), $_DELETE);
        $idSetor = $_DELETE['idSetor'];

        if ($this->validaSetorPossuiPerguntasCadastradas($idSetor)) {
            throw new Exception("Não é possível excluir o setor $idSetor pois o mesmo possui perguntas cadastradas.");
        }

        Query::delete('setor', ["id = $1"], [$idSetor]);
    }

    /**
     * ================================================================================================================================ 
     * =========================================================== PERGUNTAS ==========================================================
     * ================================================================================================================================ 
     */

    /**
     * Retorna as perguntas vinculadas com um setor
     * @return Response
     */
    public function getPerguntasByIdSetor() {
        $idSetor = $_GET['idSetor'];
        $perguntas = [];
        $result = Query::select('pergunta', ['*'], ['id_setor = $1'], [$idSetor], ['id asc']);

        if ($result) {
            while ($pergunta = pg_fetch_assoc($result)) {
                $perguntas[] = $pergunta;
            }
        }

        return new Response(json_encode($perguntas));
    }

    /**
     * Verifica se determinado setor já possui ao menos uma pergunta cadastrada
     * @param int $setor
     * @return bool
     */
    private function validaSetorPossuiPerguntasCadastradas(int $setor) {
        $result = Query::select('pergunta', ['*'], ['id_setor = $1'], [$setor]);

        if ($result) {
            if ($setor = pg_fetch_assoc($result)) {
                return true;
            }
        }

        return false;
    }

    /** Insere uma nova pergunta */
    public function inserirPergunta() {
        $idSetor = $_POST['idSetor'];
        $pergunta = $_POST['pergunta'];
        Query::insertQueryPrepared('pergunta', ['id_setor', 'pergunta', 'ativa'], [$idSetor, $pergunta, 1]);
    }

    /** Realiza o update de uma pergunta */
    public function alterarPergunta() {
        parse_str(file_get_contents("php://input"), $_PUT);
        $idPergunta = $_PUT['idPergunta'];
        $questao = $_PUT['pergunta'];
        Query::update('pergunta', ["pergunta = $1"], ["id = $2"], [$questao, $idPergunta]);
    }

    /** Realiza a exclusão de uma pergunta */
    public function excluirPergunta() {
        parse_str(file_get_contents("php://input"), $_DELETE);
        $idPergunta = $_DELETE['idPergunta'];

        if ($this->validaAvaliacaoRespondeuPergunta($idPergunta)) {
            throw new Exception('Não é possível remover esta pergunta pois a mesma já foi respondida em uma avaliação.');
        }

        Query::delete('pergunta', ["id = $1"], [$idPergunta]);
    }

    /**
     * Verifica se alguma avaliação já respondeu uma pergunta
     * @param int $idPergunta
     * @return bool
     */
    private function validaAvaliacaoRespondeuPergunta(int $idPergunta) {
        $result = Query::select('respostas', ['1'], ['id_pergunta = $1'], [$idPergunta]);

        if ($result) {
            if (pg_fetch_assoc($result)) {
                return true;
            }
        }

        return false;
    }

    /**
     * ================================================================================================================================ 
     * ========================================================== AVALIAÇÕES ==========================================================
     * ================================================================================================================================ 
     */
    
    /**
     * Retorna as perguntas vinculadas com um setor
     * @return Response
     */
    public function getAvaliacoesByIdSetor() {
        $idSetor = $_GET['idSetor'];
        $perguntas = [];
        $result = Query::select('pergunta', ['id'], ['id_setor = $1'], [$idSetor], ['id asc']);

        if ($result) {
            while ($pergunta = pg_fetch_assoc($result)) {
                $perguntas[] = $pergunta;
            }
        }

        $colunasRespostas = [];

        foreach ($perguntas as $pergunta) {
            $colunasRespostas[] = 'MAX(CASE WHEN respostas.id_pergunta = ' . $pergunta['id'] . ' THEN respostas.resposta END) AS P' . $pergunta['id'];
        }

        $sqlRespostaAvaliacao = 'SELECT avaliacao.id AS avaliacao
                                      , AVG(respostas.resposta) mediaAvaliacao
                                      , ' . implode(', ', $colunasRespostas)
                               . ' FROM respostas
                                   JOIN avaliacao ON avaliacao.id = respostas.id_avaliacao
                                  WHERE avaliacao.id_setor = $1
                                  GROUP BY avaliacao.id
                                  ORDER BY avaliacao.id';

        $result = Query::selectManual($sqlRespostaAvaliacao, [$idSetor]);
        $respostaAvaliacao = [];

        if ($result) {
            while ($avaliacao = pg_fetch_assoc($result)) {
                $avaliacao['mediaavaliacao'] = floor($avaliacao['mediaavaliacao']);

                foreach ($avaliacao as $index => $valor) {

                    if (preg_match('/^p[0-9]{1,}/', $index) && is_null($valor)) {
                        $avaliacao[$index] = 'N/R';
                    }
                }

                $respostaAvaliacao[] = $avaliacao;
            }
        }

        $retorno = ['perguntas' => $perguntas, 'avaliacoes' => $respostaAvaliacao];

        return new Response(json_encode($retorno));
    }

    /**
     * ================================================================================================================================ 
     * ========================================================== DISPOSITIVOS ========================================================
     * ================================================================================================================================ 
     */

    /**
     * Retorna todos os dispositivos cadastrados no sistema
     * @return void
     */
    public function getDispositivos() {
        $dispositivos = [];
        $sql = 'SELECT dispositivo.id
                     , dispositivo.nome
                     , setor.id as idSetor
                     , setor.nome as setor
                  FROM dispositivo
                  JOIN setor
                    ON setor.id = dispositivo.id_setor';
        $result = Query::selectManual($sql);

        if ($result) {
            while ($dispositivo = pg_fetch_assoc($result)) {
                $dispositivos[] = $dispositivo;
            }
        }

        return new Response(json_encode($dispositivos));
    }

    /** Insere uma nova pergunta */
    public function inserirDispositivo() {
        $idSetor = $_POST['idSetor'];
        $nomeDispositivo = $_POST['nomeDispositivo'];
        Query::insertQueryPrepared('dispositivo', ['id_setor', 'nome', 'ativa'], [$idSetor, $nomeDispositivo, 1]);
    }

    /** Realiza o update de uma pergunta */
    public function alterarDispositivo() {
        parse_str(file_get_contents("php://input"), $_PUT);
        $idDispositivo = $_PUT['idDispositivo'];
        $nomeDispositivo = $_PUT['nomeDispositivo'];
        Query::update('dispositivo', ["nome = $1"], ["id = $2"], [$nomeDispositivo, $idDispositivo]);
    }

    /** Realiza a exclusão de uma pergunta */
    public function excluirDispositivo() {
        parse_str(file_get_contents("php://input"), $_DELETE);
        $idDispositivo = $_DELETE['idDispositivo'];

        if ($this->validaDispositivoRespondeuPergunta($idDispositivo)) {
            throw new Exception('Não é possível remover este dispositivo pois o mesmo já foi utilizado para responder uma ou mais avaliações.');
        }

        Query::delete('dispositivo', ["id = $1"], [$idDispositivo]);
    }

    /**
     * Verifica se o dispositivo já foi utilizado para responder uma pergunta
     * @param int $idDispositivo
     * @return bool
     */
    private function validaDispositivoRespondeuPergunta(int $idDispositivo) {
        $result = Query::select('avaliacao', ['1'], ['id_dispositivo = $1'], [$idDispositivo]);

        if ($result) {
            if (pg_fetch_assoc($result)) {
                return true;
            }
        }

        return false;
    }
}