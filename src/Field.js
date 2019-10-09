import React,{PureComponent} from 'react';
import {loadBdMap,getPoint,getMarker} from './AsyncLoadMap';
import {getPosition} from './Geo';
class MapField extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      loading:true,
    }
  }
  async componentDidMount(){
    let {lng,lat} = this.state;
    let isMark = false;
    const BMap = await loadBdMap();
    if(!(lng && lat)){
      const point = await getPosition();
      lng = point.lng;
      lat = point.lat;
    }else{
      isMark = true;
    }
    this.setState({
      loading:false,
      lng,lat
    })

    
    this.map = new BMap.Map('bmap');
    this.map.addEventListener('click',this.handleClick);
    this.setMapCenter(lng,lat);
    if(isMark){
      this.handleChange(getPoint(lng,lat));
    }
    
  }

  handleClick = e => {
    this.handleChange(e.point);
  }
  handleChange = point =>{
    this.map.clearOverlays();
    const marker = getMarker(point);
    this.map.addOverlay(marker);
    this.props.onChange(point);

  }
  setMapCenter = (lng,lat) => {
    const point = getPoint(lng,lat);
    this.map.centerAndZoom(point,16);
  }
  render(){
    const {loading} = this.state;
    const {value,...rest} = this.props;
    return(
      <div {...rest} id={"bmap"}>
        <div>加载中</div>
      </div>
    )
  }
}
MapField.defaultProps ={
  onChange:()=>{}
}

export default MapField;