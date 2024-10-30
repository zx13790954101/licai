
//处理筹码发布的代码
export const dealData = (data) => {
  var input,circulationAmount,storage;
  var getPosition,calcSeparate,calcSingledayChip,calcDayChip,calcChip;
  /*
   * K线数据
   * 开盘价，收盘价，最低价，最高价，成交量
   */
  input=[
      {open:3.89,close:3.89,low:3.86,high:3.93,amount:300},
      {open:3.88,close:3.85,low:3.81,high:3.89,amount:320},
      {open:3.85,close:3.91,low:3.82,high:3.95,amount:260},
      {open:3.89,close:4.02,low:3.89,high:4.07,amount:250},
      {open:4.04,close:4.05,low:4.00,high:4.08,amount:280},
      {open:4.05,close:4.00,low:3.98,high:4.08,amount:320},
      {open:4.00,close:4.00,low:3.97,high:4.04,amount:330},
      {open:3.99,close:3.90,low:3.88,high:4.00,amount:350},
      {open:3.89,close:3.90,low:3.88,high:3.92,amount:310},
      {open:3.89,close:3.98,low:3.88,high:3.98,amount:260},
      {open:3.99,close:3.98,low:3.95,high:4.03,amount:280},
      {open:3.98,close:4.06,low:3.96,high:4.08,amount:240},
      {open:4.08,close:4.08,low:4.02,high:4.08,amount:200}
  ];
  /*
   * 流通股本
   */
  circulationAmount=3000;
  /*
   * 存储计算过程变量
   * {number} separateAmount:全部数据的分价分隔数
   * {number} chipMax:一个流通股本内的最高价
   * {number} chipMin:一个流通股本内的最低价
   * {number} chipStep:每一级分价价格
   * {array} chipSeparate:分价价格数组表
   * {array} chipStorage:单K线筹码分布存储
   */
  storage={
      separateAmount:100,
      chipMax:0,
      chipMin:0,
      chipStep:0,
      chipSeparate:[],
      chipStorage:[]
  };
  
  /*
   * 在总分价数组中定位价格索引，二分搜索
   * @param {array} array 有序数组表
   * @param {number} num 查询数
   */
  getPosition=function(arr,num){
    var lower,upper,middle;
    lower=0;
    upper=arr.length-1;
    while(lower<=upper){
        middle=parseInt((lower+upper)/2);
        if(arr[middle]<num){
            lower=middle+1;
        }else if(arr[middle]>num){
            upper=middle-1;
        }else{
            upper=middle;
            break;
        }
    }
    return upper;
  };
  
  /*
   * 计算整个数据段的总分加数组
   * @param {array} data 输入数据
   */
  calcSeparate=function(data){
      var i,l,max,min;
      i=0;
      max=min=data[i].high;
      for(i=1,l=data.length;i<l;i++){
          if(max<data[i].high){
              max=data[i].high;
          }
          if(min>data[i].low){
              min=data[i].low;
          }
      }
      storage.chipStep=(max-min)/storage.separateAmount;
      for(i=0,l=storage.separateAmount;i<=l;i++){
          storage.chipSeparate[i]=min+i*storage.chipStep;
      }
  };
  
  /*
   * 计算一根K线的筹码分布
   * @param {array} data 输入数据
   */
  calcSingledayChip=function(data){
      var i,l,angle,tan,minIndex,maxIndex,midIndex,
          j,divideAmount,triangleAmount,triangleIndex,triangleCount,price,dayChip;
      var getTriangleAmount;
      //三角形分布，angle为底角角度
      angle=45;
      tan=Math.tan(Math.PI*angle/180);
      for(i=0,l=data.length;i<l;i++){
          minIndex=getPosition(storage.chipSeparate,data[i].low);
          maxIndex=getPosition(storage.chipSeparate,data[i].high);
          divideAmount=maxIndex-minIndex;
          midIndex=divideAmount/2+minIndex;
          triangleAmount=0;
          triangleIndex=minIndex;
          triangleCount=1;
          /*
           * 计算三角形分布
           */
        getTriangleAmount = function () {
            
          var a,h;
          if((maxIndex-minIndex)%2==0){
              //三角形
              a=maxIndex-minIndex+2;
              h=midIndex-minIndex+1;
              triangleAmount=a*h/2;
          }else{
              //梯形
              a=maxIndex-minIndex+2;
              h=midIndex-minIndex+1;
              triangleAmount=(a+1)*h/2;
          }

          
              //底部到中间
              // while(triangleIndex<=midIndex){
              //     triangleAmount+=triangleCount;
              //     triangleCount++;
              //     triangleIndex++;
              // }
              //中间到顶部
              // while(triangleIndex<=maxIndex){
              //     triangleCount--;
              //     triangleAmount+=triangleCount;
              //     triangleIndex++;
              // }
          };
          getTriangleAmount();
          //单日分价赋值
          triangleCount=1;
          dayChip={};
          for(j=minIndex;j<midIndex;j++){
              price=storage.chipSeparate[j];
              dayChip[price]=data[i].amount*triangleCount/triangleAmount;
              triangleCount++;
          }
          for(;j<=maxIndex;j++){
              price=storage.chipSeparate[j];
              dayChip[price]=data[i].amount*triangleCount/triangleAmount;
              triangleCount--;
          }
          storage.chipStorage[i]=dayChip;
      }
  };
  
  /*
   * 计算某一日的累计筹码分布
   * @param {array} data 输入数据
   * @param {number} index 索引
   */
  calcDayChip=function(data,index){
      var i,j,minIndex,dayPrice,chipData,sumAmount;
      //计算几日对等流通股本,确定起始索引;同时计算流通股本内的最大值最小值
      sumAmount=0;
      storage.chipMax=storage.chipMin=data[index].high;
      for(i=index;i>=0 && sumAmount<circulationAmount;i--){
          sumAmount+=data[i].amount;
          if(storage.chipMax<data[i].high){
              storage.chipMax=data[i].high;
          }
          if(storage.chipMin>data[i].low){
              storage.chipMin=data[i].low;
          }
      }
      i++;
      //初始化当日的筹码分价区间
      chipData={};
      minIndex=getPosition(storage.chipSeparate,storage.chipMin);
      dayPrice=storage.chipSeparate[minIndex];
      while(dayPrice<=storage.chipMax){
          chipData[dayPrice]=0;
          minIndex++;
          dayPrice=storage.chipSeparate[minIndex];
      }
      //叠加筹码交易量
      for(;i<=index;i++){
          for(j in storage.chipStorage[i]){
              chipData[j]+=storage.chipStorage[i][j];
          }
      }
      return chipData;
  };
  
  calcChip=function(){
      calcSeparate(input);
    calcSingledayChip(input);
    console.log("calcDayChip", calcSeparate(input));
      console.log("calcDayChip",calcDayChip(input,input.length-1));
  };
  calcChip()
}
export default {
  dealData
}
