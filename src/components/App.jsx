import React from "react";
import {Switch,Route} from "react-router-dom";
import AltorRider from "./AltorRider";
import Home from "./Home";
import Navbar from "./Navbar";
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
// import * as htmlToImage from 'html-to-image';
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

function App(){
    return (

        
        <>
        <div id="toPrint">
            {/* <button onClick={convertDomToPDF}>CLICK2PRINT</button> */}
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/altorrider" component={AltorRider} />
                <Route component="Error" />
            </Switch>
        </div>
        </>
    );

}


// const convertMmToPx=(mm)=>{
    
//     let width = window.screen.width;
//     let height = window.screen.height;

//     console.log("widht=>"+width+"height=>"+height);
//     if(width>=1920 && height>=1080){
//         return (mm/0.164583);
//     }
//     else if(width>=1366 && height>=720){
//         return (mm/0.114583);
//     }
//     else{
//         return (mm/0.104583);
//     }
// }

// const convertDomToPDF=()=>{
   
   
    
//     const input = document.getElementById('toPrint');
//     console.log(input.offsetWidth+" IS INPUT WIDTH")

   

//     var pdf=new jsPDF({
//         orientation: 'p', 
//         unit: 'mm', 
//         format: [210,297]
//     });

    

//     html2canvas(input).then((canvas) => {

    


//     // var numOfPages=Math.ceil(canvas.height/ convertMmToPx(pdf.internal.pageSize.getHeight()) );
   
    

//     var ratio=canvas.height/canvas.width;

//     // createResizedCanvas(canvas,ratio);
    

//     var returnableValue=breakIntoChunks(canvas,ratio,pdf);
//     var imgArray=returnableValue.imgArray;

//     imgArray.map((elem,i)=>{

//         pdf.addPage().addImage(elem,'PNG',0,0,pdf.internal.pageSize.getWidth(),(pdf.internal.pageSize.getHeight()));
//         // pdf.addImage(elem,'PNG',0,0,pdfWidth,(pdfWidth*ratio));
        

//     })

//     pdf.save("download.pdf");
  
//   });

// }


// const breakIntoChunks=(canvas,ratio,pdf)=>{

//     var height=canvas.height;

//     var numOfPages=Math.ceil(height / convertMmToPx(pdf.internal.pageSize.getHeight()) );



//     var imgArray=[];

//     console.log("PDF dimensions are",convertMmToPx(pdf.internal.pageSize.getWidth()),convertMmToPx(pdf.internal.pageSize.getHeight()));
//     console.log("Canvas dimensions are ", canvas.width, canvas.height);

//     for(var i=0;i<numOfPages;i++){

//         var newCanvas=document.createElement('canvas');
//         newCanvas.width=convertMmToPx(pdf.internal.pageSize.getWidth());
//         newCanvas.height=convertMmToPx(pdf.internal.pageSize.getHeight());


//         var newContext=newCanvas.getContext('2d');
//         newContext.drawImage(canvas, 0, ((convertMmToPx(pdf.internal.pageSize.getHeight()))*i), (canvas.width), convertMmToPx(pdf.internal.pageSize.getHeight()), 0, 0,convertMmToPx(pdf.internal.pageSize.getWidth()),convertMmToPx(pdf.internal.pageSize.getHeight()));

//         var newImage = document.createElement('img');
//         newImage.src = newCanvas.toDataURL();

//         console.log("IMAGE IS AT"+(( convertMmToPx(pdf.internal.pageSize.getHeight())/numOfPages)*i));

//         imgArray.push(newImage);
//     }

//     const returnableValue={
//         pageSize:(canvas.height/numOfPages),
//         imgArray:imgArray
//     }
//     return returnableValue;

    
    
    
// }


// // const createResizedCanvas=(canvas,ratio)=>{


// //     var newCanvas=document.createElement('canvas');
// //     newCanvas.width=pdfWidth;
// //     newCanvas.height=pdfWidth*ratio;


// //     var newContext=newCanvas.getContext('2d');
// //     newContext.drawImage(canvas, 0, 0,(canvas.width),);

// //     var newImage = document.createElement('img');
// //     newImage.src = newCanvas.toDataURL();

// //     console.log(newCanvas.toDataURL())


// // }



// // const convertDomToSVG2=()=>{
// //     const input = document.getElementById('toPrint');

// //     htmlToImage.toSvg(input)
// //     .then(function (dataUrl) {
// //         convertSVGToPng2(dataUrl,input);
// //     });

// // }




// // const convertSVGToPng2=(dataUrl)=>{
    
// //     const pdf=new jsPDF();
// //     pdf.addSvgAsImage(dataUrl,0,0,2000,1000);
// //     pdf.save("Download.pdf");


// // }

export default App;
