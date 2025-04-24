import { useState } from 'react';

const mockData = {
  cs: {
    proximoJogo: {
      adversario: "NAVI",
      data: "25/04",
      hora: "18h",
      campeonato: "ESL Pro League",
    },
    ultimoResultado: {
      oponente: "MOUZ",
      placar: "2x1",
      destaque: "KSCERATO 1.35 KD",
    },
    estatisticas: {
      kscerato: "1.24",
      yuurih: "1.18",
      arT: "0.95",
    }
  }
};

function App() {
  const [mensagens, setMensagens] = useState<string[]>([
    'Bot 🐾: Fala, fã da FURIA! Clique em um botão ou pergunte algo.'
  ]);
  const [pergunta, setPergunta] = useState('');
  const [pensando, setPensando] = useState(false);
  const [email, setEmail] = useState('');
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(true);

  const responder = (texto: string) => {
    const txt = texto.toLowerCase();
    if (txt.includes('jogo') || txt.includes('quando')) {
      const j = mockData.cs.proximoJogo;
      return `Bot 🐾: Próximo jogo: ${j.adversario}, dia ${j.data} às ${j.hora}, pelo ${j.campeonato}.`;
    }
    if (txt.includes('resultado') || txt.includes('venceu')) {
      const r = mockData.cs.ultimoResultado;
      return `Bot 🐾: Último jogo: FURIA venceu ${r.oponente} por ${r.placar}. Destaque: ${r.destaque}`;
    }
    if (txt.includes('estatísticas') || txt.includes('stats')) {
      const e = mockData.cs.estatisticas;
      return `Bot 🐾: Estatísticas: KSCERATO: ${e.kscerato}, yuurih: ${e.yuurih}, arT: ${e.arT}`;
    }
    if (txt.includes('história')) {
      return `Bot 🐾: A FURIA foi fundada em 2017 e rapidamente se tornou uma das principais organizações de esports do Brasil.`;
    }
    if (txt.includes('informação') || txt.includes('sobre')) {
      return `Bot 🐾: A FURIA é uma organização brasileira de esports com equipes em CS:GO, LoL e Valorant.`;
    }
    return 'Bot 🐾: Não entendi... tenta perguntar sobre o próximo jogo, resultado, estatísticas ou história.';
  };

  const enviarPergunta = (texto: string) => {
    const perguntaLimpa = texto.trim();
    if (!perguntaLimpa) return;

    setMensagens(prev => [...prev, `Fanrioso: ${perguntaLimpa}`]);
    setPensando(true);
    setPergunta('');

    setTimeout(() => {
      const resposta = responder(perguntaLimpa);
      setMensagens(prev => [...prev, resposta]);
      setPensando(false);
    }, 1000);
  };

  const enviarEmail = () => {
    if (!email.includes('@')) return;
    setEmailEnviado(true);
    setEmail('');
    setTimeout(() => setEmailEnviado(false), 3000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      backgroundColor: modoEscuro ? '#121212' : '#f5f5f5', 
      color: modoEscuro ? '#e0e0e0' : '#212121', 
      minHeight: '100vh', 
      fontFamily: "'Inter', sans-serif", 
      padding: 0,
      transition: 'all 0.3s ease'
    }}>
      
      {/* Barra lateral esquerda */}
      <div style={{ 
        flex: '0 0 80px', 
        backgroundColor: modoEscuro ? '#000' : '#fff', 
        minHeight: '100vh',
        borderRight: `1px solid ${modoEscuro ? '#333' : '#eee'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ 
          padding: '20px 10px', 
          textAlign: 'center',
          borderBottom: `1px solid ${modoEscuro ? '#333' : '#eee'}`,
          width: '100%'
        }}>
          <div style={{
            width: 50,
            height: 50,
            margin: '0 auto 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/furia-logo.svg"
              alt="FURIA Logo" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
          <button
            onClick={() => setModoEscuro(!modoEscuro)}
            style={{
              padding: '6px',
              fontSize: 12,
              borderRadius: '50%',
              border: 'none',
              background: modoEscuro ? '#333' : '#eee',
              color: modoEscuro ? '#facc15' : '#000',
              cursor: 'pointer',
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}
          >
            {modoEscuro ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Chat Principal */}
      <div style={{ 
        flex: '1 1 60%', 
        minWidth: 300, 
        padding: '40px',
        maxWidth: '800px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '30px',
          gap: '15px'
        }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700',
            margin: 0
          }}>
            FURIA ChatBot
          </h1>
          <span style={{
            backgroundColor: '#facc15',
            color: '#000',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>BETA</span>
        </div>

        <div style={{ 
          height: '60vh', 
          overflowY: 'auto', 
          marginBottom: '30px',
          paddingRight: '10px',
          borderBottom: `1px solid ${modoEscuro ? '#333' : '#eee'}`,
          paddingBottom: '20px'
        }}>
          {mensagens.map((msg, i) => (
            <div key={i} style={{ 
              marginBottom: '15px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: msg.startsWith('Fanrioso:') 
                ? (modoEscuro ? '#1e1e1e' : '#f0f0f0') 
                : (modoEscuro ? '#000' : '#fff'),
              borderLeft: msg.startsWith('Bot') ? '3px solid #facc15' : 'none',
              boxShadow: modoEscuro ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              {msg}
            </div>
          ))}
          {pensando && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: modoEscuro ? '#000' : '#fff',
              display: 'inline-block'
            }}>
              <span className="animate-pulse">Bot 🐾: Pensando...</span>
              <span className="typing-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
          )}
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginBottom: '25px'
        }}>
          {['Próximo jogo', 'Resultado', 'Estatísticas', 'História', 'Informações'].map((texto) => (
            <button 
              key={texto} 
              onClick={() => enviarPergunta(texto)} 
              style={{
                padding: '10px 16px',
                background: modoEscuro ? '#1e1e1e' : '#fff',
                color: modoEscuro ? '#e0e0e0' : '#212121',
                border: `1px solid ${modoEscuro ? '#333' : '#ddd'}`,
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                fontWeight: '500'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#facc15';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.borderColor = '#facc15';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = modoEscuro ? '#1e1e1e' : '#fff';
                e.currentTarget.style.color = modoEscuro ? '#e0e0e0' : '#212121';
                e.currentTarget.style.borderColor = modoEscuro ? '#333' : '#ddd';
              }}
            >
              {texto}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarPergunta(pergunta)}
            placeholder="Pergunte algo, Fanrioso..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '20px',
              border: `1px solid ${modoEscuro ? '#333' : '#ddd'}`,
              backgroundColor: modoEscuro ? '#1e1e1e' : '#fff',
              color: modoEscuro ? '#e0e0e0' : '#212121',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
          />
          <button 
            onClick={() => enviarPergunta(pergunta)} 
            style={{
              padding: '12px 24px',
              background: '#facc15',
              color: '#000',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#e6b800';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#facc15';
            }}
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Seção de e-mail / novidades */}
      <div style={{ 
        flex: '1 1 300px', 
        backgroundColor: modoEscuro ? '#1e1e1e' : '#fff', 
        borderRadius: '0',
        padding: '40px',
        borderLeft: `1px solid ${modoEscuro ? '#333' : '#eee'}`,
        minHeight: '100vh'
      }}>
        <div style={{ 
          backgroundColor: modoEscuro ? '#000' : '#f5f5f5',
          padding: '30px',
          borderRadius: '12px',
          height: 'calc(100% - 60px)'
        }}>
          <h2 style={{ 
            fontSize: '20px', 
            marginBottom: '15px',
            fontWeight: '600',
            color: modoEscuro ? '#facc15' : '#000'
          }}>
            📬 Fique por dentro!
          </h2>
          <p style={{ 
            marginBottom: '25px',
            color: modoEscuro ? '#aaa' : '#666',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Receba as últimas notícias, resultados e atualizações da FURIA diretamente no seu e-mail.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '12px 16px',
                width: '100%',
                marginBottom: '15px',
                borderRadius: '8px',
                border: `1px solid ${modoEscuro ? '#333' : '#ddd'}`,
                backgroundColor: modoEscuro ? '#121212' : '#fff',
                color: modoEscuro ? '#e0e0e0' : '#212121',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button 
              onClick={enviarEmail} 
              style={{
                padding: '12px',
                width: '100%',
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#333';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#000';
              }}
            >
              Inscrever-se
            </button>
          </div>
          
          {emailEnviado && (
            <div style={{ 
              padding: '12px',
              background: 'rgba(74, 222, 128, 0.2)',
              color: '#10b981',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'center',
              border: '1px solid rgba(74, 222, 128, 0.3)'
            }}>
              ✅ E-mail cadastrado com sucesso!
            </div>
          )}
          
          <div style={{ 
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: `1px solid ${modoEscuro ? '#333' : '#eee'}`
          }}>
            <h3 style={{ 
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '15px',
              color: modoEscuro ? '#facc15' : '#000'
            }}>
              Conecte-se com a FURIA
            </h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              {['twitter', 'instagram', 'youtube', 'twitch'].map((rede) => (
                <div key={rede} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: modoEscuro ? '#333' : '#eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#facc15';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = modoEscuro ? '#333' : '#eee';
                  e.currentTarget.style.color = 'inherit';
                }}>
                  {rede === 'twitter' && '𝕏'}
                  {rede === 'instagram' && '📷'}
                  {rede === 'youtube' && '▶️'}
                  {rede === 'twitch' && '🎮'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            font-family: 'Inter', sans-serif;
          }
          
          .animate-pulse {
            animation: pulse 1.5s infinite;
          }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          .typing-dots {
            display: inline-flex;
            align-items: center;
            height: 17px;
          }
          
          .typing-dots span {
            width: 4px;
            height: 4px;
            margin: 0 1px;
            background-color: ${modoEscuro ? '#aaa' : '#666'};
            border-radius: 50%;
            display: inline-block;
            opacity: 0.4;
          }
          
          .typing-dots span:nth-child(1) {
            animation: bounce 1s infinite;
          }
          
          .typing-dots span:nth-child(2) {
            animation: bounce 1s infinite 0.2s;
          }
          
          .typing-dots span:nth-child(3) {
            animation: bounce 1s infinite 0.4s;
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); opacity: 0.4; }
            50% { transform: translateY(-3px); opacity: 1; }
          }
          
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: ${modoEscuro ? '#1e1e1e' : '#f1f1f1'};
          }
          
          ::-webkit-scrollbar-thumb {
            background: ${modoEscuro ? '#333' : '#ddd'};
            border-radius: 3px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #facc15;
          }
        `}
      </style>
    </div>
  );
}

export default App;