import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
//import { FaComment } from 'react-icons/fa'; // Assuming you're using react-icons for the comment icon
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeViewer({ resumeUrl, resumeUID, resumeComments}) {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentResumeUID, setCurrentResumeUID] = useState(null); // Add this line

    
    const toggleComments = (e) => {
        setShowComments(!showComments);
        setCurrentResumeUID(e.target.value);
     // This will log the value of the button (resumeUID)
    }

    const submitComment = async() => {
        if (newComment.trim()) { // Avoid adding empty comments
            setComments([...comments, newComment]);
            setNewComment(''); // Reset input after submission

        }
        const requestBody = {
            resumeUID: currentResumeUID,
            comment: newComment
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        try {
            // Make the fetch request to the server
            const response = await fetch('http://localhost:3001/api/v1/Resume/CommentOnResume', requestOptions);

            // Check if the request was successful
            if (response.ok) {
                const result = await response.json(); // Assuming the server sends back some data
                console.log('Comment submitted successfully', result);
                
                // Update local state with the new comment
                setComments(prevComments => [...prevComments, newComment]);
                setNewComment(''); // Clear the input after submission
            } else {
                // If the server response was not ok, log or handle the error
                console.error('Failed to submit comment:', response.statusText);
            }
        } catch (error) {
            // Log network or other errors to the console
            console.error('Error submitting comment:', error);


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
            <button value={resumeUID} onClick={toggleComments}>
    comments
    {/* <FaComment /> Comments */}
</button>
            {showComments && (
                <div>
                    <div>
                        {resumeComments.length > 0 ? (
                            resumeComments.map((resComment, index) => (
                                <div key={index}>
                                    <p>{resComment.resumeUID} : {resComment.comment} </p>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
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
