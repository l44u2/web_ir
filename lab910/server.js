const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); 
app.use(express.json()); 

const items = [
        {
            id: 1,
            name: '1 Room Lite',
            description: 'A cozy single room with modern furnishings, perfect for solo travelers or short stays.',
            price: 300,
            visitors: 1,
            rooms: 1,
            image: 'https://www.hilton.com/im/en/SHVSPHF/20023784/hilton-shreveport-double.jpg?impolicy=crop&cw=5000&ch=3333&gravity=NorthWest&xposition=0&yposition=-1&rw=1280&rh=854',
        },
        {
            id: 2,
            name: '2 Beds Comfort',
            description: 'A spacious room designed for convenience, offering two plush beds and a seating area.',
            price: 500,
            visitors: 2,
            rooms: 2,
            image: 'https://www.hilton.com/im/en/SHVSPHF/20023784/hilton-shreveport-double.jpg?impolicy=crop&cw=5000&ch=3333&gravity=NorthWest&xposition=0&yposition=-1&rw=1280&rh=854',
        },
        {
            id: 3,
            name: 'Penthouse',
            description: 'An opulent retreat with expansive views and luxurious furnishings.',
            price: 1500,
            visitors: 6,
            rooms: 4,
            image: 'https://www.hilton.com/im/en/SHVSPHF/20023784/hilton-shreveport-double.jpg?impolicy=crop&cw=5000&ch=3333&gravity=NorthWest&xposition=0&yposition=-1&rw=1280&rh=854',
        },
        {
            id: 4,
            name: 'City View King Room',
            description: 'Relax in this spacious room featuring a king-sized bed and stunning NYC skyline views.',
            price: 700,
            visitors: 3,
            rooms: 2,
            image: 'https://www.hilton.com/im/en/SHVSPHF/20023784/hilton-shreveport-double.jpg?impolicy=crop&cw=5000&ch=3333&gravity=NorthWest&xposition=0&yposition=-1&rw=1280&rh=854',
        },
        {
            id: 5,
            name: 'Family Suite',
            description: 'Designed with families in mind, featuring a separate living area and kid-friendly amenities.',
            price: 850,
            visitors: 5,
            rooms: 3,
            image: 'https://www.hilton.com/im/en/SHVSPHF/20023784/hilton-shreveport-double.jpg?impolicy=crop&cw=5000&ch=3333&gravity=NorthWest&xposition=0&yposition=-1&rw=1280&rh=854',
        },
        {
            id: 6,
            name: 'Executive Studio',
            description: 'A chic studio perfect for business travelers, offering privacy and premium perks.',
            price: 1000,
            visitors: 4,
            rooms: 3,
            image: 'https://www.hilton.com/im/en/SHVSPHF/20023784/hilton-shreveport-double.jpg?impolicy=crop&cw=5000&ch=3333&gravity=NorthWest&xposition=0&yposition=-1&rw=1280&rh=854',
        },
];

app.get('/api/items', (req, res) => {
    let filteredItems = items;

    if (req.query.search) {
        const search = req.query.search.trim().toLowerCase();
        filteredItems = filteredItems.filter(
            item => item.name.toLowerCase().includes(search)
        );
    }

    if (req.query.rooms) {
        const rooms = parseInt(req.query.rooms);
        filteredItems = filteredItems.filter(item => item.rooms === rooms);
    }

    if (req.query.sort) {
        const [sortField, sortOrder] = req.query.sort.split('-');
        filteredItems.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortField] - b[sortField];
            }
            if (sortOrder === 'desc') {
                return b[sortField] - a[sortField];
            }
            return 0;
        });
    }

    res.json(filteredItems);
});

app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});