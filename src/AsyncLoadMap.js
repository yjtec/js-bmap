import React from 'react';
import { importCDN } from './utils';
let isLoaderMap = false;
let BMap = null;
const loadBdMap = async (callback) => {
  if (isLoaderMap) {
    return Promise.resolve(window.BMap);
  }
  await importCDN("https://api.map.baidu.com/api?v=3.0&ak=DnebqQePMAKcG35KXzD28owmQKp2YOly&callback=mapinit","BMap").then(re => {
  });
  return new Promise((resolve,reject)=>{
    window.mapinit = () => {
      isLoaderMap = true;
      if(callback) callback();
      BMap = window.BMap;
      resolve(window.BMap);
    }
  });
}

class AsyncLoadMap extends React.Component {
  state = {
    loading: !isLoaderMap,
  };
  componentDidMount(){
    loadBdMap(()=>{
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { children,renderLoading } = this.props;
    const { loading } = this.state;
    if(!loading){
      return children;
    }
    return renderLoading;
  }
}
AsyncLoadMap.defaultProps = {
  renderLoading:<div>loading....</div>
}

const getPoint = (lng,lat) => {
  return new BMap.Point(lng,lat)
}

const getMarker = (point) => {
  return new BMap.Marker(point);
}
export { AsyncLoadMap,loadBdMap,getPoint ,getMarker};
