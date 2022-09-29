import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Home1.css";
import {Logo} from '../images/Netflix'
import {ConnectButton,Icon,TabList,Tab,Button,Modal,useNotification} from 'web3uikit'
import {movies} from '../helpers/library'
import { useMoralis } from "react-moralis";

const Home = () => {
const { isAuthenticated, Moralis, account } = useMoralis();
const [visible,setVisible]=useState(false)
const [movie1,setMovie1]=useState({})
const [m,setM]=useState([])
const [m1,setM1]=useState('1')
const dispatch = useNotification();

    const handleNewNotification = (
       
    ) => {
        dispatch({
            type:"error",
            message: 'Please connect your crypto wallet',
            title: 'User Not Authenticated',
            icon:"chevronRightX2",
            position:  'topL',
        });
    };
    const handleNewNotification1 = (
       
      ) => {
          dispatch({
              type:"success",
              message: 'Added to MyList',
              title: 'success  ',
              icon:"chevronRightX2",
              position:  'topL',
          });
      };
    useEffect(() => {
      async function fetchMyList() {
        //  await Moralis.start({
        //     serverUrl: "https://nxnum9lbbe37.usemoralis.com:2053/server",
        //     appId: "pI4URxOPkpA9Ob4PuMQS88zBgyISVIVFot9qXxYQ",
        //   }); //if getting errors add this 
  
        try {
          const theList = await Moralis.Cloud.run("getMyList", { addrs: account });
  
         
          console.log(theList)
          setM(theList)
          const arr=[];
          
        
         console.log(m)
        } catch (error) {
          console.error(error)
        }
      }
  
      fetchMyList();
    }, [m1,account]);
return(
  <>
  <div class="nav" style={{'width':'100%'}}>
    <div class="logo">
   <Logo />
 

   </div>
   <div  style={{'margin-left':'0em','margin-top':'3em','position':'absolute'}} class="menu">
  <TabList defaultActiveKey={1} tabStyle="bar">
    <Tab  tabKey={1} tabName="Movies">
      <div  style={{'margin-top':'-1.35em','position':'absolute'}}>
      <img style={{'margin-left':'0em','position':'absolute','width':'71.75em'}} src={movies[0].Scene}></img>
      <img style={{'margin-top':'3em','margin-left':'2em','position':'absolute','width':'20em'}} src={movies[0].Logo}></img>
      <p style={{'color':'white','margin-top':'12em','margin-left':'2em','position':'absolute','width':'20em'}}>{movies[0].Description}</p>
      <div class="bannerButton" style={{'margin-top':'20em','margin-left':'2em','position':'absolute','width':'20em'}}>
        <Link to='/player' state={movies[1].Movie}>
              <Button style={{'padding-right':'10px'}}
          icon="chevronRightX2"
          text="play"
          theme="secondary"
          
        />
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
              <Button 
          icon="plus"
          text="Add to MyList"
          theme="translucent"
          
        />
      </div>
      <div  style={{'color':'white','margin-top':'26em','margin-left':'2em','position':'absolute','width':'20em'}}>
      movies
      </div>
      <div class="movies" style={{'color':'white','margin-top':'29em','margin-left':'2em','position':'absolute','width':'60em'}}>

       {movies.map(x=>{
        
        return(
          <div >
            <img class="imgMovie"  onClick={()=>{
              
                setVisible(true);
                setMovie1(x)
            
             
               
              
                
            }}
      src={x.Thumnbnail}></img>

          </div>
        )
       })}
      </div>
      </div>
    </Tab>
    <Tab  tabKey={2} tabName="Series">
      
    </Tab>
    <Tab  tabKey={3} tabName="MyList">
    <div class="movies" style={{'color':'white','margin-top':'1em','margin-left':'2em','position':'absolute','width':'60em'}}>

{m.map(x=>{
 
 return(
   <div >
     <img class="imgMovie"  onClick={()=>{
       
         setVisible(true);
         setMovie1(x)
     
      
        
       
         
     }}
src={x.Thumnbnail}></img>

   </div>
 )
})}
</div>

    </Tab>
   </TabList>
   </div>
  <div class="connect">
    
  <div class="bell">
   <Icon fill="#ffffff" size={24} svg="bell"/>
   </div>
   <ConnectButton/>
   </div>
  
   </div>
   {/* <div class="menu1">
  
  <div>
  <img style={{'width':'25em','height':'25em','margin-left':'5em'}} src="https://i.pinimg.com/originals/42/61/3a/42613a991b920373a99081e940119527.gif"></img>
  </div>
   </div> */}
  <div className="container">
   
  <Modal
      isVisible={visible}
      onCloseButtonPressed={()=>{
        setVisible(false)
      }}
      onOk={()=>{
        setVisible(false)
      }}
      onCancel={()=>{
        setVisible(false)
      }}
    >
      <div class="modal">
        {isAuthenticated?
        <div><img src={movie1.Thumnbnail} style={{'width':'40em'}}></img>
        <div class="modalButton">
         <Link state={movie1.Movie} to='/player'>
        <Button style={{'padding-right':'10px'}}
           icon="chevronRightX2"
           text="play"
           theme="secondary"
           
         />
         </Link>
         <br></br>
         <br></br>
               <Button 
           icon="plus"
           text="Add to MyList"
           theme="translucent"
           onClick={async () => {
           

            await Moralis.Cloud.run("updateMyList", {
              addrs: account,
              newFav: movie1,
            });
            handleNewNotification1();
           setM1(m1+'1')
          }}
           
         />
         </div></div>:<div>

         <img src={movie1.Thumnbnail} style={{'width':'40em'}}></img>
       <div class="modalButton">
        
       <Button style={{'padding-right':'10px'}}
          icon="chevronRightX2"
          text="play"
          theme="secondary"
          onClick={
            handleNewNotification
          }
        />
     
        <br></br>
        <br></br>
              <Button 
          icon="plus"
          text="Add to MyList"
          theme="translucent"
          onClick={
            handleNewNotification
          }
          
        />
        </div>
         </div>
        }
       
      </div>
    </Modal>
  </div>
  </>
)
}

export default Home;









