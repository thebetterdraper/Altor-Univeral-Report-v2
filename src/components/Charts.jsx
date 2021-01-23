import React, { useEffect,useState} from "react";
import Chart from "chart.js";

function Charts(props){    

    const [chartSetter,setChartSetter] = useState({});
    const [chartBool,setChartBool] = useState(false);
    
    const chartRef = React.createRef();
    //620,310

    useEffect(()=>{

        var myChartRef = chartRef.current.getContext("2d");
        myChartRef.clearRect(0, 0, 100,150);
        myChartRef.beginPath();
        // var myChartRef = chartRef.current.getContext("2d");

        var newChart = new Chart(myChartRef, {
            plugins:
                {beforeDraw: function(myChartRef) {
                var ctx = myChartRef;
                ctx.ctx.fillStyle = "white";
                ctx.ctx.fillRect(0,0,590,300);
              }},
            type: "bar",
            data: props.data,
            options: {
                legend:{
                    display:true,
                    position:"bottom",
                    align:"center",
                },
                responsive:true,
                maintainAspectRatio:true,
                scales: {
                    xAxes:[{
                        
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        setChartSetter(newChart);
        setChartBool(true)

    },[])

    function updateChart(){
        chartSetter.data = props.data; 
        chartSetter.update(); 
    }
    
    useEffect(()=>{
        if(chartBool){
            updateChart();
        } 
    })
    return <>
        <canvas 
            id="myChart"
            ref={chartRef}
        />  
    </>
    
}

export default Charts;
