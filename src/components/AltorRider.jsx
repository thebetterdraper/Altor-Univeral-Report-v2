import React, { useDebugValue, useEffect,useState } from "react";
import Header from "./Heading";
import Footer from "./Footer";
import RiderData from "./RiderData";
import Cookie from "js-cookie";
import axios from "./Axios";
import Loading from "./Loading";


function AltorRider(){


    const [counterForHackyReRenderStoppage,setCounterForHackyReRenderStoppage]=useState(1);
    

    const windowWidth = window.screen.width;
    // console.log(windowWidth);
    const windowHeight = window.screen.height;
    // console.log(windowHeight);
    const styles = {
        "divToPrint":{
            backgroundColor:"#f0f7f9",
            paddingLeft:(windowWidth-1300)/2,
            paddingRight:(windowWidth-1300)/2,
            minHeight:windowHeight
        }
    }
    const [riderData,setRiderData] = useState(null);
    const [timer,setTimer] =  useState(false);
    const [duration,setDuration] = useState(-1);


    const handleDurationCallBack=(durationRecieved)=>{
        console.log("Duration Received",durationRecieved);
        setDuration(durationRecieved);
    }

    // console.log("Duration INT",duration);

    //generates present timestamp in YYYY-MM-DD HH:MM:SS format
    function retrieveTimestamp(){
        var DT_obj=new Date();
        // var date_string=DT_obj.getFullYear()+"-"+(padSingleDigits(10)+1)+"-"+padSingleDigits(DT_obj.getDate());
        var date_string=DT_obj.getFullYear()+"-"+(padSingleDigits(DT_obj.getMonth()+1))+"-"+padSingleDigits(DT_obj.getDate());
        
        var time_string=padSingleDigits(DT_obj.getHours())+":"+padSingleDigits(DT_obj.getMinutes())+":"+padSingleDigits(DT_obj.getSeconds());

        var date_time_string=date_string+" "+time_string;
        // console.log(date_time_string);

        return date_time_string;
    }

    function retrieveDays(){

        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(); // Right now
        var secondDate = new Date(firstDate.getFullYear(), (firstDate.getMonth()), 1, 12, 0, 0, 0); // 2st of March at noon

        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        // console.log(firstDate, "to", secondDate, "\nDifference: " + diffDays + " day");

        return diffDays+1;

    }

    //pads single digits with a 0 to the left to account for server-acceptable formats
    function padSingleDigits(val){
        if(parseInt(parseInt(val)/10)===0)
            return "0"+val;

        return val;
    }

    // let DaysForCookie = retrieveDays();
    var inititalValueForDays=retrieveDays();
    const[DaysForCookie,setDaysForCookie] = useState(inititalValueForDays);

    useEffect(()=>{
        if(duration == -1){
            setDaysForCookie(retrieveDays());
        }else{
            console.log("Setting duration in cookie as",duration)
            setDaysForCookie(duration);
        }

    },[duration])
    
    console.log("days",DaysForCookie);
    // async function fetchData(){

    //         console.log("days",DaysForCookie);
    //         const cookie_content=Cookie.getJSON("report_res");
    //         cookie_content["timestamp"]=retrieveTimestamp();
    //         // cookie_content["days"]=retrieveDays();
    //         cookie_content["days"]=DaysForCookie;
    //         // console.log("Cookie is"+ JSON.stringify(cookie_content));
    //         // console.log("retrieveDays");
    //         // retrieveDays();
            
    //         const res = await axios.post("/ride/report/",cookie_content);
    //         // console.log(res.data);
    //         setRiderData(res.data); 

    // }


    // useEffect(()=>{
    //     fetchData();           
    // },[])

    useEffect(()=>{
        async function fetchData(){

            console.log("daysInUseEffect",DaysForCookie);
            const cookie_content=Cookie.getJSON("report_res");
            cookie_content["timestamp"]=retrieveTimestamp();
            // cookie_content["days"]=retrieveDays();
            cookie_content["days"]=DaysForCookie;
            // console.log("Cookie is"+ JSON.stringify(cookie_content));
            // console.log("retrieveDays");
            // retrieveDays();
            
            const res = await axios.post("/ride/report/",cookie_content);
            // console.log(res.data);
            console.log("The value of res.data is",res.data);
            
          
            setRiderData(res.data); 

        }
        fetchData();           
    },[DaysForCookie])

    

    /**************************************************/

    // let riderDataItems = {};
    let riderDataItems = [];
    let currentDayData = [];
    let overallData = [];
    const [cleanDataProp,setCleanDataProp]=useState([]);

    //MY DATA
    let usableRiderData = [];


    useEffect(()=>{

        console.log("THIS IS RIGHT AFTER NEW DATA ARRIVES");
       

   
    if(riderData){
        
        console.log("riderData",riderData);
        riderDataItems  = riderData.items;
        // console.log("riderDataItems",riderDataItems);
        for (const dateData in riderDataItems ){
            

            currentDayData = riderDataItems[dateData].items
            // console.log(currentDayData);

            
            
            
            function makeMyData(rider,dateIndex){

                function makeANewRiderElement(rider,dateIndex){

                    let new_rider_element = {
                        "id":rider.id,
                        "name":rider.name||rider.nickname,
                        "phone":rider.number,
                        "email":rider.email,
                        "image":rider.image,
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
                            }],
                            "store_to_store_time":[{
                                "date":dateIndex,
                                "score":rider.average_ride_duration,
                                "validity":true
                            }],
                            "total_distance_covered":[{
                                "date":dateIndex,
                                "score":rider.distance,
                                "validity":true
                            }],
                            "total_on_ride_time":[{
                                "date":dateIndex,
                                "score":rider.total_time,
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
                            });
                            usableRiderData[i].data.pitstop.push({
                                "date":dateIndex,
                                "score":rider.pitstop_percentage,
                                "validity":true
                            });
                            usableRiderData[i].data.wear.push({
                                "date":dateIndex,
                                "score":rider.wear_percentage,
                                "validity":true
                            });
                            usableRiderData[i].data.store_to_store_time.push({
                                "date":dateIndex,
                                "score":rider.average_ride_duration,
                                "validity":true
                            });
                            usableRiderData[i].data.total_distance_covered.push({
                                "date":dateIndex,
                                "score":rider.distance,
                                "validity":true
                            });
                            usableRiderData[i].data.total_on_ride_time.push({
                                "date":dateIndex,
                                "score":rider.total_time,
                                "validity":true
                            });
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

    /*****************Cleaning Usable Rider Data********************/

    let cleanedRiderData = [];

    
    usableRiderData.map((oneRider,index)=>{
        
        let newCleanedElement = {
            "id":oneRider.id,
            "name":oneRider.name,
            "phone":oneRider.phone,
            "email":oneRider.email,
            "image":oneRider.image,
            "data":{
                safety_score:[],
                overspeeding:[],
                pitstop:[],
                wear:[],
                store_to_store_time:[],
                total_distance_covered:[],
                total_on_ride_time:[],
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
            let dataArr = new Array();
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

    

    /********Adding Overall data to the cleaned Rider Data*********** */
    if(riderData){
        overallData = riderData.overall.items
        // console.log("overallData",overallData);
        for(let i = 0 ;i<overallData.length;i++){
            for(let j=0;j<cleanedRiderData.length;j++){
                if(overallData[i].id===cleanedRiderData[j].id){
                    cleanedRiderData[j].overall_safety_score = overallData[i].safety_score
                    cleanedRiderData[j].overall_overspeeding = overallData[i].overspeed_percentage
                    cleanedRiderData[j].overall_pitstop = overallData[i].pitstop_percentage
                    cleanedRiderData[j].overall_wear = overallData[i].wear_percentage
                    cleanedRiderData[j].overall_store_to_store_time = overallData[i].average_ride_duration
                    cleanedRiderData[j].overall_total_distance_covered = overallData[i].distance
                    cleanedRiderData[j].overall_total_on_ride_time = overallData[i].total_time

                }else{
                    continue
                }
            }
        }
    }

    
    setCleanDataProp(()=>cleanedRiderData)

    },[riderData])
    // console.log("cleanedRiderData",cleanedRiderData); 
   
    useEffect(()=>{
        setCounterForHackyReRenderStoppage(()=>(counterForHackyReRenderStoppage+1));
    },[riderData,duration,cleanDataProp]);

    

    
        if((cleanDataProp.length>0)){

        

                //hacky checking for 5+3x render pattern to avoid excessive re-renders
             
                var hackyFlag=false;
                for(var i=0;i<20;i++){
                    if(counterForHackyReRenderStoppage==(5+(3*i))||(counterForHackyReRenderStoppage<5)){
                        console.log("WOOOAH");
                        hackyFlag=true;
                        break;
                    }

                    
                }

            

            console.log("COUNTER IS ",counterForHackyReRenderStoppage)
        
    
            // console.log("THE CLEANED RIDER DATA IS",cleanDataProp)
    
            if(hackyFlag){
                return (
                    <>
                    <div style={{backgroundColor:"#f0f7f9"}}>
                        
                        <div id="divToPrint" style={styles.divToPrint}>
                            <Header />
                            <RiderData 
                                parentDurationCallBack = {handleDurationCallBack}
                                riderDataAPI={cleanDataProp}
                            />
                        </div>
                        <Footer />
                    </div>
                </>
        )

            }else{
                return<div style={{backgroundColor:"rgb(240, 247, 249)",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",
                textAlign:"center",paddingTop:"307px"}}>
                    <h1 style={{display:"flex", color:"gray",backgroundColor:"rgb(240, 247, 249)",minWidth:"30vw",
                    fontSize:"43px",maxWidth:"35vw"}}>Loading...</h1>
                </div>
            }
            
        
    
        }else{
            function start(){
                setTimer(prevValue=>!prevValue);
                window.clearTimeout(ErrorTimer);
            }
            
            // ErrorTimer();
            if(!timer){
                var ErrorTimer = setTimeout(start,7000);
                return <Loading />
            }else{
                return<div style={{backgroundColor:"rgb(240, 247, 249)",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center",
                textAlign:"center",paddingTop:"307px"}}>
                    <h1 style={{display:"flex", color:"#e84545",backgroundColor:"rgb(240, 247, 249)",minWidth:"30vw",
                    fontSize:"43px",maxWidth:"35vw"}}>Error!! Problem loading page. Please try again after sometime.</h1>
                </div>
            }
            
        }

    
    
   
}

export default AltorRider;