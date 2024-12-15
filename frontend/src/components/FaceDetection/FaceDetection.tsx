import React, { useEffect, useRef, useState } from 'react'
import * as blazeface from '@tensorflow-models/blazeface'
import '@tensorflow/tfjs'
import styles from './FaceDetection.module.css'

const FaceDetection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        const loadModel = async () => {
            const model = await blazeface.load();
            setModel(model);
            console.log('BlazeFace model loaded');
        };
        loadModel();
    }, []);

    useEffect(() => {
        const setupWebcam = async () => {
            if (videoRef.current) {
                const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                });
                videoRef.current.srcObject = stream;

                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current) {
                        videoRef.current.width = videoRef.current.videoWidth;
                        videoRef.current.height = videoRef.current.videoHeight;

                        if (canvasRef.current) {
                            canvasRef.current.width = videoRef.current.videoWidth;
                            canvasRef.current.height = videoRef.current.videoHeight;
                        }
                    }
                }
                setVideoLoaded(true);
                console.log('Video metadata loaded');
                console.log('Video Dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
            }
        };
        setupWebcam();
    }, []);

   
    const detectFaces = async () => {
        if (model && videoRef.current && canvasRef.current) {

            const video = videoRef.current;
            const predictions = await model.estimateFaces(videoRef.current, false);
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
        
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
        
                predictions.forEach((prediction) => {
                   
                    const topLeft = Array.isArray(prediction.topLeft)
                        ? prediction.topLeft
                        : prediction.topLeft.arraySync();
                    const bottomRight = Array.isArray(prediction.bottomRight)
                        ? prediction.bottomRight
                        : prediction.bottomRight.arraySync();
            
                    const [x, y] = topLeft;
                    const [width, height] = bottomRight;
            
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

    useEffect(() => {
        if (model && videoLoaded) {
            detectFaces();
        }
    }, [model, videoLoaded]);

    return (
        <div className={styles.base}>
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
