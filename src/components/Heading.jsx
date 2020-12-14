import React from "react";
import Cookie from "js-cookie";


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
        </div>
    );

}

export default Header;