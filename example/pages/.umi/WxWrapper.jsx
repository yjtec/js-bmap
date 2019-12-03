import React,{Component} from 'react';
import {
  WxContext,
  loadWx,
  Jsapi,
  wxUtils,
  init
} from 'yjtec-wx';
const defaultConfig = {
  action:'/api/cmm/share',
  debug:true,
  jsApiList:[
    'getLocation',
  ]
}
class WxWrapper extends Component{
  constructor(props) {
    super(props);
    this.state ={
      loading:true,
      wxOk:true
    }
  }
  async componentDidMount(){
    const {action,...rest} = defaultConfig;
    const re = await loadWx();
    const {data} = await Jsapi(action);
    window.wx.config({
      ...rest,
      ...data
    })
    setTimeout(()=>{
      window.wx.error(res => {
        this.setState({
          wxOk:false
        })
      })
      window.wx.ready(res => {
        this.setState({
          loading:false
        })
      })
    },100)
  }
  render(){
    const {children} = this.props;
    const {loading} = this.state;
    const WxContextValue = {
      ...this.state,
      ...defaultConfig
    }
    return(
      <WxContext.Provider
        value={WxContextValue}
      >
        {!loading && children}
      </WxContext.Provider>
    )
  }
}
export default WxWrapper;