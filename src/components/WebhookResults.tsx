import { ArrowLeft } from 'lucide-react';
import type { WebhookResponse } from '../types';

interface WebhookResultsProps {
  data: WebhookResponse;
  onReset: () => void;
  backgroundUrl?: string;
}

const WebhookResults = ({ data, onReset, backgroundUrl }: WebhookResultsProps) => {
  const first = data[0]?.response?.output;

  return (
    <div className="rounded-3xl shadow-xl p-8 sm:p-12 relative overflow-hidden">
      {backgroundUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
          />
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
        </>
      )}
      <div className="relative">
      <button
        onClick={onReset}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Analyze Another Meal</span>
      </button>

      {!first ? (
        <div>
          <div className="text-gray-700 mb-3">No data returned from webhook.</div>
          <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm overflow-x-auto text-gray-800">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Meal Analysis</h2>
            <p className="text-gray-600 mt-1">Status: {first.status}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-gray-700">Name</th>
                    <th className="text-left p-3 text-gray-700">Quantity</th>
                    <th className="text-right p-3 text-gray-700">Calories</th>
                    <th className="text-right p-3 text-gray-700">Protein (g)</th>
                    <th className="text-right p-3 text-gray-700">Carbs (g)</th>
                    <th className="text-right p-3 text-gray-700">Fat (g)</th>
                  </tr>
                </thead>
                <tbody>
                  {first.food.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-3 text-gray-900">{item.name}</td>
                      <td className="p-3 text-gray-700">{item.quantity}</td>
                      <td className="p-3 text-right text-gray-900">{item.calories}</td>
                      <td className="p-3 text-right text-gray-900">{item.protein}</td>
                      <td className="p-3 text-right text-gray-900">{item.carbs}</td>
                      <td className="p-3 text-right text-gray-900">{item.fat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="text-sm text-gray-600">Total Calories</div>
              <div className="text-2xl font-bold text-gray-900">{first.total.calories}</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="text-sm text-gray-600">Protein (g)</div>
              <div className="text-2xl font-bold text-gray-900">{first.total.protein}</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="text-sm text-gray-600">Carbs (g)</div>
              <div className="text-2xl font-bold text-gray-900">{first.total.carbs}</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="text-sm text-gray-600">Fat (g)</div>
              <div className="text-2xl font-bold text-gray-900">{first.total.fat}</div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default WebhookResults;


