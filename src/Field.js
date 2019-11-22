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
  getDefault = () => {
    if(this.props.value && this.props.value.lng){
      return this.props.value;
    }
    if(this.state.lng){
      const {loading,...stateValue} = this.state;
      return stateValue;
    }
    return {lng:null,lat:null};
  }
  async componentDidMount(){
    
    const BMap = await loadBdMap();
    const map = new BMap.Map('bmap');
    this.map = map;
    /*兼容手机点击事件*/
    map.addEventListener("touchmove", function (e) {
      map.enableDragging();
    });
    // TODO: 触摸结束时触发次此事件  此时开启禁止拖动
    map.addEventListener("touchend", function (e) {
      map.disableDragging();
    });    
    map.disableDragging();
    map.enableScrollWheelZoom(true);
    /*监听事件结束*/
    map.addEventListener('click',this.handleClick);
    
    let {lng,lat} = this.getDefault();
    let isMark = false;
    if(!(lng && lat)){
      this.setState({
        isGeo:true
      })
      const point = await getPosition();
      lng = point.lng;
      lat = point.lat;
      this.setState({
        isGeo:false
      })      
    }else{
      isMark = true;
    }
    this.setState({
      loading:false,
      lng,lat,isMark
    })
    this.setMapCenter(lng,lat);
    this.handleChange(getPoint(lng,lat));
    // if(!isMark){
    //   this.handleChange(getPoint(lng,lat));
    // }else{

    // }
    
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
    const {loading,isGeo} = this.state;
    const {value,...rest} = this.props;
    return(
      <div {...rest} id={"bmap"}>
        {isGeo !== undefined && isGeo && <div>定位中...</div>}
      </div>
    )
  }
}
MapField.defaultProps ={
  onChange:()=>{}
}

export default MapField;