'use client';

import React, { useState } from 'react';
import { Input, Upload, Icon, ImageCropModal } from '../../components/ui';
import OptionsSection from '../../components/OptionsSection';
import InfoSection from '../../components/InfoSection';

export default function CountdownPage() {
  const [eventLabel, setEventLabel] = useState("Jon's Birthday");
  const [date, setDate] = useState('23 Sep, 2025');
  const [time, setTime] = useState('12 p.m.');
  const [activeDatePicker, setActiveDatePicker] = useState<boolean>(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>('');

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file.name);
    
    // Проверяем, является ли файл изображением
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImageUrl(imageUrl);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    } else {
      // Для не-изображений просто обрабатываем как обычно
      console.log('Non-image file selected:', file.name);
    }
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

  const handleCloseCropModal = () => {
    setIsCropModalOpen(false);
    setSelectedImageUrl('');
  };

  const handleCropImage = (croppedUrl: string) => {
    setCroppedImageUrl(croppedUrl);
    console.log('Image cropped successfully');
  };

  return (
    <main>
      <div className="container">
        <section className="params-list d-flex justify-content-between">
          <div className="setting-container">
            <div className="setting-list d-flex flex-column">
              <div className="setting-item d-flex justify-content-between align-items-center">
                <div className="setting-label d-flex align-items-center">
                  <Icon name="tag" /> Event Label
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
                  <Icon name="nav/calendar" /> Date
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
            accept="image/*,video/*,.pdf,.mp4"
            maxSize={50 * 1024 * 1024}
          />
          
          <button className="refresh-mobile">
            <Icon name="days_counter/refresh_white" /> Reload
          </button>
        </section>
        
        <OptionsSection />
        <InfoSection />
      </div>
      
      <ImageCropModal
        isOpen={isCropModalOpen}
        onClose={handleCloseCropModal}
        imageUrl={selectedImageUrl}
        onCrop={handleCropImage}
      />
    </main>
  );
}
