import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { GEONAMES_API_URL } from '../constants/constants';

const WeatherForm = ({ onSearch, onLocationSearch }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
      setValue('');
    }
  }, [value, onSearch]);

  const getSuggestions = useCallback(async (value) => {
    try {
      const response = await fetch(`${GEONAMES_API_URL}?q=${value}&maxRows=5&username=sritharni`);
      const data = await response.json();
      return data.geonames.map((item) => item.name);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      return [];
    }
  }, []);

  const onSuggestionsFetchRequested = useCallback(async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  }, [getSuggestions]);

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([]);
  }, []);

  const onChange = useCallback((event, { newValue }) => {
    setValue(newValue);
  }, []);

  const getSuggestionValue = useCallback((suggestion) => suggestion, []);

  const renderSuggestion = useCallback((suggestion) => <div>{suggestion}</div>, []);

  const inputProps = useMemo(() => ({
    placeholder: 'Enter city',
    value,
    onChange: onChange
  }), [value, onChange]);

  return (
    <form onSubmit={handleSubmit} className="input-group rounded mb-3 weather-data" style={{ maxWidth: '400px', margin: '0 auto', position: 'relative' }}>
      <div className="autosuggest-container input-group">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: 'react-autosuggest__container',
            suggestionsContainer: 'react-autosuggest__suggestions-container',
            suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
            suggestionsList: 'react-autosuggest__suggestions-list',
            suggestion: 'react-autosuggest__suggestion',
            suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
          }}
        />
        <button type="submit" className="btn btn-primary search-btn">
          <i className="fas fa-search"></i>
        </button>
        <button type="button" className="btn btn-secondary gps-btn" onClick={onLocationSearch}>
          <i className="fas fa-map-marker-alt"></i>
        </button>
      </div>
    </form>
  );
};

WeatherForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onLocationSearch: PropTypes.func.isRequired,
};

export default WeatherForm;
