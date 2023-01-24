import { useEffect, useState } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'

import icon from '../images/cryptocurrency.png'
import Homepage from './Homepage'
import Cryptocurrencies from './Cryptocurrencies'
import Exchanges from './Exchanges'
import News from './News'

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if(screenSize < 768) {
            setOpenMenu(false)
        } else {
            setOpenMenu(true)
        }
    }, [screenSize])

    const navItems = [
        {
            label: <Link to='/'>Home</Link>,
            key: 'home',
            onClick: ()=>{},
            className: '',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to='/cryptocurrencies'>Cryptocurrencies</Link>,
            key: 'cryptocurrencies',
            onClick: ()=>{},
            className: '',
            icon: <FundOutlined />,
        },
        {
            label: <Link to='/exchanges'>Exchanges</Link>,
            key: 'exchanges',
            onClick: ()=>{},
            className: '',
            icon: <MoneyCollectOutlined />,
        },
        {
            label: <Link to='/news'>News</Link>,
            key: 'news',
            onClick: ()=>{},
            className: '',
            icon: <BulbOutlined />,
        }
    ]

  return (
    <div className='nav-container'>
        <div className='logo-container'>
            <Avatar src={icon} size='large'/>
            <Typography.Title level={2} className='logo'>
                <Link to='/'>Cryptoverse</Link>
            </Typography.Title>
            <Button className='menu-control-container' onClick={() => setOpenMenu(!openMenu)}>
                <MenuOutlined />
            </Button>
        </div>
        {openMenu && <Menu theme='dark' items={navItems}/>}
    </div>
  )
}

export default Navbar