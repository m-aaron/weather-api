import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Card, Col, Container, Row, Form, Stack } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import Nav from '../components/Nav'
import style from '../styles/pages/home.module.css'
import { useSnackbar } from 'notistack';

const Home = () => {
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("");
    const [units, setUnits] = useState("");
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const fetchData = async ({ city, units }) => {
        try {
            setLoading(true);
            setReady(true);

            const res = await axios.get("/api/weather", {
                params: { city, units }
            });

            setWeather(res.data.data);

        } catch (error) {
            console.log("error: " + error);
            enqueueSnackbar("No weather data found for the given location.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        fetchData({ city, units });
    };

    return (
        <>
            <Nav />
            <Container>
                <Row>
                    <Col className='mt-5' xs={ 12 } md={ 4 }>
                        <Card id={ style["r-card"] }>
                            <Card.Body>
                                <Form onSubmit={ submitHandler }>
                                    <Form.Group>
                                        <Stack gap={ 3 } >
                                            <input
                                                className={ style.input }
                                                type='text'
                                                placeholder='Location: ex. Manila'
                                                required
                                                value={ city }
                                                onChange={ (e) => setCity(e.target.value) }
                                            />
                                            <Row>
                                                <Col>
                                                    <Form.Select 
                                                        id={ style.select } 
                                                        value={ units } 
                                                        onChange={ (e) => setUnits(e.target.value)}
                                                    >
                                                        <option value="metric">Metric</option>
                                                        <option value="imperial">Imperial</option>
                                                    </Form.Select>
                                                </Col>
                                                <Col>
                                                    <button id={ style.button } type='submit'>Go</button>
                                                </Col>
                                            </Row>
                                        </Stack>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mt-5' xs={ 12 } md={ 8 }>
                        { loading ? <Spinner /> :
                            <>
                                { ready ?
                                    <>
                                        <Card id={ style["l-card"] }>
                                            <Card.Body>
                                                <Stack gap={ 3 }>
                                                    <Card id={ style["sec-1-card"] }>
                                                        <Row className='align-items-center'>
                                                            <Col xs={ 6 } md={ 4 }>
                                                                <div className='d-flex justify-content-center'>
                                                                    <Card.Img 
                                                                        src={ `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${ weather.icon }.png` }
                                                                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                                                    >
                                                                    </Card.Img>
                                                                </div>
                                                            </Col>
                                                            <Col xs={ 6 } md={ 8 }>
                                                                { weather.location ? 
                                                                    <h5 id={ style.location }>{ weather.location }</h5> :
                                                                    <h5 id={ style.location }>N/A</h5>
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                    <Row>
                                                        <Col>
                                                            <Card id={ style["sec-2-card"] }>
                                                                <Card.Body>
                                                                    <Form.Label className={ style.label }>DESCRIPTION:</Form.Label>
                                                                    { weather.description ? 
                                                                        <Card.Text className={ style.text }>{ weather.description }</Card.Text> :
                                                                        <Card.Text className={ style.text }>N/A</Card.Text>
                                                                    }
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                        <Col>
                                                            <Card id={ style["sec-3-card"] }>
                                                                <Card.Body>
                                                                    <Form.Label className={ style.label }t>FEELS LIKE:</Form.Label>
                                                                    { weather.feelsLike ? 
                                                                        <Card.Text className={ style.text }>{ weather.feelsLike }</Card.Text> :
                                                                        <Card.Text className={ style.text }>N/A</Card.Text>
                                                                    }
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                        <Col>
                                                            <Card id={ style["sec-4-card"] }>
                                                                <Card.Body>
                                                                    <Form.Label className={ style.label }>HUMIDITY:</Form.Label>
                                                                    { weather.humidity ? 
                                                                        <Card.Text className={ style.text }>{ weather.humidity }</Card.Text> :
                                                                        <Card.Text className={ style.text }>N/A</Card.Text>
                                                                    }
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                        <Col>
                                                            <Card id={ style["sec-5-card"] }>
                                                                <Card.Body>
                                                                    <Form.Label className={ style.label }>WIND SPEED:</Form.Label>
                                                                    { weather.windSpeed ? 
                                                                        <Card.Text className={ style.text }>{ weather.windSpeed }</Card.Text> :
                                                                        <Card.Text className={ style.text }>N/A</Card.Text>
                                                                    }
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                </Stack>
                                            </Card.Body>
                                        </Card>
                                    </> : null
                                }
                                
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
        
    )
}

export default Home