import React, { useState, useEffect } from 'react';
import './Questoes.css';

// Banco de Dados Mockado com as 10 questões do DETRAN
const questionsDb = [
  { theme: "Legislação de Trânsito", text: "De acordo com o Código de Trânsito Brasileiro, o condutor que dirigir sob a influência de álcool ou de qualquer outra substância psicoativa que determine dependência comete infração:", options: ["Gravíssima, com multa e suspensão do direito de dirigir.", "Grave, com multa e retenção do veículo.", "Média, com multa.", "Leve, apenas com advertência por escrito."] },
  { theme: "Normas de Circulação", text: "Em um cruzamento sem sinalização, a preferência de passagem é:", options: ["Do veículo que estiver desenvolvendo maior velocidade.", "Do veículo que vier pela direita do condutor.", "Sempre do veículo que for virar à esquerda.", "Do veículo de transporte coletivo, independente da via."] },
  { theme: "Sinalização", text: "A luz amarela intermitente em um semáforo de trânsito significa que o condutor deve:", options: ["Acelerar para passar rapidamente pelo cruzamento.", "Parar imediatamente o veículo na via.", "Reduzir a velocidade e cruzar a via com máxima atenção.", "Buzinar para alertar os outros condutores e seguir."] },
  { theme: "Direção Defensiva", text: "Qual é a distância recomendada que o condutor deve manter do veículo que segue à frente para evitar colisões em caso de freada brusca?", options: ["A distância de seguimento segura (Regra dos 2 segundos).", "Aproximadamente 1 metro de distância.", "O suficiente para ler a placa do veículo da frente.", "Nenhuma distância específica, desde que o freio esteja bom."] },
  { theme: "Primeiros Socorros", text: "Ao presenciar um acidente de trânsito com vítima, a primeira atitude correta a ser tomada é:", options: ["Remover as vítimas de dentro do veículo imediatamente.", "Dar água para as vítimas se acalmarem.", "Sinalizar o local para evitar novos acidentes e chamar o socorro.", "Sair do local rapidamente para não causar engarrafamento."] },
  { theme: "Mecânica Básica", text: "A finalidade do sistema de arrefecimento do motor é:", options: ["Aumentar a potência do motor em subidas.", "Manter a temperatura ideal de funcionamento do motor.", "Filtrar o ar que entra na cabine de passageiros.", "Controlar a emissão de gases poluentes pelo escapamento."] },
  { theme: "Meio Ambiente e Cidadania", text: "Emitir ruídos ou sons em níveis superiores aos fixados pelo CONAMA é considerado:", options: ["Infração grave, passível de multa e retenção do veículo.", "Apenas uma advertência verbal da autoridade.", "Permitido apenas durante os finais de semana.", "Infração leve, sem pontuação na CNH."] },
  { theme: "Legislação de Trânsito", text: "A validade máxima da CNH (Carteira Nacional de Habilitação) para condutores com idade inferior a 50 anos é de:", options: ["3 anos.", "5 anos.", "10 anos.", "Vitalícia."] },
  { theme: "Normas de Circulação", text: "O cinto de segurança é equipamento obrigatório para:", options: ["Apenas para o condutor do veículo.", "Apenas para os ocupantes dos bancos dianteiros.", "Todos os ocupantes do veículo, em todas as vias.", "Somente em rodovias estaduais e federais."] },
  { theme: "Sinalização", text: "Diante da placa de advertência que indica 'Pista Escorregadia', a atitude mais segura do condutor é:", options: ["Aumentar a velocidade para passar mais rápido pelo trecho.", "Frear bruscamente assim que avistar a placa.", "Reduzir a velocidade gradativamente e redobrar a atenção.", "Desligar o motor para economizar combustível."] }
];

