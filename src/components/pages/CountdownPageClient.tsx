'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input, Upload, Icon, Button } from '../ui';
import OptionsSection from '../OptionsSection';
import InfoSection from '../InfoSection';
import { ImageCropper } from '../ImageCropper';

export default function CountdownPageClient() {
  const t = useTranslations('common');
  const [eventLabel, setEventLabel] = useState("Jon's Birthday");
  const [date, setDate] = useState('23 Sep, 2025');
  const [time, setTime] = useState('12 p.m.');
  const [activeDatePicker, setActiveDatePicker] = useState<boolean>(false);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name);
  };

  const handleImageSelect = (file: File) => {
    setSelectedImageFile(file);
    setIsCropperOpen(true);
  };

  const handleCropComplete = (croppedFile: File) => {
    console.log('Cropped image:', croppedFile.name);
    // Здесь можно добавить логику для обработки обрезанного изображения
  };

  const handleCloseCropper = () => {
    setIsCropperOpen(false);
    setSelectedImageFile(null);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    setActiveDatePicker(true);
  };

  const handleOpenDatePicker = () => {
    setActiveDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setActiveDatePicker(false);
  };

  return (
    <main>
      <div className="container">
        <section className="params-list d-flex justify-content-between">
          <div className="setting-container">
            <div className="setting-list d-flex flex-column">
              <div className="setting-item d-flex justify-content-between align-items-center">
                <div className="setting-label d-flex align-items-center">
                  <Icon name="tag" /> {t('eventLabel')}
                </div>
                <div className="setting-input d-flex">
                  <Input 
                    variant="text" 
                    value={eventLabel} 
                    onChange={(e) => setEventLabel(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="setting-item d-flex justify-content-between align-items-center">
                <div className="setting-label d-flex align-items-center">
                  <Icon name="nav/calendar" /> {t('date')}
                </div>
                <div className="setting-input d-flex">
                  <Input 
                    variant="date" 
                    value={date} 
                    onDateChange={handleDateChange}
                    isActive={activeDatePicker}
                    onClose={handleCloseDatePicker}
                    onOpen={handleOpenDatePicker}
                  />
                  <Input 
                    variant="time" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Upload
            onFileSelect={handleFileSelect}
            onImageSelect={handleImageSelect}
            accept="image/*,video/*,.pdf,.mp4"
            maxSize={50 * 1024 * 1024}
          />
        </section>
        
        <OptionsSection />
        <InfoSection />
      </div>
      
      <ImageCropper
        isOpen={isCropperOpen}
        onClose={handleCloseCropper}
        imageFile={selectedImageFile}
        onCropComplete={handleCropComplete}
      />
    </main>
  );
}
