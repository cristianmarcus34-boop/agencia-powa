'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { IoSend, IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from './ChatPowa.module.css';

type Message = {
  role: 'user' | 'bot';
  text: string;
  id?: string;
};

type ClientProfile = 'gastronomia' | 'empresa_emprendedor' | 'senior_software' | null;

const suggestedQuestions = [
  { icon: '💸', text: '¿Cuánto cuesta desarrollar una app?', profile: 'empresa_emprendedor' },
  { icon: '🚀', text: '¿Cómo puedo digitalizar mi negocio?', profile: 'empresa_emprendedor' },
  { icon: '🍔', text: '¿Cómo reduzco comisiones de delivery?', profile: 'gastronomia' },
  { icon: '⚙️', text: '¿Qué stack tecnológico recomiendan?', profile: 'senior_software' },
  { icon: '📱', text: '¿Hacen apps nativas?', profile: 'senior_software' },
  { icon: '💰', text: '¿Cuánto ahorro con una app propia?', profile: 'gastronomia' }
];

// 🎯 Capa 4: Sugerencias dinámicas según última respuesta del bot
function getDynamicSuggestions(lastBotText: string): { icon: string; text: string }[] {
  const text = lastBotText.toLowerCase();

  if (text.includes('precio') || text.includes('cuanto') || text.includes('cuánto') || text.includes('costo') || text.includes('$')) {
    return [
      { icon: '💸', text: '¿Qué incluye el plan más barato?' },
      { icon: '📅', text: '¿Cuánto tarda la entrega?' },
      { icon: '💳', text: '¿Puedo pagar en cuotas?' },
    ];
  }

  if (text.includes('app') || text.includes('android') || text.includes('play store')) {
    return [
      { icon: '📱', text: '¿Publican en Google Play?' },
      { icon: '🔑', text: '¿Puedo transferir la app a mi cuenta?' },
      { icon: '⏱️', text: '¿Cuánto tarda una app?' },
    ];
  }

  if (text.includes('web') || text.includes('sitio') || text.includes('página') || text.includes('pagina')) {
    return [
      { icon: '🌐', text: '¿Incluye dominio y hosting?' },
      { icon: '✏️', text: '¿Puedo editar el contenido yo?' },
      { icon: '⚡', text: '¿Cuánto tarda una web?' },
    ];
  }

  if (text.includes('whatsapp') || text.includes('contacto') || text.includes('hablar')) {
    return [
      { icon: '💬', text: '¿Cuál es el horario de atención?' },
      { icon: '📞', text: '¿Me pueden llamar?' },
    ];
  }

  return [
    { icon: '💰', text: '¿Cuánto cuesta una web?' },
    { icon: '📱', text: '¿Hacen apps nativas?' },
    { icon: '🚀', text: '¿Cómo arranco mi proyecto?' },
  ];
}

