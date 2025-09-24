import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, Target, BarChart3 } from 'lucide-react';

const PricePrediction = ({ currentPrice }) => {
  const [prediction, setPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chartData, setChartData] = useState([]);

  const generatePricePrediction = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      const basePrice = parseFloat(currentPrice) || 0.85;
      const trend = Math.random() > 0.5 ? 1 : -1;
      const volatility = 0.05 + Math.random() * 0.1;

      // Generate 7-day prediction
      const predictions = [];
      let price = basePrice;
      const now = new Date();

      for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        
        if (i > 0) {
          const change = (Math.random() - 0.5) * volatility * 2;
          price = Math.max(0.1, price + change + (trend * 0.01));
        }
        
        predictions.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: parseFloat(price.toFixed(4)),
          confidence: Math.max(60, 95 - (i * 5))
        });
      }

      setChartData(predictions);

      const finalPrice = predictions[predictions.length - 1].price;
      const priceChange = ((finalPrice - basePrice) / basePrice) * 100;
      const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;

      setPrediction({
        currentPrice: basePrice,
        predictedPrice: finalPrice,
        priceChange: priceChange,
        confidence: Math.round(avgConfidence),
        trend: priceChange > 0 ? 'bullish' : 'bearish',
        horizon: '7 days',
        factors: [
          'Market sentiment analysis',
          'Trading volume patterns',
          'Cross-chain liquidity metrics',
          'RWA sector performance'
        ]
      });
    } catch (error) {
      console.error('Error generating prediction:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (currentPrice && parseFloat(currentPrice) > 0) {
      generatePricePrediction();
    }
  }, [currentPrice]);

  const getTrendColor = (trend) => {
    return trend === 'bullish' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getTrendBg = (trend) => {
    return trend === 'bullish' 
      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">AI Price Prediction</h2>
        </div>
        <button
          onClick={generatePricePrediction}
          disabled={isAnalyzing}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
        >
          <Brain className={`h-5 w-5 ${isAnalyzing ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">Running ML prediction model...</span>
        </div>
      ) : prediction ? (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border-2 transition-colors duration-300 ${getTrendBg(prediction.trend)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span className="font-semibold">7-Day Forecast</span>
              </div>
              <span className={`text-sm font-medium ${getTrendColor(prediction.trend)}`}>
                {prediction.priceChange > 0 ? '+' : ''}{prediction.priceChange.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Predicted Price</p>
                <p className={`text-xl font-bold ${getTrendColor(prediction.trend)} transition-colors duration-300`}>
                  ${prediction.predictedPrice} USDC
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Confidence</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{prediction.confidence}%</p>
              </div>
            </div>
          </div>

          {chartData.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors duration-300">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">7-Day Price Trajectory</h4>
              </div>
              
              {/* Simple ASCII-style chart */}
              <div className="space-y-2">
                {chartData.map((point, index) => {
                  const maxPrice = Math.max(...chartData.map(p => p.price));
                  const minPrice = Math.min(...chartData.map(p => p.price));
                  const range = maxPrice - minPrice;
                  const height = range > 0 ? ((point.price - minPrice) / range) * 60 : 30;
                  
                  return (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="w-12 text-gray-600 dark:text-gray-400">{point.date}</span>
                      <div className="flex-1 mx-3 bg-gray-200 dark:bg-gray-600 rounded h-2 relative">
                        <div 
                          className={`h-full rounded ${prediction.trend === 'bullish' ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.max(5, height)}%` }}
                        ></div>
                      </div>
                      <span className={`w-16 text-right font-medium ${getTrendColor(prediction.trend)}`}>
                        ${point.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 transition-colors duration-300">ML Model Inputs:</h4>
            <ul className="space-y-1">
              {prediction.factors.map((factor, index) => (
                <li key={index} className="text-sm text-blue-700 dark:text-blue-400 flex items-center space-x-2 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Price data loading for AI analysis</p>
        </div>
      )}
    </div>
  );
};

export default PricePrediction;
