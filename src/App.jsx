import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle';
import WalletConnection from './components/WalletConnection';
import KYCStatus from './components/KYCStatus';
import TokenIssuance from './components/TokenIssuance';
import UniswapLiquidity from './components/UniswapLiquidity';
import AIRiskAssessment from './components/AIRiskAssessment';
import PricePrediction from './components/PricePrediction';
import ComplianceAI from './components/ComplianceAI';

function App() {
  // Theme state
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Wallet state
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [fullWalletAddress, setFullWalletAddress] = useState('');
  const [networkStatus, setNetworkStatus] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  
  // KYC state
  const [kycStatus, setKycStatus] = useState(false);
  const [isLoadingKYC, setIsLoadingKYC] = useState(false);
  
  // Token state
  const [isMinting, setIsMinting] = useState(false);
  
  // Uniswap state
  const [priceQuote, setPriceQuote] = useState('0.00');
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  // AI state
  const [riskScore, setRiskScore] = useState(null);
  const [isAnalyzingRisk, setIsAnalyzingRisk] = useState(false);
  const [complianceScore, setComplianceScore] = useState(null);
  const [isAnalyzingCompliance, setIsAnalyzingCompliance] = useState(false);

  // Mock function to check KYC status
  const checkKYCStatus = async () => {
    setIsLoadingKYC(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock logic: randomly return true/false for demo purposes
      // In a real implementation, this would call the Oasis compliance hook
      const mockKYCStatus = Math.random() > 0.3; // 70% chance of being approved for demo
      setKycStatus(mockKYCStatus);
    } catch (error) {
      console.error('Error checking KYC status:', error);
      setKycStatus(false);
    } finally {
      setIsLoadingKYC(false);
    }
  };

  // AI-powered risk assessment
  const analyzeWalletRisk = async (address) => {
    setIsAnalyzingRisk(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI risk analysis based on wallet address
      const addressSum = address.split('').reduce((sum, char) => {
        const code = char.charCodeAt(0);
        return sum + (isNaN(code) ? 0 : code);
      }, 0);
      
      const baseRisk = (addressSum % 100) / 100;
      const adjustedRisk = Math.max(0.05, Math.min(0.95, baseRisk));
      
      // Convert to risk categories
      let riskLevel, riskColor, riskDescription;
      if (adjustedRisk < 0.3) {
        riskLevel = 'Low Risk';
        riskColor = 'green';
        riskDescription = 'Wallet shows consistent, legitimate transaction patterns';
      } else if (adjustedRisk < 0.7) {
        riskLevel = 'Medium Risk';
        riskColor = 'yellow';
        riskDescription = 'Some suspicious patterns detected, requires monitoring';
      } else {
        riskLevel = 'High Risk';
        riskColor = 'red';
        riskDescription = 'Multiple risk factors identified, enhanced due diligence required';
      }
      
      setRiskScore({
        score: Math.round(adjustedRisk * 100),
        level: riskLevel,
        color: riskColor,
        description: riskDescription,
        factors: [
          'Transaction frequency analysis',
          'Cross-chain activity patterns',
          'Smart contract interactions',
          'Historical compliance records'
        ]
      });
    } catch (error) {
      console.error('Error analyzing wallet risk:', error);
    } finally {
      setIsAnalyzingRisk(false);
    }
  };

  // AI compliance analysis
  const analyzeCompliance = async () => {
    setIsAnalyzingCompliance(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Mock AI compliance analysis
      const score = 75 + Math.random() * 20; // 75-95 range
      const roundedScore = Math.round(score);
      
      let grade, recommendations;
      if (roundedScore >= 90) {
        grade = 'A';
        recommendations = ['Maintain current compliance standards', 'Consider advanced privacy features'];
      } else if (roundedScore >= 80) {
        grade = 'B';
        recommendations = ['Implement additional KYC verification', 'Enhance transaction monitoring'];
      } else {
        grade = 'C';
        recommendations = ['Urgent: Complete missing compliance requirements', 'Implement comprehensive audit trail'];
      }
      
      setComplianceScore({
        score: roundedScore,
        grade,
        recommendations,
        metrics: {
          'KYC Verification': roundedScore > 85 ? 'Complete' : 'Pending',
          'AML Screening': 'Active',
          'Document Verification': roundedScore > 80 ? 'Verified' : 'In Progress',
          'Risk Assessment': 'Up to Date'
        }
      });
    } catch (error) {
      console.error('Error analyzing compliance:', error);
    } finally {
      setIsAnalyzingCompliance(false);
    }
  };

  // Mock function to get Uniswap quote
  const getUniswapQuote = async () => {
    setIsLoadingQuote(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock price data - in real implementation would use Uniswap SDK
      const mockPrice = (0.85 + Math.random() * 0.3).toFixed(4);
      setPriceQuote(mockPrice);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching Uniswap quote:', error);
      setPriceQuote('0.00');
    } finally {
      setIsLoadingQuote(false);
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        const address = accounts[0];
        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
        
        setWalletAddress(shortAddress);
        setFullWalletAddress(address);
        setIsConnected(true);
        setNetworkStatus('Connected');
        
        // Trigger AI analyses after wallet connection
        checkKYCStatus();
        analyzeWalletRisk(address);
        analyzeCompliance();
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setNetworkStatus('Connection Failed');
    } finally {
      setIsConnecting(false);
    }
  };

  // Mint token function
  const mintRWAToken = async () => {
    if (!kycStatus) {
      alert('KYC verification required before minting tokens.');
      return;
    }

    if (riskScore && riskScore.score > 70) {
      const proceed = window.confirm('High risk wallet detected. Are you sure you want to proceed?');
      if (!proceed) return;
    }

    setIsMinting(true);
    try {
      // Simulate minting transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful minting
      alert('🎉 RWA Token minted successfully! Transaction hash: 0x1234...5678');
    } catch (error) {
      console.error('Error minting token:', error);
      alert('Failed to mint RWA token. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  // Initialize price quote on component mount
  useEffect(() => {
    getUniswapQuote();
  }, []);

  // Auto-refresh price every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoadingQuote) {
        getUniswapQuote();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLoadingQuote]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                RWA Compliance Launchpad
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                AI-Powered compliant Real World Asset tokenization with Oasis privacy hooks and Uniswap liquidity
              </p>
            </div>
            <div className="absolute right-4 top-6">
              <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <WalletConnection
              isConnected={isConnected}
              walletAddress={walletAddress}
              networkStatus={networkStatus}
              onConnect={connectWallet}
              isConnecting={isConnecting}
            />
            
            <KYCStatus
              kycStatus={kycStatus}
              isLoading={isLoadingKYC}
            />

            <AIRiskAssessment
              riskScore={riskScore}
              isAnalyzing={isAnalyzingRisk}
            />
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            <TokenIssuance
              kycStatus={kycStatus}
              onMintToken={mintRWAToken}
              isMinting={isMinting}
              riskScore={riskScore}
            />
            
            <ComplianceAI
              complianceScore={complianceScore}
              isAnalyzing={isAnalyzingCompliance}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <UniswapLiquidity
              priceQuote={priceQuote}
              isLoadingQuote={isLoadingQuote}
              onRefreshQuote={getUniswapQuote}
              lastUpdated={lastUpdated}
            />

            <PricePrediction
              currentPrice={priceQuote}
            />
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              AI-Enhanced Hackathon Integration Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 transition-colors duration-300">
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2 transition-colors duration-300">🛡️ Oasis + AI Compliance</h4>
                <p className="text-sm text-purple-700 dark:text-purple-400 transition-colors duration-300">
                  Privacy-preserving compliance with AI-powered risk assessment and fraud detection
                </p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800 transition-colors duration-300">
                <h4 className="font-semibold text-pink-900 dark:text-pink-300 mb-2 transition-colors duration-300">🦄 Uniswap + ML</h4>
                <p className="text-sm text-pink-700 dark:text-pink-400 transition-colors duration-300">
                  Real-time price feeds with machine learning price prediction models
                </p>
              </div>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800 transition-colors duration-300">
                <h4 className="font-semibold text-cyan-900 dark:text-cyan-300 mb-2 transition-colors duration-300">🤖 AI Risk Engine</h4>
                <p className="text-sm text-cyan-700 dark:text-cyan-400 transition-colors duration-300">
                  Advanced AI algorithms for wallet analysis and compliance scoring
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
