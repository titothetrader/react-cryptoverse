import { useEffect, useState } from "react"
import HTMLReactParser from "html-react-parser"
import { useParams } from "react-router-dom"
import millify from "millify"
import { Col, Row, Typography, Select } from "antd"
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from "@ant-design/icons"
import LineChart from './LineChart'
import Loader from './Loader'

import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from "../services/coinrankingApi"

const { Title, Text } = Typography
const{ Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const {data, isFetching} = useGetCoinDetailsQuery(coinId)
  const {data: coinHistory} = useGetCoinHistoryQuery({coinId, timePeriod})
  const [coinData, setCoinData] = useState(data?.data?.coin)

  useEffect(() => {
    setCoinData(data?.data?.coin)
  }, [isFetching])

  if (isFetching) return <Loader />
  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Rank', value: coinData?.rank, icon: <NumberOutlined /> },
    { title: 'Price to USD', value: `$ ${coinData?.price && millify(coinData?.price)}`, icon: <DollarCircleOutlined /> },
    { title: '24h Volume', value: `$ ${coinData?.['24hVolume'] && millify(coinData?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${coinData?.marketCap && millify(coinData?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${coinData?.allTimeHigh?.price && millify(coinData?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: coinData?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coinData?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: coinData?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${coinData?.supply?.total && millify(coinData?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${coinData?.supply?.circulating && millify(coinData?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={1} className="coin-name">{coinData?.name} ({coinData?.symbol})</Title>
        <p>
          {coinData?.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Time Period" onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>

      <LineChart coinHistory={coinHistory} currentPrice={millify(coinData?.price)} coinName={coinData?.name}/>

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{coinData?.name} Value Statistics</Title>
            <p>An overview showing the stats of {coinData?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Global Statistics</Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
            <Title level={2} className="coin-details-heading">
              What is {coinData?.name}?
            </Title>
            {coinData?.description && HTMLReactParser(coinData?.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {coinData?.name} Links
          </Title>
          {coinData?.links.map((link, i) => (
            <Row className="coin-link" key={i}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails