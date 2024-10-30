export const dealState = (data1, num, type) => {
  let end_data = data1[num] - data1[num - 1];
  //判断是上升还是下跌
  if (type == 1) {
    end_data = end_data > 0;
  } else {
    end_data = end_data < 0;
  }
  return end_data
}
export default {
  dealState,
}
