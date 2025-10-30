'use server'

import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export const autocomplete = async (input: string) => {

    try {
        const response = await client.placeAutocomplete({
            params: {
                input,
               key: process.env.GOOGLE_MAPS_API_KEY || '',
            },
        });
        return response.data.predictions;
    } catch (error) {
        console.log(error)
    }
};