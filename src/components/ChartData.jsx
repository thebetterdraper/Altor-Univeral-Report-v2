import React, { useEffect, useState } from "react";
import Charts from "./Charts.jsx";
import {Radar} from "react-chartjs-2";
import orgLogo from "./images/company.png"


function ChartData(props){

    const styles = {
        "toggleContainer":{
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            overflow: "auto",
            minWidth: "1250px",
            display: "block",
            height:props.toggle===true?"auto":"0px",
            borderRadius:"20px",
            width:"97%",
            boxShadow:props.toggle===true?"2px 4px 15px 4px rgba(169, 175, 169, 0.3)":"none",
            backgroundColor: "white",
            marginBottom:"5px"
        },
        "riderDetails":{
            minHeight: "44vh",
            display: "block",
            float: "left",
            // minWidth:"28vw",
            width:"32%",
            borderRight:"0px solid black",
        },
        "riderInfoDetails":{
            display: "block",
            float: "left",
            width:"50%",
            margin: "32% 0% 0% 9%"
        },
        "contactDetails":{
            display:   "block",
            fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            color:"gray",
            fontSize:"19px"
        },
        "nameDetails":{
            display:"block",
            fontWeigh:"bold",
            fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            color:"gray",
            fontSize:"25px"
        },
        "riderImg":{
            display: "block",
            float: "left",
            borderRadius: "100px",
            margin: "131px -16px 0 30px",
            width:"96px",
            height:"96px"
        },
        "chartContainer":{
            minHeight: "42vh",
            // backgroundColor: "white",
            display: "block",
            float: "left",
            padding: "0 20px 0 1px",
            borderLeft:"0px solid black",
            // borderRight:"1px solid black",
            width:"32%",
            paddingTop:"1%",
            paddingLeft:"1%"
        },
        "radarChartContainer":{
            width:"12%",
            height:"auto",
            display:"block",
            float:"left",textAlign:"center",
            alignContent:"center",
            alignItems:"center",
            paddingLeft: "6%",
            paddingRight: "11%",
            paddingTop: "1%"
        },
        "sortByChartName":{
            minWidth: "209px",
            minHeight: "10%",
            borderRadius: "10px",
            padding: "10px",
            marginLeft: "36%",
            marginTop: "1%",
            border: "0px solid lightgrey",
            color:"grey",
            boxShadow: "3px 2px 12px 4px rgba(0,0,0, 0.1)",
            fontSize: "17.5px",
            outline: "none",
            webkitAppearance: "none",
            mozAppearance: "none",
            background: "white url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right",
            backgroundPositionX: "97%"
        },
        "chartDisplay":{
            display:"flex",
            height:"auto",
            overflow:"visible",
            width:"90%",
            marginLeft:"66px",
            marginTop:"40px",
            marginBottom:"20px",
            // border:"2px solid rgba(0,0,0,0.1)",
            boxShadow:"2px 2px 15px 2px rgba(0,0,0,0.2)",
            padding:"5px",
            borderRadius: "20px",
            backgroundColor:"transparent"
        }

    }

    const [safetyScoreChartData,setSafetyScoreChartData] = useState({});
    const [overspeedingChartData,setOverspeedingChartData] = useState({});
    const [pitstopChartData,setPitstopChartData] = useState({});
    const [wearChartData,setWearChartData] = useState({});
    const [store2storeChartData,setStore2storeChartData] = useState({});
    const [totDistChartData,setTotDistChartData] = useState({});
    const [totOnRideTime,setTotOnRideTime] = useState({});
    const [radarChartData,setRadarChartData] = useState({});
    const [chartInd,setChartInd] = useState(0);

    const chartArr = [safetyScoreChartData,overspeedingChartData,pitstopChartData,wearChartData,store2storeChartData,totDistChartData,totOnRideTime];
    const [toggleClicked,setToggleClicked] = useState(false);
    

    function getScoreData(data){
        let scoreData = data.map((rider)=>rider.score);
        return scoreData;
    }

    function getColorData(data){
        let colorData = data.map((score)=>{
            if(score>=0&&score<40){
                return "red";
            }else if(score>=40&&score<60){
                return "blue";
            }else if(score>=60&&score<80){
                return "yellow";
            }else{
                return "green";
            }
        });
        return colorData
    }

    let safety_score = props.safety_score
    let overspeeding = props.overspeeding
    let pitstop = props.pitstop
    let wear = props.wear
    let store_to_store_time = props.store_to_store_time
    let total_distance_covered = props.total_distance_covered
    let total_on_ride_time = props.total_on_ride_time
    // console.log(safety_score);
    // console.log(getScoreData(safety_score));
    // console.log(getScoreData(overspeeding));

    const chart = () => {
        setSafetyScoreChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Safety Score',
                data:getScoreData(safety_score),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(safety_score)),
                borderWidht:1  
            }]
        })
        

        setOverspeedingChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'OverSpeeding',
                data:getScoreData(overspeeding),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(overspeeding)),
                borderWidht:1
            }]
        })

        setPitstopChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Pitstop',
                data:getScoreData(pitstop),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(pitstop)),
                borderWidht:1
            }]
        })

        setWearChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Wear',
                data:getScoreData(wear),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(wear)),
                borderWidht:1
            }]
        })

        setStore2storeChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Store To Store Time',
                data:getScoreData(store_to_store_time),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(store_to_store_time)),
                borderWidht:1
            }]
        })

        setTotDistChartData({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Total Distance Covered',
                data:getScoreData(total_distance_covered),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(total_distance_covered)),
                borderWidht:1
            }]
        })

        setTotOnRideTime({
            labels:Array.from({length: 30}, (_, i) => i + 1),
            datasets:[{
                label:'Total On_Ride Time',
                data:getScoreData(total_on_ride_time),        //14 days worth rider safety_score
                backgroundColor:getColorData(getScoreData(total_on_ride_time)),
                borderWidht:1
            }]
        })

        setRadarChartData({
            labels:["SafetyScore","Overspeeding","Pitstop","Wear"],
            datasets:[{
                label: props.name,
                backgroundColor: "rgba(100, 149, 237,0.4)",
                pointBackgroundColor: "#2e2a2a",
                borderColor: 'rgb(100, 149, 237)',
               data:[getScoreData(safety_score)[1],getScoreData(overspeeding)[1],getScoreData(pitstop)[1],getScoreData(wear)[1]]
            }]
        })
    }
    //point #2e2a2a
    //background rgba(220,220,220,0.4)

    useEffect(()=>{
        chart();
    },[safety_score,overspeeding,pitstop,wear,store_to_store_time,total_distance_covered,total_on_ride_time])

    function handleChange(event){
        let key1 = event.target.value;
        console.log(key1);
        // let key = document.getElementById("sortBy").value;
        setChartInd(parseInt(key1));
    }
      
      const options = {
        responsive:false,
        maintainAspectRatio: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Rider Radar Chart'
        },
        scale: {
          reverse: false,
          gridLines: {
            color: [
                'grey',
                'red',
                'gery',
                'blue',
                'grey',
                'yellow',
                'grey',
                'green'
            ]
          },
          ticks: {
            beginAtZero: true
          }
        }
      }
      console.log(props.image);
      function getImage(){
          if(props.image===""||props.image===undefined){
              return orgLogo
          }else{
              return props.image
          }
      }
    return (
        <div>
            
            <div  style={styles.toggleContainer}>
                <div style={styles.riderDetails}>
                    <img src={getImage(props.image)} alt="riderimg" style={styles.riderImg}></img>
                    <div style={styles.riderInfoDetails}>
                        <span style={styles.nameDetails}>{props.name}</span>
                        <span style={styles.contactDetails}>{props.email}</span>
                        <span style={styles.contactDetails}>{props.phone}</span>
                    </div>
                </div>
                <div style={styles.radarChartContainer}>
                    <Radar data={radarChartData} options={options} width={300} height={300}/> 
                </div>
                
                <div style={styles.chartContainer}>
                    <select style={styles.sortByChartName} id="sortBy" onChange={handleChange}>
                        <option value="0" selected>Safety Score</option>
                        <option value="1">Overspeeding Score</option>
                        <option value="2">Pitstop</option>
                        <option value="3">Wear</option>
                        <option value="4">Store To Store Time</option>
                        <option value="5">Total Distance</option>
                        <option value="6">Total On Ride Time</option>
                    </select>
                    <div style={styles.chartDisplay}>
                        <Charts
                            data={chartArr[chartInd]}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ChartData;