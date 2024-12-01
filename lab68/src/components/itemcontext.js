import React, { createContext, useState } from 'react';

const ItemContext = createContext();

const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([
        { id: 1, name: '1 Room Lite', description: 'A cozy single room with modern furnishings, perfect for solo travelers or short stays. Features a comfortable bed, a work desk, and essential amenities for a relaxing experience.', price: '$300', visitors: 1, rooms: 1, image: require('../assets/1bed.jpg'), days: 0, food: '' },
        { id: 2, name: '2 Beds Comfort', description: 'A spacious room designed for convenience, offering two plush beds and a seating area. Ideal for friends or small families, with added features like a mini-fridge and premium toiletries for a delightful stay.', price: '$500', visitors: 2, rooms: 2, image: require('../assets/2bed.jpg'), days: 0, food: '' },
        { id: 3, name: 'Penthouse', description: 'An opulent retreat with expansive views, luxurious furnishings, and personalized services. Includes a private terrace, a fully-equipped kitchen, and a master bedroom with an en-suite spa bathroom for the ultimate indulgence.', price: '$1500', visitors: 6, rooms: 4, image: require('../assets/pent.jpg'), days: 0, food: '' },
        { id: 4, name: 'City View King Room', description: 'Relax in this spacious room featuring a king-sized bed and floor-to-ceiling windows offering stunning views of the NYC skyline. Includes a cozy seating area and high-speed Wi-Fi for work or leisure.', price: '$700', visitors: 3, rooms: 2, image: require('../assets/1bed.jpg'), days: 0, food: '' },
        { id: 5, name: 'Family Suite', description: 'Designed with families in mind, this suite features a separate living area, a pull-out sofa, and two queen beds. Enjoy extra space and kid-friendly amenities for a comfortable family stay.', price: '$850', visitors: 5, rooms: 3, image: require('../assets/1bed.jpg'), days: 0, food: '' },
        { id: 6, name: 'Executive Studio', description: 'A chic studio with a king bed, work desk, and access to the exclusive Executive Lounge. Perfect for business travelers seeking privacy, style, and premium perks.', price: '$1000', visitors: 4, rooms: 3, image: require('../assets/1bed.jpg'), days: 0, food: '' },
    ]);

    return (
        <ItemContext.Provider value={{ items, setItems }}>
            {children}
        </ItemContext.Provider>
    );
};

export { ItemContext, ItemProvider };
