import { useEffect, useState } from "react"
import millify from "millify"
import { Link } from "react-router-dom"
import { Card, Row, Col, Input } from "antd"
import { useGetCoinsQuery } from "../services/coinrankingApi"


const Cryptocurrencies = (props) => {
  const showCount = props.simplified ? 10 : 100
  const {data: coinsList, isFetching } = useGetCoinsQuery(showCount)
  const [coins, setCoins] = useState(coinsList?.data?.coins)
  const[searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const filteredCoins = coinsList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCoins(filteredCoins)

  }, [coinsList, searchTerm])

  return (
    <>
      {!props.simplified && <div className="search-crypto">
        <Input placeholder="Search Cryptos" onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {coins?.map((currency, i) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card 
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl}/>}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies