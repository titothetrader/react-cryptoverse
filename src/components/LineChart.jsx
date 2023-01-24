import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
  } from 'chart.js';

const {Title } = Typography

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
  );

const LineChart = (props) => {

  const coinPrice = []
  const coinTimestamp = []

  for (let i = 0; i < props.coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(props.coinHistory?.data?.history[i].price)
    coinTimestamp.push(new Date(props.coinHistory?.data?.history[i].timestamp).toLocaleDateString())
  }

  const chartData = {
    labels: coinTimestamp,
    datasets: [
        {
            label: 'Price in USD',
            data: coinPrice,
            // fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
        }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    }
  }

  return (
    <>
        <Row className='chart-header'>
            <Title level={2} className="chart-title">{props.coinName} Price Chart</Title>
            <Col className='price-container'>
                <Title level={5} className="price-change">{props.coinHistory?.data.change}%</Title>
                <Title level={5} className="current-price">Current {props.coinName} Price: ${props.currentPrice}</Title>
            </Col>
        </Row>
        <Line data={chartData} options={chartOptions} />
    </>
  )
}

export default LineChart