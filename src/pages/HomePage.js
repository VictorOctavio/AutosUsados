import React, { useEffect } from 'react'
import Footer from '../components/footer/Footer'
import CarouselClients from '../components/Home/CarouselClients'
import Header from '../components/Home/Header'

import { useDispatch } from 'react-redux'
import {GET_PUBLICATIONS_ACTION} from '../redux/AppDuck';

export default function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GET_PUBLICATIONS_ACTION('all', '?limit=15'));
    }, [dispatch]) 

    return (
        <React.Fragment>
            <Header />
            <CarouselClients />
            <Footer />
        </React.Fragment>
    )
}