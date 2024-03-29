import React, { useEffect, useState} from "react";
import RiderInfo from "./RiderInfo";
import Cookie from "js-cookie";
import downloadLogo from "./images/download_pdf.png";


function RiderData(props){

    const styles = {
        "buttonHolder":{
            width: "100%",
            minHeight: "100px",
            marginTop: "20px",
            paddingTop: "10px",
        },
        "sortingArrangement":{
            display: "block",
            float: "left",
            backgroundColor: "rgb(100 149 237)",
            minWidth: "519px",
            maxWidth:"519px",
            fontSize: "17.5px",
            color: "white",
            padding: "10px",
            fontFamily: "sans-serif",
            borderRadius: "10px",
            boxShadow: "rgb(0 0 225 / 40%) 4px 6px 12px 3px",
            marginLeft: "1%",
            marginRight: "1%"
        },
        "sortBy":{
            minWidth: "47%",
            // minHeight: "10%",
            borderRadius: "10px",
            padding: "10px",
            border: "0px",
            boxShadow: "rgb(80 125 206) 1px 2px 7px inset",
            fontSize: "17.5px",
            outline: "none",
            webkitAppearance: "none",
            mozAppearance: "none",
            background: "white url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right",
            backgroundPositionX: "97%" 
        },
        "sortToggler":{
            fontSize: "17.5px",
            marginLeft: "1%",
            padding: "8px 20px 8px 20px",
            borderRadius: "10px",
            border:"0px",
            outline:    "none",
            display: "inlineBlock",
            cursor:"pointer"
        },
        "currentDate":{
            position: "relative",
            textAlign: "center",
            display: "block",
            paddingTop: "10px",
            minWidth: "141px",
            marginLeft: "40px",
            float: "left",
            backgroundColor: "rgb(100 149 237)",
            width: "auto",
            fontSize: "17.5px",
            color: "white",
            padding: "20px",
            fontFamily: "sans-serif",
            borderRadius: "10px",
            minHeight: "22px",
            boxShadow: "rgb(0 0 225 / 40%) 4px 6px 12px 3px",
            height:"22px"

        },
        "storeName":{
            position: "relative",
            textAlign: "center",
            display: "block",
            paddingTop: "10px",
            minWidth: "141px",
            marginLeft: "40px",
            float: "left",
            backgroundColor: "rgb(100 149 237)",
            width: "9vw",
            fontSize: "17.5px",
            color: "white",
            padding: "20px",
            fontFamily: "sans-serif",
            borderRadius: "10px",
            minHeight: "22px",
            boxShadow: "rgb(0 0 225 / 40%) 4px 6px 12px 3px"
        },
        "riderInfoHeading":{
            marginTop: "1.5vw",
            marginLeft: "2vw",
            marginBottom:"137px"
        },
        "attributeTitle":{
            display: "block",
            float: "left",
            width:"10%",
            padding:"1%",
            wordWrap:"breakWord",
            margin: "0 0% 0 0%",
            fontSize: "17px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            fontWeight: "500",
            textAlign:"right",
            color:"#5a5a5a"
        },
        "nameAttribute":{
            display: "block",
            float: "left",
            width:"10%",
            padding:"1%",
            wordWrap:"breakWord",
            margin: "0 0% 0 0%",
            fontSize: "17px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            fontWeight: "500",
            textAlign:"right",
            color:"#5a5a5a"
        },
        "riderDiv":{
            border:"1px solid white",
            borderRadius:"20px",
            margin:"16px",
            width:"93%",
            minWidth:"1300px",
            maxWidth:"1500px",
            boxShadow:"2px 2px 6px 4px rgba(0,0,0,0.2)",
            backgroundColor:"white"
        },
        "downloadPdf":{
            display:"block",
            float:"left",
            backgroundColor:"ghostwhite",
            outline:"none",
            border:"1px solid cornflowerblue",
            margin: "-14px 17px 0px 0px",
            borderRadius:"100%",
            width:"50px",
            height:"50px",
            cursor:"pointer"
        },
        "donwloadPdfImg":{
            padding:"3px",
            width:"30px",
            height:"30px"
        }
    }

    const riderDataAPI = props.riderDataAPI;
    // console.log("riderDataAPI",riderDataAPI);


    const [newRiderData,setNewRiderData] = useState([]);
    

    useEffect(()=>{

        let dataArr = [];

        function score_cal(riderDataArray){
            let length = new Date().getDate();
            let currentScore = riderDataArray[length-1].score;
            let prevCumilitiveScore = 0; //Score Add Score of(day1 to (presentDay - 1))
            for(var i=0;i<length-1;i++){
                prevCumilitiveScore+=riderDataArray[i].score;
            }
            let prevAvgScore = prevCumilitiveScore/length;
            let changePercentage = 0;
            prevAvgScore===0?changePercentage=100:changePercentage = ((currentScore-prevAvgScore)/(prevAvgScore)*100).toPrecision(4);
            return [Math.round(currentScore),changePercentage]
        }

        riderDataAPI.map((rider,index)=>{
            console.log(rider);
            let safety = score_cal(rider.data.safety_score);
            let overspeeding = score_cal(rider.data.overspeeding);
            let pitstop = score_cal(rider.data.pitstop);
            let wear = score_cal(rider.data.wear);
            let store_to_store_time = score_cal(rider.data.store_to_store_time);
            let total_distance_covered = score_cal(rider.data.total_distance_covered);
            let total_on_ride_time = score_cal(rider.data.total_on_ride_time);

            let new_element =  {
                "id":rider.id,
                "name":rider.name,
                "phone":rider.phone,
                "email":rider.email,
                "image":rider.image,
                "avg_safety_score":rider.overall_safety_score,
                "avg_safety_score_change":safety[1],
                "avg_overspeeding_score":rider.overall_overspeeding,
                "avg_overspeeding_score_change":overspeeding[1],
                "avg_pitstop":rider.overall_pitstop,
                "avg_pitstop_change":pitstop[1],
                "avg_wear":rider.overall_wear,
                "avg_wear_change":wear[1],
                "avg_store_to_store_time":rider.overall_store_to_store_time,
                "avg_store_to_store_time_change":store_to_store_time[1],
                "avg_total_distance_covered":rider.overall_total_distance_covered,
                "avg_total_distance_covered_change":total_distance_covered[1],
                "avg_total_on_ride_time":rider.overall_total_on_ride_time,
                "avg_total_on_ride_time_change":total_on_ride_time[1],                
                "safety_score":rider.data.safety_score,
                "overspeeding":rider.data.overspeeding,
                "pitstop":rider.data.pitstop,
                "wear":rider.data.wear,
                "store_to_store_time":rider.data.store_to_store_time,
                "total_distance_covered":rider.data.total_distance_covered,
                "total_on_ride_time":rider.data.total_on_ride_time

            }
            // console.log(new_element);
            dataArr.push(new_element);
            return 0;
        })
        setNewRiderData(dataArr)
        
    },[])


    const [sortedRiderData,setSortedRiderData] = useState([]);

    

    const [sortConfig,setSortConfig] = useState({
        "key":null,
        "direction":null
    });
    
    

    function sortArray(sortingDirection,arr){
        let newSortedArray = [];
        arr.map((ele,index)=>{
            newSortedArray.push(ele);
            return 0;
        })
        if(sortingDirection==='ascending'){
            newSortedArray.sort((a,b) => (a[sortConfig.key]-b[sortConfig.key]))
        }else{
            newSortedArray.sort((a,b) => (b[sortConfig.key]-a[sortConfig.key]))
        }

        return newSortedArray
    }

    useEffect(()=>{
        
        
        
        setSortedRiderData(sortArray(sortConfig.direction,newRiderData));  
      
    },[sortConfig.direction,sortConfig.key])


    useEffect(()=>{
        
    },[newRiderData,sortedRiderData])

 

    function sort(event){
        var sortType = document.getElementById("SortBy").value;
        console.log(sortType);
        
        let key=sortType;
        let direction = null;       

        if(sortConfig && sortConfig.key === key && sortConfig.direction === "ascending"){
            direction = "descending";
        }else if(sortConfig && sortConfig.key === key && sortConfig.direction === "descending"){
            direction = "ascending";
        }else{
            direction = "ascending";
            
        }
        
        setSortConfig({key,direction}); 

    }

    function handleChange(){
        let key= document.getElementById("SortBy").value;
        console.log("key");
        console.log(key);
        let direction = null;
        setSortConfig({key,direction});
    }    

    var cookie_value=Cookie.getJSON("report_res");
    var org_id=cookie_value.org_id;
    var arr=org_id.split(".");
    var store_name=arr[arr.length-1];
    
    const [bDownloadReady,setDownloadReady] = useState(false);

    function handleDownloadClick(){
        setDownloadReady(true);
    }

    function downloadAsCSV(content, fileName, mimeType) {
        console.log("content");
        console.log(content);
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';
        if (navigator.msSaveBlob) { // IE10
          navigator.msSaveBlob(new Blob([content], {
            type: mimeType
          }), fileName);
        } else if (URL && 'download' in a) { //html5 A[download]
        
        var blob  = new Blob([content]);
        a.href = window.URL.createObjectURL(blob);
          a.setAttribute('download', fileName);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          window.location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
        setDownloadReady(false)
      }

    function exportTableToCSV(filename) {
        var csv = "";
        var rows = document.querySelectorAll("table tr");
        
        for (var i = 0; i < rows.length; i++) {
            var row = "", cols = rows[i].querySelectorAll("td, th");
            
            for (var j = 0; j < cols.length; j++) {
                console.log("innerText");
                console.log(cols[j].innerText);
                row+=cols[j].innerText+";";
            }
                
            row=row.substring(0,row.length+1)+"\n";
            csv = csv+row;        
        }
    
        // Download CSV file
        console.log("Download CSV file");
        console.log(csv);
        var finalCsv = "sep=;\n"+csv;
        // var finalCsv = csv;
        downloadAsCSV(finalCsv, filename,"text/csv;encoding:utf-8");
        csv="";
    }

        function replaceSpace(riderName){
            var riderNameArr = riderName.split(" ");
            var newRiderName = riderNameArr[0]+" "+riderNameArr[1];
            return newRiderName;
        }

        function getKey(key){
            if(key==="avg_safety_score"){
                return "Safety_Score"
            }else if(key==="avg_overspeeding_score"){
                return "Overspeeding_Score"
            }else if(key==="avg_pitstop"){
                return "Pitstop"
            }else if(key==="avg_wear"){
                return "Wear"
            }else if(key==="avg_store_to_store_time"){
                return "Store_To_Store_Time(min)"
            }else if(key==="avg_total_distance_covered"){
                return "Avg_Total_Distance_Covered(km)"
            }else{
                return "On_Ride_Time(min)"
            }
        }

    useEffect(()=>{
        var tablearea = document.getElementById('tablearea'),
        table = document.createElement('table');
        
        

            var tr = document.createElement('tr');
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            tr.appendChild(document.createElement('td'));
            

            tr.cells[0].appendChild(document.createTextNode(""));
            tr.cells[1].appendChild(document.createTextNode(""));
            tr.cells[2].appendChild(document.createTextNode(""));
            tr.cells[3].appendChild(document.createTextNode("Altor Rider Ranking"));
            tr.cells[4].appendChild(document.createTextNode(""));
            tr.cells[5].appendChild(document.createTextNode(""));
            tr.cells[6].appendChild(document.createTextNode(""));
            tr.cells[7].appendChild(document.createTextNode(""));
            
            
            // tr.cells[0].setAttribute("colspan",3);

            table.appendChild(tr);

            var tr2 = document.createElement('tr');
            tr2.appendChild(document.createElement('td'));
            tr2.appendChild(document.createElement('td'));
            tr2.appendChild(document.createElement('td'));
            tr2.cells[0].appendChild(document.createTextNode(sortConfig.key===null?"":getKey(sortConfig.key)));
            tr2.cells[1].appendChild(document.createTextNode(sortConfig.direction===null?"Unsorted":sortConfig.direction==="ascending"?"Low To High":"High To Low"));
            table.appendChild(tr2);

            var tr3 = document.createElement('tr');
            tr3.appendChild(document.createElement('td'));
            tr2.cells[0].appendChild(document.createTextNode(""));
            table.appendChild(tr3);

            var tr1 = document.createElement('tr');
            tr1.appendChild(document.createElement('td'));
            tr1.appendChild(document.createElement('td'));
            tr1.appendChild(document.createElement('td'));
            tr1.appendChild(document.createElement('td'));
            tr1.appendChild(document.createElement('td'));
            tr1.appendChild(document.createElement('td'));
            tr1.appendChild(document.createElement('td'));
            tr1.appendChild(document.createElement('td'));
            tr1.cells[0].appendChild(document.createTextNode("Name"))
            tr1.cells[1].appendChild(document.createTextNode("SafetyScore"))
            tr1.cells[2].appendChild(document.createTextNode("Overspeeding"))
            tr1.cells[3].appendChild(document.createTextNode("Pitstop"))
            tr1.cells[4].appendChild(document.createTextNode("Wear"))
            tr1.cells[5].appendChild(document.createTextNode("Store_to_Store_TIme"))
            tr1.cells[6].appendChild(document.createTextNode("Total_distance_Covered"))
            tr1.cells[7].appendChild(document.createTextNode("Total_On_Ride_Time"))
            table.appendChild(tr1);

        if(sortedRiderData.length!==0){
            sortedRiderData.map((rider)=>{
                console.log("inside SortedRiderData");
                var tr = document.createElement('tr');
                
    
                tr.appendChild(document.createElement('td'));
                tr.cells[0].appendChild(document.createTextNode(replaceSpace(rider.name)))
            
            
                tr.appendChild(document.createElement('td'));
                tr.cells[1].appendChild(document.createTextNode(rider.avg_safety_score))
    
                tr.appendChild(document.createElement('td'));
                tr.cells[2].appendChild(document.createTextNode(rider.avg_overspeeding_score))


                tr.appendChild(document.createElement('td'));
                tr.cells[3].appendChild(document.createTextNode(rider.avg_pitstop))

                tr.appendChild(document.createElement('td'));
                tr.cells[4].appendChild(document.createTextNode(rider.avg_wear))

                tr.appendChild(document.createElement('td'));
                tr.cells[5].appendChild(document.createTextNode(rider.avg_store_to_store_time))

                tr.appendChild(document.createElement('td'));
                tr.cells[6].appendChild(document.createTextNode(rider.avg_total_distance_covered))

                tr.appendChild(document.createElement('td'));
                tr.cells[7].appendChild(document.createTextNode(rider.avg_total_on_ride_time))

    
                table.appendChild(tr);
                
            })
        }else{
            newRiderData.map((rider)=>{
                console.log("inside newRiderData");
                var tr = document.createElement('tr');
                
    
                tr.appendChild(document.createElement('td'));
                tr.cells[0].appendChild(document.createTextNode(replaceSpace(rider.name)))
            
                tr.appendChild(document.createElement('td'));
                tr.cells[1].appendChild(document.createTextNode(rider.avg_safety_score))
    
                tr.appendChild(document.createElement('td'));
                tr.cells[2].appendChild(document.createTextNode(rider.avg_overspeeding_score))

                tr.appendChild(document.createElement('td'));
                tr.cells[3].appendChild(document.createTextNode(rider.avg_pitstop))

                tr.appendChild(document.createElement('td'));
                tr.cells[4].appendChild(document.createTextNode(rider.avg_wear))

                tr.appendChild(document.createElement('td'));
                tr.cells[5].appendChild(document.createTextNode(rider.avg_store_to_store_time))

                tr.appendChild(document.createElement('td'));
                tr.cells[6].appendChild(document.createTextNode(rider.avg_total_distance_covered))

                tr.appendChild(document.createElement('td'));
                tr.cells[7].appendChild(document.createTextNode(rider.avg_total_on_ride_time))
    
                table.appendChild(tr);
                
            })
        }

       

        

        if(tablearea && bDownloadReady){
            console.log("table Area");
            console.log("present");
            tablearea.appendChild(table);
            exportTableToCSV("AltorDownload.csv");
            tablearea.removeChild(table);
        }
        // setDownloadReady(false)
        
    },[bDownloadReady])
    
    if(sortedRiderData.length!==0){

        return ( 
            <>
            
                <div style={styles.buttonHolder}>
                    <div style={styles.sortingArrangement}>
                        <span style={{fontSize:"17.5px",borderRight:"1.2px solid white",marginRight:"13px",marginLeft:"28px",paddingRight:"8px"}}>Sort By</span>
                        <select style={styles.sortBy} id="SortBy" onChange={handleChange}>
                            <option value="avg_safety_score" selected>Safety Score</option>
                            <option value="avg_overspeeding_score">Overspeeding Score</option>
                            <option value="avg_pitstop">Pitstop</option>
                            <option value="avg_wear">Wear</option>
                            <option value="avg_store_to_store_time">Store To Store Time</option>
                            <option value="avg_total_distance_covered">Total Distance</option>
                            <option value="avg_total_on_ride_time">Total On Ride Time</option>
                        </select>
                        <button style={styles.sortToggler} onClick={sort}>{sortConfig.direction===null?"Sort":sortConfig.direction==="ascending"?"Low To High":"High To Low"}</button>
                    </div>
                    <div style={styles.currentDate}>
                        <button style={styles.downloadPdf} onClick={handleDownloadClick}><img src={downloadLogo} alt="donwloadLogo" style={styles.donwloadPdfImg}></img></button>
                        
                        {new Date().toString().substring(4,7)} 1 - {new Date().toString().slice(4,16)}
                    </div>
                    <div style={styles.storeName}>{store_name}</div>
                </div>
                <div id="tablearea"></div>
                <div style={styles.riderDiv}>
                    <div style={styles.riderInfoHeading}>
                        <span style={styles.nameAttribute}>Name</span>
                        <span style={styles.attributeTitle}>Safety Score</span>
                        <span style={styles.attributeTitle}>Overspeeding</span>
                        <span style={styles.attributeTitle}>Pitstops</span>
                        <span style={styles.attributeTitle}>Wear</span>
                        <span style={styles.attributeTitle}>Store-To-Store Time(min)</span>
                        <span style={styles.attributeTitle}>Total Distance (km)</span>
                        <span style={styles.attributeTitle}>Total Ride Time (min)</span>
                    </div>
                    <br />
                    <hr />
                    <br />
            
                    {
                        sortedRiderData.map((rider, index) => {
                            return(
                                    <RiderInfo 
                                        key = {index}
                                        id={index}
                                        name = {rider.name}
                                        phone = {rider.phone}
                                        email = {rider.email}
                                        image = {rider.image}
                                        avg_safety_score = {rider.avg_safety_score}
                                        per_change_safety = {rider.avg_safety_score_change}
                                        avg_overspeeding_score = {rider.avg_overspeeding_score}
                                        per_change_overspeeding = {rider.avg_overspeeding_score_change}
                                        avg_pitstop_score = {rider.avg_pitstop}
                                        per_change_pitstop = {rider.avg_pitstop_change}
                                        avg_wear_score = {rider.avg_wear}
                                        per_change_wear = {rider.avg_wear_change}
                                        avg_store_to_store_time = {rider.avg_store_to_store_time}
                                        per_change_store_to_store_time = {rider.avg_store_to_store_time_change}
                                        avg_total_distance_covered = {rider.avg_total_distance_covered}
                                        per_change_total_distance_covered = {rider.avg_total_distance_covered_change}
                                        avg_total_on_ride_time = {rider.avg_total_on_ride_time}
                                        per_change_total_on_ride_time = {rider.avg_total_on_ride_time_change}
                                        safety_score = {rider.safety_score}
                                        overspeeding = {rider.overspeeding}
                                        pitstop = {rider.pitstop}
                                        wear = {rider.wear}
                                        store_to_store_time = {rider.store_to_store_time}
                                        total_distance_covered = {rider.total_distance_covered}
                                        total_on_ride_time = {rider.total_on_ride_time}
                                    />     
                                )
                        })
                    }
                </div>
            </>
        );
        
    }else{

        return ( 
            <>
            
                <div style={styles.buttonHolder}>
                    <div style={styles.sortingArrangement}>
                        <span style={{fontSize:"17.5px",borderRight:"2px solid black",marginRight:"13px",marginLeft:"28px",paddingRight:"8px"}}>Sort By</span>
                        <select style={styles.sortBy} id="SortBy" onChange={handleChange}>
                            <option value="avg_safety_score" selected>Safety Score</option>
                            <option value="avg_overspeeding_score">Overspeeding Score</option>
                            <option value="avg_pitstop">Pitstop</option>
                            <option value="avg_wear">Wear</option>
                            <option value="avg_store_to_store_time">Store To Store Time</option>
                            <option value="avg_total_distance_covered">Total Distance</option>
                            <option value="avg_total_on_ride_time">Total On Ride Time</option>
                        </select>
                        <button style={styles.sortToggler} onClick={sort}>{sortConfig.direction===null?"Sort":sortConfig.direction}</button>
                    </div>
                    <div style={styles.currentDate}>
                    <button style={styles.downloadPdf} onClick={handleDownloadClick}><img src={downloadLogo} alt="donwloadLogo" style={styles.donwloadPdfImg}></img></button>
                    
                    {new Date().toString().substring(4,7)} 1 - {new Date().toString().slice(4,16)}</div>
                    <div style={styles.storeName}>{store_name}</div>
                </div>
                <div id="tablearea"></div>
                <div style={styles.riderDiv}>
                
                    <div style={styles.riderInfoHeading}>
                        <span style={styles.nameAttribute}>Name</span>
                        <span style={styles.attributeTitle}>Safety Score</span>
                        <span style={styles.attributeTitle}>Overspeeding</span>
                        <span style={styles.attributeTitle}>Pitstops</span>
                        <span style={styles.attributeTitle}>Wear</span>
                        <span style={styles.attributeTitle}>Store-To-Store Time(min)</span>
                        <span style={styles.attributeTitle}>Total Distance (km)</span>
                        <span style={styles.attributeTitle}>Total Ride Time (min)</span>
                    </div> 
                    
                    <br />
                    <hr />
                    <br />
                    {
                        newRiderData.map((rider, index) => {

                            return(
                                    <RiderInfo 
                                        key = {index}
                                        id={index}
                                        name = {rider.name}
                                        phone = {rider.phone}
                                        email = {rider.email}
                                        image = {rider.image}
                                        avg_safety_score = {rider.avg_safety_score}
                                        per_change_safety = {rider.avg_safety_score_change}
                                        avg_overspeeding_score = {rider.avg_overspeeding_score}
                                        per_change_overspeeding = {rider.avg_overspeeding_score_change}
                                        avg_pitstop_score = {rider.avg_pitstop}
                                        per_change_pitstop = {rider.avg_pitstop_change}
                                        avg_wear_score = {rider.avg_wear}
                                        per_change_wear = {rider.avg_wear_change}
                                        avg_store_to_store_time = {rider.avg_store_to_store_time}
                                        per_change_store_to_store_time = {rider.avg_store_to_store_time_change}
                                        avg_total_distance_covered = {rider.avg_total_distance_covered}
                                        per_change_total_distance_covered = {rider.avg_total_distance_covered_change}
                                        avg_total_on_ride_time = {rider.avg_total_on_ride_time}
                                        per_change_total_on_ride_time = {rider.avg_total_on_ride_time_change}
                                        safety_score = {rider.safety_score}
                                        overspeeding = {rider.overspeeding}
                                        pitstop = {rider.pitstop}
                                        wear = {rider.wear}
                                        store_to_store_time = {rider.store_to_store_time}
                                        total_distance_covered = {rider.total_distance_covered}
                                        total_on_ride_time = {rider.total_on_ride_time}
                                    />     
                            )
                        })
                    }
                </div>
            </>
        );

    }
    
                
}


export default RiderData;