import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Copy, 
  Download, 
  Trash2, 
  Settings, 
  Brain,
  Clock,
  Star,
  MessageSquare,
  Code,
  BookOpen,
  Lightbulb
} from 'lucide-react';

// Monaco Editor for syntax highlighting
// import Editor from '@monaco-editor/react';

interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  rating: number;
  usage: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  tokens?: number;
  processingTime?: number;
}

interface ModelConfig {
  name: string;
  provider: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  enabled: boolean;
}

const promptTemplates: PromptTemplate[] = [
  {
    id: '1',
    name: 'Code Review Assistant',
    description: 'Analyze code quality, suggest improvements, and identify potential issues',
    prompt: 'Please review the following code for:\n1. Code quality and best practices\n2. Potential bugs or security issues\n3. Performance improvements\n4. Readability and maintainability\n\n```\n{CODE_HERE}\n```',
    category: 'Development',
    tags: ['code', 'review', 'quality', 'debugging'],
    rating: 4.8,
    usage: 156
  },
  {
    id: '2',
    name: 'Technical Documentation Writer',
    description: 'Generate comprehensive technical documentation from code or specifications',
    prompt: 'Create detailed technical documentation for the following:\n\n{CONTENT_HERE}\n\nInclude:\n- Overview and purpose\n- API endpoints/functions\n- Parameters and return values\n- Usage examples\n- Error handling',
    category: 'Documentation',
    tags: ['documentation', 'api', 'technical', 'examples'],
    rating: 4.6,
    usage: 98
  },
  {
    id: '3',
    name: 'UI/UX Design Consultant',
    description: 'Provide design recommendations and user experience insights',
    prompt: 'As a UI/UX expert, analyze the following design concept:\n\n{DESIGN_DESCRIPTION}\n\nProvide recommendations for:\n- User experience improvements\n- Accessibility considerations\n- Visual hierarchy and layout\n- Interactive elements\n- Mobile responsiveness',
    category: 'Design',
    tags: ['ui', 'ux', 'design', 'accessibility', 'mobile'],
    rating: 4.7,
    usage: 73
  }
];

const modelConfigs: ModelConfig[] = [
  {
    name: 'GPT-4',
    provider: 'OpenAI',
    maxTokens: 4000,
    temperature: 0.7,
    topP: 0.9,
    enabled: true
  },
  {
    name: 'Claude-3',
    provider: 'Anthropic',
    maxTokens: 3000,
    temperature: 0.6,
    topP: 0.8,
    enabled: false
  },
  {
    name: 'Gemini Pro',
    provider: 'Google',
    maxTokens: 2000,
    temperature: 0.8,
    topP: 0.9,
    enabled: false
  }
];

const PromptExplorerPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [_selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [_showSettings] = useState(false);
  const [models, setModels] = useState(modelConfigs);
  const [activeTab, setActiveTab] = useState<'chat' | 'templates' | 'settings'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setPrompt('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Thank you for your prompt! This is a demonstration of the Prompt Explorer interface. In a real implementation, this would connect to various AI models like GPT-4, Claude, or Gemini to provide actual responses.\n\nYour prompt was: "${userMessage.content}"\n\nKey features of this interface include:\n• Real-time prompt testing\n• Multiple AI model comparison\n• Prompt templates and optimization\n• Response analysis and metrics\n• Export and sharing capabilities`,
        timestamp: new Date(),
        model: 'Demo AI',
        tokens: 157,
        processingTime: 1.2
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const useTemplate = (template: PromptTemplate) => {
    setPrompt(template.prompt);
    setSelectedTemplate(template);
    setActiveTab('chat');
  };

  const clearConversation = () => {
    setMessages([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportConversation = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      messages: messages,
      settings: models.filter(m => m.enabled)
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt-session.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Prompt{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Explorer
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Advanced AI prompt testing interface with multi-model support, templates, and analytics
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-2 flex gap-2">
            {[
              { id: 'chat', icon: MessageSquare, label: 'Chat' },
              { id: 'templates', icon: BookOpen, label: 'Templates' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Chat Interface */}
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
              {/* Chat Area */}
              <div className="lg:col-span-3">
                <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="bg-slate-700/30 border-b border-slate-600/30 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white font-medium">AI Assistant</span>
                      <span className="text-white/60 text-sm">{models.find(m => m.enabled)?.name || 'Demo Mode'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={exportConversation}
                        className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors"
                        title="Export conversation"
                      >
                        <Download size={16} className="text-white/70" />
                      </button>
                      <button
                        onClick={clearConversation}
                        className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors"
                        title="Clear conversation"
                      >
                        <Trash2 size={16} className="text-white/70" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="h-96 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-white/60 py-12">
                        <Brain size={48} className="mx-auto mb-4 text-white/30" />
                        <p className="text-lg mb-2">Start a conversation</p>
                        <p className="text-sm">Try a prompt template or write your own message</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`p-4 rounded-xl ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'bg-slate-700/50 text-white/90'
                            }`}>
                              <p className="whitespace-pre-wrap">{message.content}</p>
                              
                              {message.type === 'assistant' && (
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                                  <div className="flex items-center gap-4 text-xs text-white/60">
                                    <span>{message.model}</span>
                                    {message.tokens && <span>{message.tokens} tokens</span>}
                                    {message.processingTime && <span>{message.processingTime}s</span>}
                                  </div>
                                  <button
                                    onClick={() => copyToClipboard(message.content)}
                                    title="Copy message content"
                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                  >
                                    <Copy size={14} />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-white/40 mt-1 px-2">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="bg-slate-700/50 p-4 rounded-xl">
                          <div className="flex items-center gap-2 text-white/60">
                            <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full"></div>
                            Thinking...
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-slate-600/30 p-4">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Type your prompt here... (Shift+Enter for new line)"
                          className="w-full bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 text-white placeholder-white/40 resize-none focus:outline-none focus:border-purple-500/50 transition-colors"
                          rows={3}
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!prompt.trim() || isLoading}
                        title="Send message"
                        className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Quick Templates
                  </h3>
                  
                  <div className="space-y-3">
                    {promptTemplates.slice(0, 3).map((template) => (
                      <button
                        key={template.id}
                        onClick={() => useTemplate(template)}
                        className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-600/30 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white text-sm group-hover:text-purple-300 transition-colors">
                            {template.name}
                          </h4>
                          <Star size={12} className="text-yellow-400" />
                        </div>
                        <p className="text-white/60 text-xs leading-relaxed">
                          {template.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-slate-600/50 px-2 py-1 rounded text-white/70">
                            {template.category}
                          </span>
                          <span className="text-xs text-white/50">
                            {template.usage} uses
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promptTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Code size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {template.name}
                          </h3>
                          <span className="text-xs text-white/60">{template.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={14} />
                        <span className="text-xs text-white/70">{template.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {template.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-600/50 px-2 py-1 rounded text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <Clock size={12} />
                        {template.usage} uses
                      </span>
                      <button
                        onClick={() => useTemplate(template)}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">AI Model Configuration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {models.map((model, index) => (
                    <div
                      key={model.name}
                      className={`bg-slate-800/30 backdrop-blur-md border rounded-xl p-6 transition-all duration-300 ${
                        model.enabled 
                          ? 'border-green-500/50 shadow-lg shadow-green-500/10' 
                          : 'border-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-white">{model.name}</h3>
                          <p className="text-sm text-white/60">{model.provider}</p>
                        </div>
                        <button
                          onClick={() => {
                            const newModels = [...models];
                            newModels[index].enabled = !newModels[index].enabled;
                            setModels(newModels);
                          }}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            model.enabled ? 'bg-green-500' : 'bg-slate-600'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            model.enabled ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-white/70">Max Tokens: {model.maxTokens}</label>
                          <input
                            type="range"
                            min="100"
                            max="8000"
                            value={model.maxTokens}
                            className="w-full mt-1"
                            disabled={!model.enabled}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm text-white/70">Temperature: {model.temperature}</label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={model.temperature}
                            className="w-full mt-1"
                            disabled={!model.enabled}
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm text-white/70">Top P: {model.topP}</label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={model.topP}
                            className="w-full mt-1"
                            disabled={!model.enabled}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PromptExplorerPage;