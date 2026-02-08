import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';

function EPAChart({ passEPA, runEPA, recommendation }) {
  const data = [
    { name: 'Pass', value: passEPA, fill: '#3B82F6' },
    { name: 'Run', value: runEPA, fill: '#10B981' },
  ];

  // Determine colors based on recommendation
  const getColor = (name) => {
    if (recommendation === 'pass' && name === 'Pass') return '#3B82F6';
    if (recommendation === 'run' && name === 'Run') return '#10B981';
    return '#9CA3AF';
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
      <div className="text-xs text-gray-500 mb-2 font-medium">Expected Points Added</div>
      
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 0, right: 10 }}>
            <XAxis 
              type="number" 
              domain={['auto', 'auto']}
              tick={{ fontSize: 10 }}
              tickFormatter={(v) => v.toFixed(2)}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 11 }}
              width={40}
            />
            <ReferenceLine x={0} stroke="#6B7280" strokeDasharray="3 3" />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(entry.name)}
                  opacity={getColor(entry.name) === '#9CA3AF' ? 0.5 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div 
            className="w-3 h-3 rounded" 
            style={{ backgroundColor: recommendation === 'pass' ? '#3B82F6' : '#9CA3AF' }}
          />
          <span>Pass: {passEPA >= 0 ? '+' : ''}{passEPA.toFixed(3)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div 
            className="w-3 h-3 rounded" 
            style={{ backgroundColor: recommendation === 'run' ? '#10B981' : '#9CA3AF' }}
          />
          <span>Run: {runEPA >= 0 ? '+' : ''}{runEPA.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
}

export default EPAChart;
