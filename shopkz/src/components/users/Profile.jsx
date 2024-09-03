import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation, useNavigate } from 'react-router-dom';
import { profile } from '../../api/apiAuth';
const Profile = ()=>{
    const [user, setUser] = useState({
        name: '',
        email: ''
    })
    const navigator = useNavigate();
    const location = useLocation()
    useEffect(()=>{
        document.title = 'Мой профиль'
        const users = async () => {
            const userProfile = await profile()
            if(!userProfile.success){
                navigator('/login')
                return false;
            }
            setUser({name: userProfile.data.name, email: userProfile.data.email })
        }
        users()
        if(location.state){
            
            setUser({name: location.state.data.name, email: location.state.data.email})
        }
    }, [location, navigator])
    
    return(
        <Container className="mt-4">
            <Card>
                <Row className="no-gutters">
                <Col md={4}>
                    <Image src="profile-pic.jpg" roundedCircle fluid />
                </Col>
                <Col md={8}>
                    <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>
                        {user.email}
                    </Card.Text>
                    </Card.Body>
                </Col>
                </Row>
            </Card>

            
        </Container>
    )
}

export default Profile;