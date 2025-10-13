'use client';

import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <section className="info-text">
      <h2>How to use the day counter</h2>
      <div className="info-text__content">
        <p>
          To use the day counter, use the drop-down menus to select a starting month, date, and year.
          Check the "include end day" box if the end day should be included in the count. For example, if a
          project is due at 11:59 PM on April 24th, and the current day is March 29th, select those dates, and use
          the check box to include the end day. Alternatively, selecting April 25th as the end day and not
          checking the "include end day" box would provide the same result.
        </p>
        <p>
          The calculator has additional settings, which are accessible by clicking the "Settings" link.
          Select whether or not to include holidays. If you would like to include holidays, select which common
          US holidays to include, and/or use the table below to enter other holidays. The calculator result
          will include a count of the number of holidays included in the chosen time span.
        </p>
        <p>
          The calculator returns the number of days between the selected date assuming a Monday to Friday
          work week and that the weekend falls on Saturday and Sunday. It breaks down the total number of days
          into weekend days and weekdays by default, but can also include common or specified holidays (both in
          the count as well as listing the holidays). The calculator always counts the start date as a full
          day, and counts the last date as a full day if the "include end day" box is selected. If the box is
          not selected, the end date is not included in the calculation.
        </p>
      </div>
    </section>
  );
};

export default InfoSection;
