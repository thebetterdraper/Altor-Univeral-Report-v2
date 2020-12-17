import React from "react";
import Cookie from "js-cookie";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



// import downloadImage from './images/download.svg';



function Header(){

    var cookie_value=Cookie.getJSON("report_res");
    var org_id=cookie_value.org_id;
    var arr=org_id.split(".");
    var store_name=arr[arr.length-1];

    // console.log(arr)

    return (
        <div className="heading">
            <h1>
                Altor Rider Ranking 
            </h1>
            
            {/* <button onClick={downloadPdf}><img src={downloadImage} alt="download" style={{width:'50px', height:'50px'}}></img></button> */}
            <h2 className="storeName">{store_name}</h2>

            <Popup trigger={<button style={{width:"25px",height:"25px",borderRadius:"100%",backgroundColor:"white",border:"1px solid lightgray",color:"gray",fontStyle:"italic",fontFamily:"cursive",marginTop:"28px",marginLeft:"18%",cursor:"pointer"}}>i</button>} position="right center">
                <div style={{width:"210px",height:"auto",backgroundColor:"grey"}}>
                    <img style={{width:"200px",height:"auto",padding:"5px",borderRadius:"5px"}} src={require('./images/helperimage.PNG')}/>
                    <br></br>
                    <font style={{fontFamily:"sans-serif",fontSize:"20px",color:"lightgray"}}>The number in the centre represents the corresponding score for the rider today. The number at the bottom right represents how different it is in percentage terms from the same score of the same rider, on the first of the same month.</font>
                    
                    
                </div>
            </Popup>
        </div>
    );

}

export default Header;