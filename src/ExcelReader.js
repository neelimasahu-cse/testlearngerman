import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function A1_48() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentKey, setCurrentKey] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);
  const [showValue, setShowValue] = useState(false);
  const [sheetNames, setSheetNames] = useState([]);

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });

      // Get sheet names
      const sheetNames = workbook.SheetNames;

      setSheetNames(sheetNames);

      // If there is only one sheet, use that sheet directly
      if (sheetNames.length === 1) {
        readDataFromSheet(workbook.Sheets[sheetNames[0]]);
      }
    };

    reader.readAsBinaryString(selectedFile);
  };

  const readDataFromSheet = (worksheet) => {
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
    setCurrentIndex(0);
    setCurrentKey(Object.keys(data[0])[0]);
    setCurrentValue(Object.values(data[0])[0]);
    setShowValue(false);
  };

  const handleSelectSheet = (sheetName) => {
    const workbook = XLSX.read(file, { type: "binary" });
    const worksheet = workbook.Sheets[sheetName];
    readDataFromSheet(worksheet);
  };

  const handlePrev = () => {
    if (showValue) {
      setShowValue(false);
    } else {
      setCurrentIndex((prevIndex) => {
        const newIndex = Math.max(0, prevIndex - 1);
        setCurrentKey(Object.keys(data[newIndex])[0]);
        setCurrentValue(Object.values(data[newIndex])[0]);
        return newIndex;
      });
    }
  };

  const handleNext = () => {
    if (showValue) {
      setShowValue(false);
    } else {
      setCurrentIndex((prevIndex) => {
        const newIndex = Math.min(data.length - 1, prevIndex + 1);
        setCurrentKey(Object.keys(data[newIndex])[0]);
        setCurrentValue(Object.values(data[newIndex])[0]);
        return newIndex;
      });
    }
  };

  const handleShowKey = () => {
    setShowValue(true);
  };

 
  return (
    <div>
      <input type="file" onChange={handleFile} />
      <div>
        <select onChange={(e) => handleSelectSheet(e.target.value)}>
          {sheetNames.map((sheetName) => (
            <option key={sheetName} value={sheetName}>
              {sheetName}
            </option>
          ))}
        </select>
      </div>
      {data && (
        <div>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
          <div onClick={handleShowKey}>
            {showValue ? currentValue : currentKey}: {showValue ? currentKey : currentValue}
          </div>
        </div>
      )}
    </div>
  );
      }  