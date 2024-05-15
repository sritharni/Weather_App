import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import ForecastItem from './ForecastItem';
import { DAYS_OF_WEEK } from '../constants/constants';

const Forecast = ({ forecast }) => {
  const days = useMemo(() => DAYS_OF_WEEK, []);

  return (
    <div className="mt-4">
      <h5 className="text-center">Next 2 Days Forecast</h5>
      <div id="accordion">
        {Object.keys(forecast).map((date) => (
          <MDBAccordion flush key={date} className="py-2">
            <MDBAccordionItem collapseId={date} headerTitle={days[new Date(forecast[date][0]?.dt_txt).getDay()]}>
              <ForecastItem forecast={forecast[date]} />
            </MDBAccordionItem>
          </MDBAccordion>
        ))}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  forecast: PropTypes.object.isRequired,
};

export default Forecast;