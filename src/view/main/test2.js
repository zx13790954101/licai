import json2 from './test.json'

export const initChip = (kline_data) => {
  let data1 = {
    "volume":[ 278311951.0,278311951.0],
    "open": [11.89,11.89],
    "high": [12.39,12.39],
    "low": [11.78,11.78],
    "close":[ 12.33, 12.33],
    "money": [3365459200.0,3365459200.0],
    "avg": [12.09,12.09],
    "date":[ "2015-06-01", "2015-06-01"],
    "TurnoverRate": [1.8285,1.8285]

  }
    //json2
  // var Chip = {}
  // var ChipList = {};

  var self = {
    Chip: {},
    ChipList: {},
    data: {},
  };
  self.Chip = {} // 当前获利盘
  self.ChipList = {}  // 所有的获利盘的
  self.data = data1;
  function init () {
    self.Chip = {} // 当前获利盘
    self.ChipList = {}  // 所有的获利盘的
  }

  function calcuJUN ( dateT, highT, lowT, volT, TurnoverRateT, A, minD) {

    let x = [];
    let l = (highT - lowT) / minD;
    for (let i = 0; i < l; i++) {
      x.push(Math.round(lowT + i * minD, 2));
    
    }
    let length = x.length;
    let eachV = volT / length;
    console.log("xxx", self.Chip)

    self.Chip.forEach(i=>{  
      self.Chip[i] = self.Chip[i] * (1 - TurnoverRateT * A);
    })

    
 
    x.forEach(i=>{  
      if (i in self.Chip) {
        self.Chip[i] += eachV * (TurnoverRateT * A);
      } else {
        self.Chip[i] = eachV * (TurnoverRateT * A);
      }
    })
    self.ChipList[dateT] = JSON.parse(JSON.stringify(self.Chip));
       
  }
  function calcuSin ( dateT, highT, lowT, avgT, volT, TurnoverRateT, minD, A) {
    let x = [];
    let l = (highT - lowT) / minD;

    for (let i = 0; i < l; i++) {
      x.push(Math.round(lowT + i * minD, 2));
    }
    let length = x.length;
    let tmpChip = [];
    let eachV = volT / length;

    x.forEach(i=>{  
      let x1 = i;
      let x2 = i + minD;
      let h = 2 / (highT - lowT);
      let s = 0;
      if (i < avgT) {
        let  y1 = h / (avgT - lowT) * (x1 - lowT);
        let  y2 = h / (avgT - lowT) * (x2 - lowT);
        s = minD * (y1 + y2) / 2;
        s = s * volT;
      } else {
        let y1 = h / (highT - avgT) * (highT - x1);
        let y2 = h / (highT - avgT) * (highT - x2);
        s = minD * (y1 + y2) / 2;
        s = s * volT;
      }
   
      tmpChip[i] = s;
    })

    console.log("l22", self)
    // self.Chip.forEach(i=>{
    //   self.Chip[i] = self.Chip[i] * (1 - TurnoverRateT * A);
    // })
    tmpChip.forEach(i=>{
      if (i in self.Chip) {
        self.Chip[i] += tmpChip[i] * (TurnoverRateT * A);
      } else {
        self.Chip[i] = tmpChip[i] * (TurnoverRateT * A);
      }
    })

    self.ChipList[dateT] = JSON.parse(JSON.stringify(self.Chip));
    console.log("ChipList2",self.ChipList)
  }
  
  //处理数据
  function calcu ( dateT, highT, lowT, avgT, volT, TurnoverRateT, flag , AC , minD = 0.01) {
    if (flag == 1) {
      calcuSin(dateT, highT, lowT, avgT, volT, TurnoverRateT, AC,  minD);
    } else if (flag == 2) {
      calcuJUN(dateT, highT, lowT, volT, TurnoverRateT, AC,  minD);
    }
  }
  //第一个方法
  function calcuChip (flag, AC) {
    
    var low = self.data['low'];
    var high = self.data['high'];
    var vol = self.data['volume'];
    var TurnoverRate = self.data['TurnoverRate'];
    var avg = self.data['avg'];
    var date = self.data['date'];

    for (let i = 0; i < date.length; i++) {
      // 在这里使用
      var highT = high[i];
      var lowT = low[i];
      var volT = vol[i];
      var TurnoverRateT = TurnoverRate[i];
      var avgT = avg[i];
      var dateT = date[i];
      calcu(dateT, highT, lowT, avgT, volT, TurnoverRateT / 100, flag , AC );
    }

        

  }
  //获利率 的函数
  function winner ( p = null) {
    var Profit = [];
    var date = self.data['date'];
    if (p == null) {
      p = self.data['close'];
      var count = 0;
      console.log("ChipList", self.ChipList)
      self.ChipList.forEach(a=>{
        var Chip = self.ChipList[a];
        var total = 0;
        var be = 0;
        for (i in Chip) {
          total += Chip[i];
          if (i < p[count]) {
            be += Chip[i];
          }
        }
        if (total != 0) {
          bili = be / total;
        } else {
          bili = 0;
        }
        count += 1;
        Profit.push(bili);
      })
    } else {
      for (i in self.ChipList) {
        var  Chip = self.ChipList[i];
        var  total = 0;
        be = 0;
        for (i in Chip) {
          total += Chip[i];
          if (i < p) {
            be += Chip[i];
          }
        }
        if (total != 0) {
          bili = be / total;
        } else {
          bili = 0;
        }
        Profit.push(bili);
      }
    }

    return Profit;
    
  }
  

  function lwinner (self, N = 5, p = null) {

    var data = SON.parse(JSON.stringify(self.data));
    
    var date = data['date'];
    var ans = [];
    for (let i = 0; i < date.length; i++) {
      console.log(date[i]);
      if (i < N) {
        ans.push(null);
        continue;
      }
      self.data = data.slice(i - N, i)
      
      //data[i - N:i];
      self.data.index = Math.range(0, N);
      //初始化代码
      init();
      calcuChip();
      a = winner(p);
      ans.push(a[-1]);
    }
    // var plt = require('matplotlib.pyplot');
    // plt.plot(date[len(date) - 60: -1], ans[len(date) - 60: -1]);
    // plt.show();
    self.data = data;
    return ans;
  }

  function cost ( N) {
    var date = self.data['date'];
    N = N / 100;
    var ans = [];
    for (i in self.ChipList) {
      var Chip = self.ChipList[i];
      var ChipKey = Object.keys(Chip)
        .sort((a, b) => Chip[a] - Chip[b]);
        
      //  Chip.keys().sort((a, b) => a - b);
      var total = 0;
      var sumOf = 0;
      for (j in Chip) {
        sumOf += Chip[j];
      }
      for (j in ChipKey) {
        tmp = Chip[j];
        tmp = tmp / sumOf;
        total += tmp;
        if (total > N) {
          ans.push(j);
          break;
        }
      }
    }
    // var plt = require('matplotlib.pyplot');
    // plt.plot(date[len(date) - 1000: -1], ans[len(date) - 1000: -1]);
    // plt.show();
    return ans;
  }
//flag = 1, AC = 1
  calcuChip(1, 1);//计算
  let profit=winner();
  let data_cost=cost(90);
  let data_lwinner = lwinner();
  return {
    data_lwinner: data_lwinner,
    data_cost: data_cost,
    profit:profit
  }

}

//筹码发布的代码
export default {
  initChip
}