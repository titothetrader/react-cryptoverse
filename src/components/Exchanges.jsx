import { useEffect, useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/coinGeckoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const [exchangesList, setExchangesList] = useState()

  useEffect(() => {
    setExchangesList(data)
  }, [isFetching])

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>
          <Title level={3}>Trust Rank</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Exchange</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>24h Volume (BTC)</Title>
        </Col>
        <Col span={6}>
          <Title level={3}>Country</Title>
        </Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>#{exchange.trust_score_rank}</strong></Text>
                    </Col>
                    <Col span={6}>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>
                      {millify(exchange.trade_volume_24h_btc)}
                    </Col>
                    <Col span={6}>
                      {exchange.country}
                    </Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || 'No description :(')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;