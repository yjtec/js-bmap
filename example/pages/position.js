import React from 'react';
import styles from './position.css';
import {getCachePoint} from '../../lib/';
class PostionTest extends React.Component{
  render(){
    console.log(getCachePoint());
    return(
      <div>positin</div>
    )
  }
}
export default PostionTest;
