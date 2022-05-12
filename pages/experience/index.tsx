import { NextPage } from "next";
import { Card, Col, Layout, Row, Select, Tag, Timeline, TimelineItemProps, TimelineProps } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { ExperienceType } from "../../entity/type/experience.type";

interface ThisTimelineItemProps extends TimelineItemProps {
    text: React.ReactNode
    key: ExperienceType
}

interface TagFilterProps {
    key: ExperienceType
    label: string
    color: string
    disable: boolean
}

const ExperiencePage: NextPage = () => {

    const defaultTags: TagFilterProps[] = [
        {
            key: "all",
            label: "todos",
            color: 'cyan',
            disable: false,
        }, {
            key: "education",
            label: "educação",
            color: 'geekblue',
            disable: false,
        }, {
            key: "professional",
            label: "profissional",
            color: 'volcano',
            disable: false,
        }, {
            key: 'SENAI',
            label: 'senai',
            color: 'blue',
            disable: false,
        }, {
            key: 'FATEC',
            label: 'fatec',
            color: 'green',
            disable: false,
        }, {
            key: "AX4B",
            label: 'ax4b',
            color: 'red',
            disable: false,
        }, {
            key: "WIPRO",
            label: "wipro",
            color: 'purple',
            disable: false,
        },
    ]

    const [tags, setTags] = useState<TagFilterProps[]>(defaultTags)

    const rendertags = () => {
        return tags.map(tag => <Tag
            onClick={() => filterClick(tag.key)}
            key={`tag-${tag.key}`}
            style={{ cursor: 'pointer', color: tag.disable ? 'gray' : undefined }}
            color={tag.disable ? 'ligth-gray' : tag.color}>
            {tag.label}
        </Tag>)
    }

    const filterClick = (key: ExperienceType) => {
        let _tags = tags.map(tag => tag)

        const disableAll = (disable: boolean) => {
            _tags = _tags.map(tag => { return { ...tag, disable } })
        }

        const disable = (key: ExperienceType, disable: boolean = true) => {
            _tags = _tags.map(tag => key == tag.key ? { ...tag, key, disable } : tag)
        }

        if (!_tags.find(tag => tag.key == key))
            return


        if (key == 'all') {
            disableAll(false)
        }
        else {
            disableAll(true)
            disable(key, false)
            
            if (key == 'education') {
                disable('SENAI', false)
                disable('FATEC', false)
            }
            else if (key == 'professional') {
                disable('AX4B', false)
                disable('WIPRO', false)
            }
        }
        setTags(_tags)
    }

    const itens: ThisTimelineItemProps[] = [
        {
            text: <>
                <Tag color="blue" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>SENAI ARY TORRES - TÉCNICO DE DESENVOLVIMENTO DE SISTEMAS</Tag>
                <div>Passei no vestibular para o SENAI</div>
            </>,
            label: <Tag color="blue" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Agosto de 2017</Tag>,
            dot: <CheckCircleOutlined />,
            position: 'right',
            key: 'SENAI',
        },
        {
            text: <>
                <Tag color="blue" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>1° Semestre</Tag>
                <div>Lógica de Programação</div>
                <div>Construi alguns algortimos de ordenação de vetores</div>
                <div>Utilizando a linguagem C contruí uma calculadora implementando todas as funções</div>
            </>,
            position: 'right',
            key: 'SENAI',
        }, {
            text: <>
                <Tag color="blue" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>2° Semestre</Tag>
                <div>Algoritmos</div>
                <div>HTML CSS e JavaScript</div>
                <div>Programação Orientada a Objetos</div>
            </>,
            key: 'SENAI',
            position: 'right',
        }, {
            text: <>
                <Tag color="blue" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>3° Semestre</Tag>
                <div>Programação WEB (ASPNET)</div>
                <div>Programação MOBILE (XAMARIN)</div>
            </>,
            key: 'SENAI',
            position: 'right',
        }, {
            text: <>
                <Tag color="blue" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>4° Semestre</Tag>
                <div>TCC</div>
                <div>Implementamos um Ecommerce</div>
                <div>Plataforma em que o usuário poderia comprar e vender</div>
                <div>Com login, home com anúncio de produtos, tela de confirmação de usuários e uma tela de admin com todo o histórico de compras e vendas</div>
            </>,
            key: 'SENAI',
            position: 'right',
        }, {
            text: <>
                <Tag color="green" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>FATEC ZONA SUL - ANÁLISE E DESENVOLVIMENTO DE SISTEMAS</Tag>
                <div>Passei no vestibular para a FATEC</div>
            </>,
            label: <Tag color="green" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Agosto de 2019</Tag>,
            dot: <CheckCircleOutlined />,
            key: 'FATEC',
            color: 'green',
            position: 'right',
        }, {
            text: <>
                <Tag color="green" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>1° Semestre</Tag>
                <div>Algoritmos e Lógica de Programação</div>
                <div>Matemática Discreta</div>
            </>,
            key: 'FATEC',
            position: 'right',
            color: 'green',
        }, {
            text: <>
                <Tag color="magenta" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>ESTÁGIO DESENVOLVEDOR - AX4B</Tag>
                <div>Manutenções corretivas, adaptativa e evolutivas no ERP Microsoft Dynamics AX/Microsoft Dynamics 365</div>
                <div>Construções de BOTs com Automation Anywhere e Workfusion</div>
                <div>Construções de páginas usando React (Javascript/Typescript)</div>
            </>,
            label: <Tag color="magenta" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Dezembro de 2019</Tag>,
            dot: <CheckCircleOutlined />,
            color: 'red',
            key: 'AX4B',
            position: 'left',
        }, {
            text: <>
                <Tag color="green" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>2° Semestre</Tag>
                <div>Engenharia de Software</div>
                <div>Linguagem de Programação (C/C++)</div>
                <div>Sistemas de Informação</div>
                <div>Cálculo</div>
            </>,
            key: 'FATEC',
            color: 'green',
            position: 'right',
        }, {
            text: <>
                <Tag color="magenta" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>WEB DESENVOLVEDOR PLENO - AX4B</Tag>
            </>,
            label: <Tag color="magenta" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Abril de 2020</Tag>,
            dot: <CheckCircleOutlined />,
            key: 'AX4B',
            color: 'red',
            position: 'left',
        },{
            text: <>
                <Tag color="magenta" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Frontend</Tag>
                <div>Construir páginas com React (Node/Javascript/Typescript)</div>
            </>,
            key: 'AX4B',
            color: 'red',
            position: 'left',
        },{
            text: <>
                <Tag color="magenta" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Backend</Tag>
                <div>Construir APIs com o framework NestJS (Node/Javascript/Typescript)</div>
            </>,
            key: 'AX4B',
            color: 'red',
            position: 'left',
        },{
            text: <>
                <Tag color="magenta" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Banco de Dados</Tag>
                <div>Construir banco de dados (MySql)</div>
            </>,
            key: 'AX4B',
            color: 'red',
            position: 'left',
        }, {
            text: <>
                <Tag color="magenta" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Clouds</Tag>
                <div>Hospedar sites e APIs (AWS Amplify)</div>
                <div>Armazenar arquivos dos usuários (AWS S3)</div>
                <div>Autenticação de usuários (AWS Cognito)</div>
            </>,
            key: 'AX4B',
            color: 'red',
            position: 'left',
        },{
            text: <>
                <Tag color="green" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>3° Semestre</Tag>
                <div>Engenharia de Software II</div>
                <div>Estruturas de Dados </div>
                <div>Sistemas Operacionais I</div>
                <div>SEstatística aplicada</div>
            </>,
            key: 'FATEC',
            color: 'green',
            position: 'right',
        }, {
            text: <>
                <Tag color="green" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>4° Semestre</Tag>
                <div>Engenharia de Software III</div>
                <div>Programação Orientada a Objetos</div>
                <div>Banco de dados</div>
                <div>Sistemas Operacionais II </div>
            </>,
            key: 'FATEC',
            color: 'green',
            position: 'right',
        }, {
            text: <>
                <Tag color="green" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>5° Semestre</Tag>
                <div>Segurança da Informação</div>
                <div>Programação Linear e Aplicações</div>
            </>,
            key: 'FATEC',
            color: 'green',
            position: 'right',
        }, {
            text: <>
                <Tag color="purple" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>WEB DESENVOLVEDOR PLENO - WIPRO</Tag>
                <div>Nesse semestre estudamos</div>
            </>,
            label: <Tag color="purple" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>Novembro de 2021</Tag>,
            dot: <CheckCircleOutlined />,
            key: 'WIPRO',
            color: 'purple',
            position: 'left',
        }, {
            text: <>
                <Tag color="green" style={{ fontSize: '1.1em', margin: '0px 0px 10px 0px' }}>6° Semestre</Tag>
                <div>Inteligência Artificial</div>
                <div>TCC</div>
            </>,
            key: 'FATEC',
            color: 'green',
            position: 'right',
        },
    ]

    const renderItens = () => {
        const render = (item: ThisTimelineItemProps, index: number) => {
            const { color, dot, text, position, pending, prefixCls, label, key } = item

            return tags.find(tag => tag.key == key)?.disable ? <></> :
                <Timeline.Item {...{ color, dot, label, position, pending, prefixCls, key: `timeline-item-${index + 1}` }} >
                    <div>{text}</div>
                </Timeline.Item>
        }

        return itens.map(render);
    }

    const timeline: TimelineProps = {
        mode: 'alternate',
        pending: 'O que virá?',
        style: { height: '100%', width: '100%', padding: '50px' }
    }

    const select = (
        <Row>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }} xxl={{ span: 4 }}>
                Formação e Experiência
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 20 }} xxl={{ span: 20 }}>
                <Row justify="end">
                    <Row align="middle" style={{ marginRight: '20px' }} >Filtre:</Row>
                    {rendertags()}
                </Row>
            </Col>
        </Row>
    )

    return (
        <Layout style={{ padding: '20px' }}>
            <Card title={select} style={{ overflowY: 'scroll' }}>
                <Timeline {...timeline}>
                    {renderItens()}
                </Timeline>
            </Card>
        </Layout>
    )
}

export default ExperiencePage