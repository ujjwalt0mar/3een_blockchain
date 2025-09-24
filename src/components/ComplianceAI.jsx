import React from 'react';
import { Zap, Award, AlertCircle, CheckCircle } from 'lucide-react';

const ComplianceAI = ({ complianceScore, isAnalyzing }) => {
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'B':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'C':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  const getMetricIcon = (status) => {
    switch (status) {
      case 'Complete':
      case 'Verified':
      case 'Active':
      case 'Up to Date':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending':
      case 'In Progress':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">AI Compliance Engine</h2>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400 transition-colors duration-300">Analyzing compliance metrics...</span>
        </div>
      ) : complianceScore ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 transition-colors duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Compliance Score</span>
              </div>
              <div className={`px-3 py-1 rounded-full font-bold ${getGradeColor(complianceScore.grade)}`}>
                Grade {complianceScore.grade}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(complianceScore.score)} transition-colors duration-300`}>
                {complianceScore.score}/100
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">Overall Compliance Rating</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-colors duration-300">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Compliance Metrics</h4>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(complianceScore.metrics).map(([metric, status]) => (
                <div key={metric} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                  <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">{metric}</span>
                  <div className="flex items-center space-x-2">
                    {getMetricIcon(status)}
                    <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 transition-colors duration-300">
            <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2 transition-colors duration-300">AI Recommendations</h4>
            <ul className="space-y-1">
              {complianceScore.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-purple-700 dark:text-purple-400 flex items-center space-x-2 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 border border-indigo-200 dark:border-indigo-800 transition-colors duration-300">
            <p className="text-sm text-indigo-800 dark:text-indigo-300 transition-colors duration-300">
              <strong>AI Compliance Engine:</strong> Continuously monitors regulatory requirements and provides real-time compliance scoring using advanced machine learning algorithms.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Connect wallet to analyze compliance status</p>
        </div>
      )}
    </div>
  );
};

export default ComplianceAI;
