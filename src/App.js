import React, {
  useRef, useState,
} from 'react';
import Excel from "exceljs";
import TableBuilder from "./table";
import './App.css';

const parseXLSX = async (file) => {
  const workbook = new Excel.Workbook();
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  await new Promise((res, rej) => reader.onload = () => res());
  await workbook.xlsx.load(reader.result);
  const sheet = workbook.worksheets.shift();
  const result = [];

  sheet.eachRow((row, rowNumber) => {
      if(rowNumber === 1){return};
      let obj = {};
      row.values.forEach((value,index)=>{obj[`item${index}`] = value});
      
      result.push(obj);
  })
  
  return result;
}

const App = () => {
  const fileInput = useRef("input");
  const [tableElems, setTableElems] = useState([]);


  const checkFormatFile = (fileName) => {
    let isFormatValid = false;
    if (fileName) {
      const type = fileName.split('.').pop().toLowerCase();
      if (type === 'xlsx' || type === 'xls') 
      { return isFormatValid = true }
      else { return alert('неверный формат'); }
    }
    return isFormatValid;
  }


  const onInputChange = async (e) => {
    e.preventDefault();
    e.persist();
    const file = e.target.files[0];
    const isFormatValid = checkFormatFile(file.name);
    
    if (isFormatValid) {
      const result = await parseXLSX(file);
      setTableElems([...tableElems, result].flat());


    }

  };

  



  return (
    <div className="App">

      <form >
        <label>
          <input type="file" ref={fileInput} onChange={onInputChange} />
        </label>
        <br />
      </form>


      <table >
        <thead>
          <tr>

            <th  >
              Код
                            </th>
            <th>
              Товар
                            </th>

            <th >
              Производитель
                            </th>
            <th >
              Рекомендуемая розничная цена
                            </th>
            <th>
              Отпускная цена
                            </th>
          </tr>
        </thead>
        <tbody>

          <TableBuilder data={tableElems} />

        </tbody>
      </table>

    </div>
  );
}

export default App;
