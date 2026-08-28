'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export interface ClicksChartProps {
  data: { date: string; clicks: number }[];
}

export default function ClicksChart({ data }: ClicksChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[300px] flex flex-col justify-center items-center text-center">
        <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 mb-5">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h4 className="font-semibold text-stone-900 mb-1.5">No traffic data yet</h4>
        <p className="text-sm text-stone-500 max-w-sm">
          Share your tracking links to start seeing traffic here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#a8a29e', fontSize: 11 }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#a8a29e', fontSize: 11 }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              border: '1px solid #e7e5e4',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              padding: '8px 12px'
            }}
            itemStyle={{ color: '#1c1917', fontSize: '13px', fontWeight: 600 }}
            labelStyle={{ color: '#78716c', fontSize: '12px', marginBottom: '4px' }}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#1c1917" /* stone-900 */
            strokeWidth={3} 
            dot={{ r: 4, fill: '#fff', stroke: '#1c1917', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#1c1917', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
