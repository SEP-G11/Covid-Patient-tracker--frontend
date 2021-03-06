import React from 'react';
import {Card,Image,Row,Col} from 'react-bootstrap';
import './InfoBox.css';

const InfoBox = ({title,cases,isRed,active,total, ...props}) => {
    return (
        <Card  onClick={props.onClick}
               className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <Card.Body>
                <Row>
                    <Col className='infoBox__col_image'>
                        <Image src={props.img} thumbnail width='50px' style={{border:'white'}}/>
                    </Col>
                    <Col sm={8}>
                        <Card.Title className='infoBox_title'><h7 color='textSecondary'>{title}</h7></Card.Title>
                        <Card.Text>
                            <h2 className={`infoBox_cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>
                            <h3 className='infoBox_total'>{total} Total</h3>
                        </Card.Text>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    );
};

export default InfoBox;
