
//处理筹码发布的代码
export const dealData = (data) => {
    // 获取成交量和换手率数据
    const volume = [10000, 12000, 8000, 9000, 11000];
    const turnoverRate = [0.2, 0.3, 0.15, 0.1, 0.25];

    // 初始化变量
    let maxVolume = 0;
    let minVolume = Infinity;
    let distribution = [];

    // 计算筹码分布
    for (let i = 0; i < volume.length; i++) {
      const currentVolume = volume[i];
      const currentTurnoverRate = turnoverRate[i];
      const maxDistribution = currentVolume * (1 - currentTurnoverRate);
      const minDistribution = currentVolume * currentTurnoverRate / 2;
      const distributionIndex = Math.floor((currentVolume - minDistribution) / (maxDistribution - minDistribution) * (maxIndex - minIndex + 1));
      if (distributionIndex < 0) {
        distributionIndex = 0;
      } else if (distributionIndex > maxIndex) {
        distributionIndex = maxIndex;
      }
      distribution[distributionIndex] += currentVolume;
      if (maxVolume < distribution[distributionIndex]) {
        maxVolume = distribution[distributionIndex];
      }
      if (minVolume > distribution[distributionIndex]) {
        minVolume = distribution[distributionIndex];
      }
    }

    // 绘制K线图和筹码分布图
    const kLineWidth = 0.5;
    const candlestickWidth = 5;
    const stickHeight = 20;
    const barHeight = 10;
    const xScaleFactor = kLineWidth + candlestickWidth;
    const yScaleFactor = stickHeight + barHeight;
    const kLineColor = 'black';
    const candlestickColor = 'gray';
    const chartWidth = 500;
    const chartHeight = 300;
    const chartCanvas = document.createElement('canvas');
    chartCanvas.width = chartWidth;
    chartCanvas.height = chartHeight;
    document.body.appendChild(chartCanvas);
    const chartContext = chartCanvas.getContext('2d');

    // 绘制K线图
    for (let i = 1; i < volume.length; i++) {
      const x = i * xScaleFactor;
      const y = chartHeight - (maxVolume - volume[i]) / (maxVolume - minVolume) * yScaleFactor - stickHeight;
      chartContext.fillStyle = kLineColor;
      chartContext.fillRect(x, y, kLineWidth, stickHeight);
      chartContext.fillStyle = candlestickColor;
      chartContext.fillRect(x, y, candlestickWidth, barHeight);
    }

    // 绘制筹码分布图
    for (let i = 0; i <= maxIndex; i++) {
      const x1 = i * xScaleFactor;
      const y1 = chartHeight - (maxVolume - distribution[i]) / (maxVolume - minVolume) * yScaleFactor - barHeight - kLineWidth - candlestickWidth;
      const x2 = x1 + kLineWidth + candlestickWidth;
      chartContext.fillStyle = 'red';
      chartContext.fillRect(x1, y1, x2 - x1, barHeight);
    }
}
export default {
  dealData
}
