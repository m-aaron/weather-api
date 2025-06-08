import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import style from "../styles/components/nav.module.css"

const Nav = () => {
    return (
        <Navbar className={ style.navbar }>
            <Container>
                <Navbar.Brand id={ style.brand }>Weather API</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Nav