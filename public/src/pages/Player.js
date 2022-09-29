import React,{useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import './Home1.css'
import {ConnectButton,Icon,TabList,Tab,Button,Modal,} from 'web3uikit'
const Player = () => {
  const {state:movie}=useLocation()
  
  return (
  <>
  <div className="container">
  <div class="nav" style={{'width':'100%'}}>
  <Link to="/" className="link"> <Button style={{'padding-right':'10px'}}
          icon="chevronLeftX2"
          text="Back"
          theme="secondary"
          
        /></Link>
  </div>
  <video style={{'height':'30em','width':'70em','margin-left':'1em'}} autoplay controls>
    <source src={movie}>
    
    </source>
  </video>
  
    
  </div>
  </>
)
}

export default Player;
