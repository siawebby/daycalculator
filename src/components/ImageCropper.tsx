'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageFile: File | null;
  onCropComplete: (croppedFile: File) => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  isOpen,
  onClose,
  imageFile,
  onCropComplete
}) => {
  const t = useTranslations('imageCropper');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          aspect,
          width,
          height
        ),
        width,
        height
      ));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width,
      completedCrop.height
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const blob = await offscreen.convertToBlob({
      type: imageFile?.type || 'image/png',
      quality: 0.9,
    });

    if (blob && imageFile) {
      const croppedFile = new File([blob], imageFile.name, {
        type: imageFile.type,
        lastModified: Date.now()
      });
      onCropComplete(croppedFile);
      onClose();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('title')}>
      <div className="image-cropper d-flex flex-column">
        <div className="image-cropper-container d-flex align-items-center justify-content-center">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imageUrl || undefined}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>
        
        <div className="cropper-controls">
          <p className="cropper-instruction" dangerouslySetInnerHTML={{ __html: t('instruction') }}>
          </p>
          <Button 
            onClick={onDownloadCropClick} 
            className="cropper-apply-btn"
            disabled={!completedCrop?.width || !completedCrop?.height}
          >
            {t('useImage')}
          </Button>
        </div>
        
        <canvas
          ref={previewCanvasRef}
          style={{
            display: 'none',
          }}
        />
      </div>
    </Modal>
  );
};
