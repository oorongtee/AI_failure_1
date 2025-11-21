import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Copy, 
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  Search,
  GitBranch,
  GitCommit,
  Hash,
  RotateCcw
} from 'lucide-react';

// Diff Data Types
interface FileDiff {
  id: string;
  filename: string;
  path: string;
  status: 'added' | 'modified' | 'deleted' | 'renamed';
  language: string;
  oldContent?: string;
  newContent?: string;
  chunks: DiffChunk[];
  stats: {
    additions: number;
    deletions: number;
    changes: number;
  };
}

interface DiffChunk {
  id: string;
  oldStart: number;
  oldLength: number;
  newStart: number;
  newLength: number;
  lines: DiffLine[];
}

interface DiffLine {
  id: string;
  type: 'context' | 'addition' | 'deletion';
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
  highlighted?: boolean;
}

// Mock diff data
const mockDiffs: FileDiff[] = [
  {
    id: '1',
    filename: 'App.tsx',
    path: 'src/App.tsx',
    status: 'modified',
    language: 'typescript',
    stats: { additions: 8, deletions: 3, changes: 11 },
    chunks: [
      {
        id: 'chunk1',
        oldStart: 15,
        oldLength: 8,
        newStart: 15,
        newLength: 13,
        lines: [
          { id: 'line1', type: 'context', oldLineNumber: 15, newLineNumber: 15, content: 'import React from \'react\';' },
          { id: 'line2', type: 'context', oldLineNumber: 16, newLineNumber: 16, content: 'import { BrowserRouter as Router } from \'react-router-dom\';' },
          { id: 'line3', type: 'deletion', oldLineNumber: 17, content: 'import Layout from \'./components/Layout\';' },
          { id: 'line4', type: 'addition', newLineNumber: 17, content: 'import AppShell from \'./layout/AppShell\';' },
          { id: 'line5', type: 'addition', newLineNumber: 18, content: 'import { AnimatePresence } from \'framer-motion\';' },
          { id: 'line6', type: 'context', oldLineNumber: 18, newLineNumber: 19, content: '' },
          { id: 'line7', type: 'context', oldLineNumber: 19, newLineNumber: 20, content: 'function App() {' },
          { id: 'line8', type: 'context', oldLineNumber: 20, newLineNumber: 21, content: '  return (' },
          { id: 'line9', type: 'deletion', oldLineNumber: 21, content: '    <Layout>' },
          { id: 'line10', type: 'addition', newLineNumber: 22, content: '    <AppShell>' },
          { id: 'line11', type: 'addition', newLineNumber: 23, content: '      <AnimatePresence mode="wait">' },
          { id: 'line12', type: 'context', oldLineNumber: 22, newLineNumber: 24, content: '      <Routes>' },
          { id: 'line13', type: 'context', oldLineNumber: 23, newLineNumber: 25, content: '        <Route path="/" element={<Landing />} />' },
          { id: 'line14', type: 'context', oldLineNumber: 24, newLineNumber: 26, content: '      </Routes>' },
          { id: 'line15', type: 'addition', newLineNumber: 27, content: '      </AnimatePresence>' },
          { id: 'line16', type: 'deletion', oldLineNumber: 25, content: '    </Layout>' },
          { id: 'line17', type: 'addition', newLineNumber: 28, content: '    </AppShell>' }
        ]
      }
    ]
  },
  {
    id: '2',
    filename: 'layout.css',
    path: 'src/styles/layout.css',
    status: 'added',
    language: 'css',
    stats: { additions: 15, deletions: 0, changes: 15 },
    chunks: [
      {
        id: 'chunk2',
        oldStart: 0,
        oldLength: 0,
        newStart: 1,
        newLength: 15,
        lines: [
          { id: 'css1', type: 'addition', newLineNumber: 1, content: '.app-shell {' },
          { id: 'css2', type: 'addition', newLineNumber: 2, content: '  min-height: 100vh;' },
          { id: 'css3', type: 'addition', newLineNumber: 3, content: '  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);' },
          { id: 'css4', type: 'addition', newLineNumber: 4, content: '}' },
          { id: 'css5', type: 'addition', newLineNumber: 5, content: '' },
          { id: 'css6', type: 'addition', newLineNumber: 6, content: '.sidebar {' },
          { id: 'css7', type: 'addition', newLineNumber: 7, content: '  width: 256px;' },
          { id: 'css8', type: 'addition', newLineNumber: 8, content: '  background: rgba(30, 41, 59, 0.8);' },
          { id: 'css9', type: 'addition', newLineNumber: 9, content: '  backdrop-filter: blur(12px);' },
          { id: 'css10', type: 'addition', newLineNumber: 10, content: '  border-right: 1px solid rgba(148, 163, 184, 0.1);' },
          { id: 'css11', type: 'addition', newLineNumber: 11, content: '}' }
        ]
      }
    ]
  },
  {
    id: '3',
    filename: 'oldComponent.tsx',
    path: 'src/components/oldComponent.tsx',
    status: 'deleted',
    language: 'typescript',
    stats: { additions: 0, deletions: 25, changes: 25 },
    chunks: [
      {
        id: 'chunk3',
        oldStart: 1,
        oldLength: 25,
        newStart: 0,
        newLength: 0,
        lines: [
          { id: 'del1', type: 'deletion', oldLineNumber: 1, content: 'import React from \'react\';' },
          { id: 'del2', type: 'deletion', oldLineNumber: 2, content: '' },
          { id: 'del3', type: 'deletion', oldLineNumber: 3, content: 'const OldComponent: React.FC = () => {' },
          { id: 'del4', type: 'deletion', oldLineNumber: 4, content: '  return (' },
          { id: 'del5', type: 'deletion', oldLineNumber: 5, content: '    <div className="old-component">' },
          { id: 'del6', type: 'deletion', oldLineNumber: 6, content: '      <h1>This component is deprecated</h1>' },
          { id: 'del7', type: 'deletion', oldLineNumber: 7, content: '    </div>' },
          { id: 'del8', type: 'deletion', oldLineNumber: 8, content: '  );' },
          { id: 'del9', type: 'deletion', oldLineNumber: 9, content: '};' }
        ]
      }
    ]
  }
];

const DiffViewerPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileDiff | null>(mockDiffs[0]);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showWhitespace, setShowWhitespace] = useState(false);
  const [expandedChunks, setExpandedChunks] = useState<Set<string>>(new Set(['chunk1']));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredDiffs = useMemo(() => {
    let filtered = mockDiffs;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(diff => diff.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(diff => 
        diff.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        diff.path.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [filterStatus, searchTerm]);

  const toggleChunk = (chunkId: string) => {
    const newExpanded = new Set(expandedChunks);
    if (newExpanded.has(chunkId)) {
      newExpanded.delete(chunkId);
    } else {
      newExpanded.add(chunkId);
    }
    setExpandedChunks(newExpanded);
  };

  const getFileIcon = (status: string) => {
    switch (status) {
      case 'added': return <Plus className="w-4 h-4 text-green-400" />;
      case 'deleted': return <Minus className="w-4 h-4 text-red-400" />;
      case 'modified': return <FileText className="w-4 h-4 text-yellow-400" />;
      case 'renamed': return <RotateCcw className="w-4 h-4 text-blue-400" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'added': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'deleted': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'modified': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'renamed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const copyContent = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const exportDiff = () => {
    const diffContent = selectedFile?.chunks.map(chunk => 
      chunk.lines.map(line => {
        const prefix = line.type === 'addition' ? '+' : line.type === 'deletion' ? '-' : ' ';
        return `${prefix} ${line.content}`;
      }).join('\n')
    ).join('\n\n');
    
    if (diffContent) {
      const blob = new Blob([diffContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedFile?.filename}.diff`;
      a.click();
      URL.revokeObjectURL(url);
    }
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
            Diff{' '}
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Viewer
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Advanced code diff visualization with syntax highlighting and intelligent change detection
          </p>
        </motion.div>

        {/* Toolbar */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-wrap gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                title="Filter files by status"
                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              >
                <option value="all">All Files</option>
                <option value="added">Added</option>
                <option value="modified">Modified</option>
                <option value="deleted">Deleted</option>
                <option value="renamed">Renamed</option>
              </select>
            </div>

            <div className="flex gap-2">
              {/* View Mode Toggle */}
              <div className="flex bg-slate-700/30 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    viewMode === 'split' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setViewMode('unified')}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    viewMode === 'unified' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Unified View
                </button>
              </div>

              {/* Options */}
              <button
                onClick={() => setShowLineNumbers(!showLineNumbers)}
                className={`p-2 rounded-lg transition-colors ${
                  showLineNumbers 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-700/50 text-white/70 hover:text-white'
                }`}
                title="Toggle line numbers"
              >
                <Hash className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowWhitespace(!showWhitespace)}
                className={`p-2 rounded-lg transition-colors ${
                  showWhitespace 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-700/50 text-white/70 hover:text-white'
                }`}
                title="Toggle whitespace visibility"
              >
                {showWhitespace ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={exportDiff}
                className="p-2 bg-slate-700/50 text-white/70 hover:text-white rounded-lg transition-colors"
                title="Export diff"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* File Tree */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="bg-slate-700/30 border-b border-slate-600/30 px-4 py-3">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  Changed Files ({filteredDiffs.length})
                </h3>
              </div>

              <div className="p-2 max-h-96 overflow-y-auto">
                {filteredDiffs.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedFile(diff)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 group ${
                      selectedFile?.id === diff.id
                        ? 'bg-purple-600/20 border border-purple-500/30'
                        : 'hover:bg-slate-700/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {getFileIcon(diff.status)}
                      <span className="font-mono text-sm text-white truncate flex-1">
                        {diff.filename}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded border ${getStatusColor(diff.status)}`}>
                        {diff.status}
                      </span>
                      <div className="flex gap-2 text-white/60">
                        <span className="text-green-400">+{diff.stats.additions}</span>
                        <span className="text-red-400">-{diff.stats.deletions}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-white/50 mt-1 truncate">
                      {diff.path}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diff Content */}
          <div className="lg:col-span-3">
            {selectedFile ? (
              <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden">
                {/* File Header */}
                <div className="bg-slate-700/30 border-b border-slate-600/30 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(selectedFile.status)}
                      <h3 className="font-mono text-white">{selectedFile.filename}</h3>
                      <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(selectedFile.status)}`}>
                        {selectedFile.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex gap-3 text-sm">
                        <span className="text-green-400">+{selectedFile.stats.additions}</span>
                        <span className="text-red-400">-{selectedFile.stats.deletions}</span>
                        <span className="text-white/60">{selectedFile.stats.changes} changes</span>
                      </div>
                      
                      <button
                        onClick={() => copyContent(selectedFile.chunks.map(c => c.lines.map(l => l.content).join('\n')).join('\n'))}
                        className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors"
                        title="Copy file content"
                      >
                        <Copy className="w-4 h-4 text-white/70" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Diff Content */}
                <div className="overflow-auto">
                  {selectedFile.chunks.map((chunk) => (
                    <div key={chunk.id} className="border-b border-slate-700/30 last:border-b-0">
                      {/* Chunk Header */}
                      <button
                        onClick={() => toggleChunk(chunk.id)}
                        className="w-full px-6 py-3 bg-slate-700/20 hover:bg-slate-700/30 transition-colors flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          {expandedChunks.has(chunk.id) ? (
                            <ChevronDown className="w-4 h-4 text-white/60" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-white/60" />
                          )}
                          <span className="font-mono text-sm text-blue-400">
                            @@ -{chunk.oldStart},{chunk.oldLength} +{chunk.newStart},{chunk.newLength} @@
                          </span>
                        </div>
                        
                        <div className="flex gap-2 text-xs text-white/60">
                          <span>{chunk.lines.length} lines</span>
                        </div>
                      </button>

                      {/* Chunk Content */}
                      <AnimatePresence>
                        {expandedChunks.has(chunk.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="font-mono text-sm">
                              {chunk.lines.map((line) => (
                                <div
                                  key={line.id}
                                  className={`flex ${
                                    line.type === 'addition' 
                                      ? 'bg-green-400/10 border-l-4 border-green-400' 
                                      : line.type === 'deletion'
                                      ? 'bg-red-400/10 border-l-4 border-red-400'
                                      : 'hover:bg-slate-700/20'
                                  }`}
                                >
                                  {showLineNumbers && (
                                    <div className="flex bg-slate-800/30 border-r border-slate-700/30">
                                      <div className="px-4 py-1 text-white/40 text-right w-16">
                                        {line.oldLineNumber || ''}
                                      </div>
                                      <div className="px-4 py-1 text-white/40 text-right w-16">
                                        {line.newLineNumber || ''}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="flex-1 px-4 py-1">
                                    <span
                                      className={`inline-block w-4 text-center mr-2 ${
                                        line.type === 'addition' 
                                          ? 'text-green-400' 
                                          : line.type === 'deletion'
                                          ? 'text-red-400'
                                          : 'text-white/40'
                                      }`}
                                    >
                                      {line.type === 'addition' ? '+' : line.type === 'deletion' ? '-' : ' '}
                                    </span>
                                    <span className="text-white/90">
                                      {showWhitespace 
                                        ? line.content.replace(/ /g, '·').replace(/\t/g, '→') 
                                        : line.content
                                      }
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-12 text-center">
                <GitCommit className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl text-white/60 mb-2">Select a file to view changes</h3>
                <p className="text-white/40">Choose a file from the sidebar to see detailed diff information</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {mockDiffs.reduce((sum, diff) => sum + diff.stats.additions, 0)}
            </div>
            <div className="text-sm text-white/70">Lines Added</div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {mockDiffs.reduce((sum, diff) => sum + diff.stats.deletions, 0)}
            </div>
            <div className="text-sm text-white/70">Lines Removed</div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {mockDiffs.length}
            </div>
            <div className="text-sm text-white/70">Files Changed</div>
          </div>
          
          <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {mockDiffs.reduce((sum, diff) => sum + diff.chunks.length, 0)}
            </div>
            <div className="text-sm text-white/70">Total Chunks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffViewerPage;