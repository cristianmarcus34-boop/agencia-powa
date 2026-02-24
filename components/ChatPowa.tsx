'use client';

import { useState, useRef, useEffect } from 'react';
import { IoChatbubblesSharp, IoSend, IoClose } from 'react-icons/io5';
import styles from './ChatPowa.module.css';

// Definimos el tipo de mensaje para evitar errores de TS
type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function ChatPowa() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '¡Hola! Soy el asistente de Powa. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- APERTURA AUTOMÁTICA ---
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

  // --- SCROLL AUTOMÁTICO ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, loading, isOpen]);

  // --- FUNCIÓN DE ENVÍO ---
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }), // <--- CAMBIADO: Antes decía 'prompt', ahora dice 'message'
      });

      if (!res.ok) throw new Error("Error en la respuesta del servidor");

      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'bot',
        text: data.text
      }]);
    } catch (error) {
      console.error("Error en el ChatPowa:", error);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: "Lo siento, mi conexión neuronal falló. ¿Intentamos de nuevo?"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón Flotante con efecto glassmorphism */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.chatToggleButton}
        aria-label="Abrir chat"
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
              <span className="font-bold tracking-wide text-sm">Powa Lab Assistant</span>
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
                <div className="bg-slate-800 text-cyan-400 px-3 py-2 rounded-2xl text-[10px] uppercase tracking-widest animate-pulse border border-slate-700">
                  Powa está procesando...
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
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="ml-2 text-cyan-500 hover:text-cyan-300 disabled:opacity-20 transition-all transform active:scale-90"
            >
              <IoSend size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}