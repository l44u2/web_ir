const form = document.getElementById("hotel_form");
const titleInput = document.getElementById("title_input");

const getHotels = () => JSON.parse(sessionStorage.getItem('hotels') || '[]');

const isDuplicateTitle = (title) => {
    const hotels = getHotels();
    return hotels.some(hotel => hotel.title.toLowerCase() === title.toLowerCase());
};



form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const visitInput = document.getElementById("visit_input");
    const roomInput = document.getElementById("room_input");

    const visitors = parseInt(visitInput.value, 10);
    const nrooms = parseInt(roomInput.value, 10);

    if (visitors < 0 || nrooms < 0) {
        alert("Visitors and rooms cannot be negative!");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/hotels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: titleInput.value.trim(),
                visitors,
                nrooms,
            }),
        });
    
        if (!response.ok) {
            const data = await response.json();
            alert(data.error);
            return;
        }
    
        const hotelsResponse = await fetch('http://localhost:3000/api/hotels');
        const hotels = await hotelsResponse.json();
        sessionStorage.setItem('hotels', JSON.stringify(hotels));
    
        window.location.href = "index.html";
    } catch (error) {
        alert("Failed to create hotel");
    }
    
});
