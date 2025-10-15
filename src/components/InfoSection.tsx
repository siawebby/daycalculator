'use client';

import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <section className="info-text">
      <h2>How to use the day calculator</h2>
      <div className="info-text__content">
        <p>
          Our free day calculator is designed to help you calculate the exact number of days between any two dates.
          Simply select your start and end dates using the intuitive date picker, and our calculator will instantly
          provide you with accurate results. Use the "Include last day" option to include the end date in your calculation,
          which is perfect for project deadlines, contract periods, and event planning.
        </p>
        <p>
          For business calculations, enable the "Business days only" option to exclude weekends and holidays from your count.
          This feature is essential for project management, work scheduling, and business planning. Our calculator supports
          different weekend patterns and can account for various holidays depending on your location and requirements.
        </p>
        <p>
          The day calculator provides comprehensive results including total days, weeks, months, and years between dates.
          It automatically breaks down the calculation to show weekend days, business days, and any excluded holidays.
          Whether you're planning a project, tracking time since an event, or calculating deadlines, our tool delivers
          precise results instantly with a user-friendly interface.
        </p>
      </div>
    </section>
  );
};

export default InfoSection;
