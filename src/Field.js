import React,{PureComponent} from 'react';
import {loadBdMap,getPoint,getMarker} from './AsyncLoadMap';
import {getPosition} from './Geo';
import style from './style.less';
class MapField extends PureComponent{
  constructor(props) {
    super(props);
    let lng = null;
    let lat = null;
    if(props.value && props.value.lng && props.value.lat){
      lng = props.value.lng;
      lat = props.value.lat
    }
    this.state = {
      lat: lat,
      lng: lng,
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
      lng,lat,isMark
    })

    
    this.map = new BMap.Map('bmap');
    this.map.addEventListener('click',this.handleClick);
    this.setMapCenter(lng,lat);
    if(isMark){
      this.handleChange(getPoint(lng,lat));
    }
    
  }
  setMapCenterByCity = city =>{
    this.map.clearOverlays();
    this.map.centerAndZoom(city,16);
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
        <div className={style.loading}>加载中...</div>
      </div>
    )
  }
}
MapField.defaultProps ={
  onChange:()=>{}
}

export default MapField;