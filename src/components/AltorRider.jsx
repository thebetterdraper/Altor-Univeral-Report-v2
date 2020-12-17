import React, { useEffect,useState } from "react";
import jsPDF from "jspdf";
import Header from "./Heading";
import Footer from "./Footer";
import RiderData from "./RiderData";
import Cookie from "js-cookie";
import axios from "./Axios";
import Loading from "./Loading";

function AltorRider(){
    const [riderData,setRiderData] = useState(null);
    const [timer,setTimer] =  useState(false);

    //generates present timestamp in YYYY-MM-DD HH:MM:SS format
    function retrieveTimestamp(){
        var DT_obj=new Date();
        var date_string=DT_obj.getFullYear()+"-"+(padSingleDigits(10)+1)+"-"+padSingleDigits(DT_obj.getDate());
        var time_string=padSingleDigits(DT_obj.getHours())+":"+padSingleDigits(DT_obj.getMinutes())+":"+padSingleDigits(DT_obj.getSeconds());

        var date_time_string=date_string+" "+time_string;

        return date_time_string;
    }

    function retrieveDays(){

        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(); // Right now
        var secondDate = new Date(firstDate.getFullYear(), (firstDate.getMonth()), 1, 12, 0, 0, 0); // 2st of March at noon

        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        console.log(firstDate, "to", secondDate, "\nDifference: " + diffDays + " day");

        return diffDays;

    }

    //pads single digits with a 0 to the left to account for server-acceptable formats
    function padSingleDigits(val){
        if(parseInt(parseInt(val)/10)===0)
            return "0"+val;

        return val;
    }


    async function fetchData(){


            const cookie_content=Cookie.getJSON("report_res");
            cookie_content["timestamp"]=retrieveTimestamp();
            cookie_content["days"]=retrieveDays();
            console.log(JSON.stringify(cookie_content)+"IS COOKIE CONTENT")
            // console.log("Cookie is"+ JSON.stringify(cookie_content));
            retrieveDays();

            const res = await axios.post("/ride/report/",cookie_content);
            setRiderData(res.data); 
            console.log(res.status);

    }


    useEffect(()=>{
        fetchData();           
    },[])

    /**************************************************/    
    // TIME STRING TO BE USED LATER

    // const fullDate = new Date(2020,10,10);
    // const date = fullDate.getDate();
    // let dateString = "";
    // if(date<10){
    //     dateString = "0"+date.toString();
    // }else{
    //     dateString = date.toString();
    // }
    // // console.log(dateString);
    // const timeString = dateString+" "+fullDate.toString().slice(4,7);
    // console.log(timeString);

    /**************************************************/

    let riderDataItems = {};
    let currentDayData = [];

    //MY DATA
    let usableRiderData = [];
    //MY DATA
    if(riderData){
        
        
        riderDataItems  = riderData.items;
        // console.log(riderDataItems);
        for (const dateData in riderDataItems ){
            

            currentDayData = riderDataItems[dateData].items

            
            
            
            function makeMyData(rider,dateIndex){

                function makeANewRiderElement(rider,dataIndex){

                    let new_rider_element = {
                        "id":rider.id,
                        "name":rider.name,
                        "data":{
                            "safety_score":[{
                                "date":dateIndex,
                                "score":rider.safety_score,
                                "validity":true
                            }],
                            "overspeeding":[{
                                "date":dateIndex,
                                "score":rider.overspeed_percentage,
                                "validity":true
                            }],
                            "pitstop":[{
                                "date":dateIndex,
                                "score":rider.pitstop_percentage,
                                "validity":true
                            }],
                            "wear":[{
                                "date":dateIndex,
                                "score":rider.wear_percentage,
                                "validity":true
                            }]
                        }
                    }
    
                    return new_rider_element;
    
                }
                
                // console.log(rider);
                let riderId = rider.id;

                if(usableRiderData.length===0){

                    usableRiderData.push(makeANewRiderElement(rider,dateIndex))

                }else{
                    let myDataLength = usableRiderData.length;
                    let flag=0;
                    for(var i=0;i<myDataLength;i++){
                        if(usableRiderData[i].id===riderId){

                            flag=1; //found
                            usableRiderData[i].data.safety_score.push({
                                "date":dateIndex,
                                "score":rider.safety_score,
                                "validity":true
                            });
                            usableRiderData[i].data.overspeeding.push({
                                "date":dateIndex,
                                "score":rider.overspeed_percentage,
                                "validity":true
                            })
                            usableRiderData[i].data.pitstop.push({
                                "date":dateIndex,
                                "score":rider.pitstop_percentage,
                                "validity":true
                            })
                            usableRiderData[i].data.wear.push({
                                "date":dateIndex,
                                "score":rider.wear_percentage,
                                "validity":true
                            })
                            break;

                        }
                        else{
                            continue;
                        }
                    }
                    if(i>=myDataLength&&flag===0){
    
                        usableRiderData.push(makeANewRiderElement(rider,dateIndex))

                    }

                }
                return 0;
            }

            currentDayData.map((rider)=> makeMyData(rider,dateData))
            
        }
    }

    /*****************RiderUsableData*****************/

    if(usableRiderData.length!==0){
        // console.log("printing usable rider Data");
        // console.log(usableRiderData)
        // console.log("\n");
    }

    /*****************RiderUsableData*****************/

    /*****************Cleaning Usable Rider Data********************/

    let cleanedRiderData = [];

    
    usableRiderData.map((oneRider,index)=>{
        
        let newCleanedElement = {
            "id":oneRider.id,
            "name":oneRider.name,
            "data":{
                safety_score:[],
                overspeeding:[],
                pitstop:[],
                wear:[]
            }
        }

        /***Date variables****/
        const fullDate = new Date();
        let dateIndex = fullDate.getDate();
        let monthIndex = fullDate.toString().substring(4,7);
        // console.log(monthIndex);
        /***Date variables****/

        let dataArrNew = new Array(30);
        let scoreCat = "";
        

        for(const scoreType in oneRider.data){
            let dataArr = new Array(30);
            scoreCat = scoreType;
            // console.log(scoreCat);
            // console.log(oneRider.data[scoreType]);
            
            let scoreTypeDataArr = oneRider.data[scoreType];

            for(var i = dateIndex;i>=1;i--){
                let flag = 0;
                for(var j=0;j<scoreTypeDataArr.length;j++){
                    if(parseInt(scoreTypeDataArr[j].date.substring(0,2))===i){
                        // console.log(scoreTypeDataArr[j]);
                        dataArr[i-1]=scoreTypeDataArr[j];
                        flag=1;
                    }else{
                        continue;
                    }
                }
                if(flag===0){
                    let dateString = "";
                    if(i<10){
                        dateString = "0"+i.toString();
                    }else{
                        dateString = i;
                    }
                    let newElement={
                        "date":dateString+" "+monthIndex,
                        score:0,
                        validity:false
                    }
                    dataArr[i-1]=newElement;
                }else{
                    continue;
                }
            }

            dataArrNew = dataArr
            newCleanedElement.data[scoreCat] = dataArrNew;  
        }         
        
        cleanedRiderData.push(newCleanedElement)
        
        return 0;
    })

    // console.log(cleanedRiderData);




    /*****************Cleaning Usable Rider Data********************/

    function downloadAsPdf(){

        const doc = document.getElementById("divToPrint");
        var element_width=document.getElementById("divToPrint").getBoundingClientRect().width;
        var page_width=window.screen.width;
        var left_offset=(page_width-element_width)/2;
        console.log(element_width+" and "+page_width)
        // console.log(doc.offsetHeight);
        // console.log(doc.offsetWidth);
        // console.log(doc.getAttribute("height"));
        var pdf = new jsPDF('l', 'pt', [1900,1980]);
            pdf.html(doc, {
                callback: function (pdf) {
                    pdf.save('AltorRiderReport.pdf');
                    
                },
                image:HTMLOptionsCollection,
                x:(left_offset*35),
                y:10,
        });
    }

    if(cleanedRiderData.length!==0){

         return (
             <>
                <div>
                    <button className="downloadButton" onClick={downloadAsPdf}>Print</button>
                    <div id="divToPrint">
                        <Header />
                        <RiderData 
                            riderDataAPI={cleanedRiderData}
                        />
                        <Footer />
                    </div>
                </div>
            </>
    )

    }else{
        function start(){
            setTimer(prevValue=>!prevValue);
            window.clearTimeout(ErrorTimer);
        }
        
        // ErrorTimer();
        if(!timer){
            var ErrorTimer = setTimeout(start,2000);
            return <Loading />
        }else{
            return  (
            
                <div style={{display:"block",width:"50%",textAlign:"center",paddingLeft:"25%",paddingTop:"40vh"}}>
                         <h1 style={{display:"flex", color:"#e86b6b",fontWeight:"normal"}}>There was a problem loading the page. Please try again after sometime.</h1>
                </div>
           
            
            )
                
        }
        
    }
}

export default AltorRider;