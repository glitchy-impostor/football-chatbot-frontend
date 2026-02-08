import { User, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { getTeamColor } from '../utils/teams';
import EPAChart from './EPAChart';

function Message({ message, userContext }) {
  const [showData, setShowData] = useState(false);
  const isUser = message.role === 'user';
  const isError = message.isError;

  // Format timestamp
  const time = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Get team color for styling
  const teamColor = userContext?.favoriteTeam 
    ? getTeamColor(userContext.favoriteTeam) 
    : null;

  // Parse markdown-style formatting
  const formatContent = (text) => {
    if (!text) return null;

    // Split by lines and process
    const lines = text.split('\n');
    const elements = [];
    let inList = false;
    let listItems = [];

    lines.forEach((line, i) => {
      // Headers
      if (line.startsWith('**') && line.endsWith('**')) {
        if (inList) {
          elements.push(<ul key={`list-${i}`} className="list-disc ml-4 mb-2">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <h3 key={i} className="font-semibold mt-3 mb-1 first:mt-0">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      }
      // List items
      else if (line.startsWith('• ') || line.startsWith('- ')) {
        inList = true;
        listItems.push(
          <li key={i} className="text-sm">
            {formatInlineStyles(line.substring(2))}
          </li>
        );
      }
      // Regular paragraphs
      else if (line.trim()) {
        if (inList) {
          elements.push(<ul key={`list-${i}`} className="list-disc ml-4 mb-2 space-y-1">{listItems}</ul>);
          listItems = [];
          inList = false;
        }
        elements.push(
          <p key={i} className="mb-2 last:mb-0">
            {formatInlineStyles(line)}
          </p>
        );
      }
    });

    // Close any open list
    if (inList && listItems.length > 0) {
      elements.push(<ul key="final-list" className="list-disc ml-4 mb-2 space-y-1">{listItems}</ul>);
    }

    return elements;
  };

  // Format inline styles (bold, etc.)
  const formatInlineStyles = (text) => {
    // Split by bold markers
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Check if message has EPA data to visualize
  const hasEPAData = message.data?.analysis?.pass_epa !== undefined;
  const hasDecisionData = message.data?.go_for_it !== undefined;

  return (
    <div className={`flex items-start gap-3 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-gray-200 dark:bg-gray-700' 
            : isError 
              ? 'bg-red-100 dark:bg-red-900'
              : 'bg-blue-100 dark:bg-blue-900'
        }`}
        style={isUser && teamColor ? { backgroundColor: teamColor + '20' } : {}}
      >
        {isUser ? (
          <User size={16} className="text-gray-600 dark:text-gray-400" style={teamColor ? { color: teamColor } : {}} />
        ) : isError ? (
          <AlertCircle size={16} className="text-red-600 dark:text-red-400" />
        ) : (
          <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div 
          className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-blue-600 text-white rounded-tr-sm' 
              : isError
                ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-tl-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-sm'
          }`}
        >
          <div className="message-content text-sm">
            {isUser ? message.content : formatContent(message.content)}
          </div>
        </div>

        {/* Metadata */}
        <div className={`flex items-center gap-2 mt-1 text-xs text-gray-400 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span>{time}</span>
          
          {!isUser && message.pipeline && (
            <>
              <span>•</span>
              <span className="capitalize">{message.pipeline.replace(/_/g, ' ')}</span>
            </>
          )}
          
          {!isUser && message.usedLlm && (
            <span className="badge badge-info">LLM</span>
          )}
        </div>

        {/* EPA Visualization */}
        {hasEPAData && !isUser && (
          <div className="mt-3 w-full">
            <EPAChart 
              passEPA={message.data.analysis.pass_epa}
              runEPA={message.data.analysis.run_epa}
              recommendation={message.data.analysis.recommendation}
            />
          </div>
        )}

        {/* Decision Visualization */}
        {hasDecisionData && !isUser && (
          <div className="mt-3 w-full bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <div className="text-center">
                <div className="font-semibold text-lg">
                  {message.data.go_for_it?.expected_points?.toFixed(2)}
                </div>
                <div className="text-gray-500 text-xs">Go for it EP</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg">
                  {message.data.field_goal?.expected_points?.toFixed(2)}
                </div>
                <div className="text-gray-500 text-xs">Field Goal EP</div>
              </div>
            </div>
          </div>
        )}

        {/* Show raw data toggle */}
        {!isUser && message.data && (
          <button
            onClick={() => setShowData(!showData)}
            className="flex items-center gap-1 mt-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showData ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showData ? 'Hide' : 'Show'} raw data
          </button>
        )}

        {/* Raw data display */}
        {showData && message.data && (
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs overflow-x-auto max-w-full">
            {JSON.stringify(message.data, null, 2)}
          </pre>
        )}

        {/* Suggestions */}
        {!isUser && message.suggestions?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, i) => (
              <span key={i} className="text-xs text-gray-500 dark:text-gray-400 italic">
                💡 {suggestion}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
