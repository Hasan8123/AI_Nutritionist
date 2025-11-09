import { useState, useRef } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { NutritionData, WebhookResponse } from '../types';

interface ImageUploadProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (data: NutritionData) => void;
  onWebhookComplete: (data: WebhookResponse) => void;
  isAnalyzing: boolean;
  onPreview?: (url: string) => void;
}

const ImageUpload = ({ onAnalysisStart, onAnalysisComplete, onWebhookComplete, isAnalyzing, onPreview }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async (file: File) => {
    try {
      setError(null);
      onAnalysisStart();

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        if (onPreview && reader.result) {
          onPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);

      const webhookUrl = 'https://vepatib882.app.n8n.cloud/webhook/meal-ai';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      // Attempt to parse JSON; fallback to text then JSON.parse
      let payload: any;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        payload = await response.json();
      } else {
        const text = await response.text();
        try {
          payload = JSON.parse(text);
        } catch {
          // If not JSON, throw to hit fallback UI
          throw new Error('Webhook returned non-JSON response');
        }
      }

      // Normalize into WebhookResponse shape: [{ action, response: { output } }]
      const normalize = (p: any): WebhookResponse => {
        // Already correct array shape
        if (Array.isArray(p) && p.length && (p[0]?.response?.output || p[0]?.output)) {
          return p.map((item: any) => {
            if (item?.response?.output) return item as any;
            if (item?.output) return { action: item.action ?? 'parse', response: { output: item.output } };
            return item;
          });
        }

        // Single envelope object
        if (p?.response?.output) {
          return [{ action: p.action ?? 'parse', response: { output: p.response.output } }];
        }

        // Raw output at root
        if (p?.output) {
          return [{ action: 'parse', response: { output: p.output } }];
        }

        // Raw food/total/status at root
        if (p?.food && p?.total && p?.status) {
          return [{ action: 'parse', response: { output: { status: p.status, food: p.food, total: p.total } } }];
        }

        // Unknown shape; wrap as-is for debugging display
        return [{ action: 'unknown', response: { output: undefined as any } }] as unknown as WebhookResponse;
      };

      const normalized = normalize(payload);
      onWebhookComplete(normalized as WebhookResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
      onAnalysisComplete({
        mealName: 'Grilled Chicken Salad',
        calories: 425,
        protein: 38,
        carbs: 24,
        fat: 18,
        confidence: 85,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      analyzeImage(file);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {previewUrl && (
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={previewUrl}
            alt="Meal preview"
            className="w-full h-64 object-cover"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-3" />
                <p className="font-medium">Analyzing your meal...</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => cameraInputRef.current?.click()}
          disabled={isAnalyzing}
          className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-medium py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          <Camera className="w-5 h-5" />
          Take Photo
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isAnalyzing}
          className="flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white font-medium py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          <Upload className="w-5 h-5" />
          Upload Image
        </button>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