const Questoes = () => {
  // Estados do React para controlar o teste
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(questionsDb.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutos em segundos

  // Lógica do cronômetro gerida pelo React
  useEffect(() => {
    if (timeLeft <= 0) {
      finishSimulado();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Formatação do tempo
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeRunningOut = timeLeft <= 300; // Menos de 5 minutos

  // Cálculo de Progresso
  const answeredCount = userAnswers.filter(ans => ans !== null).length;
  const progressPercent = Math.round((answeredCount / questionsDb.length) * 100);

  // Ações
  const selectOption = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentIndex < questionsDb.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishSimulado();
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const finishSimulado = () => {
    alert("Simulado finalizado! Suas respostas foram computadas.");
    window.location.href = '/simulados';
  };

  const currentQuestion = questionsDb[currentIndex];

  return (
    <div className="questoes-wrapper">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <img src="https://i.postimg.cc/zbX1SvHr/image.png" alt="Logo CNH Fácil" />
        </div>
        <div className="menu">
          <a href="/inicio" className="menu-item"><i className="fa-solid fa-house"></i> Início</a>
          <a href="/perfil" className="menu-item"><i className="fa-solid fa-user"></i> Perfil</a>
          <a href="/cursos" className="menu-item"><i className="fa-solid fa-graduation-cap"></i> Cursos</a>
          {/* Aba Simulados fica ativa como no original */}
          <a href="/simulados" className="menu-item active"><i className="fa-solid fa-file-pen"></i> Simulados</a>
          <a href="/desempenho" className="menu-item"><i className="fa-solid fa-chart-simple"></i> Meu desempenho</a>
          <a href="/admin" className="menu-item danger"><i className="fa-solid fa-gear"></i> Admin/Config</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1 className="topbar-title">Simulado em Andamento</h1>
          <div className="user-profile">
            <div className="user-info">
              <div className="user-name">Duda</div>
              <div className="user-role">Aluno</div>
            </div>
            <div className="user-avatar">DU</div>
          </div>
        </header>

        <div className="test-container">
          
          <div className="test-main">
            {/* Status e Cronômetro */}
            <div className="status-card">
              <div className="status-info-row">
                <div className="status-block">
                  <span className="status-label">Tempo Restante</span>
                  <span className="status-value" style={{ color: isTimeRunningOut ? "var(--text-danger)" : "var(--color-primary)" }}>
                    <i className="fa-regular fa-clock"></i> <span>{timeString}</span>
                  </span>
                </div>
                <div className="status-block">
                  <span className="status-label">Questão</span>
                  <span className="status-value" style={{ color: "var(--color-primary)" }}>
                    <span>{String(currentIndex + 1).padStart(2, '0')}</span> de {questionsDb.length}
                  </span>
                </div>
                <div className="status-block">
                  <span className="status-label">Progresso</span>
                  <span className="status-value">{progressPercent}%</span>
                </div>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            {/* Pergunta atual */}
            <div className="question-card">
              <div className="question-header">
                <span className="badge-theme">{currentQuestion.theme}</span>
              </div>
              <div className="question-text-area">
                <h2 className="question-text">{currentQuestion.text}</h2>
              </div>
              
              <div className="options-list">
                {currentQuestion.options.map((optText, optIndex) => {
                  const isSelected = userAnswers[currentIndex] === optIndex;
                  const letter = ["A", "B", "C", "D"][optIndex];
                  
                  return (
                    <div 
                      key={optIndex} 
                      className={`option-item ${isSelected ? 'selected' : ''}`} 
                      onClick={() => selectOption(optIndex)}
                    >
                      <div className="option-letter">{letter}</div>
                      <div className="option-text">{optText}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botões Voltar / Próxima */}
            <div className="test-controls">
              <button 
                className="btn-control btn-outline-dark" 
                onClick={prevQuestion} 
                disabled={currentIndex === 0}
              >
                <i className="fa-solid fa-arrow-left"></i> Anterior
              </button>
              
              <button 
                className="btn-control btn-solid-yellow" 
                onClick={nextQuestion}
                style={currentIndex === questionsDb.length - 1 ? { backgroundColor: '#198754', color: 'white', border: 'none' } : {}}
              >
                {currentIndex === questionsDb.length - 1 ? (
                  <>Concluir <i className="fa-solid fa-check"></i></>
                ) : (
                  <>Próxima <i className="fa-solid fa-arrow-right"></i></>
                )}
              </button>
            </div>
          </div>

          <aside className="test-sidebar">
            {/* Grid de Navegação Lateral */}
            <div className="side-card">
              <h3 className="side-title">Navegação</h3>
              <div className="legend-list">
                <div className="legend-item">
                  <div className="legend-color color-answered"></div><span>Respondida</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color color-unanswered"></div><span>Não respondida</span>
                </div>
              </div>

              <div className="number-grid">
                {questionsDb.map((_, i) => {
                  let btnClass = "num-btn ";
                  if (i === currentIndex) btnClass += "num-current";
                  else if (userAnswers[i] !== null) btnClass += "num-answered";
                  else btnClass += "num-unanswered";

                  return (
                    <div key={i} className={btnClass} onClick={() => setCurrentIndex(i)}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Informações Finais */}
            <div className="side-card">
              <h3 className="side-title">Informações</h3>
              <div className="info-list">
                <div className="info-item">
                  <i className="fa-regular fa-file-lines" style={{ color: "#64748b", width: "15px" }}></i>
                  <span><strong>Simulado:</strong> Avaliação Geral</span>
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-list-ol" style={{ color: "#3b82f6", width: "15px" }}></i>
                  <span><strong>Total de questões:</strong> {questionsDb.length}</span>
                </div>
                <div className="info-item">
                  <i className="fa-regular fa-clock" style={{ color: "#64748b", width: "15px" }}></i>
                  <span><strong>Tempo total:</strong> 30 minutos</span>
                </div>
              </div>
              <button className="btn-finalize" onClick={finishSimulado}>
                <i className="fa-solid fa-border-all"></i> Finalizar Simulado
              </button>
            </div>
          </aside>

        </div>
      </main>

    </div>
  );
};

export default Questoes;