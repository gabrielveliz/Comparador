import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Convertir = () => {
  const [csvFile, setCsvFile] = useState(null);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const convertToExcel = () => {
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: (result) => {
          const data = result.data;
          const ws = XLSX.utils.aoa_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
          const excelBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array',
          });
          saveAs(
            new Blob([excelBuffer], { type: 'application/octet-stream' }),
            csvFile.name.replace('.csv', ' excel.xlsx') // Mantener el nombre original con extensión .xlsx
          );
        },
      });
    } else {
      alert('Please select a CSV file first.');
    }
  };

  return (
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
      </Form.Group>
      
      <Button onClick={convertToExcel}>Convert to Excel</Button>
    </div>
  );
};

export default Convertir;
