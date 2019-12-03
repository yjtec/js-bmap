import React from 'react';
import styles from './index.css';
import {create,MapField,GeoContext,Convertor} from '@yjtec/bmap';
import {wxUtils,WxContext} from 'yjtec-wx';
const isWx = () => {
  if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
      return true;
  }
  return false;
}
const WxPosition  = async () => {
  if(isWx()){
    const re = await wxUtils.getPosition();
    const point = await Convertor(re);
    return point;
  }else{
    return false;
  }
}
// const BBB = Bmap.create({
//   position:true
// });
// export default BBB(<div><span>123</span><span>456</span></div>);
class IndexPage extends React.Component{
  render(){
    const {point} = this.props;
    return (
      <div className={styles.normal}>
        <h1>BMAP</h1>
        <div className={styles.map}>
          <MapField
            style={{
              width:'500px',
              height:'500px'
            }}
            value={point}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );    
  }
}
export default create({
  position:true,
  // renderPosition:async ()=>{
  //   return {lng:0,lat:1}
  // },
  renderPosition: WxPosition,
  renderLoading:<div>二大爷加载中……</div>,
  renderPosLoading:<div>定位中333……</div>
})(IndexPage);

