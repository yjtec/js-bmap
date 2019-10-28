import React,{Component} from 'react';
import {loadBdMap} from './AsyncLoadMap';
import {getPosition} from './Geo';
export function create(data){
  return (Ele) => {
    let defaultConfig = {};
    if(data){
      defaultConfig = {...defaultConfig,...data};
    }
    console.log(Ele);
    return class Routecs extends Component{
      constructor(props) {
        super(props);
        const defaultState ={};
        const {position} = defaultConfig;
        if(position){
          defaultState.isGeo = true;
        }
        this.state={
          loading:true,
          ...defaultState
        }
      }
      async componentDidMount(){
        const {position} = defaultConfig;
        const BMap = await loadBdMap();
        this.setState({
          loading:false,
          BMap:BMap
        })
        if(position){
          const point = await getPosition();
          this.setState({
            isGeo:false,
            point:point
          })
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
        if(typeof Ele  === 'function'){
          return <Ele {...this.props} {...rest}  />
        }else if(typeof Ele === 'object'){
          return React.cloneElement(Ele,{
            ...rest
          })
        }
        
      }
    }
  }
}