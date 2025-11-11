import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Bot, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  businessEntity: 'vibelink' | 'reapsow' | 'travelquest';
  conversationType: string;
  systemPrompt: string;
  placeholder?: string;
}

export const AIChat = ({ businessEntity, conversationType, systemPrompt, placeholder }: AIChatProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !user) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create or get conversation
      let currentConversationId = conversationId;
      if (!currentConversationId) {
        const { data: conv, error: convError } = await supabase
          .from('ai_conversations')
          .insert({
            user_id: user.id,
            business_entity: businessEntity,
            conversation_type: conversationType,
            title: input.substring(0, 50),
          })
          .select()
          .single();

        if (convError) throw convError;
        currentConversationId = conv.id;
        setConversationId(conv.id);
      }

      // Save user message
      await supabase.from('ai_messages').insert({
        conversation_id: currentConversationId,
        role: 'user',
        content: input,
      });

      // Call AI
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
            userMessage,
          ],
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
      };

      // Save assistant message
      await supabase.from('ai_messages').insert({
        conversation_id: currentConversationId,
        role: 'assistant',
        content: data.response,
      });

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation to get AI-powered insights</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-muted'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <User className="h-5 w-5 text-accent-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div className="rounded-lg px-4 py-2 bg-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder || 'Ask me anything...'}
            disabled={isLoading || !user}
          />
          <Button onClick={sendMessage} disabled={isLoading || !input.trim() || !user}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!user && (
          <p className="text-xs text-muted-foreground mt-2">Sign in to use AI features</p>
        )}
      </div>
    </Card>
  );
};
