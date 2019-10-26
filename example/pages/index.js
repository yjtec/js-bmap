import React from 'react';
import styles from './index.css';
import {create,MapField} from '@yjtec/bmap';
// const BBB = Bmap.create({
//   position:true
// });
// export default BBB(<div><span>123</span><span>456</span></div>);
class IndexPage extends React.Component{

  render(){
    console.log(this.props);
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
  renderLoading:<div>二大爷加载中……</div>,
  renderPosLoading:<div>定位中333……</div>
})(IndexPage);

