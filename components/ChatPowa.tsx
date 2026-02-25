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
    { role: 'bot', text: '¡Hola! Soy el estratega de Powa. 🚀 ¿Listo para escalar tu negocio con tecnología de vanguardia?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Función para reproducir el sonido del robot
  const playRobotSound = () => {
    const audio = new Audio('/sonido-robot.mp3');
    audio.volume = 0.4; // Ajusta el volumen a tu gusto
    audio.play().catch(() => console.log("Audio play blocked until interaction"));
  };

  useEffect(() => {
    const hasOpenedBefore = sessionStorage.getItem('powaChatAutoOpened');
    if (!hasOpenedBefore) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('powaChatAutoOpened', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen]);

  // Manejador para abrir/cerrar con sonido
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
      setMessages(prev => [...prev, { role: 'bot', text: "Error de conexión. Reintenta." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {!isOpen && <div className={styles.notificationBadge}></div>}
      
      {/* BOTÓN CON EL ROBOT Y SONIDO */}
      <button onClick={handleToggleChat} className={styles.chatToggleButton}>
        {isOpen ? (
          <IoClose size={28} />
        ) : (
          <Image 
            src="/chatrobot.png" 
            alt="Powa Bot" 
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
                  alt="Avatar" 
                  width={30} 
                  height={30} 
                  className={styles.headerAvatar}
                />
                <div className={styles.onlineStatus}></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[11px] text-white">POWA AI LAB</span>
                <span className="text-[9px] text-cyan-300">Online - Growth Hacker</span>
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
                {m.role === 'bot' && m.text.includes('wa.me') && (
                  <a 
                    href="https://wa.me/5491138305837?text=Hola%20Powa!%20Vengo%20del%20chat"
                    target="_blank"
                    className={styles.whatsappButton}
                  >
                    🟢 HABLAR POR WHATSAPP
                  </a>
                )}
              </div>
            ))}
            {loading && <div className={styles.loadingStatus}>Analizando estrategia...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="¿Qué proyecto tienes?"
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}