import React, { useState } from 'react';
import './App.css';
import { Typography, Row, Col, Statistic } from 'antd';
import millify from 'millify';

import { useGetLatestEpochQuery, useGetHashQuery, useGetValidatorsQuery } from './features/api/apiSlice';

function App() {

  const [hashNumber, setHashNumber] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Data is being fectched - success
  const { data: latestEpochData } = useGetLatestEpochQuery() //for storing the network node 
  const { data: hashData } = useGetHashQuery(); //Getting the hash number of the transactions
  const {data: validatorData} = useGetValidatorsQuery();

  console.log(validatorData?.data?.list.bonded_nominators)

  
  const { Title } = Typography;
  
  const globalStats =  latestEpochData?.data;

  // if(isFetching) return "Wait for a while...";

  return (
    <div className="App">
      <Title level={2} className="text-container"><h1>Crypto Stake Stats and Counter</h1></Title>
      <Row gutter={[32, 32]}>
        <Col span={12} className='cards'><Statistic title="Network Node:" value={globalStats?.networkNode}/></Col>
        <Col span={12} className='cards'><Statistic title="Block Number:" value={millify(globalStats?.blockNum)} /></Col>
        <Col span={12} className='cards'><Statistic title="Validator Count:" value={globalStats?.validator_count} /></Col>
        <Col span={12} className='cards'><Statistic title="Average Waiting Time:" value={globalStats?.avgBlockTime} /></Col>
        <Col span={12} className='cards'><Statistic title="Current Validation Number:" value={globalStats?.current_validator_count} /></Col>
      </Row>
    </div>
  );
}

export default App;
