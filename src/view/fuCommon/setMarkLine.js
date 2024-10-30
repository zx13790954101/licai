export const setMarkLine = (new_array1_DATA, type) => {
  let that = this;
  let new_array1 = new_array1_DATA;
  let new_array2 = [];
  let lineStyle1 = [];
  new_array1.forEach((item, index) => {
    let item1 = {
      name: item.name + "(" + item.num + ")",
      yAxis: item.num,
      // 单独配置每条线的样式
      lineStyle: {
        width: item.active ? 3 : 2,
        color: item.active ? "red" : "#333333",
      },
      label: {
        // padding: [-13, -20, 15, -45],
        formatter: item.name + "(" + item.num + ")",
      },
    };
    new_array2.push(item1);
  });

  return [{
    itemStyle: {
      normal: {
        lineStyle: {
          type: "dashed",
          // 这儿设置的颜色是公共配置，如需单独配置，请在data里配置
          // color: '#000',
        },
        label: {
          show: true,
          position: "end",
        },
      },
    },
    data: new_array2,
  }, ];
}


export default {
  setMarkLine
}
