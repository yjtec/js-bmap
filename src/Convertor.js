import {
  loadBdMap
} from './AsyncLoadMap';
const Convertor = async ({lng,lat}) =>{
  const BMap = await loadBdMap();
  const convertor = new BMap.Convertor();
  const point =  new BMap.Point(lng,lat);
  return new Promise((resolve,reject) => {
    convertor.translate([point],1,5,(re)=> {
      if(re.status === 0){
        resolve(re.points[0]);
      }else{
        reject(re);
      }
    })    
  });
  
}
export{
  Convertor
}