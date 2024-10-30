export const initMaxMin30 = (dataLoss) => {
  dataLoss = JSON.parse(JSON.stringify(dataLoss));
  let { max_num1: max_num_level30, min_num1: min_num_level30, zcw3: zcw3_num, zsw_array: zsw_num } = dataLoss.deal_data2;
  let { this_data_num: this_num, this_data } = dataLoss;

  let max_num_level_item30 = [], min_num_level_item30 = [], period_30_max_num_level = [], period_30_min_num_level = [];
  let start_period, start_period2;

  max_num_level30.forEach((item, index) => {
    if (index > 0) {
      let prevItem = max_num_level30[index - 1];
      let prevPrevItem = max_num_level30[index - 2];

      if (item != prevItem) {
        if (prevItem == prevPrevItem) {
          if (item > prevItem && min_num_level30[index] == min_num_level30[index - 1] && zcw3_num[index] < this_num[index]) {
            max_num_level_item30.push({ name: "开始下跌", index, time: this_data[index], num: item });
          }
        }

        if (start_period !== undefined) {
          period_30_max_num_level.push(createPeriod(start_period, index, max_num_level30, this_data));
          start_period = undefined;
        }
      } else if (shouldAddMinItem(index, max_num_level30, min_num_level30, zsw_num, this_num)) {
        min_num_level_item30.push({ name: "开始触底", index, time: this_data[index], num: min_num_level30[index] });
      }

      if (index == max_num_level30.length - 1) {
        period_30_max_num_level.push(createPeriod(start_period - 1, index, max_num_level30, this_data));
      }
      if (start_period === undefined) start_period = index;

      if (min_num_level30[index] != min_num_level30[index - 1]) {
        if (start_period2 !== undefined) {
          period_30_min_num_level.push(createPeriod(start_period2, index, min_num_level30, this_data));
          start_period2 = undefined;
        }
      } else if (index == min_num_level30.length - 1) {
        period_30_min_num_level.push(createPeriod(start_period2 - 1, index, min_num_level30, this_data));
      }
      if (start_period2 === undefined) start_period2 = index;
    }
  });

  let filteredMaxPeriods = filterAndSortPeriods(period_30_max_num_level, 5);
  let filteredMinPeriods = filterAndSortPeriods(period_30_min_num_level, 3);

  return createResultObject(filteredMaxPeriods, filteredMinPeriods, max_num_level_item30, min_num_level_item30);
}

const createPeriod = (start, end, levelArray, timeArray) => ({
  start, end,
  period: end - start + 1,
  start_num: levelArray[start],
  end_num: levelArray[end],
  start_time: timeArray[start],
  end_time: timeArray[end],
});

const shouldAddMinItem = (index, maxArr, minArr, zswArr, thisArr) => (
  minArr[index] == minArr[index - 1] && minArr[index - 1] < minArr[index - 2] &&
  minArr[index - 1] - minArr[index - 2] < 0 && maxArr[index - 1] == maxArr[index - 2] &&
  zswArr[index] > thisArr[index]
);

const filterAndSortPeriods = (periods, minPeriod) => (
  periods.filter(item => item.period >= minPeriod).sort((a, b) => a.period - b.period)
);

const createResultObject = (maxPeriods, minPeriods, maxItems, minItems) => ({
  period_30_min_num_level2: { name: '计算最小值横盘周期', num: minPeriods },
  period_30_data2: createPeriodData(minPeriods, '最低值的周期值'),
  period_30_max_num_level: { name: '计算最大值横盘周期', num: maxPeriods },
  period_30_data: createPeriodData(maxPeriods, '最大的周期值'),
  max_num_level_item30: { name: '最大值开始下跌位置', num: maxItems },
  min_num_level_item30: { name: '最小值开始触底位置', num: minItems }
});

const createPeriodData = (periods, name) => [
  { name: '当前', num: periods[periods.length - 1], active: 1 },
  { name: '上一次的周期值', num: periods[periods.length - 2] },
  { name, num: periods[0] },
];

export const deal30Loss = (dataLoss) => {
  let maxData1 = dataLoss.max_data_num.slice(-29);
  let minData1 = dataLoss.min_data_num.slice(-29);
  let timeData = dataLoss.this_data.slice(-29);

  let maxNum1 = Math.max(...maxData1);
  let minNum1 = Math.min(...minData1);

  let testtext2 = [
    { name: "当前价", num: dataLoss.this_data_num.slice(-1)[0], active: "active1" },
    createPriceObject("最高", maxNum1, timeData, maxData1),
    createPriceObject("最低", minNum1, timeData, minData1),
  ].sort((a, b) => b.num - a.num);

  return testtext2;
}

const createPriceObject = (type, num, timeData, data) => ({
  name: `近30日${type}价(${timeData[29 - data.indexOf(num)]})`,
  num,
  time: timeData[data.indexOf(num)],
  seat: 29 - data.indexOf(num),
});

export const dealSeatType = (data) => {
  data = JSON.parse(JSON.stringify(data));
  let thisDataNum = data.this_data_num;

  let dealDataZcw = createSeatTypeObject(data.deal_data2.zcw_array, thisDataNum, data.this_data, "支撑位");
  let dealDataZcw30 = createSeatTypeObject(data.deal_data2.zcw3, thisDataNum, data.this_data, "近30日支撑位");
  let dealDataZsw = createSeatTypeObject(data.deal_data2.zsw_array, thisDataNum, data.this_data, "止损位");

  let returnArray = [dealDataZcw, dealDataZcw30, dealDataZsw, { name: "当前价", num: parseFloat(thisDataNum.slice(-1)[0]).toFixed(2), active: "active" }]
    .sort((a, b) => b.num - a.num);

  return judgesSeat(returnArray, thisDataNum);
}

const createSeatTypeObject = (data, thisData, time, name) => {
  let lengthData = data.length;
  let statusNum = parseFloat(data[lengthData - 2]) >= parseFloat(thisData[lengthData - 2])
    ? (thisData[lengthData - 1] - data[lengthData - 1] > 0 ? 0 : 6)
    : (thisData[lengthData - 1] - data[lengthData - 1] > 0 ? 7 : 4);

  return {
    name,
    status_num: statusNum,
    type: ["买入(刚突破)", "卖出", "加仓(刚突破)", "减仓", "全部卖出(刚跌破)", "持有 ", "等待", "（空仓）未跌破"][statusNum],
    num: parseFloat(data[lengthData - 1]).toFixed(2),
    number: (((data[lengthData - 1] - thisData[lengthData - 1]) / thisData[lengthData - 1]) * 100).toFixed(2),
  };
}

function judgesSeat(arrayData, thisData) {
  let arrIndex = arrayData.findIndex(item => item.active === "active");
  let type = thisData[thisData.length - 1] - thisData[thisData.length - 3] > 0 ? '上升趋势' : '下跌趋势';
  arrayData[arrIndex].type = type;
  return arrayData;
}

export default {
  initMaxMin30,
  dealSeatType,
  deal30Loss
}