import {loadBdMap} from './AsyncLoadMap';
const getPosition = async (callback) => {
  let point = {}
  try{
    point = await getGeoLocation();
  }catch(err){
    point = await getCityLocation();
  }
  return Promise.resolve(point);
  
}

const getGeoLocation = async () => {
  const BMap = await loadBdMap();
  let geolocation = new BMap.Geolocation();
  return new Promise((resolve,reject) => {
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == window.BMAP_STATUS_SUCCESS){
        resolve(r.point);
      }else{
        console.error('精确定位失败，状态码为：'+this.getStatus());
        reject(this.getStatus());
      }
    })
  });
}

const getCityLocation = async () => {
  const BMap = await loadBdMap();
  return new Promise((resolve,reject) => {
    let myCity = new BMap.LocalCity();
    myCity.get(r => {
      resolve(r.center)
    })
  })
  
}

export {getPosition,getGeoLocation,getCityLocation}