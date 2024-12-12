import React, { useEffect, useRef, useState } from 'react'
import * as blazeface from '@tensorflow-models/blazeface'
import '@tensorflow/tfjs'
import styles from './FaceDetection.module.css'

const FaceDetection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null); // Video reference
    const canvasRef = useRef<HTMLCanvasElement>(null); // Canvas reference
    const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Load the BlazeFace model once the component mounts
    useEffect(() => {
        const loadModel = async () => {
            const model = await blazeface.load();
            setModel(model);
            console.log('BlazeFace model loaded');
        };
        loadModel();
    }, []);

    // Setup webcam for video input
    useEffect(() => {
        const setupWebcam = async () => {
            if (videoRef.current) {
                const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                });
                videoRef.current.srcObject = stream;

                // Dynamically set video width and height based on stream once metadata is loaded
                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current) {
                        videoRef.current.width = videoRef.current.videoWidth;
                        videoRef.current.height = videoRef.current.videoHeight;

                        // Also update the canvas size to match the video
                        if (canvasRef.current) {
                            canvasRef.current.width = videoRef.current.videoWidth;
                            canvasRef.current.height = videoRef.current.videoHeight;
                        }
                    }
                }

                // Mark the video as loaded
                setVideoLoaded(true);
                console.log('Video metadata loaded');
                console.log('Video Dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
            }
        };
        setupWebcam();
    }, []);

    // Function to detect faces
    const detectFaces = async () => {
        if (model && videoRef.current && canvasRef.current) {

            const video = videoRef.current;
            const predictions = await model.estimateFaces(videoRef.current, false);
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // canvas.width = video.clientWidth;
            // canvas.height = video.clientHeight;

            // console.log('Video Dimensions:', video.videoWidth, 'x', video.videoHeight);
            // console.log('Canvas Dimensions:', canvas.width, 'x', canvas.height);
        
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        
                predictions.forEach((prediction) => {
                    // Check if topLeft and bottomRight are tensors and extract values accordingly
                    const topLeft = Array.isArray(prediction.topLeft)
                        ? prediction.topLeft
                        : prediction.topLeft.arraySync();
                    const bottomRight = Array.isArray(prediction.bottomRight)
                        ? prediction.bottomRight
                        : prediction.bottomRight.arraySync();
            
                    const [x, y] = topLeft;
                    const [width, height] = bottomRight;
            
                    // Draw bounding box around detected face
                    ctx.beginPath();
                    ctx.rect(x, y, width - x, height - y);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'yellow';
                    ctx.fillStyle = 'yellow';
                    ctx.stroke();
                });
            }
        }
        requestAnimationFrame(detectFaces);
    };

    // Start face detection once the model is loaded
    useEffect(() => {
        if (model && videoLoaded) {
            detectFaces(); // Start detecting faces
        }
    }, [model, videoLoaded]);

    return (
        <div className={styles.base}>
            {/* <h1>Live Face Detection with TensorFlow.js</h1> */}
            <div className={styles.video_container}>
                <video
                    ref={videoRef}
                    width="400"
                    height="320"
                    autoPlay
                    className={styles.video}
                />
                <canvas
                    ref={canvasRef}
                    width="400"
                    height="320"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    className={styles.canvas}
                />
            </div>
        </div>
    );
};

export default FaceDetection;
