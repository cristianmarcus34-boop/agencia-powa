'use client';

import { useState, useRef, useEffect } from 'react';
import { IoChatbubblesSharp, IoSend, IoClose } from 'react-icons/io5';
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

  // Renderiza links cliqueables
  const renderText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline break-all font-bold hover:text-white transition-colors">{part}</a>;
      }
      return part;
    });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }), 
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
      
      <button onClick={() => setIsOpen(!isOpen)} className={styles.chatToggleButton}>
        {isOpen ? <IoClose size={28} /> : <IoChatbubblesSharp size={28} />}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className="flex items-center gap-2">
              <div className={styles.onlineStatus}></div>
              <div className="flex flex-col">
                <span className="font-bold text-[11px] text-white">POWA AI LAB</span>
                <span className="text-[9px] text-cyan-300">Online - Growth Hacker</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}><IoClose size={18} /></button>
          </div>

          <div className={styles.messagesArea}>
            {messages.map((m, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className={m.role === 'user' ? styles.userBubble : styles.botBubble}>
                  {renderText(m.text)}
                </div>
                {/* BOTÓN DE WHATSAPP DINÁMICO */}
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