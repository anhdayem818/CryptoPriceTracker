import axios from "axios";
import moment from "moment";

const formatSparkline =(numbers)=>{
  const sevenDaysAgo = moment().subtract(7, "day").unix();
  let formattedSparkline = numbers.map((number, index)=>{
    return {
      x: sevenDaysAgo + (index + 1)* 3600,
      y: number,
    }
  })
  return formattedSparkline;
}

const formatMarketData= (data)=>{ 
  let formattedData = []
  data.forEach((item)=>{
    let formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

    let formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline
      }
    }
    formattedData.push(formattedItem)
  })
  return formattedData;
}
export const getMarketData= async () =>{
  const uri = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=true&price_change_percentage=24h"
    
  try{
    const response = await axios.get(uri)
    const data = response.data
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  }catch (error){
    console.log( error  )
  }
}