'use client';

// import React, { Component } from "react";
// import dynamic from "next/dynamic";
// const CanvasJSStockChart = dynamic(
//   () =>
//     import("@canvasjs/react-stockcharts").then(
//       (mod) => mod.default.CanvasJSStockChart
//     ),
//   { ssr: false }
// );

// class App extends Component {
//   render() {
//     const options = {
//       title: {
//         text: "",
//       },
//       charts: [
//         {
//           data: [
//             {
//               type: "line",
//               dataPoints: [
//                 { x: new Date("2018-01-01"), y: 71 },
//                 { x: new Date("2018-02-01"), y: 55 },
//                 { x: new Date("2018-03-01"), y: 50 },
//                 { x: new Date("2018-04-01"), y: 65 },
//                 { x: new Date("2018-05-01"), y: 95 },
//                 { x: new Date("2018-06-01"), y: 68 },
//                 { x: new Date("2018-07-01"), y: 28 },
//                 { x: new Date("2018-08-01"), y: 34 },
//                 { x: new Date("2018-09-01"), y: 14 },
//                 { x: new Date("2018-10-01"), y: 71 },
//                 { x: new Date("2018-11-01"), y: 55 },
//                 { x: new Date("2018-12-01"), y: 50 },
//                 { x: new Date("2019-01-01"), y: 34 },
//                 { x: new Date("2019-02-01"), y: 50 },
//                 { x: new Date("2019-03-01"), y: 50 },
//                 { x: new Date("2019-04-01"), y: 95 },
//                 { x: new Date("2019-05-01"), y: 68 },
//                 { x: new Date("2019-06-01"), y: 28 },
//                 { x: new Date("2019-07-01"), y: 34 },
//                 { x: new Date("2019-08-01"), y: 65 },
//                 { x: new Date("2019-09-01"), y: 55 },
//                 { x: new Date("2019-10-01"), y: 71 },
//                 { x: new Date("2019-11-01"), y: 55 },
//                 { x: new Date("2019-12-01"), y: 50 },
//               ],
//             },
//           ],
//         },
//       ],
//       navigator: {
//         slider: {
//           minimum: new Date("2018-07-01"),
//           maximum: new Date("2019-06-30"),
//         },
//       },
//     };
//     const containerProps = {
//       width: "100%",
//       height: "50vh",
//       margin: "auto",
//     };
//     return (
//       <div>
//         <CanvasJSStockChart
//           options={options}
//           containerProps={containerProps}
//           onRef={(ref) => (this.stockChart = ref)}
//         />
//       </div>
//     );
//   }
// }

// export default App;












import React, { useEffect, useState } from "react";
// import CanvasJSReact from '../@canvasjs/react-stockcharts';
import { GET_INDIVISUAL_INDEX } from "../Apis/EndPoints";
import { postMethodApi } from "../Utils/Methods";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
const CanvasJSStockChart = dynamic(
  () =>
    import("@canvasjs/react-stockcharts").then(
      (mod) => mod.default.CanvasJSStockChart
    ),
  { ssr: false }
);
 
// var CanvasJS = CanvasJSReact.CanvasJS;


// var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
// eslint-disable-next-line
var chart;

