import '../styles/globals.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { Avatar, Col, Layout, Menu, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Row style={{ overflow: 'hidden' }}>
      <Col span={4} style={{ height: '100vh' }}>
        <Menu theme='dark' mode="inline" style={{ height: '100vh' }}>
          <Menu.Item key="menu-item-inicio"><Link href={`/`}>Inicio</Link></Menu.Item>
          <Menu.Item key="menu-item-experience"><Link href={`/experience`}>Formação/Experiencia</Link></Menu.Item>
          <Menu.SubMenu title="Conhecimento" key="submenu-knowlegde">
            <Menu.Item key="menu-item-frontend"><Link href={`/frontend`}>Frontend</Link></Menu.Item>
            <Menu.Item key="menu-item-backend"><Link href={`/backend`}>Backend</Link></Menu.Item>
            <Menu.Item key="menu-item-database"><Link href={`/database`}>Banco de Dados</Link></Menu.Item>
          </Menu.SubMenu>
        </Menu>;
      </Col>

      <Col span={20}>
        <Layout style={{ height: '100vh' }}>
          <Row align='middle' justify='space-between' style={{ backgroundColor: 'white', padding: '20px' }}>
            <Row align='middle' justify='center'>Meu Portifólio</Row>
            <Avatar size={32} icon={<UserOutlined />} />
          </Row>
          <Component {...pageProps} />
        </Layout>
      </Col>
    </Row>
  </>
}

export default MyApp
