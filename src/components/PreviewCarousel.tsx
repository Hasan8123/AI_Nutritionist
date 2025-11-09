import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Beef, Wheat, Droplet } from 'lucide-react';

interface PreviewMeal {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
}

const PREVIEW_MEALS: PreviewMeal[] = [
  {
    id: 1,
    name: 'Grilled Salmon',
    calories: 520,
    protein: 42,
    carbs: 45,
    fat: 18,
    image: 'https://images.pexels.com/photos/2403220/pexels-photo-2403220.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    name: 'Buddha Bowl',
    calories: 380,
    protein: 15,
    carbs: 58,
    fat: 12,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    name: 'Grilled Steak',
    calories: 580,
    protein: 48,
    carbs: 22,
    fat: 32,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const PreviewCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PREVIEW_MEALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoplay]);

  const meal = PREVIEW_MEALS[current];

  const goToPrev = () => {
    setIsAutoplay(false);
    setCurrent((prev) => (prev - 1 + PREVIEW_MEALS.length) % PREVIEW_MEALS.length);
  };

  const goToNext = () => {
    setIsAutoplay(false);
    setCurrent((prev) => (prev + 1) % PREVIEW_MEALS.length);
  };

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-sm font-medium opacity-75">Your Uploaded Meal</p>
            <h3 className="text-2xl font-bold">{meal.name}</h3>
          </div>
        </div>

        <div className="space-y-6 animate-slide-in-up">
          <div>
            <p className="text-blue-300 text-sm font-semibold mb-2 uppercase tracking-wide">
              Instant Breakdown
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              Complete Nutritional Analysis
            </h3>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <Flame className="w-6 h-6 text-orange-300" />
                </div>
                <span className="text-white/80">Calories</span>
              </div>
              <span className="text-3xl font-bold text-white">{meal.calories}</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Beef className="w-4 h-4 text-rose-300" />
                  <span className="text-white/60 text-sm">Protein</span>
                </div>
                <p className="text-2xl font-bold text-rose-300">{meal.protein}g</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Wheat className="w-4 h-4 text-amber-300" />
                  <span className="text-white/60 text-sm">Carbs</span>
                </div>
                <p className="text-2xl font-bold text-amber-300">{meal.carbs}g</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="w-4 h-4 text-yellow-300" />
                  <span className="text-white/60 text-sm">Fat</span>
                </div>
                <p className="text-2xl font-bold text-yellow-300">{meal.fat}g</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-white/60 text-sm mb-3">Analyzed in seconds</p>
              <div className="flex gap-2">
                <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                <div className="flex-1 h-1 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {PREVIEW_MEALS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              setIsAutoplay(false);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? 'bg-blue-400 w-8' : 'bg-white/20 w-2'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={goToPrev}
          className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goToNext}
          className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PreviewCarousel;