export default function Graph2(props) {

  const[statt,setstatt] = useState({ dataPoints: [], dataPoints1: [], isLoaded: false });
  const[finalDataPoints, setFinalDataPoints] = useState(null);
  const[finalDataPoints1, setFinalDataPoints1] = useState(null);
  const [showData, setShowData] = useState(true);
  const [showData1, setShowData1] = useState(true);
  const[secondGraphData,setSecondGraphData] = useState(false);
  const[graph1Title,setGraph1Title] = useState("")
  const[graph2Title,setGraph2Title] = useState("")
  const[checkbox1color,setcheckbox1color] = useState("checbox1BGcolRed");
  const[checkbox2color,setcheckbox2color] = useState("checbox2BGcolBlack");
  const[graph1Value,setgraph1Value] = useState(0);
  // eslint-disable-next-line
  const[graph1Valuefix,setgraph1Valuefix] = useState(0);
  const[graph2Value,setgraph2Value] = useState(0);
  // eslint-disable-next-line
  const[graph2Valuefix,setgraph2Valuefix] = useState(0);
  const[minimumvalue, setminimumvalue]= useState(0);


  useEffect(()=>{
    postMethodApi(GET_INDIVISUAL_INDEX, {
      slug: props.graphName,
      Type: props.graphType,
      language: props.graphlanguage === "Eng" ? "English" : "Portuguese"
    }).then((response) => {
      if (response.status === 200 && response.data.Graph_values !== null) {
        setSecondGraphData(false);
        setcheckbox1color("checbox1BGcolRed");
        setcheckbox2color("checbox2BGcolBlack");
        var dps = [];
        var dps1 = [];
        setGraph1Title(response.data.Graph_values.graph1.title);
        setgraph1Value(response.data.Graph_values.graph1.max_value);
        setgraph1Valuefix(response.data.Graph_values.graph1.max_value);
        setgraph2Value(response.data.Graph_values.graph2.max_value);
        setgraph2Valuefix(response.data.Graph_values.graph2.max_value);
        setGraph2Title(response.data.Graph_values.graph2.title);
        if (response.data.Graph_values.graph1.data.length > 0) {
          let ourapi = response.data.Graph_values.graph1.data;
          for (let i=0; i<ourapi.length; i++) {
          const date = new Date(ourapi[i].date);
          const timestamp = date.getTime();
          // eslint-disable-next-line
          if(i==0){
            setminimumvalue(timestamp);
          }
          dps.push({
            x: new Date(timestamp),
            y: Number(ourapi[i].value)
          });
        }
      }
        if (response.data.Graph_values.graph2.data.length > 0) {
          let ourapi1 = response.data.Graph_values.graph2.data;
          setSecondGraphData(true);
          for (const key of ourapi1) {
            const date = new Date(key.date);
            const timestamp = date.getTime();
            dps1.push({
              x: new Date(timestamp),
              y: Number(key.value)
            });
          }
        }
        setFinalDataPoints(dps);
        setFinalDataPoints1(dps1);
        setstatt({
          isLoaded: true,
          dataPoints: dps,
          dataPoints1: dps1,
        });
        
      }
      
    });
    
  },[props.graphName, props.graphType, props.graphlanguage])

  const options = {
    
    // title:{
    //   text:"value"+ds,  
    //   horizontalAlign: "left",
    //   fontSize: 20
    // },
    rangeChanged: function(e) {
      var stockChart = e.stockChart;
      for(var i = 0; i < stockChart.options.charts[0].data.length; i++) {
        for(var j=0; j< stockChart.options.charts[0].data[i].dataPoints.length; j++) {
          if(stockChart.options.charts[0].data[i].dataPoints[j].x >= parseInt(e.maximum)) {
            if(i === 0){
              setgraph1Value(stockChart.options.charts[0].data[i].dataPoints[j].y);
            }
            else{
              setgraph2Value(stockChart.options.charts[0].data[i].dataPoints[j].y);
            }
            stockChart.options.charts[0].data[i].lastLegendShownOnChanged = stockChart.options.charts[0].data[i].dataPoints[j].y
            break;
          }
        }
      }
    },
    theme: "light2",
    // subtitles: [{
    //   text: "value ",
    //   horizontalAlign: "left"
    // }],
    charts: [
      {
      axisX: {
        gridColor: "lightblack",
        gridThickness: 0.4,  
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "MMM DD YYYY",
          color: "red",
          lineDashType : "solid",
          // lineThickness: "10px",
          labelBackgroundColor: "#FF0000",
        }
      },
      axisY: {
        // title: "Bitcoin Price",
        // prefix: "$",
        crosshair: {
          enabled: false,
          snapToDataPoint: true,
          color: "red",
          // valueFormatString: "$#,###.##"
        }
      },
      // toolTip: {
      //   shared: true,
      // },
      toolTip: {
        shared: true,
        content: "{name}: {y} <br/>",
        updated: function ( e ) {
          for(var i = 0; i < e.entries.length; i++) {
            if(i === 0 && showData){
              setgraph1Value(e.entries[i].dataPoint.y);
            }
            else{
              setgraph2Value(e.entries[i].dataPoint.y);
            }
          }
        } 
      },
      zoomEnabled: true,
      data: [
        {
        name: graph1Title !== "" ? graph1Title.split("(")[1].slice(0,-1) : "",
        // type: "splineArea",
        type: "line",
        // color: "#ed3c3d",
        color: "blue",
        lineThickness: 0,
        // yValueFormatString: "$#,###.##",
        xValueFormatString: "MMM DD YYYY",
        dataPoints : statt.dataPoints,
      },
      {
        name: graph2Title !== "" ? graph2Title.split("(")[1].slice(0,-1) : "",
        // type: "splineArea",
        type: "line",
        // color: "#302f2f",
        color: "grey",
        lineThickness: 0,
        // yValueFormatString: "$#,###.##",
        xValueFormatString: "MMM DD YYYY",
        dataPoints : statt.dataPoints1,
      }
    ]
    }],
    navigator: {
      data: [{
        type: "line",
        color: "blue",
        fillOpacity: 0.1,
        dataPoints : statt.dataPoints
      },
      {
        type: "line",
        color: "grey",
        fillOpacity: 0.1,
        dataPoints : statt.dataPoints1
      }
    ],
      backgroundColor: "#C2C0C0",
      color: "red",
      axisX : {
        // labelFontColor : "white",
        labelFontColor : "black",
        minimum: minimumvalue,
      },
      slider: {
        handleColor: "white",
        // minimum: new Date("2017-05-01"),
        // maximum: new Date("2018-05-01"),
        backgroundColor: "blue",
        maskColor: "#EAE6E6",
      }  
    },
    rangeSelector: {
      inputFields: {
        enabled: true,
        set: function(value) {
          this.set("name", "New Name");
        },
        style: {
          borderColor: "black",
        },
    },
      
      enabled: true,
      verticalAlign: "bottom",
      borderColor: "red",
      style : {marginTop: "405px"},
      label: `${props.graphlanguage === "Eng" ? 'Zoom:' : 'Ampliação:'}`,
      // selectedRangeButtonIndex: 2,
      buttonStyle: {
        // backgroundColor: ["blue", "red"],
        backgroundColorOnHover: "red",
        backgroundColor: "#EAE6E6",
        backgroundColorOnSelect: "red",
        // borderThickness: 0,
        borderColor: "black"
      },
      buttons: [ 
        { label: "10 Days", range: 10, rangeType: "day" }, 
        { label: "1 Month", range: 1, rangeType: "month" },
        { label: "1Year", range: 1, rangeType: "year" }, 
        { label: "YTD", range: 1, rangeType: "ytd" }, 
        { label: "MAX", rangeType: "all"} ] ,
    },
  };
  

  const containerProps = {
    width: "100%",
    height: "515px",
    margin: "auto"
  };

  const handleCheckboxChange = () => {
    if(showData === true){
      setstatt({...statt,dataPoints: []})
      setShowData(!showData); 
      setcheckbox1color("checboxBGcolWhite")
    }
    else{
      setstatt({...statt,dataPoints: finalDataPoints});
      setShowData(!showData); 
      setcheckbox1color("checbox1BGcolRed")
    }
  };
  
  const handleCheckboxChange1 = () => { 
    if(showData1 === true){
      setstatt({...statt,dataPoints1: []})
      setShowData1(!showData1); 
      setcheckbox2color("checboxBGcolWhite")
    }
    else{
      setstatt({...statt,dataPoints1: finalDataPoints1});
        setShowData1(!showData1);
        setcheckbox2color("checbox2BGcolBlack")
    }
  };

  // document.body.style.zoom = 1;

  function mouseoutfn(){
    for(var i = 0; i < options.charts[0].data.length; i++) {
      if(options.charts[0].data[i].lastLegendShownOnChanged) {
        // eslint-disable-next-line
        if(i==0){
          setgraph1Value(options.charts[0].data[i].lastLegendShownOnChanged);
        }
        else{
          setgraph2Value(options.charts[0].data[i].lastLegendShownOnChanged)
        }
      }
    }
  }

  return (
    <div > 
      <div>
        {
          statt.isLoaded && 
          // <Box className="MT1 MB2" onMouseLeave={()=>{setgraph1Value(graph1Valuefix); setgraph2Value(graph2Valuefix)}}>
          <Box className="MT1 MB2" onMouseOut={()=>mouseoutfn()}>
            <Box className="DF">
            <h5 className="MR1 DInline Fs0-875R">{props.graphlanguage === 'Eng' ? 'Value' : 'Valor'}</h5>
            
            <Box className="MR1">
            <span className={`checkboxSquarered ${checkbox1color}`} value={showData} onClick={handleCheckboxChange}></span>
            <span className="Fs0-875R">{props.graphlanguage === 'Eng' ? 'Index:' : 'Índice:'} {graph1Title} {graph1Value}</span>
            </Box>
            {secondGraphData && 
            <Box className="MR1">
            <span className={`checkboxSquareblack ${checkbox2color}`} value={showData1} onClick={handleCheckboxChange1}></span>
            <span className="Fs0-875R">{props.graphlanguage === 'Eng' ? 'Benchmark:' : 'Referência:'} {graph2Title} {graph2Value}</span>
            </Box>
            }
            
            </Box>
          <CanvasJSStockChart  containerProps={containerProps} onRef={(ref) => (chart = ref)} options = {options}/>
          </Box>
        }
      </div>
    </div>
  );
}

