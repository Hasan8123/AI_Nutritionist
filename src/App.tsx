import { useState } from 'react';
import { Zap, ChevronDown } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import NutritionResults from './components/NutritionResults';
import WebhookResults from './components/WebhookResults';
import PreviewCarousel from './components/PreviewCarousel';
import AuthGate from './components/AuthGate';
import type { NutritionData, WebhookResponse } from './types';

function App() {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [webhookData, setWebhookData] = useState<WebhookResponse | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAnalysisComplete = (data: NutritionData) => {
    setNutritionData(data);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setNutritionData(null);
    setWebhookData(null);
    setIsAnalyzing(false);
    setPreviewUrl(null);
  };

  return (
    <AuthGate>
      <div className="min-h-screen relative">
        <div className="fixed inset-0 bg-black/50 pointer-events-none" />
        <div className="relative z-10">
        {!nutritionData && !webhookData ? (
          <>
            <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
              <header className="text-center mb-16 sm:mb-20">
                <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/15 transition-colors">
                  <Zap className="w-4 h-4 text-blue-300 mr-2" />
                  <span className="text-sm font-medium text-blue-200">Instant AI Analysis</span>
                </div>

                <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
                  Know Your
                  <br />
                  <span className="text-glow">Nutrition Instantly</span>
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-12">
                  Snap a meal. Get complete macros. No guessing. No complicated apps. Just real nutritional intelligence powered by AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <a href="#upload" className="btn-primary-glow inline-flex items-center justify-center gap-2 text-lg">
                    <span>Start Analyzing</span>
                    <ChevronDown className="w-5 h-5" />
                  </a>
                  <a href="#details" className="px-8 py-4 font-semibold text-white rounded-xl transition-all border border-white/30 hover:bg-white/10 hover:border-white/50 text-center">
                    Learn More
                  </a>
                </div>
              </header>

              <div id="upload" className="mb-24 scroll-mt-32">
                <ImageUpload
                  onAnalysisStart={() => setIsAnalyzing(true)}
                  onAnalysisComplete={handleAnalysisComplete}
                  onWebhookComplete={(data) => { setWebhookData(data); setIsAnalyzing(false); }}
                  isAnalyzing={isAnalyzing}
                  onPreview={(url) => setPreviewUrl(url)}
                />
              </div>

              <div id="details" className="mb-24 pt-20 border-t border-white/10">
                <div className="mb-12">
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                    See Your Nutrition<br />
                    <span className="text-glow">In Beautiful Detail</span>
                  </h2>
                  <p className="text-white/60 text-lg max-w-2xl">
                    Instantly discover calories, macros, and micronutrients with AI precision. Watch as your meal transforms into actionable nutritional insights.
                  </p>
                </div>
                <PreviewCarousel />
              </div>

              <div className="grid sm:grid-cols-3 gap-6 py-20">
                <div className="card-glow">
                  <div className="text-4xl font-bold text-blue-300 mb-2">98%</div>
                  <p className="text-white/70">Accuracy Rate</p>
                  <p className="text-white/40 text-sm mt-2">Industry-leading precision</p>
                </div>
                <div className="card-glow">
                  <div className="text-4xl font-bold text-cyan-300 mb-2">&lt;1s</div>
                  <p className="text-white/70">Analysis Time</p>
                  <p className="text-white/40 text-sm mt-2">Instant results</p>
                </div>
                <div className="card-glow">
                  <div className="text-4xl font-bold text-blue-300 mb-2">1000+</div>
                  <p className="text-white/70">Foods Recognized</p>
                  <p className="text-white/40 text-sm mt-2">Comprehensive database</p>
                </div>
              </div>

              <footer className="text-center py-12 border-t border-white/10 text-white/50 text-sm">
                <p>Powered by advanced AI • Nutritional estimates may vary slightly</p>
              </footer>
            </div>
          </>
        ) : webhookData ? (
          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
            <WebhookResults data={webhookData} onReset={handleReset} backgroundUrl={previewUrl ?? undefined} />
          </div>
        ) : nutritionData ? (
          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
            <NutritionResults data={nutritionData} onReset={handleReset} backgroundUrl={previewUrl ?? undefined} />
          </div>
        ) : null}
        </div>
      </div>
    </AuthGate>
  );
}

export default App;









