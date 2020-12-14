import React, { useEffect} from "react";
import Chart from "chart.js";

function Charts(props){    


    const chartRef = React.createRef();

    useEffect(()=>{

        const myChartRef = chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            plugins:
                {beforeDraw: function(myChartRef) {
                var ctx = myChartRef;
                ctx.ctx.fillStyle = "white";
                ctx.ctx.fillRect(0,0,620,310);
              }},
            type: "bar",
            data: props.data,
            options: {
                responsive:true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    })
 
    return <>
        <canvas 
            id="myChart"
            ref={chartRef}
        />  
    </>
}

export default Charts;
