mergedPdf(){
    // <script src="https://unpkg.com/pdf-lib/dist/pdf-lib.js"></script>
    let PDFDocument = PDFLib.PDFDocument; 
    const sourcePdfUrl = 'LINK'
    const arrayBuffer = await fetch(sourcePdfUrl).then((res) => res.arrayBuffer())  
    const pdfDoc4 = await PDFDocument.load(arrayBuffer)

    const in1 = document.getElementById('file1').files[0]; 
    let bytes1 = await this.readFileAsync(in1); 

    // const in2 = document.getElementById('file2').files[0];  
    // let bytes2 = await this.readFileAsync(in2); 
    
    const pdf1 = await PDFDocument.load(arrayBuffer);
    const pdf2 = await PDFDocument.load(bytes1);

    const mergedPdf = await PDFDocument.create(); 
    const copiedPagesA = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
    copiedPagesA.forEach((page) => mergedPdf.addPage(page)); 
    const copiedPagesB = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
    copiedPagesB.forEach((page) => mergedPdf.addPage(page)); 
    const mergedPdfFile = await mergedPdf.save();

    // DOWNLOADING FILE
    // this.download(mergedPdfFile, 'pdf-lib_page_copying_example.pdf', 'application/pdf') 

    let blobFile = new Blob([mergedPdfFile], { type: 'application/pdf' });
    let file = new File([blobFile], "name.pdf");
    
    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    let formData = new FormData(); 
    formData.append('file',file); 
}

function download(file, filename, type) {
    const link = document.getElementById('link');
    link.download = filename;
    let binaryData = [];
    binaryData.push(file);
    link.href = URL.createObjectURL(new Blob(binaryData, {type: type}))
}
