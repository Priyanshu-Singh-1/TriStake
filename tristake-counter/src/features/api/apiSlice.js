import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-api-key' : 'a59e48c684de4eb088f49355ffd55096'
}

const baseUrl = 'https://polkadot.api.subscan.io';

const createRequest = (url) => ({
    url, 
    headers: cryptoApiHeaders
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl}),

    endpoints: builder => ({
        
        //this is the api call for the network node and the epoch details (basically the meta data)
        getLatestEpoch: builder.query({
            query: () => createRequest('/api/scan/metadata')
        }), 

        // this is the api for getting the hash block number and other details 
        getHash: builder.query({
            query:() => createRequest('/api/scan/block')
        }),

        getValidators: builder.query({
            query: () => createRequest('/api/scan/staking/')
        })
    })
}); 

// Export the auto-generated hook for the 'getLatestEpoch' query endpoint
export const { useGetLatestEpochQuery,
               useGetHashQuery,
               useGetValidatorsQuery
            } = apiSlice