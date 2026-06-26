import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar from '../../components/Topbar'
import { getAlunos, getAdminStats } from '../../services/api'

const MOCK_ALUNOS = [
  { id: 'DU', nome: 'Maria Eduarda Silva', cpf: '444.333.222-11', categoria: 'A e B', progresso: 45, veiculo: 'Fiat Mobi (ABC-1234)', tipoVeiculo: 'carro', status: 'Ativo' },
  { id: 'JC', nome: 'João Carlos Mendes',  cpf: '111.222.333-44', categoria: 'A (Moto)', progresso: 90, veiculo: 'Honda CG (XYZ-9876)', tipoVeiculo: 'moto', status: 'Ativo' },
  { id: 'LT', nome: 'Lucas Tavares',       cpf: '999.888.777-66', categoria: 'B (Carro)', progresso: 0, veiculo: 'Aguardando início', tipoVeiculo: null, status: 'Pendente' },
]

const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706']

export default function Admin() {
  const navigate = useNavigate()
  const [alunos, setAlunos] = useState(MOCK_ALUNOS)
  const [busca, setBusca] = useState('')
  const [stats, setStats] = useState({ totalQuestoes: null, ultimaAtualizacaoDetran: null })

  useEffect(() => {
    getAlunos().then(r => setAlunos(r.data)).catch(() => {})
    getAdminStats().then(r => setStats(r.data)).catch(() => {})
  }, [])

  const filtrados = alunos.filter(a =>
    a.nome.toLowerCase().includes(busca.toLowerCase()) ||
    a.cpf.includes(busca)
  )

  return (
    <>
      <Topbar title="Configurações Administrativas" />
      <div className="page-content">
        <div className="admin-grid">
          {/* Servidor */}
          <div className="card card-body">
            <div className="admin-section-title">SERVIDOR E BANCO DE DADOS</div>
            <div className="admin-info-row">
              <span className="admin-info-label">Banco de Questões:</span>
              <span className="admin-info-value">
                {stats.totalQuestoes !== null ? `${stats.totalQuestoes} Cadastradas` : 'Carregando...'}
              </span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-label">Atualização Detran:</span>
              <span className="admin-info-value ok">
                {stats.ultimaAtualizacaoDetran
                  ? `${stats.ultimaAtualizacaoDetran.charAt(0).toUpperCase()}${stats.ultimaAtualizacaoDetran.slice(1)} - OK`
                  : 'Carregando...'}
              </span>
            </div>
            <div className="admin-info-row">
              <span className="admin-info-label">Status da API (Integração):</span>
              <span className="admin-info-value online">Online</span>
            </div>
          </div>

          {/* Controle de Conteúdos */}
          <div className="card card-body">
            <div className="admin-section-title">CONTROLE DE CONTEÚDOS</div>
            <div className="control-item">
              <div className="control-icon">🎬</div>
              <div className="control-text">
                <div className="control-name">Módulos e Vídeo-Aulas</div>
                <div className="control-desc">Gerenciar acervo de vídeos</div>
              </div>
              <button className="btn-acessar" onClick={() => navigate('/cursos')}>Acessar</button>
            </div>
            <div className="control-item">
              <div className="control-icon">📋</div>
              <div className="control-text">
                <div className="control-name">Banco de Questões</div>
                <div className="control-desc">Adicionar/Editar simulados</div>
              </div>
              <button className="btn-acessar" onClick={() => navigate('/questoes')}>Acessar</button>
            </div>
          </div>
        </div>

        {/* Tabela de alunos */}
        <div className="alunos-table-wrap">
          <div className="alunos-table-header">
            <span className="alunos-table-title">GESTÃO DE ALUNOS, CURSOS E VEÍCULOS</span>
            <div className="search-input-wrap">
              <span>🔍</span>
              <input
                placeholder="Buscar aluno por nome ou CPF..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
              />
            </div>
          </div>

          <table className="alunos-table">
            <thead>
              <tr>
                <th>ALUNO(A)</th>
                <th>CATEGORIA</th>
                <th>PROGRESSO TEÓRICO</th>
                <th>VEÍCULO PRÁTICO ASSOCIADO</th>
                <th>STATUS</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((aluno, i) => (
                <tr key={aluno.cpf}>
                  <td>
                    <div className="aluno-cell">
                      <div
                        className="aluno-mini-avatar"
                        style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                      >
                        {aluno.id}
                      </div>
                      <div>
                        <div className="aluno-name">{aluno.nome}</div>
                        <div className="aluno-cpf">{aluno.cpf}</div>
                      </div>
                    </div>
                  </td>
                  <td>{aluno.categoria}</td>
                  <td>
                    <div className="progress-inline">
                      <div className="progress-inline-bar">
                        <div className="progress-inline-fill" style={{ width: `${aluno.progresso}%` }} />
                      </div>
                      <span>{aluno.progresso}%</span>
                    </div>
                  </td>
                  <td>
                    {aluno.tipoVeiculo ? (
                      <span className={`veiculo-tag ${aluno.tipoVeiculo}`}>
                        {aluno.tipoVeiculo === 'carro' ? '🚗' : '🏍️'} {aluno.veiculo}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--gray-400)', fontStyle: 'italic', fontSize: 12 }}>
                        {aluno.veiculo}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={aluno.status === 'Ativo' ? 'status-ativo' : 'status-pendente'}>
                      {aluno.status}
                    </span>
                  </td>
                  <td>
                    <button
                      style={{ fontSize: 16, cursor: 'pointer' }}
                      title="Editar aluno"
                      onClick={() => alert(`Edição do aluno "${aluno.nome}" em desenvolvimento.`)}
                    >✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
