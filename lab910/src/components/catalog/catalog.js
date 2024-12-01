import React, { useState, useEffect } from 'react';
import Select from '../select/select';
import PrimaryButton from '../primarybutton/primarybutton';
import Product from '../product/product';
import { getItems } from '../../api/api';
import Loader from '../loader/loader';
import './catalog.css';

const Catalog = () => {
    const [filter, setFilter] = useState({ search: '', rooms: '', sort: '' });
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const sortOptions = [
        { value: '', label: 'Select Sort Option' }, 
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'visitors-asc', label: 'Visitors: Low to High' },
        { value: 'visitors-desc', label: 'Visitors: High to Low' },
    ];

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await getItems(filter);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const applyFilters = () => {
        fetchItems();
    };

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    return (
        <div className="catalog__component">
            <div className="catalog__filters">
                <div className="catalog__field">
                    <input 
                        type="text" 
                        name="search"
                        placeholder="Search..." 
                        className="catalog__search" 
                        value={filter.search}
                        onChange={handleFilterChange} 
                    />
                    <Select 
                        name="rooms"
                        options={[
                            { value: '', label: 'All Rooms' },
                            { value: '1', label: '1 Room' },
                            { value: '2', label: '2 Rooms' },
                            { value: '3', label: '3 Rooms' },
                            { value: '4', label: '4 Rooms' },
                        ]} 
                        value={filter.rooms} 
                        onChange={handleFilterChange} 
                    />
                    <Select 
                        name="sort"
                        options={sortOptions}
                        value={filter.sort} 
                        onChange={handleFilterChange} 
                    />
                </div>
                <PrimaryButton onClick={applyFilters}>Apply</PrimaryButton>
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className="catalog__list">
                    {items.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Catalog;