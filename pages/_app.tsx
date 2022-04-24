import '../styles/globals.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import { Col, Layout, Menu, Row } from 'antd';

function MyApp({ Component, pageProps }: AppProps) {
  return <Row>
    <Col span={4} style={{ height: '100vh' }}>
      <Menu theme='dark' mode="inline" style={{ height: '100vh' }}>
        <Menu.Item>Inicio</Menu.Item>
        <Menu.Item>Formação/Experiencia</Menu.Item>
        <Menu.SubMenu title="Conhecimento">
          <Menu.Item>Frontend</Menu.Item>
          <Menu.Item>Backend</Menu.Item>
          <Menu.Item>Banco de Dados</Menu.Item>
        </Menu.SubMenu>
      </Menu>;
    </Col>
    <Col span={20}>
      <Component {...pageProps} />
    </Col>
  </Row>
}

export default MyApp
