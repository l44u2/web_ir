import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Catalog from './components/catalog';
import Item from './components/item';
import { ItemProvider } from './components/itemcontext';

const App = () => {
    return (
        <ItemProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/item/:id" element={<Item />} />
                </Routes>
                <Footer />
            </Router>
        </ItemProvider>
    );
};

export default App;
