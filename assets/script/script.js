function showSection(sectionId) {
    // List of all section IDs
    const sections = ['destination', 'northwest', 'northeast', 'centralNorth', 'redRiver','centralSouth','highland','southeast','southwest'];
  
    // Iterate through each section
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        // Show the requested section, hide others
        element.style.display = id === sectionId ? 'block' : 'none';
      }
  });
  }
  
  // Functions to show specific sections
  function northwest() {
    showSection('northwest');
  }
  function northeast() {
    showSection('northeast');
  }
  function redRiver() {
    showSection('redRiver');
  }
  function centralNorth(){
    showSection('centralNorth');
  }
  function centralSouth(){
    showSection('centralSouth');
  }
  function highland(){
    showSection('highland');
  }
  function southeast(){
    showSection('southeast');
  }
  function southwest(){
    showSection('southwest');
  }
  
   function back(){
    const sections = ['destination', 'northwest', 'northeast', 'northwest', 'redRiver','centralNorth','centralSouth','highland','southeast','southwest','destination-spec'];
  
  // Iterate through sections and toggle visibility
  sections.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = id === 'destination' ? 'block' : 'none';
    }
  });
   }
  
  
  // Reusable function to load destinations
  async function loadDestinations(jsonPath, listId) {
    try {
      const response = await fetch(jsonPath); // Path to the JSON file
      const destinations = await response.json(); // Parse JSON into a JavaScript array
  
      const listElement = document.getElementById(listId);
  
      destinations.forEach((destination) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <div class="popular-card">
            <figure class="card-img">
              <img src="${destination.image}" alt="${destination.name}" loading="lazy">
            </figure>
            <div class="card-content">
            <p class="card-subtitle">
              <a href="detailshow.html?name=${encodeURIComponent(destination.name)}"> ${destination.subtitle}</a>
            </p>
            <h3 class="h3 card-title">
               <a href="detailshow.html?name=${encodeURIComponent(destination.name)}"> ${destination.name}</a>
            </h3>
              <p class="card-text">
                ${destination.description}
              </p>
            </div>
          </div>
        `;
        listElement.appendChild(listItem);
      });
    } catch (error) {
      console.error(`Error loading destinations from ${jsonPath}:`, error);
    }
  }
  
  // Load JSON data for each region
  loadDestinations('./json/northeastDestinations.json', 'northeast-list');
  loadDestinations('./json/northwestDestination.json', 'northwest-list');
  loadDestinations('./json/redRiver.json', 'redRiver-list');
  loadDestinations('./json/centralNorth.json', 'centralNorth-list');
  loadDestinations('./json/centralSouth.json', 'centralSouth-list');
  loadDestinations('./json/highland.json', 'highland-list');
  loadDestinations('./json/southeast.json', 'southeast-list');
  loadDestinations('./json/southwest.json', 'southwest-list');
  window.onload = () => {
      window.scrollTo(0, 0);
  };

//End of destination.script

// Function to get URL parameters
// Function to get URL parameters
// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Function to load and display destination details
 // Function to load and display destination details
async function loadDestinationDetails() {
    const destinationName = getUrlParameter('name');
  
    if (destinationName) {
      try {
        // Array of JSON files to search in
        const jsonFiles = [
          './json/northeastDestinations.json',
          './json/northwestDestination.json',
          './json/redRiver.json',
          './json/centralNorth.json',
          './json/centralSouth.json',
          './json/highland.json',
          './json/southeast.json',
          './json/southwest.json'
        ];
  
        let destinationFound = null;
  
        // Loop through each JSON file and search for the destination
        for (const file of jsonFiles) {
          const response = await fetch(file);
          const destinations = await response.json();
  
          // Find the destination by name
          destinationFound = destinations.find(dest => dest.name === destinationName);
          if (destinationFound) {
            break; // Exit loop if destination is found
          }
        }
  
        if (destinationFound) {
          // Set destination details
          document.getElementById('destination-title').innerText = destinationFound.name || 'Unknown Destination';
          document.getElementById('destination-price').innerText = destinationFound.price || 'No description available';
          document.getElementById('destination-description').innerText = destinationFound.explain || 'No description available';
          document.getElementById('destination-image').src = destinationFound.image || './assets/default-image.jpg';
          document.getElementById('destination-image').alt = destinationFound.name || 'Destination Image';
          document.getElementById('destination-sub').innerText = destinationFound.subtitle || 'No subtitle available';

          // Display grouped destinations (e.g., fansipan, sapa)
          const destinationGroupElement = document.getElementById('destination-group');
          destinationGroupElement.innerHTML = ''; // Clear any previous content
  
          if (destinationFound.destination && destinationFound.destination.length > 0) {
            // Loop through each destination in the array and create grouped details
            destinationFound.destination.forEach(dest => {
              const destinationGroupItem = document.createElement('div');
              destinationGroupItem.classList.add('destination-group-item'); // Add a class for styling
  
              const nameElement = document.createElement('h3');
              nameElement.innerText = dest.name || 'Unnamed Destination';
  
              const locationElement = document.createElement('p');
              locationElement.innerText = `${dest.location || 'Unknown Location'}`;
  
              const detailElement = document.createElement('p');
              detailElement.innerText = `${dest.detail || 'No details available'}`;
              detailElement.classList.add('destination-detail'); // Hide by default
  
              // If an image-description exists, create an <img> element to display the image
              if (dest['image-description']) {
                const imageElement = document.createElement('img');
                imageElement.src = dest['image-description'];
                imageElement.alt = dest.name || 'Destination Image';
                imageElement.classList.add('destination-image'); // Add a class for styling
                destinationGroupItem.appendChild(imageElement); // Append the image to the destination item
              }
  
              // Append the name, location, and detail elements to the group item
              destinationGroupItem.appendChild(nameElement);
              destinationGroupItem.appendChild(locationElement);
              destinationGroupItem.appendChild(detailElement);
  
              // Append the group item to the destination group container
              destinationGroupElement.appendChild(destinationGroupItem);
            });
          } else {
            destinationGroupElement.innerHTML = '<p>No related destinations available.</p>';
          }
  
          // Set the hero section background image
          const heroSection = document.querySelector('.hero2');
          if (heroSection) {
            heroSection.style.backgroundImage = `url(${destinationFound.image || './assets/default-image.jpg'})`;
          }
        } else {
          console.error('Destination not found');
        }
      } catch (error) {
        console.error('Error loading destination details:', error);
      }
    }
  }
  
  // Call the function to load details when the page loads
  window.onload = loadDestinationDetails;


  //end of detailshown.script
  function backward(){
    window.location.href ="destination.html"
  }