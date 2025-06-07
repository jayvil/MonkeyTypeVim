import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { testResultsDB } from '../services/testResultsDB';
import { useTheme } from '../hooks/useTheme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TestHistory: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const { currentTheme } = useTheme();

  useEffect(() => {
    loadTestResults();
  }, []);

  const loadTestResults = async () => {
    try {
      const results = await testResultsDB.getTestResults();
      setTestResults(results);
    } catch (error) {
      console.error('Error loading test results:', error);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const chartData = {
    labels: testResults.map(result => formatDate(result.timestamp)),
    datasets: [
      {
        label: 'Commands/sec',
        data: testResults.map(result => result.commandsPerSecond),
        borderColor: currentTheme.colors.primary,
        backgroundColor: `${currentTheme.colors.primary}20`,
        tension: 0.4,
      },
      {
        label: 'Accuracy (%)',
        data: testResults.map(result => result.accuracy),
        borderColor: currentTheme.colors.accent,
        backgroundColor: `${currentTheme.colors.accent}20`,
        tension: 0.4,
      },
      {
        label: 'Total Commands',
        data: testResults.map(result => result.totalCommands),
        borderColor: currentTheme.colors.secondary,
        backgroundColor: `${currentTheme.colors.secondary}20`,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: currentTheme.colors.text,
        },
      },
      title: {
        display: true,
        text: 'Test History',
        color: currentTheme.colors.text,
      },
    },
    scales: {
      x: {
        ticks: {
          color: currentTheme.colors.text,
        },
        grid: {
          color: `${currentTheme.colors.secondary}20`,
        },
      },
      y: {
        ticks: {
          color: currentTheme.colors.text,
        },
        grid: {
          color: `${currentTheme.colors.secondary}20`,
        },
      },
    },
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear your test history?')) {
      try {
        await testResultsDB.clearTestResults();
        setTestResults([]);
      } catch (error) {
        console.error('Error clearing test results:', error);
      }
    }
  };

  return (
    <div className="w-full p-4 rounded-lg" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold" style={{ color: currentTheme.colors.primary }}>
          Progress History
        </h2>
        {testResults.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-3 py-1 rounded text-sm hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: currentTheme.colors.secondary,
              color: currentTheme.colors.background,
            }}
          >
            Clear History
          </button>
        )}
      </div>
      <div className="h-[400px]">
        {testResults.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div 
            className="h-full flex items-center justify-center text-center"
            style={{ color: currentTheme.colors.secondary }}
          >
            No test history available yet.<br />
            Complete some tests to see your progress!
          </div>
        )}
      </div>
    </div>
  );
}; 