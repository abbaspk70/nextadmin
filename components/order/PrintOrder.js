 'use client'
import ReactToPrint from 'react-to-print';
import {AiOutlinePrinter} from 'react-icons/ai'

export default function PrintOrder() {
  return (
    <div>
        <ReactToPrint
        trigger={() =>
          {return  <div className="">
            <button className='flex items-center gap-1 text-lg'><AiOutlinePrinter/>Print</button>
          </div>}}
        content={() => document.querySelector('.actual-receipt')}
        documentTitle = "Order Receipt"
        copyStyles = {true}
        
        />
    </div>
  )
}



// import React from 'react'
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// export default function PdfDownload() {
//     const downloadPdf = () => {
//         const capture = document.querySelector('.actual-receipt')
//         html2canvas(capture).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const doc = new jsPDF('p', 'mm', 'a4');
//             const componentWidth = doc.internal.pageSize.getWidth();
//             const componentHeight = doc.internal.pageSize.getHeight();
//             doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
//             //doc.save('Receipt.pdf');
//             doc.autoPrint();
//             doc.output('dataurlnewwindow');

//         })
//     }
//     return (
//         <div>
//             <button onClick={downloadPdf}>Print</button>
//         </div>
//     )
// }