// class Graph2 extends Component {

//   constructor(props) {
//     super(props);
//     this.state = { dataPoints: [], dataPoints1: [], isLoaded: false, finalDataPoints: null, finalDataPoints1: null, showData: true, showData1: true, 
//     secondGraphData: false, graph1Title: "", graph2Title: "", checkbox1color: "checbox1BGcolRed", checkbox2color: "checbox2BGcolBlack", 
//     graph1Value: 0, graph2Value: 0
//      };
//   }

//   componentDidMount() {
//       postMethodApi(GET_INDIVISUAL_INDEX, {
//       Name: this.props.graphName,
//       Type: this.props.graphType,
//     }).then((response) => {
//       if (response.status === 200) {
//         var dps = [];
//         var dps1 = [];
//         this.setState({...this.state , graph1Title: response.data.Graph_values.graph1.title});
//         this.setState({...this.state ,graph2Title: response.data.Graph_values.graph2.title});
//         if (response.data.Graph_values.graph1.data.length > 0) {
//           let ourapi = response.data.Graph_values.graph1.data;
//           for (const key of ourapi) {
//           const date = new Date(key.date);
//           const timestamp = date.getTime();
//           dps.push({
//             x: new Date(timestamp),
//             y: Number(key.value)
//           });
//         }
//       }
//         if (response.data.Graph_values.graph2.data.length > 0) {
//           let ourapi1 = response.data.Graph_values.graph2.data;
//           this.setState({...this.state,secondGraphData: true});
//           for (const key of ourapi1) {
//             const date = new Date(key.date);
//             const timestamp = date.getTime();
//             dps1.push({
//               x: new Date(timestamp),
//               y: Number(key.value)
//             });
//           }
//         }
//         this.setState({...this.state ,finalDataPoints: dps});
//         this.setState({...this.state ,finalDataPoints1: dps1});
//         this.setState({...this.state,
//           isLoaded: true,
//           dataPoints: dps,
//           dataPoints1: dps1,
//         });
//       }
      
