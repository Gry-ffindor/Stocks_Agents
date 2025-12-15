import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './CandlestickChart.css';

function CandlestickChart({ historicalData, stockSymbol }) {
  const [selectedPeriod, setSelectedPeriod] = useState('3M');

  // Return null if no data
  if (!historicalData || historicalData.length === 0) {
    return null;
  }

  // Filter data based on selected period
  const getFilteredData = () => {
    const now = new Date();
    let daysToShow;

    switch (selectedPeriod) {
      case '1D':
        daysToShow = 1;
        break;
      case '1M':
        daysToShow = 30;
        break;
      case '3M':
        daysToShow = 90;
        break;
      case '6M':
        daysToShow = 180;
        break;
      case '1Y':
        daysToShow = 365;
        break;
      default:
        daysToShow = 90;
    }

    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    return historicalData.filter(candle => {
      const candleDate = new Date(candle.date);
      return candleDate >= cutoffDate;
    });
  };

  const filteredData = getFilteredData();

  // Transform data to ApexCharts format
  const seriesData = filteredData.map(candle => ({
    x: new Date(candle.date),
    y: [candle.open, candle.high, candle.low, candle.close]
  }));

  const options = {
    chart: {
      type: 'candlestick',
      height: 400,
      toolbar: {
        show: true,
        tools: {
          download: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      background: 'transparent'
    },
    title: {
      text: `${stockSymbol} - ${selectedPeriod === '1D' ? '1 Day' : selectedPeriod === '1M' ? '1 Month' : selectedPeriod === '3M' ? '3 Month' : selectedPeriod === '6M' ? '6 Month' : '1 Year'} Price Chart`,
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#1f2937'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#6b7280'
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        formatter: (value) => `₹${value.toFixed(2)}`,
        style: {
          colors: '#6b7280'
        }
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#10b981',   // Green for bullish candles
          downward: '#ef4444'  // Red for bearish candles
        }
      }
    },
    tooltip: {
      theme: 'light',
      custom: function({seriesIndex, dataPointIndex, w}) {
        const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const date = new Date(data.x).toLocaleDateString('en-IN');
        const open = data.y[0];
        const high = data.y[1];
        const low = data.y[2];
        const close = data.y[3];

        return `<div class="apexcharts-tooltip-custom">
          <div class="tooltip-date">${date}</div>
          <div class="tooltip-data">
            <div>Open: <strong>₹${open.toFixed(2)}</strong></div>
            <div>High: <strong>₹${high.toFixed(2)}</strong></div>
            <div>Low: <strong>₹${low.toFixed(2)}</strong></div>
            <div>Close: <strong>₹${close.toFixed(2)}</strong></div>
          </div>
        </div>`;
      }
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 3
    }
  };

  const series = [{
    name: 'Price',
    data: seriesData
  }];

  const periods = [
    { value: '1D', label: '1 Day' },
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '1Y', label: '1 Year' }
  ];

  return (
    <div className="candlestick-chart-section">
      <div className="chart-header">
        <div className="period-filters">
          {periods.map(period => (
            <button
              key={period.value}
              className={`period-button ${selectedPeriod === period.value ? 'active' : ''}`}
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={400}
      />
    </div>
  );
}

export default CandlestickChart;
