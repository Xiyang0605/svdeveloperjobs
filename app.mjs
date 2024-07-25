async function fetchData() {
    const url = 'https://linkedin-api8.p.rapidapi.com/search-jobs?keywords=developer&locationId=105117694&datePosted=anyTime&sort=mostRecent';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3227c4bbe9msh5348ac541a2efd9p19e774jsn420e35b0a114',
            'x-rapidapi-host': 'linkedin-api8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Response Data:', data); // Log the data for debugging
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const tableBody = document.getElementById('jobTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing table rows

    // Check if the data has a 'data' property that is an array
    const jobs = data.data;
    if (!Array.isArray(jobs) || jobs.length === 0) {
        console.log('No job data found');
        return;
    }

    jobs.forEach(job => {
        const row = document.createElement('tr');
        
        const locationCell = document.createElement('td');
        locationCell.textContent = job.location || 'N/A';
        row.appendChild(locationCell);

        const postDateCell = document.createElement('td');
        postDateCell.textContent = job.postDate || 'N/A';
        row.appendChild(postDateCell);

        const idCell = document.createElement('td');
        idCell.textContent = job.id || 'N/A';
        row.appendChild(idCell);

        const titleCell = document.createElement('td');
        titleCell.textContent = job.title || 'N/A';
        row.appendChild(titleCell);

        const urlCell = document.createElement('td');
        const link = document.createElement('a');
        link.href = job.url || '#';
        link.target='_blank';
        link.textContent = 'View Job';
        urlCell.appendChild(link);
        row.appendChild(urlCell);

        const typeCell = document.createElement('td');
        typeCell.textContent = job.type || 'N/A';
        row.appendChild(typeCell);

        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchData();
});
