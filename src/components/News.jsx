import { useState } from "react"
import { Select, Typography, Row, Col, Avatar, Card } from "antd"
import moment from "moment/moment"

import { useGetNewsQuery } from "../services/newsApi"
import { useGetCoinsQuery } from "../services/coinrankingApi"
import Loader from "./Loader"

const demoImage = 'https://coinswitch.co/switch/wp-content/uploads/2022/10/Generic_Lede_1-1024x614.jpg'

const { Title, Text } = Typography
const { Option } = Select

const News = (props) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews, isFetching } = useGetNewsQuery({newsCategory: newsCategory, showCount: props.simplified ? 6 : 18})

  const {data: coinsList } = useGetCoinsQuery(100)

  if (isFetching) return <Loader />

  return (
    <Row gutter={[24, 24]}>
      {!props.simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {coinsList?.data?.coins.map((coin) => 
              <Option value={coin.name} key={coin.name}>{coin.name}</Option>
            )}
          </Select>
        </Col>
      )}
      {cryptoNews?.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" style={{maxWidth: '100px', maxHeight: '100px'}}/>
              </div>
              <p>
                {news.description > 100 
                 ? `${news.description.substring(0, 100) } ...`
                 : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="provider"/>
                  <Text className="provider-name">{news?.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News