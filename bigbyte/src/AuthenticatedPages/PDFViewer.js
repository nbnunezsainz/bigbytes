import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
//import { FaComment } from 'react-icons/fa'; // Assuming you're using react-icons for the comment icon
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeViewer({ resumeUrl }) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const toggleComments = () => setShowComments(!showComments);

    const submitComment = () => {
        if (newComment.trim()) { // Avoid adding empty comments
            setComments([...comments, newComment]);
            setNewComment(''); // Reset input after submission
        }
    };

    return (
        <div>
            <Document
                file={resumeUrl}
                onLoadError={console.error}
                //style={{ width: '50%' }}
            >
                <Page pageNumber={1} width={1000} />
            </Document>
            <button onClick={toggleComments}>
                comments
                {/* <FaComment /> Comments */}
            </button>
            {showComments && (
                <div>
                    <div>
                        {comments.map((comment, index) => (
                            <div key={index}>{comment}</div>
                        ))}
                    </div>
                    <div>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                        />
                        <button onClick={submitComment}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResumeViewer;