//     });

//   }

//   render() {

//     const options = {
    
//     // title:{
//     //   text:"value"+ds,  
//     //   horizontalAlign: "left",
//     //   fontSize: 20
//     // },
//     theme: "light2",
//     // subtitles: [{
//     //   text: "value ",
//     //   horizontalAlign: "left"
//     // }],
//     charts: [
//       {
//       axisX: {
//         gridColor: "lightblack" ,
//         gridThickness: 0.4,  
//         crosshair: {
//           enabled: true,
//           snapToDataPoint: true,
//           valueFormatString: "MMM DD YYYY",
//           color: "red",
//           lineDashType : "solid",
//           // lineThickness: "10px",
//           labelBackgroundColor: "#FF0000",
//         }
//       },
//       axisY: {
//         // title: "Bitcoin Price",
//         // prefix: "$",
//         crosshair: {
//           enabled: false,
//           snapToDataPoint: true,
//           color: "red",
//           // valueFormatString: "$#,###.##"
//         }
//       },
//       // toolTip: {
//       //   shared: true,
//       // },
//       toolTip: {
//         shared: true,
//         content: "{name}: {y} <br/>"
//       },
//       zoomEnabled: true,
//       data: [
//         {
//         name: this.state.graph1Title !== "" ? this.state.graph1Title.split("(")[1].slice(0,-1) : "",
//         type: "splineArea",
//         color: "#ed3c3d",
//         // yValueFormatString: "$#,###.##",
//         xValueFormatString: "MMM DD YYYY",
//         dataPoints : this.state.dataPoints,
//         // mouseover: function(e) {
//         //   setgraph1Value(e.dataPoint.y);
//         // }
//       },
//       {
//         name: this.state.graph2Title !== "" ? this.state.graph2Title.split("(")[1].slice(0,-1) : "",
//         type: "splineArea",
//         color: "#302f2f",
//         // yValueFormatString: "$#,###.##",
//         xValueFormatString: "MMM DD YYYY",
//         dataPoints : this.state.dataPoints1,
//         // mouseover: function(e) {
//         // setgraph2Value(e.dataPoint.y);
//         // }
//       }
//     ]
//     }],
//     navigator: {
//       // backgroundColor: "red",
//       color: "green",
//       slider: {
//         handleColor: "white",
//         // minimum: new Date("2017-05-01"),
//         // maximum: new Date("2018-05-01"),
//         backgroundColor: "blue",
//         maskColor: "#EAE6E6"
//       }  
//     },
//     rangeSelector: {
//       enabled: true,
//       verticalAlign: "bottom",
//       yPosition: "bottom",
//       style : {marginTop: "405px"},
//       label: 'Zoom:',
//       buttonStyle: {
//         backgroundColorOnHover: "red",
//         backgroundColor: "#EAE6E6",
//         backgroundColorOnSelect: "red"
//       },
//       buttons: [ 
//         { label: "10 Days", range: 10, rangeType: "day" }, 
//         { label: "1 Month", range: 1, rangeType: "month" },
//         { label: "1Year", range: 1, rangeType: "year" }, 
//         { label: "YTD", range: 1, rangeType: "ytd" }, 
//         { label: "MAX", rangeType: "all"} ] ,

//     },
    
//   };

//     let containerProps = {
//         width: '100%',
//         height: '300px',
//         border: '1px solid black',
//       };

//     return (
//       <div>
//         <CanvasJSStockChart containerProps={containerProps} onRef={(ref) => (chart = ref)} options = {options}/>
//       </div>
//     );
//   }
// }
 
// export default Graph2;
