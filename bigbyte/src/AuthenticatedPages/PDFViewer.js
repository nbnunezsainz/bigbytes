import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeViewer({ resumeUrl }) {
    console.log(resumeUrl,"url");
    return (
        <Document
            file={resumeUrl}
            onLoadError={console.error}
            style={{ width: '100%' }}
        >
            <Page pageNumber={1} width={600} />
        </Document>
    );
}export default ResumeViewer;