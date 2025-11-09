import { ArrowLeft, Flame, Beef, Wheat, Droplet } from 'lucide-react';
import { NutritionData } from '../types';

interface NutritionResultsProps {
  data: NutritionData;
  onReset: () => void;
  backgroundUrl?: string;
}

const NutritionResults = ({ data, onReset, backgroundUrl }: NutritionResultsProps) => {
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

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{data.mealName}</h2>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          <p className="text-gray-600">
            {data.confidence}% confidence match
          </p>
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-orange-600" />
                <h3 className="text-sm font-semibold text-orange-900 uppercase tracking-wide">
                  Calories
                </h3>
              </div>
              <p className="text-4xl font-bold text-orange-900">{data.calories}</p>
              <p className="text-sm text-orange-700 mt-1">kcal</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-white/50 flex items-center justify-center">
              <Flame className="w-10 h-10 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Beef className="w-5 h-5 text-rose-600" />
              <h3 className="text-sm font-semibold text-rose-900 uppercase tracking-wide">
                Protein
              </h3>
            </div>
            <p className="text-3xl font-bold text-rose-900">{data.protein}g</p>
            <div className="mt-3 bg-white/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-rose-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((data.protein / 50) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Wheat className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-900 uppercase tracking-wide">
                Carbs
              </h3>
            </div>
            <p className="text-3xl font-bold text-amber-900">{data.carbs}g</p>
            <div className="mt-3 bg-white/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((data.carbs / 50) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Droplet className="w-5 h-5 text-yellow-600" />
              <h3 className="text-sm font-semibold text-yellow-900 uppercase tracking-wide">
                Fat
              </h3>
            </div>
            <p className="text-3xl font-bold text-yellow-900">{data.fat}g</p>
            <div className="mt-3 bg-white/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-yellow-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((data.fat / 30) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Macronutrient Breakdown
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Protein</span>
            <span className="font-semibold text-gray-900">
              {Math.round((data.protein * 4) / data.calories * 100)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Carbohydrates</span>
            <span className="font-semibold text-gray-900">
              {Math.round((data.carbs * 4) / data.calories * 100)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Fat</span>
            <span className="font-semibold text-gray-900">
              {Math.round((data.fat * 9) / data.calories * 100)}%
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NutritionResults;
