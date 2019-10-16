import React,{PureComponent} from 'react';
import {loadBdMap,getPoint,getMarker} from './AsyncLoadMap';
import {getPosition} from './Geo';
import style from './style.less';
class MapField extends PureComponent{
  constructor(props) {
    super(props);
    const {lng=null,lat=null} = props.value;
    this.state = {
      lat: lat,
      lng: lng,
      loading:true,
      searchinput: false
    }
  }
  async componentDidMount(){
    const {searchinput,id} = this.props;

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
      lng,lat,isMark,
      searchinput: searchinput == undefined || searchinput == 'false' ? false : true
    })

    this.map = new BMap.Map(id);
    this.map.addEventListener('click',this.handleClick);
    this.setMapCenter(lng,lat);
    if(isMark){
      this.handleChange(getPoint(lng,lat));
    }

    //执行关键字提示
    if (this.state.searchinput) {
      this.keywordTips();
    }
    if (this.props.control == 'true') {
      const top_left_navigation = new BMap.NavigationControl();
      this.map.enableScrollWheelZoom();
      this.map.addControl(top_left_navigation);
    }
  }

  setMapCenterByCity = city =>{
    this.map.clearOverlays();
    this.map.centerAndZoom(city,16);
  }
  handleClick = e => {
    this.handleChange(e.point);
    this.getLocaltionInfo(e.point);
  }
  //通过point 返查地址详情信息 并统一返回父级
  getLocaltionInfo = (point) => {
    let geoc = new BMap.Geocoder();
    const {onChange} = this.props;
    geoc.getLocation(point, function(rs){
      let addComp = rs.addressComponents;
      let value = {
        ...point,
        ...addComp
      }
      onChange(value);
    });
  }
  //输入提示信息获取
  getRelationList = value => {
    console.log(value)
    const map = this.map;
    const handleChange = this.handleChange;
    const getLocaltionInfo = this.getLocaltionInfo;
    function myFun(){
      var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
      map.centerAndZoom(pp, 16);
      handleChange(pp);
      getLocaltionInfo(pp);
    }

    var local = new BMap.LocalSearch(map,{ //智能搜索
      onSearchComplete: myFun
    });
    local.search(value);

    var localList = new BMap.LocalSearch(map);
    localList.search(value)

    if (this.props.getres) {
      this.props.getres(localList.sf)
    }
  }

  //关键字提示输入
  keywordTips = () => {
    const {inputid} = this.props;
    const getRelationList = this.getRelationList;
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
      {"input" : inputid,"location" : this.map
    });

    ac.addEventListener("onconfirm", function(e) {
      //鼠标点击下拉列表后的事件
      var _value = e.item.value;
      var myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;

      getRelationList(myValue); //选择搜索第一条信息
    });
  }

  handleChange = point =>{
    this.map.clearOverlays();
    const marker = getMarker(point);
    this.map.addOverlay(marker);
  }
  setMapCenter = (lng,lat) => {
    const point = getPoint(lng,lat);
    this.map.centerAndZoom(point,16);
  }
  setPoint=(point)=>{
    this.setMapCenter(point.lng,point.lat);
    this.handleChange(point);
  }
  render(){
    const {loading} = this.state;
    const {value,...rest} = this.props;
    return(
      <div {...rest}>
        <div style={{width:'100%',lineHeight:'50px',textAlign:'center'}}>加载中...</div>
      </div>
    )
  }
}
MapField.defaultProps ={
  onChange:()=>{},
  inputid:"mapSearchInput"
}

export default MapField;