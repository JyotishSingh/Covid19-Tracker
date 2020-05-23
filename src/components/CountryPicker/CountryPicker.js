import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api'

function CountryPicker({ handleCountryChange }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountries());
        }
        fetchAPI();
    }, [])

    return (
        <FormControl className="formcontrol">
            <NativeSelect onChange={e => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
