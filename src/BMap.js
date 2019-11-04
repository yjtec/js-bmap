import React,{Component} from 'react';
import {loadBdMap} from './AsyncLoadMap';
import {getPosition} from './Geo';
import {setCachePoint,getCachePoint} from './utils/local';
import GeoContext from './GeoContext';
export function create(data){
  return (Ele) => {
    let defaultConfig = {};
    if(data){
      defaultConfig = {...defaultConfig,...data};
    }
    return class Routecs extends Component{
      constructor(props) {
        super(props);
        const defaultState ={};
        const {position,cacheTime} = defaultConfig;
        if(position){
          defaultState.isGeo = true;
        }
        this.state={
          loading:true,
          ...defaultState
        }
      }
      async componentDidMount(){
        const {position,cacheTime} = defaultConfig;
        const BMap = await loadBdMap();
        this.setState({
          loading:false,
          BMap:BMap
        })
       
        if(position){ //需要定位
          const cachePoint = getCachePoint();
          if(cachePoint){
            this.setState({
              isGeo:false,
              point:cachePoint
            })            
          }else{
            const point = await getPosition();
            const expiredAt = cacheTime ? cacheTime : 10;
            setCachePoint(point,expiredAt);
            this.setState({
              isGeo:false,
              point:point
            })
          }
          
          
        }
      }
      renderLoadPos(){
        const {renderPosLoading} = defaultConfig;
        if(renderPosLoading){
          return renderPosLoading;
        }
        return <div>定位中……</div>
      }
      renderLoad(){
      const {renderLoading} = defaultConfig;
        if(renderLoading){
          return renderLoading;
        }        
        return <div>加载中……</div>
      }
      render(){
        const {loading,...rest} = this.state;
        const {isGeo} = rest;
        const {position} = defaultConfig;
        if(position && isGeo){
          return this.renderLoadPos();
        }
        if(loading){
          return this.renderLoad();
        }

        let ReturnEle = '';
        if(typeof Ele  === 'function'){
          ReturnEle = <Ele {...this.props} {...rest}  />
          
        }else if(typeof Ele === 'object'){
          ReturnEle =  React.cloneElement(Ele,{
            ...this.props,
            ...rest
          })
        }
        return (
          <GeoContext.Provider
            value={rest}
          >
            {ReturnEle}
          </GeoContext.Provider>
        )
      }
    }
  }
}