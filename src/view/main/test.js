var pd = require('pandas');
var copy = require('copy');


class ChipDistribution()) {

    function __init__(self) {
        self.Chip = {};
        self.ChipList = {};
    }
    function get_data(self) {
        self.data = pd.read_csv('test.csv');
    }
    function calcuJUN(self,dateT,highT, lowT, volT, TurnoverRateT, A, minD) {

        x =[];
        l = (highT - lowT) / minD;
        for (i in range(int(l))) {
            x.push(round(lowT + i * minD, 2));
        length = len(x);
        eachV = volT/length;
        for (i in self.Chip) {
            self.Chip[i] = self.Chip[i] *(1 -TurnoverRateT * A);
        for (i in x) {
            if (i in self.Chip) {
                self.Chip[i] += eachV *(TurnoverRateT * A);
            } else {
                self.Chip[i] = eachV *(TurnoverRateT * A);
        var copy = require('copy');
        self.ChipList[dateT] = copy.deepcopy(self.Chip);
            }
        }

    function calcuSin(self,dateT,highT, lowT,avgT, volT,TurnoverRateT,minD,A) {
        x =[];
    }
        l = (highT - lowT) / minD;
        for (i in range(int(l))) {
            x.push(round(lowT + i * minD, 2));
        }
        length = len(x);
        }

        tmpChip = {};
        eachV = volT/length;
        }
    }

        for (i in x) {
            x1 = i;
            x2 = i + minD;
            h = 2 / (highT - lowT);
            s= 0;
            if (i < avgT) {
                y1 = h /(avgT - lowT) * (x1 - lowT);
                y2 = h /(avgT - lowT) * (x2 - lowT);
                s = minD *(y1 + y2) /2;
                s = s * volT;
            } else {
                y1 = h /(highT - avgT) *(highT - x1);
                y2 = h /(highT - avgT) *(highT - x2);
            }
                s = minD *(y1 + y2) /2;
                s = s * volT;
            tmpChip[i] = s;
        }

        for (i in self.Chip) {
            self.Chip[i] = self.Chip[i] *(1 -TurnoverRateT * A);
        }
        for (i in tmpChip) {
            if (i in self.Chip) {
                self.Chip[i] += tmpChip[i] *(TurnoverRateT * A);
            } else {
                self.Chip[i] = tmpChip[i] *(TurnoverRateT * A);
        var copy = require('copy');
        self.ChipList[dateT] = copy.deepcopy(self.Chip);
            }

    function calcu(self,dateT,highT, lowT,avgT, volT, TurnoverRateT,minD = 0.01, flag=1 , AC=1) {
        if (flag ==1) {
            self.calcuSin(dateT,highT, lowT,avgT, volT, TurnoverRateT,A=AC, minD=minD);
        } else if (flag ==2) {
            self.calcuJUN(dateT,highT, lowT, volT, TurnoverRateT, A=AC, minD=minD);
        }
    function calcuChip(self, flag=1, AC=1) {
        low = self.data['low'];
        high = self.data['high'];
        vol = self.data['volume'];
        TurnoverRate = self.data['TurnoverRate'];
        avg = self.data['avg'];
        date = self.data['date'];
    }
        for (i in range(len(date)) {


        }
            highT = high[i];
            lowT = low[i];
            volT = vol[i];
            TurnoverRateT = TurnoverRate[i];
            avgT = avg[i];
            dateT = date[i];
            self.calcu(dateT,highT, lowT,avgT, volT, TurnoverRateT/100, flag=flag, AC=AC);


    function winner(self,p=null) {
            Profit = [];
            date = self.data['date'];
    }
            if (p == null) {
                p = self.data['close'];
                count = 0;
                for (i in self.ChipList;            })) {


                }
                    Chip = self.ChipList[i];
                    total = 0;
                    be = 0;
                    for (i in Chip) {
                        total += Chip[i];
                        if (i < p[count]) {
                            be += Chip[i];
                    if (total != 0) {
                        bili = be / total;
                    } else {
                        bili = 0;
                    count += 1;
                    Profit.push(bili);
            } else {
                for (i in self.ChipList;                    ) {


                }
                    Chip = self.ChipList[i];
                    total = 0;
                    be = 0;
                    for (i in Chip) {
                        total += Chip[i];
                        if (i < p) {
                            be += Chip[i];
                    if (total != 0) {
                        bili = be / total;
                    } else {
                        bili = 0;
                    Profit.push(bili);
                    }
                        }

            return Profit;
                    }
    function lwinner(self,N = 5, p=null) {

        data = copy.deepcopy(self.data);
        date = data['date'];
        ans = [];
        for (i in range(len(date))) {
            console.log(date[i]);
            if (i < N) {
                ans.push(null);
                continue;
            self.data = data[i-N:i];
            self.data.index= range(0,N);
            self.__init__();
            self.calcuChip();
            a = self.winner(p);
            ans.push(a[-1]);
        var plt = require('matplotlib.pyplot');
        plt.plot(date[len(date) - 60:-1], ans[len(date) - 60:-1]);
        plt.show();
            }
        self.data = data;
        return ans;
        }
    }

    function cost(self,N) {
        date = self.data['date'];
    }
        N = N / 100;
        ans = [];
        for (i in self.ChipList) {
            Chip = self.ChipList[i];
            ChipKey = sorted(Chip.keys());
            total = 0;
            sumOf = 0;
            for (j in Chip;        ) {
                sumOf += Chip[j];
            }
            for (j in ChipKey) {
                tmp = Chip[j];
                tmp = tmp / sumOf;
                total += tmp;
                if (total > N) {
                    ans.push(j);
                    break;
        var plt = require('matplotlib.pyplot');
        plt.plot(date[len(date) - 1000:-1], ans[len(date) - 1000:-1]);
        plt.show();
        return ans;
                }
            }

if (__name__ == '__main__') {
    a=ChipDistribution();
    a.get_data();
    a.calcuChip(flag=1, AC=1);
    a.winner();
    a.cost(90);
}
        }

    a.lwinner();

                    }
                        }

                    }

    }

        }

}
