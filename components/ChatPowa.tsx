'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { IoSend, IoClose } from 'react-icons/io5';
import Image from 'next/image';
import styles from './ChatPowa.module.css';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

type ClientProfile = 'gastronomia' | 'empresa_emprendedor' | 'senior_software' | null;

export default function ChatPowa() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<ClientProfile>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: '¡Hola! Soy el estratega de Powa. 🚀 Estamos impulsando negocios en Quilmes y el mundo con tecnología de punta. Para darte la mejor asesoría técnica y de Growth, seleccioná el rubro de tu proyecto:'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // ❌ AUTOAPERTURA DESHABILITADA
  // Si más adelante querés volver a activarla, descomentá este bloque
  //
  // useEffect(() => {
  //   const hasOpenedBefore = sessionStorage.getItem('powaChatAutoOpened');
  //   if (!hasOpenedBefore) {
  //     const timer = setTimeout(() => {
  //       setIsOpen(true);
  //       playRobotSound();
  //       sessionStorage.setItem('powaChatAutoOpened', 'true');
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen]);

  const handleToggleChat = () => {
    if (!isOpen) playRobotSound();
    setIsOpen(!isOpen);
  };

  const renderText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chatLink}
          >
            {part}
          </a>
        );
      }
      return part;
    });
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
          profile: selectedProfile
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.text }]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Lo siento, hubo un problema técnico. ¿Prefieres contactarnos por WhatsApp?" }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input.trim() };
    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          history: newHistory,
          profile: profile
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.text }]);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Lo siento, hubo un problema técnico. ¿Prefieres contactarnos por WhatsApp?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {!isOpen && <div className={styles.notificationBadge}>1</div>}

      <button onClick={handleToggleChat} className={styles.chatToggleButton} aria-label="Abrir Chat de Ayuda">
        {isOpen ? (
          <IoClose size={28} />
        ) : (
          <Image
            src="/chatrobot.png"
            alt="Powa Bot Ayuda"
            width={70}
            height={70}
            className={styles.robotIconImg}
            priority
          />
        )}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.headerAvatarContainer}>
                <Image
                  src="/chatrobot.png"
                  alt="Avatar Powa AI"
                  width={30}
                  height={30}
                  className={styles.headerAvatar}
                />
                <div className={styles.onlineStatus}></div>
              </div>
              <div className={styles.headerText}>
                <span className={styles.headerTitle}>POWA AI LAB</span>
                <span className={styles.headerSubtitle}>Soporte Local Zona Sur</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>
              <IoClose size={18} />
            </button>
          </div>

          <div className={styles.messagesArea}>
            {messages.map((m, i) => (
              <div key={i} className={styles.messageRow}>
                <div className={m.role === 'user' ? styles.userBubble : styles.botBubble}>
                  {renderText(m.text)}
                </div>

                {i === 0 && !profile && !loading && (
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

                {m.role === 'bot' && (m.text.toLowerCase().includes('whatsapp') || m.text.toLowerCase().includes('contacto')) && (
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                  >
                    🟢 HABLAR CON UN ESPECIALISTA
                  </a>
                )}
              </div>
            ))}
            {loading && <div className={styles.loadingStatus}>Analizando tu proyecto...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={profile ? "¿Cómo escalamos tu proyecto?" : "Selecciona un rubro arriba primero..."}
              aria-label="Mensaje para el chat"
              disabled={!profile || loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim() || !profile}
              aria-label="Enviar mensaje"
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