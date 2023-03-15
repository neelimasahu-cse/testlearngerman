//========================================================================
import React, { useState,useEffect } from "react";
import * as XLSX from "xlsx";

export default function A1_48() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentKey, setCurrentKey] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);
  const [showValue, setShowValue] = useState(false);
  const [sheetName, setSheetName] = useState(null);

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });

      // Get sheet names
      const sheetNames = workbook.SheetNames;

      // If there is only one sheet, use that sheet directly
      if (sheetNames.length === 1) {
        const worksheet = workbook.Sheets[sheetNames[0]];
        const column1 = "A";
        const column2 = "B";
        const range = XLSX.utils.decode_range(worksheet["!ref"]);

        const data = [];
        for (let i = range.s.r; i <= range.e.r + 1; i++) {
            const cell1 = worksheet[column1 + i];
            const cell2 = worksheet[column2 + i];
            if (cell1 && cell2) {
              data.push({ [cell1.v]: cell2.v });
            }
          }
          
        setData(data);
        setCurrentKey(Object.keys(data[currentIndex])[0]);
        setCurrentValue(Object.values(data[currentIndex])[0]);
        setSheetName(sheetNames[0]);
      }
      // If there are multiple sheets, prompt user to select one
      else {
        const selectedSheetName = prompt(
          `Select a sheet name (options: ${sheetNames.join(", ")})`
        );

        // If user selected a sheet name, read data from that sheet
        if (selectedSheetName && workbook.Sheets[selectedSheetName]) {
          const worksheet = workbook.Sheets[selectedSheetName];
          const column1 = "A";
          const column2 = "B";
          const range = XLSX.utils.decode_range(worksheet["!ref"]);

          const data = [];
          for (let i = range.s.r; i <= range.e.r + 1; i++) {
              const cell1 = worksheet[column1 + i];
              const cell2 = worksheet[column2 + i];
              if (cell1 && cell2) {
                data.push({ [cell1.v]: cell2.v });
              }
            }

          setData(data);
          setCurrentKey(Object.keys(data[currentIndex])[0]);
          setCurrentValue(Object.values(data[currentIndex])[0]);
          setSheetName(selectedSheetName);
        }
      }
    };

    reader.readAsBinaryString(selectedFile);
  };

  const handlePrev = () => {
    setShowValue(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = Math.max(0, prevIndex - 1);
      setCurrentKey(Object.keys(data[newIndex])[0]);
      setCurrentValue(Object.values(data[newIndex])[0]);
      return newIndex;
    });
  };
  
  const handleNext = () => {
    if (showValue) {
      setShowValue(false);
      const newIndex = Math.min(data.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
      setCurrentKey(Object.keys(data[newIndex])[0]);
      setCurrentValue(Object.values(data[newIndex])[0]);
    } else {
      setShowValue(true);
    }
  };
  
  
  
  
//   const handleNext = () => {
//     if (showValue) {
//       setShowValue(false);
//       setCurrentIndex((prevIndex) => {
//         const newIndex = Math.min(data.length - 1, prevIndex + 1);
//         return newIndex;
//       });
//     } else {
//       setShowValue(true);
//     }
//   };
  
//   const handleNext = () => {
//     if (showValue) {
//       setShowValue(false);
//       setCurrentIndex((prevIndex) => {
//         const newIndex = Math.min(data.length - 1, prevIndex + 1);
//         setCurrentKey(Object.keys(data[newIndex])[0]);
//         setCurrentValue(Object.values(data[newIndex])[0]);
//         return newIndex;
//       });
//     } else {
//       setShowValue(true);
//     }
//   };
  

  const handleShowKey = () => {
    setShowValue(true);
  };

  return (
    <div>
      <div style={{ position: "absolute", top: 0, right: 0, padding: "10px"}}>
      </div>
      <input type="file" onChange={handleFile} />
      {data && (
        <div style={{ height: "50px" }}>
          <p style={{ display: "flex", justifyContent: "center", marginTop: "40px", fontSize: "25px" }}>
            {/* {sheetName} - {currentIndex} {currentKey} */}
            {currentKey}
          </p>
          {showValue && (
            <p style={{ display: "flex", justifyContent: "center", marginTop: "40px", fontSize: "35px" , color:"Green"}}>
              {currentValue}
            </p>
          )}
        </div>
      )}
      <div style={{marginTop:"180px", display:"flex", justifyContent:"center"}}>
      <button onClick={handlePrev} disabled={currentIndex === 0}
     style={{ marginRight: '0px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
     >
          &#9664;
        </button>
        {/* <button onClick={handleShowKey} style={{ marginLeft: '0px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>Ans</button> */}
        <button
          onClick={handleNext}
          
          disabled={data?.length === 0 || currentIndex === data?.length - 1}

          style={{ marginLeft: '0px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
        >
          &#9654;
        </button>
       
    </div>
    </div>
    );

          }
