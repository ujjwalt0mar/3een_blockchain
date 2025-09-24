import React from 'react';
import { Brain, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const AIRiskAssessment = ({ riskScore, isAnalyzing }) => {
  const getRiskIcon = (level) => {
    switch (level) {
      case 'Low Risk':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Medium Risk':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'High Risk':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRiskColors = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300';
      case 'red':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">AI Risk Assessment</h2>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 dark:border-cyan-400"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">Analyzing wallet patterns...</span>
        </div>
      ) : riskScore ? (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border-2 transition-colors duration-300 ${getRiskColors(riskScore.color)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getRiskIcon(riskScore.level)}
                <span className="font-semibold">{riskScore.level}</span>
              </div>
              <span className="text-2xl font-bold">{riskScore.score}/100</span>
            </div>
            <p className="text-sm">{riskScore.description}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors duration-300">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">AI Analysis Factors:</h4>
            <ul className="space-y-1">
              {riskScore.factors.map((factor, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-3 border border-cyan-200 dark:border-cyan-800 transition-colors duration-300">
            <p className="text-sm text-cyan-800 dark:text-cyan-300 transition-colors duration-300">
              <strong>AI Engine:</strong> Machine learning model trained on 50M+ wallet transactions for pattern recognition and risk scoring.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Connect wallet to enable AI risk analysis</p>
        </div>
      )}
    </div>
  );
};

export default AIRiskAssessment;
