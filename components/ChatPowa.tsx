'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { IoSend, IoClose } from 'react-icons/io5';
import Image from 'next/image';
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

export default function ChatPowa() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<ClientProfile>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversacionId, setConversacionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getWhatsAppLink = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.text;
    const intro = "¡Hola Powa! 👋 Vengo del chat de la web.";
    const context = lastUserMsg
      ? ` Estaba consultando sobre: "${lastUserMsg.substring(0, 70)}${lastUserMsg.length > 70 ? '...' : ''}"`
      : " Me gustaría recibir asesoría personalizada para mi proyecto.";
    const fullMessage = `${intro}${context} ¿Podemos hablar?`;
    return `https://wa.me/5491138305837?text=${encodeURIComponent(fullMessage)}`;
  }, [messages]);

  const playRobotSound = () => {
    const audio = new Audio('/sonido-robot.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => console.log("Audio play blocked until interaction"));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen, isStreaming]);

  // Cargar historial al abrir el chat
  useEffect(() => {
    if (isOpen && conversacionId) {
      cargarHistorial(conversacionId);
    }
  }, [isOpen, conversacionId]);

  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  // MONITOREO: Si isStreaming está true pero no hay loading, forzar reset
  useEffect(() => {
    if (isStreaming && !loading) {
      console.log('⚠️ Streaming activo sin loading - forzando reset');
      setIsStreaming(false);
    }
  }, [isStreaming, loading]);

  const handleToggleChat = () => {
    if (!isOpen) {
      playRobotSound();
      // Reiniciar el chat al abrir
      setMessages([]);
      setConversacionId(null);
    }
    setIsOpen(!isOpen);
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

  const resetStreamingState = useCallback(() => {
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
      streamingTimeoutRef.current = null;
    }
    setIsStreaming(false);
    setLoading(false);
  }, []);

  // Cargar historial desde la base de datos
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

  const handleSelectProfile = async (selectedProfile: ClientProfile, label: string) => {
    setProfile(selectedProfile);
    const userMsg: Message = { role: 'user', text: `Mi proyecto es del rubro: ${label}` };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Hola, seleccioné la opción de ${label}. Contame cómo me pueden ayudar con soluciones Senior y Growth.`,
          history: newHistory,
          profile: selectedProfile,
          conversacionId: conversacionId
        }),
      });

      if (!res.ok) throw new Error('Error en la respuesta');

      // Obtener el chatId de los headers
      const newChatId = res.headers.get('X-Chat-Id');
      if (newChatId && !conversacionId) {
        setConversacionId(newChatId);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      const botMessageId = (Date.now() + 1).toString();

      setMessages(prev => [...prev, {
        role: 'bot',
        text: '',
        id: botMessageId
      }]);

      setIsStreaming(true);
      let accumulatedText = '';

      streamingTimeoutRef.current = setTimeout(() => {
        console.log('⏱️ Timeout: streaming forzado a false');
        resetStreamingState();
      }, 15000);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          if (chunk) {
            accumulatedText += chunk;
          }

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

      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
        streamingTimeoutRef.current = null;
      }

      setMessages(prev => {
        const newMessages = [...prev];
        const botIndex = newMessages.findIndex(m => m.id === botMessageId);
        if (botIndex !== -1 && !newMessages[botIndex].text.trim()) {
          newMessages[botIndex] = {
            ...newMessages[botIndex],
            text: 'Gracias por tu consulta. ¿Querés que profundicemos en algún aspecto en particular?'
          };
        }
        return newMessages;
      });

      setTimeout(() => {
        setIsStreaming(false);
        setLoading(false);
      }, 50);

    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Lo siento, hubo un problema técnico. ¿Prefieres contactarnos por WhatsApp?"
      }]);
      setIsStreaming(false);
      setLoading(false);
    } finally {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
        streamingTimeoutRef.current = null;
      }
    }
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
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: newHistory,
          profile: profile,
          conversacionId: conversacionId
        }),
      });

      if (!response.ok) throw new Error('Error en la respuesta');

      // Obtener el chatId de los headers
      const newChatId = response.headers.get('X-Chat-Id');
      if (newChatId && !conversacionId) {
        setConversacionId(newChatId);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const botMessageId = (Date.now() + 1).toString();

      setMessages(prev => [...prev, {
        role: 'bot',
        text: '',
        id: botMessageId
      }]);

      setIsStreaming(true);
      let accumulatedText = '';

      streamingTimeoutRef.current = setTimeout(() => {
        console.log('⏱️ Timeout: streaming forzado a false');
        resetStreamingState();
      }, 15000);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          if (chunk) {
            accumulatedText += chunk;
          }

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

      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
        streamingTimeoutRef.current = null;
      }

      setMessages(prev => {
        const newMessages = [...prev];
        const botIndex = newMessages.findIndex(m => m.id === botMessageId);
        if (botIndex !== -1 && !newMessages[botIndex].text.trim()) {
          newMessages[botIndex] = {
            ...newMessages[botIndex],
            text: 'Gracias por tu consulta. ¿Querés que profundicemos en algún aspecto en particular?'
          };
        }
        return newMessages;
      });

      setTimeout(() => {
        setIsStreaming(false);
        setLoading(false);
      }, 50);

    } catch (error: any) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Lo siento, hubo un problema técnico. ¿Prefieres contactarnos por WhatsApp?"
      }]);
      setIsStreaming(false);
      setLoading(false);
    } finally {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
        streamingTimeoutRef.current = null;
      }
    }
  };

  const handleSuggestedQuestion = (question: string, questionProfile: string) => {
    if (profile !== questionProfile) {
      setProfile(questionProfile as ClientProfile);
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
    } catch (e) { /* ignorar */ }
  };

  return (
    <div className={styles.chatContainer}>
      {!isOpen && <div className={styles.notificationBadge}>1</div>}

      {!isOpen && (
        <button onClick={handleToggleChat} className={styles.chatToggleButton} aria-label="Abrir Chat de Ayuda">
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
                <Image
                  src="/iconoia.jpg"
                  alt="Avatar Powa AI"
                  width={30}
                  height={30}
                  className={styles.headerAvatar}
                />
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
            {messages.length === 0 && !loading && (
              <div className={styles.welcomeMessage}>
                <p>¡Hola! Soy el estratega de Powa. 🚀</p>
                <p>Seleccioná el rubro de tu proyecto para comenzar:</p>
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

                {m.role === 'bot' && i === messages.length - 1 && !isStreaming && m.text.length > 20 && (
                  <div className={styles.ratingContainer}>
                    <span className={styles.ratingLabel}>¿Te fue útil?</span>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => rateResponse(rating)}
                        className={styles.ratingButton}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                )}

                {i === 0 && !profile && !loading && messages.length === 1 && (
                  <div className={styles.profileOptionsContainer}>
                    <button
                      onClick={() => handleSelectProfile('gastronomia', 'Gastronomía (Restaurantes/Delivery)')}
                      className={styles.profileButton}
                    >
                      🍔 Gastronomía (Restaurantes, Delivery, Apps)
                    </button>
                    <button
                      onClick={() => handleSelectProfile('empresa_emprendedor', 'Empresas y Emprendedores (Webs, E-commerce)')}
                      className={styles.profileButton}
                    >
                      📈 Empresas / E-commerce / Automatización
                    </button>
                    <button
                      onClick={() => handleSelectProfile('senior_software', 'Desarrollo Senior a Medida (Next.js, APIS)')}
                      className={styles.profileButton}
                    >
                      ⚙️ Consultoría & Software Senior a Medida
                    </button>
                  </div>
                )}

                {profile && i === 0 && !loading && !isStreaming && (
                  <div className={styles.suggestedQuestionsContainer}>
                    <span className={styles.suggestedLabel}>Preguntas frecuentes:</span>
                    <div className={styles.suggestedGrid}>
                      {suggestedQuestions
                        .filter(q => q.profile === profile)
                        .slice(0, 4)
                        .map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestedQuestion(q.text, q.profile)}
                            className={styles.suggestedButton}
                            disabled={loading || isStreaming}
                          >
                            {q.icon} {q.text}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {m.role === 'bot' && (m.text.toLowerCase().includes('whatsapp') || m.text.toLowerCase().includes('contacto')) && (
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
                    🟢 HABLAR CON UN ESPECIALISTA
                  </a>
                )}
              </div>
            ))}

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

            <button
              onClick={sendMessage}
              disabled={loading || !input.trim() || !profile || isStreaming}
              className={styles.sendButton}
            >
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}