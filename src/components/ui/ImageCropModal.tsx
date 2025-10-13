'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onCrop: (croppedImageUrl: string) => void;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onCrop
}) => {
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen && imageUrl) {
      const img = new Image();
      img.onload = () => {
        if (imageRef.current) {
          imageRef.current.src = imageUrl;
        }
        // Устанавливаем начальную область обрезки по центру
        setCropArea({
          x: (img.width - 200) / 2,
          y: (img.height - 200) / 2,
          width: 200,
          height: 200
        });
      };
      img.src = imageUrl;
    }
  }, [isOpen, imageUrl]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left - cropArea.x,
      y: e.clientY - rect.top - cropArea.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragStart.x;
    const newY = e.clientY - rect.top - dragStart.y;
    
    if (imageRef.current) {
      const maxX = imageRef.current.width - cropArea.width;
      const maxY = imageRef.current.height - cropArea.height;
      
      setCropArea(prev => ({
        ...prev,
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = cropArea.width;
    canvas.height = cropArea.height;

    ctx.drawImage(
      imageRef.current,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      cropArea.width,
      cropArea.height
    );

    const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.9);
    onCrop(croppedImageUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="image-crop-modal-overlay" onClick={onClose}>
      <div className="image-crop-modal" onClick={(e) => e.stopPropagation()}>
        <div className="image-crop-modal-header">
          <span className="image-crop-modal-title">Preview</span>
          <button className="image-crop-modal-close" onClick={onClose}>
            <Icon name="check" />
          </button>
        </div>
        
        <div className="image-crop-modal-content">
          <div className="image-crop-container">
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Preview"
              className="image-crop-preview"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <div
              className="image-crop-area"
              style={{
                left: cropArea.x,
                top: cropArea.y,
                width: cropArea.width,
                height: cropArea.height
              }}
            />
          </div>
          
          <div className="image-crop-instructions">
            You can crop the image any way you like.
          </div>
          
          <button className="image-crop-button" onClick={handleCrop}>
            Use this image
          </button>
        </div>
        
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};
