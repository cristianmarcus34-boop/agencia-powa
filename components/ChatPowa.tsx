'use client';

import { useState, useRef, useEffect } from 'react';
import { IoSend, IoClose } from 'react-icons/io5';
import Image from 'next/image';
import styles from './ChatPowa.module.css';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function ChatPowa() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: '¡Hola! Soy el estratega de Powa. 🚀 Estamos impulsando negocios en Quilmes y el mundo con tecnología de punta. ¿En qué puedo ayudarte hoy?' 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- NUEVA FUNCIÓN: Genera el link de WhatsApp con el contexto de la charla ---
  const getWhatsAppLink = () => {
    // Buscamos el último mensaje que escribió el usuario para saber qué le interesa
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')?.text;
    
    const intro = "¡Hola Powa! 👋 Vengo del chat de la web.";
    const context = lastUserMsg 
      ? ` Estaba consultando sobre: "${lastUserMsg.substring(0, 70)}${lastUserMsg.length > 70 ? '...' : ''}"`
      : " Me gustaría recibir asesoría personalizada para mi proyecto.";
    
    const fullMessage = `${intro}${context} ¿Podemos hablar?`;
    
    return `https://wa.me/5491138305837?text=${encodeURIComponent(fullMessage)}`;
  };

  const playRobotSound = () => {
    const audio = new Audio('/sonido-robot.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => console.log("Audio play blocked until interaction"));
  };

  useEffect(() => {
    const hasOpenedBefore = sessionStorage.getItem('powaChatAutoOpened');
    if (!hasOpenedBefore) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        playRobotSound();
        sessionStorage.setItem('powaChatAutoOpened', 'true');
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, []);

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
            className="text-cyan-400 underline break-all font-bold hover:text-white transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
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
          history: newHistory 
        }), 
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.text }]);
    } catch (error) {
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
            <div className="flex items-center gap-2">
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
              <div className="flex flex-col text-start">
                <span className="font-bold text-[11px] text-white tracking-wider">POWA AI LAB</span>
                <span className="text-[9px] text-cyan-300 uppercase font-semibold">Soporte Local Zona Sur</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <IoClose size={18} />
            </button>
          </div>

          <div className={styles.messagesArea}>
            {messages.map((m, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className={m.role === 'user' ? styles.userBubble : styles.botBubble}>
                  {renderText(m.text)}
                </div>
                {/* BOTÓN DINÁMICO CON LINK INTELIGENTE */}
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
              placeholder="¿Cómo escalamos tu proyecto?"
              aria-label="Mensaje para el chat"
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} aria-label="Enviar mensaje">
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}