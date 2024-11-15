import * as XLSX from "xlsx"; // Importa XLSX para exportar a Excel
const exportToExcel = (rows, fileName) => {
    const filterExcelRow = rows.map((row) => ({
    Plataformista: row.plataformista,
    Cliente: row.cliente,
    Dni: row.dni,
    Estado: row.estado,
    Sección: row.sectionName,
    "Fecha del reporte": row.reportDate,
    "Hora del reporte": row.reportTime,
  }));


  
  const worksheet = XLSX.utils.json_to_sheet(filterExcelRow);

  // Ajustar el ancho de las columnas basado en el contenido
  const maxLengths = [];
  filterExcelRow.forEach(row => {
    Object.keys(row).forEach((key, index) => {
      const cellValue = row[key] ? row[key].toString() : '';
      maxLengths[index] = Math.max(maxLengths[index] || 0, cellValue.length);
    });
  });

  worksheet['!cols'] = maxLengths.map(length => ({ width: length + 2 })); // Ajuste de ancho automático con un pequeño margen

  // Crear un nuevo libro de Excel
  const workbook = XLSX.utils.book_new();

  // Añadir la hoja de trabajo al libro de Excel
  XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

  // Descargar el archivo Excel con el nombre dado
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// exportacion
const handleExport = (filterExcelRow,nameExcel) => {
  exportToExcel(filterExcelRow, nameExcel);
};

export default handleExport;
