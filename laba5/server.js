const express = require('express');
const path = require('path');  
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); 

let hotels = [];

app.post('/api/hotels', (req, res) => {
    const { title, visitors, nrooms } = req.body;
    
    if (visitors < 0 || nrooms < 0) {
        return res.status(400).json({ error: "Visitors and rooms cannot be negative!" });
    }

    const isDuplicate = hotels.some(hotel => 
        hotel.title.toLowerCase() === title.toLowerCase()
    );
    
    if (isDuplicate) {
        return res.status(400).json({ error: "A hotel with this title already exists" });
    }
    
    const newHotel = {
        id: crypto.randomUUID(),
        title,
        visitors,
        nrooms
    };
    
    hotels.push(newHotel);
    res.status(201).json(newHotel);
});

app.get('/api/hotels', (req, res) => {
    const { search, sortBy } = req.query;
    let result = [...hotels];
    
    if (search) {
        result = result.filter(hotel => 
            hotel.title.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    if (sortBy) {
        switch (sortBy) {
            case 'visitors':
                result.sort((a, b) => b.visitors - a.visitors);
                break;
            case 'rooms':
                result.sort((a, b) => b.nrooms - a.nrooms);
                break;
        }
    }
    
    res.json(result);
});

app.get('/api/hotels/:id', (req, res) => {
    const hotel = hotels.find(h => h.id === req.params.id);
    if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(hotel);
});

app.put('/api/hotels/:id', (req, res) => {
    const { title, visitors, nrooms } = req.body;
    const index = hotels.findIndex(h => h.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Hotel not found' });
    }
    
    hotels[index] = {
        ...hotels[index],
        title,
        visitors,
        nrooms
    };
    
    res.json(hotels[index]);
});

app.delete('/api/hotels/:id', (req, res) => {
    hotels = hotels.filter(h => h.id !== req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});