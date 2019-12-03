import React,{Fragment} from 'react';
import styles from './index.css';
import {create,MapField,GeoContext,loadBdMap,Convertor} from '@yjtec/bmap';
import {wxUtils,WxContext} from 'yjtec-wx';
// const BBB = Bmap.create({
//   position:true
// });
// export default BBB(<div><span>123</span><span>456</span></div>);
class IndexPage extends React.Component{
  static contextType = WxContext;
  state = {
    loading:true,

  }
  async componentDidMount(){
    const re = await wxUtils.getPosition();
    const point = await Convertor(re);
    this.setState({
      loading:false,
      point:{
        ...point
      }
    })
  }
  render(){
    const {loading,point} = this.state;
    return (
      <Fragment>
        {!loading && (
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
        )}
      </Fragment>
    );    
  }
}
export default IndexPage;
// export default create({
//   position:true,
//   position_type:'wx',
//   renderLoading:<div>二大爷加载中……</div>,
//   renderPosLoading:<div>定位中333……</div>
// })(IndexPage);

