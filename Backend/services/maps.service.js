import axios from 'axios';

/**
 * Geocode an address string using Google Maps Geocoding API.
 * @param {string} address - The address to geocode.
 * @returns {Promise<{latitude:number, longitude:number}>}
 * @throws {Error} on missing config, bad request, or no results
 */
export const getAddressCoordinate = async (address) => {
	if (!address || typeof address !== 'string') {
		throw new Error('Address is required and must be a string');
	}

	const apiKey = process.env.GOOGLE_MAPS_API;
	if (!apiKey) {
		throw new Error('GOOGLE_MAPS_API environment variable is not set');
	}

	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

	try {
		const res = await axios.get(url);
		const data = res.data;

		if (!data || data.status !== 'OK' || !Array.isArray(data.results) || data.results.length === 0) {
			const msg = data && (data.error_message || data.status) ? (data.error_message || data.status) : 'No geocoding results';
			throw new Error(`Geocoding failed: ${msg}`);
		}

		const location = data.results[0].geometry.location;
		return { ltd: location.lat, lng: location.lng };
	} catch (err) {
		if (err.response && err.response.data) {
			// Axios error with response body from Google
			throw new Error(`Geocoding error: ${err.response.status} ${JSON.stringify(err.response.data)}`);
		}
		throw err;
	}
};

export const getDistanceandTime = async (origin, destination) => {
    if (!origin || !destination || typeof origin !== 'string' || typeof destination !== 'string') {
        throw new Error('Origin and destination are required and must be strings');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) {
        throw new Error('GOOGLE_MAPS_API environment variable is not set');
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try{
        const res = await axios.get(url);
        const data = res.data;
        if(res.data.status !== 'OK'){

            if(res.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS'){
                throw new Error('No route could be found between the origin and destination');
            }
            return res.data.rows[0].elements[0];

        } else {
            throw new Error('Failed to fetch distance and time data');
        }

    } catch (error) {
        console.error('error');
        throw error;
    }

};


export const getAutoCompleteSuggestionsService = async (input) => {
    if (!input || typeof input !== 'string') {
        throw new Error('Query is required and must be a string');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    if (!apiKey) {
        throw new Error('GOOGLE_MAPS_API environment variable is not set');
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        const data = response.data;

        if(data.status === 'OK'){
            return data.predictions;
        } else {
            throw new Error(`Unable to fetch suggestions'}`);
        }
    } catch (error) {
        console.error('error');
        throw error;
    }
}