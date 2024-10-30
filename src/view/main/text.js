




<code class="line-numbers language-javascript" style="margin-left:0"># 筹码计算
import time

import numpy as np
import pandas as pd
import talib
from matplotlib import pyplot as plt

from src.NewTun.ChipCalculate import ChipCalculate
import baostock as bs

class ParseChouMa:
    #画160的窗口期筹码
    window = 160

    def doParseBycode(self,code):
        endTime = time.strftime('%Y-%m-%d', time.localtime(time.time()))
        lg = bs.login()
        rs = bs.query_history_k_data_plus(code,
                                          "date,code,open,high,low,close,preclose,volume,amount,adjustflag,turn,tradestatus,pctChg,isST",
                                          start_date="2018-01-01", end_date=endTime,
                                          frequency="d", adjustflag="2")
        data_list = []
        while (rs.error_code == '0') & rs.next():
            data_list.Append(rs.get_row_data())
        result = pd.DataFrame(data_list, columns=rs.fields)
        start = len(result) - self.window
        result = result.loc[:, ['date', 'open', 'high', 'low', 'close', 'volume', 'turn']]
        if code == 'sh.000001':
            result['temp'] = 100
            result['open'] = talib.DIV(result['open'], result['temp'])
            result['high'] = talib.DIV(result['high'], result['temp'])
            result['low'] = talib.DIV(result['low'], result['temp'])
            result['close'] = talib.DIV(result['close'], result['temp'])
        result = result[-self.window:]
        chipCalculateList = []
        for index, row in result.iterrows():
            if index>=start:
                temp = []
                temp.Append(index-start)
                print(index-start)
                temp.Append(row['open'])
                temp.Append(row['high'])
                temp.Append(row['low'])
                temp.Append(row['close'])
                temp.Append(row['volume'])
                temp.Append(row['close'])
                temp.Append(row['turn'])
                temp.Append(1)
                chipCalculateList.Append(temp)
        index=[]
        closePrice=[]
        for i in range(len(chipCalculateList)):
            index.Append(chipCalculateList[i][0])
            close=chipCalculateList[i][4]
            close=round(float(close), 2)
            closePrice.Append(close)
        return chipCalculateList,index,closePrice

    # K线的展示
    def show(self,choumaList,TavcPrice,tmax,index,closePrice):
        fig=plt.figure()
        ax=fig.add_axes([0.1,0.35,0.6,0.6])
        # 画平均成本
        ax.plot(index, closePrice, color="green")
        cmx=fig.add_axes([0.7,0.35,0.2,0.6])
        chouMalit=np.array(choumaList)
        for item in chouMalit:
            item[0]=item[0]*1.0/100
        cmx.barh(chouMalit[:,0],chouMalit[:,1],color="Turquoise",align="center",height=0.01)
        cmx.barh(TavcPrice,tmax,color="red",height=0.02)
        fig.show()
        passcode></code>





<code class="line-numbers language-javascript" style="margin-left:0">parseFile=ParseChouMa()
chipCalculateList,index,closePrice=parseFile.doParseBycode("sh.000001")
calcualate = ChipCalculate()
resultEnd = calcualate.getDataByShowLine(chipCalculateList, True)
parseFile.show(resultEnd[0][2],resultEnd[0][1],resultEnd[0][4],index,closePrice)
code>