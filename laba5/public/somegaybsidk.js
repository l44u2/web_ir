const itemsContainer = document.getElementById("items_container");

const itemTemplate = ({ id, title, visitors, nrooms }) => `
<li id="item-${id}" class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">Visitors: ${visitors}</p>
    <p class="card-text">Rooms: ${nrooms}</p>
    <button data-id="${id}" class="btn btn-primary me-2 edit-btn">Edit</button>
    <button data-id="${id}" class="btn btn-danger delete-btn">Delete</button>
  </div>
</li>`;

export const renderItemsList = (items, onRemove, onEdit) => {
    itemsContainer.innerHTML = items.map(item => itemTemplate(item)).join('');
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            onRemove(id);
        });
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            onEdit(id);
        });
    });
};

export const updateVisitorCounter = (hotels) => {
    const visitorCounter = document.getElementById("visitor_counter");
    const totalVisitors = hotels.reduce((sum, hotel) => sum + hotel.visitors, 0);
    visitorCounter.textContent = `Total Visitors: ${totalVisitors}`;
};

export const sortHotelsByVisitors = (hotels) => {
    return [...hotels].sort((a, b) => b.visitors - a.visitors);
};

export const sortHotelsByRooms = (hotels) => {
    return [...hotels].sort((a, b) => b.nrooms - a.nrooms);
};

export const clearHotels = () => {
    localStorage.removeItem('hotels');
};
