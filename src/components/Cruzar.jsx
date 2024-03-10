import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Cruzar = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const handleFile1Change = (e) => {
    const file = e.target.files[0];
    setFile1(file);
  };

  const handleFile2Change = (e) => {
    const file = e.target.files[0];
    setFile2(file);
  };

  const handleFile3Change = (e) => {
    const file = e.target.files[0];
    setFile3(file);
  };

  const processFiles = () => {
    if (!file1 || !file2 || !file3) {
      alert('Por favor seleccione todos los archivos.');
      return;
    }

    const currentDate = new Date();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const formattedDate = `${currentDate.getDate()}_${monthNames[currentDate.getMonth()]}`;
  

    const reader1 = new FileReader();
    reader1.onload = (e) => {
      const workbook1 = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName1 = workbook1.SheetNames[0]; // Acceder a la primera hoja de trabajo
      const sheet1 = workbook1.Sheets[sheetName1];
      const data1 = XLSX.utils.sheet_to_json(sheet1);

      const reader2 = new FileReader();
      reader2.onload = (e) => {
        const workbook2 = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName2 = workbook2.SheetNames[0]; // Acceder a la primera hoja de trabajo
        const sheet2 = workbook2.Sheets[sheetName2];
        const data2 = XLSX.utils.sheet_to_json(sheet2);

        const reader3 = new FileReader();
        reader3.onload = (e) => {
          const workbook3 = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName3 = workbook3.SheetNames[0]; // Acceder a la primera hoja de trabajo
          const sheet3 = workbook3.Sheets[sheetName3];
          const data3 = XLSX.utils.sheet_to_json(sheet3);

          const uniqueOrderNumbersSet = new Set();

          data1.forEach(({ 'Order No.': OrderNo }) => {
            if (!data2.some(({ 'Orden de pedido': OrdenDePedido }) => OrdenDePedido === OrderNo) &&
                !data3.some(({ Referencia }) => Referencia === OrderNo)) {
              uniqueOrderNumbersSet.add(OrderNo);
            }
          });

          // Convertir el conjunto a una matriz
          const uniqueOrderNumbers = Array.from(uniqueOrderNumbersSet).map(OrderNo => ({ 'Order No.': OrderNo }));

          // Crear un nuevo libro de Excel y hoja de trabajo
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(uniqueOrderNumbers, { header: ["Order No."] }); // Definir el nombre de la columna
          XLSX.utils.book_append_sheet(wb, ws, "Unique Order Numbers");

          // Guardar el archivo Excel
          XLSX.writeFile(wb, `OrdenesFaltantes_${formattedDate}.xlsx`);
        };

        reader3.readAsBinaryString(file3);
      };

      reader2.readAsBinaryString(file2);
    };

    reader1.readAsBinaryString(file1);
  };

  return (
    <div>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className='text-light'>Base</Form.Label>
        <Form.Control type="file" accept=".xlsx" onChange={handleFile1Change}/>
        <br />
        <Form.Label className='text-light'>ReporteDevo</Form.Label>
        <Form.Control type="file" accept=".xlsx" onChange={handleFile2Change}/>
        <br />
        <Form.Label className='text-light'>PedidosOMS</Form.Label>
        <Form.Control type="file" accept=".xlsx" onChange={handleFile3Change}/>
      </Form.Group>
      <Button onClick={processFiles}>Procesar Archivos</Button>
    </div>
  );
};

export default Cruzar;
