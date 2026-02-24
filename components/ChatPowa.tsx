'use client';
import { useState, useRef, useEffect } from 'react';
import { IoChatbubblesSharp, IoSend, IoClose } from 'react-icons/io5';
import styles from './ChatPowa.module.css';

export default function ChatPowa() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '¡Hola! Soy el asistente de Powa. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- APERTURA AUTOMÁTICA (Una sola vez por sesión) ---
  useEffect(() => {
    const hasOpenedBefore = sessionStorage.getItem('powaChatAutoOpened');
    if (!hasOpenedBefore) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('powaChatAutoOpened', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // --- SCROLL AL ÚLTIMO MENSAJE ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }), 
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.text }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Lo siento, mi conexión neuronal falló. ¿Intentamos de nuevo?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón Flotante */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={styles.chatToggleButton}
      >
        {isOpen ? <IoClose size={28} /> : <IoChatbubblesSharp size={28} />}
      </button>

      {/* Ventana de Chat */}
      {isOpen && (
        <div className={`${styles.chatWindow} animate-in fade-in zoom-in duration-300`}>
          
          {/* Header */}
          <div className={styles.header}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
              <span className="tracking-wide">Powa Lab Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <IoClose size={20} />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className={styles.messagesArea}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? styles.userBubble : styles.botBubble}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-cyan-400 px-3 py-2 rounded-2xl text-xs animate-pulse border border-slate-700">
                  Powa está escribiendo...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Área de Input */}
          <div className={styles.inputArea}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button 
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="text-blue-500 hover:text-cyan-400 disabled:opacity-30 transition-all transform active:scale-90"
            >
              <IoSend size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}