export default function ChatPowa() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<ClientProfile>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversacionId, setConversacionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [needsContinue, setNeedsContinue] = useState(false);

  // 🎯 Capa 4: Estado para sugerencias dinámicas
  const [dynamicSuggestions, setDynamicSuggestions] = useState<{ icon: string; text: string }[]>([]);

  // 🎯 Capa 3: Estado para "conversación recuperada"
  const [isRestored, setIsRestored] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 🎯 Capa 3: Cargar conversación desde localStorage al montar
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('powa-chat-messages');
      const savedProfile = localStorage.getItem('powa-chat-profile');
      const savedChatId = localStorage.getItem('powa-chat-id');

      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setIsRestored(true);
        }
      }
      if (savedProfile) {
        setProfile(savedProfile as ClientProfile);
      }
      if (savedChatId) {
        setConversacionId(savedChatId);
      }
    } catch (e) {
      console.warn('No se pudo cargar la conversación previa:', e);
    }
  }, []);

  // 🎯 Capa 3: Guardar en localStorage cuando cambia algo
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem('powa-chat-messages', JSON.stringify(messages));
      }
      if (profile) {
        localStorage.setItem('powa-chat-profile', profile);
      }
      if (conversacionId) {
        localStorage.setItem('powa-chat-id', conversacionId);
      }
    } catch (e) {
      // localStorage puede fallar en modo incógnito o si está lleno
    }
  }, [messages, profile, conversacionId]);

  // 🎯 Capa 4: Actualizar sugerencias dinámicas cuando cambia el último mensaje del bot
  useEffect(() => {
    if (messages.length > 0) {
      const lastBotMsg = [...messages].reverse().find(m => m.role === 'bot');
      if (lastBotMsg && lastBotMsg.text.length > 20) {
        setDynamicSuggestions(getDynamicSuggestions(lastBotMsg.text));
      }
    }
  }, [messages]);

  const getWhatsAppLink = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.text;
    const intro = "¡Hola Powa! 👋 Vengo del chat de la web.";
    const context = lastUserMsg
      ? ` Estaba consultando sobre: "${lastUserMsg.substring(0, 70)}${lastUserMsg.length > 70 ? '...' : ''}"`
      : " Me gustaría recibir asesoría personalizada para mi proyecto.";
    return `https://wa.me/5491138305837?text=${encodeURIComponent(intro + context + " ¿Podemos hablar?")}`;
  }, [messages]);

  const playRobotSound = () => {
    const audio = new Audio('/sonido-robot.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => { });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen, isStreaming]);

  useEffect(() => {
    if (isOpen && conversacionId && !isRestored) {
      cargarHistorial(conversacionId);
    }
  }, [isOpen, conversacionId, isRestored]);

  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) clearTimeout(streamingTimeoutRef.current);
    };
  }, []);

  const resetStreamingState = useCallback(() => {
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
      streamingTimeoutRef.current = null;
    }
    setIsStreaming(false);
    setLoading(false);
  }, []);

  const cargarHistorial = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chat/historial?chatId=${chatId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.mensajes && data.mensajes.length > 0) {
          const historialMessages = data.mensajes.map((m: any) => ({
            role: m.rol === 'usuario' ? 'user' : 'bot',
            text: m.contenido,
            id: m.id
          }));
          setMessages(historialMessages);
        }
      }
    } catch (error) {
      console.error('Error cargando historial:', error);
    }
  };

  const renderText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={styles.chatLink}>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const ejecutarPeticionChat = async (bodyPayload: any) => {
    setLoading(true);
    setNeedsContinue(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) throw new Error('Error en la respuesta');

      const newChatId = res.headers.get('X-Chat-Id');
      if (newChatId && !conversacionId) {
        setConversacionId(newChatId);
      }

      const finishReason = res.headers.get('X-Finish-Reason');
      const reader = res.body?.getReader();
      const textDecoder = new TextDecoder();
      const botMessageId = (Date.now() + 1).toString();

      setMessages(prev => [...prev, {
        role: 'bot',
        text: '',
        id: botMessageId
      }]);

      setIsStreaming(true);
      let accumulatedText = '';

      streamingTimeoutRef.current = setTimeout(() => {
        resetStreamingState();
      }, 20000);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = textDecoder.decode(value);
          if (chunk) accumulatedText += chunk;

          setMessages(prev => {
            const newMessages = [...prev];
            const botIndex = newMessages.findIndex(m => m.id === botMessageId);
            if (botIndex !== -1) {
              newMessages[botIndex] = {
                ...newMessages[botIndex],
                text: accumulatedText || '✍️ Escribiendo...'
              };
            }
            return newMessages;
          });
        }
      }

      resetStreamingState();

      if (finishReason === 'MAX_TOKENS') {
        setNeedsContinue(true);
      }

    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Lo siento, hubo un problema técnico. ¿Prefieres contactarnos por WhatsApp?"
      }]);
      resetStreamingState();
    }
  };

  const handleSelectProfile = async (selectedProfile: ClientProfile, label: string) => {
    setProfile(selectedProfile);
    const userMsg: Message = { role: 'user', text: `Mi proyecto es del rubro: ${label}` };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);

    await ejecutarPeticionChat({
      message: `Hola, seleccioné la opción de ${label}. Contame cómo me pueden ayudar con soluciones Senior y Growth.`,
      history: newHistory,
      profile: selectedProfile,
      conversacionId,
      usuarioId: session?.user?.id || null,
      esAdmin: session?.user?.rol === 'admin',
    });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || isStreaming) return;

    const userMsg: Message = {
      role: 'user',
      text: input.trim(),
      id: Date.now().toString()
    };
    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    const currentInput = input;
    setInput("");

    await ejecutarPeticionChat({
      message: currentInput,
      history: newHistory,
      profile: profile,
      conversacionId: conversacionId,
      usuarioId: session?.user?.id || null,
      esAdmin: session?.user?.rol === 'admin',
    });
  };

  const handleContinueGeneration = async () => {
    if (loading || isStreaming) return;

    await ejecutarPeticionChat({
      message: "Continúa",
      history: messages,
      profile: profile,
      conversacionId: conversacionId,
      usuarioId: session?.user?.id || null,
      esAdmin: session?.user?.rol === 'admin',
      isContinuation: true,
    });
  };

  const handleSuggestedQuestion = (question: string, questionProfile?: string) => {
    const targetProfile = (questionProfile || profile) as ClientProfile;
    if (questionProfile && profile !== questionProfile) {
      setProfile(targetProfile);
      setTimeout(() => {
        setInput(question);
        setTimeout(() => sendMessage(), 100);
      }, 300);
    } else {
      setInput(question);
      setTimeout(() => sendMessage(), 100);
    }
  };

  const rateResponse = async (rating: number) => {
    try {
      await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'satisfaction',
          data: { rating, conversacionId }
        }),
      });
      const ratingMsg = ['😡', '😕', '😐', '😊', '🌟'][rating - 1];
      setMessages(prev => [...prev, {
        role: 'bot',
        text: `¡Gracias por tu calificación! ${ratingMsg}`
      }]);
    } catch (e) { }
  };

  // 🎯 Capa 3: Función para resetear la conversación
  const resetConversation = () => {
    setMessages([]);
    setProfile(null);
    setConversacionId(null);
    setIsRestored(false);
    setDynamicSuggestions([]);
    try {
      localStorage.removeItem('powa-chat-messages');
      localStorage.removeItem('powa-chat-profile');
      localStorage.removeItem('powa-chat-id');
    } catch (e) { }
  };

  return (
    <div className={styles.chatContainer}>

      {!isOpen && (
        <button onClick={() => { playRobotSound(); setIsOpen(true); }} className={styles.chatToggleButton} aria-label="Abrir Chat de Ayuda">
          <Image
            src="/iconoia.jpg"
            alt="Powa Bot Ayuda"
            width={70}
            height={70}
            className={styles.robotIconImg}
            priority
          />
        </button>
      )}

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header} style={{ position: 'relative', zIndex: 10 }}>
            <div className={styles.headerInfo}>
              <div className={styles.headerAvatarContainer}>
                <Image src="/iconoia.jpg" alt="Avatar Powa AI" width={30} height={30} className={styles.headerAvatar} />
                <div className={styles.onlineStatus}></div>
              </div>
              <div className={styles.headerText}>
                <span className={styles.headerTitle}>POWA AI LAB</span>
                <span className={styles.headerSubtitle}>
                  <span className={styles.headerSubtitleFull}>Soporte Local Zona Sur</span>
                  <span className={styles.headerSubtitleShort}>Soporte Zona Sur</span>
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
              <IoClose size={20} />
            </button>
          </div>

          <div className={styles.messagesArea}>
            {/* 🎯 Capa 3: Banner de "conversación recuperada" */}
            {isRestored && messages.length > 0 && (
              <div className={styles.restoredBanner}>
                <span>🔄 Conversación recuperada</span>
                <button onClick={resetConversation} className={styles.resetButton}>
                  Empezar de nuevo
                </button>
              </div>
            )}

            {messages.length === 0 && !loading && (
              <div className={styles.welcomeMessage}>
                <p>¡Hola! Soy el estratega de Powa. 🚀</p>
                <p>Seleccioná el rubro de tu proyecto para comenzar:</p>
              </div>
            )}

            {!profile && !loading && messages.length === 0 && (
              <div className={styles.profileOptionsContainer}>
                <button onClick={() => handleSelectProfile('gastronomia', 'Gastronomía (Restaurantes/Delivery)')} className={styles.profileButton}>
                  🍔 Gastronomía (Restaurantes, Delivery, Apps)
                </button>
                <button onClick={() => handleSelectProfile('empresa_emprendedor', 'Empresas y Emprendedores (Webs, E-commerce)')} className={styles.profileButton}>
                  📈 Empresas / E-commerce / Automatización
                </button>
                <button onClick={() => handleSelectProfile('senior_software', 'Desarrollo Senior a Medida (Next.js, APIS)')} className={styles.profileButton}>
                  ⚙️ Consultoría & Software Senior a Medida
                </button>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={styles.messageRow}>
                <div className={m.role === 'user' ? styles.userBubble : styles.botBubble}>
                  {renderText(m.text)}
                  {m.role === 'bot' && i === messages.length - 1 && isStreaming && (
                    <span className={styles.streamingIndicator}>▌</span>
                  )}
                </div>

                {m.role === 'bot' && i === messages.length - 1 && needsContinue && !isStreaming && !loading && (
                  <div style={{ margin: '8px 0', textAlign: 'left' }}>
                    <button
                      onClick={handleContinueGeneration}
                      style={{
                        background: '#10B981',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      ▶️ Continuar generando...
                    </button>
                  </div>
                )}

                {m.role === 'bot' && i === messages.length - 1 && !isStreaming && !needsContinue && m.text.length > 20 && (
                  <div className={styles.ratingContainer}>
                    <span className={styles.ratingLabel}>¿Te fue útil?</span>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button key={rating} onClick={() => rateResponse(rating)} className={styles.ratingButton}>
                        {rating}
                      </button>
                    ))}
                  </div>
                )}

                {m.role === 'bot' && (m.text.toLowerCase().includes('whatsapp') || m.text.toLowerCase().includes('contacto')) && (
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
                    🟢 HABLAR CON UN ESPECIALISTA
                  </a>
                )}
              </div>
            ))}

            {/* 🎯 Capa 4: Sugerencias dinámicas según última respuesta del bot */}
            {messages.length > 0 && dynamicSuggestions.length > 0 && !loading && !isStreaming && (
              <div className={styles.suggestedQuestionsContainer}>
                <span className={styles.suggestedLabel}>Preguntas relacionadas:</span>
                <div className={styles.suggestedGrid}>
                  {dynamicSuggestions.slice(0, 3).map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(q.text)}
                      className={styles.suggestedButton}
                      disabled={loading || isStreaming}
                    >
                      {q.icon} {q.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sugerencias estáticas del inicio (solo si no hay dinámicas) */}
            {profile && messages.length === 1 && !loading && !isStreaming && dynamicSuggestions.length === 0 && (
              <div className={styles.suggestedQuestionsContainer}>
                <span className={styles.suggestedLabel}>Preguntas frecuentes:</span>
                <div className={styles.suggestedGrid}>
                  {suggestedQuestions.filter(q => q.profile === profile).slice(0, 4).map((q, idx) => (
                    <button key={idx} onClick={() => handleSuggestedQuestion(q.text, q.profile)} className={styles.suggestedButton} disabled={loading || isStreaming}>
                      {q.icon} {q.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && !isStreaming && (
              <div className={styles.loadingDotsContainer}>
                <span className={styles.loadingDot}></span>
                <span className={styles.loadingDot}></span>
                <span className={styles.loadingDot}></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isStreaming && sendMessage()}
              placeholder={profile ? "¿Cómo escalamos tu proyecto?" : "Selecciona un rubro arriba primero..."}
              disabled={!profile || loading || isStreaming}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim() || !profile || isStreaming} className={styles.sendButton}>
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}