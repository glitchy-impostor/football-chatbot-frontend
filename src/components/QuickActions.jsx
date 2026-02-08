import { QUICK_ACTIONS } from '../utils/teams';

function QuickActions({ onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-xl">
      {QUICK_ACTIONS.map((action, i) => (
        <button
          key={i}
          onClick={() => onSelect(action.query)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     rounded-xl text-sm text-gray-700 dark:text-gray-300
                     hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400
                     transition-all duration-200 shadow-sm hover:shadow"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

export default QuickActions;
