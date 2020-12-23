import React, { useEffect,useState } from "react";
import jsPDF from "jspdf";
import Header from "./Heading";
import Footer from "./Footer";
import RiderData from "./RiderData";
import Cookie from "js-cookie";
import axios from "./Axios";
import Loading from "./Loading";
import html2canvas from 'html2canvas';

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
            // console.log("Cookie is"+ JSON.stringify(cookie_content));
            retrieveDays();

            const res = await axios.post("/ride/report/",cookie_content);
            setRiderData(res.data); 
            console.log(res.data);

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

                function makeANewRiderElement(rider,dateIndex){

                    let new_rider_element = {
                        "id":rider.id,
                        "name":rider.name||rider.nickname,
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

    // function downloadAsPdf(){

    //     const doc = document.getElementById("divToPrint");
    //     var element_width=document.getElementById("divToPrint").getBoundingClientRect().width;
    //     var page_width=window.screen.width;
    //     var left_offset=(page_width-element_width)/2;
    //     console.log(element_width+" and "+page_width)
    //     // console.log(doc.offsetHeight);
    //     // console.log(doc.offsetWidth);
    //     // console.log(doc.getAttribute("height"));
    //     var pdf = new jsPDF('l', 'pt', [1900,1980]);
    //         pdf.html(doc, {
    //             callback: function (pdf) {
    //                 pdf.save('AltorRiderReport.pdf');
                    
    //             },
    //             image:HTMLOptionsCollection,
    //             x:(left_offset*40),
    //             y:10,
    //     });
    // }

    const convertMmToPx=(mm)=>{
    
        // let width = window.screen.width;
        // let height = window.screen.height;
    
        // console.log("widht=>"+width+"height=>"+height);
        // if(width>=1900 ){
        //     return (mm/0.104583);
        // }
        // else if(width>=1300 && width<=1900){
        //     return (mm/0.104583);
        // }
        // else{
        //     return (mm/0.104583);
        // }
        return (mm/0.184583);
    }
    
    const convertDomToPDF=()=>{
       
       
        
        const input = document.getElementById('divToPrint');
        console.log(input.offsetWidth+" IS INPUT WIDTH")
    
       
    
        var pdf=new jsPDF({
            orientation: 'p', 
            unit: 'mm', 
            format: [210,297]
        });
    
        
    
        html2canvas(input).then((canvas) => {
    
        
    
    
        // var numOfPages=Math.ceil(canvas.height/ convertMmToPx(pdf.internal.pageSize.getHeight()) );
       
        
    
        var ratio=canvas.height/canvas.width;
    
        // createResizedCanvas(canvas,ratio);
        
    
        var returnableValue=breakIntoChunks(canvas,ratio,pdf);
        var imgArray=returnableValue.imgArray;
    
        imgArray.map((elem,i)=>{
    
            pdf.addPage().addImage(elem,'PNG',0,0,pdf.internal.pageSize.getWidth(),(pdf.internal.pageSize.getHeight()));
            // pdf.addImage(elem,'PNG',0,0,pdfWidth,(pdfWidth*ratio));
            
    
        })
    
        pdf.save("download.pdf");
      
      });
    
    }
    
    
    const breakIntoChunks=(canvas,ratio,pdf)=>{
    
        var height=canvas.height;
    
        var numOfPages=Math.ceil(height / convertMmToPx(pdf.internal.pageSize.getHeight()) );
    
    
    
        var imgArray=[];
    
        console.log("PDF dimensions are",convertMmToPx(pdf.internal.pageSize.getWidth()),convertMmToPx(pdf.internal.pageSize.getHeight()));
        console.log("Canvas dimensions are ", canvas.width, canvas.height);
    
        for(var i=0;i<numOfPages;i++){
    
            var newCanvas=document.createElement('canvas');
            newCanvas.width=convertMmToPx(pdf.internal.pageSize.getWidth());
            newCanvas.height=convertMmToPx(pdf.internal.pageSize.getHeight());
    
    
            var newContext=newCanvas.getContext('2d');
            newContext.drawImage(canvas, 0, ((convertMmToPx(pdf.internal.pageSize.getHeight()))*i), (canvas.width), convertMmToPx(pdf.internal.pageSize.getHeight()), 0, 0,convertMmToPx(pdf.internal.pageSize.getWidth()),convertMmToPx(pdf.internal.pageSize.getHeight()));
    
            var newImage = document.createElement('img');
            newImage.src = newCanvas.toDataURL();
    
            console.log("IMAGE IS AT"+(( convertMmToPx(pdf.internal.pageSize.getHeight())/numOfPages)*i));
    
            imgArray.push(newImage);
        }
    
        const returnableValue={
            pageSize:(canvas.height/numOfPages),
            imgArray:imgArray
        }
        return returnableValue;
    
        
        
        
    }
    

    if(cleanedRiderData.length!==0){

         return (
             <>
                <div>
                    <button className="downloadButton" onClick={convertDomToPDF}>Print</button>
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
            var ErrorTimer = setTimeout(start,5000);
            return <Loading />
        }else{
            return  <h1 style={{display:"flex", color:"red"}}>Error!! Problem loading page. Please try again after sometime.</h1>
                
        }
        
    }
}

export default AltorRider;