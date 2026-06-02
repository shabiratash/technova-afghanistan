import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { createSocket } from '../services/socket.js';

export default function ChatWidget() {
  const { token, user } = useAuth();
  const [receiver, setReceiver] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useMemo(() => (token ? createSocket(token) : null), [token]);

  useEffect(() => {
    if (!socket) return undefined;
    socket.connect();
    socket.on('message:new', (message) => setMessages((items) => [...items, message]));
    return () => socket.disconnect();
  }, [socket]);

  function sendMessage(event) {
    event.preventDefault();
    if (!receiver || !content.trim() || !socket) return;
    socket.emit('message:send', { receiver, content });
    setContent('');
  }

  if (!user) return null;

  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="flex items-center gap-2">
        <MessageCircle size={18} className="text-emerald-600 dark:text-emerald-300" />
        <h2 className="font-black">Real-time chat</h2>
      </div>
      <form onSubmit={sendMessage} className="mt-4 grid gap-3">
        <input className="field" value={receiver} onChange={(event) => setReceiver(event.target.value)} placeholder="Receiver user ID" />
        <div className="flex gap-2">
          <input className="field" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Message" />
          <button type="submit" className="btn-primary px-3" title="Send message">
            <Send size={16} />
          </button>
        </div>
      </form>
      <div className="mt-4 max-h-48 space-y-2 overflow-auto">
        {messages.map((message) => (
          <p key={message._id || `${message.content}-${message.createdAt}`} className="rounded-lg bg-white/70 px-3 py-2 text-sm dark:bg-white/10">
            <span className="font-bold">{message.sender?.name || 'User'}:</span> {message.content}
          </p>
        ))}
      </div>
    </section>
  );
}
