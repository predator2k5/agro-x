// script.js

// Comprehensive crop data for all soil types
const cropData = {
    black: {
        crops: ['Cotton', 'Sugarcane', 'Wheat'],
        recommendations: {
            'Cotton': {
                secondary: [
                    { name: 'Groundnut', compatibility: 85 },
                    { name: 'Pigeon Pea', compatibility: 75 },
                    { name: 'Green Gram', compatibility: 70 }
                ],
                significance: 'Cotton performs excellently in black soil due to high moisture retention'
            },
            'Sugarcane': {
                secondary: [
                    { name: 'Soybean', compatibility: 80 },
                    { name: 'Chickpea', compatibility: 70 },
                    { name: 'Mustard', compatibility: 65 }
                ],
                significance: 'Sugarcane thrives in moisture-retentive black soil'
            },
            'Wheat': {
                secondary: [
                    { name: 'Gram', compatibility: 90 },
                    { name: 'Peas', compatibility: 85 },
                    { name: 'Lentils', compatibility: 75 }
                ],
                significance: 'Wheat grows well in black soil with good water retention'
            }
        }
    },
    red: {
        crops: ['Groundnut', 'Millet', 'Tobacco'],
        recommendations: {
            'Groundnut': {
                secondary: [
                    { name: 'Pearl Millet', compatibility: 88 },
                    { name: 'Sesame', compatibility: 78 },
                    { name: 'Cowpea', compatibility: 72 }
                ],
                significance: 'Groundnut adapts well to red soil conditions'
            },
            'Millet': {
                secondary: [
                    { name: 'Pulses', compatibility: 82 },
                    { name: 'Groundnut', compatibility: 75 },
                    { name: 'Sorghum', compatibility: 70 }
                ],
                significance: 'Millet is highly suitable for red soil regions'
            },
            'Tobacco': {
                secondary: [
                    { name: 'Maize', compatibility: 75 },
                    { name: 'Sunflower', compatibility: 70 },
                    { name: 'Soybean', compatibility: 65 }
                ],
                significance: 'Tobacco grows well in well-drained red soil'
            }
        }
    },
    clay: {
        crops: ['Rice', 'Wheat', 'Cotton'],
        recommendations: {
            'Rice': {
                secondary: [
                    { name: 'Lentils', compatibility: 92 },
                    { name: 'Green Peas', compatibility: 85 },
                    { name: 'Jute', compatibility: 78 }
                ],
                significance: 'Rice thrives in clay soil due to excellent water retention properties'
            },
            'Wheat': {
                secondary: [
                    { name: 'Mustard', compatibility: 88 },
                    { name: 'Chickpea', compatibility: 82 },
                    { name: 'Flax', compatibility: 75 }
                ],
                significance: 'Wheat performs well in clay soil with proper drainage'
            },
            'Cotton': {
                secondary: [
                    { name: 'Soybean', compatibility: 86 },
                    { name: 'Black Gram', compatibility: 80 },
                    { name: 'Sesame', compatibility: 72 }
                ],
                significance: 'Cotton grows well in clay soil with good moisture retention'
            }
        }
    },
    alluvial: {
        crops: ['Rice', 'Maize', 'Sugarcane'],
        recommendations: {
            'Rice': {
                secondary: [
                    { name: 'Pulses', compatibility: 90 },
                    { name: 'Oilseeds', compatibility: 85 },
                    { name: 'Vegetables', compatibility: 80 }
                ],
                significance: 'Rice is highly productive in fertile alluvial soil'
            },
            'Maize': {
                secondary: [
                    { name: 'Potato', compatibility: 88 },
                    { name: 'Beans', compatibility: 85 },
                    { name: 'Pumpkin', compatibility: 82 }
                ],
                significance: 'Maize benefits from rich nutrients in alluvial soil'
            },
            'Sugarcane': {
                secondary: [
                    { name: 'Potato', compatibility: 86 },
                    { name: 'Onion', compatibility: 82 },
                    { name: 'Garlic', compatibility: 78 }
                ],
                significance: 'Sugarcane flourishes in nutrient-rich alluvial soil'
            }
        }
    },
    sandy: {
        crops: ['Groundnut', 'Potato', 'Watermelon'],
        recommendations: {
            'Groundnut': {
                secondary: [
                    { name: 'Carrot', compatibility: 85 },
                    { name: 'Sweet Potato', compatibility: 80 },
                    { name: 'Beans', compatibility: 75 }
                ],
                significance: 'Groundnut performs well in well-drained sandy soil'
            },
            'Potato': {
                secondary: [
                    { name: 'Onion', compatibility: 88 },
                    { name: 'Garlic', compatibility: 82 },
                    { name: 'Radish', compatibility: 78 }
                ],
                significance: 'Potato tubers develop well in loose sandy soil'
            },
            'Watermelon': {
                secondary: [
                    { name: 'Cucumber', compatibility: 90 },
                    { name: 'Pumpkin', compatibility: 85 },
                    { name: 'Squash', compatibility: 80 }
                ],
                significance: 'Watermelon thrives in warm, well-drained sandy soil'
            }
        }
    }
};

// Function to update primary crops based on soil type selection
function updatePrimaryCrops() {
    const soilType = document.getElementById('soilType').value;
    const primaryCropSelect = document.getElementById('primaryCrop');
    
    // Clear existing options
    primaryCropSelect.innerHTML = '<option value="">Select primary crop...</option>';
    
    if (soilType && cropData[soilType]) {
        cropData[soilType].crops.forEach(crop => {
            const option = document.createElement('option');
            option.value = crop;
            option.textContent = crop;
            primaryCropSelect.appendChild(option);
        });
    }
}

// Function to create compatibility bar
function createCompatibilityBar(crop, container) {
    const cropCompat = document.createElement('div');
    cropCompat.className = 'crop-compatibility';
    
    const cropName = document.createElement('div');
    cropName.className = 'crop-name';
    cropName.textContent = crop.name;

    const compatBar = document.createElement('div');
    compatBar.className = 'compatibility-bar';
    
    const compatFill = document.createElement('div');
    compatFill.className = 'compatibility-fill';
    compatFill.style.width = `${crop.compatibility}%`;
    
    const compatText = document.createElement('div');
    compatText.className = 'compatibility-text';
    compatText.textContent = `${crop.compatibility}%`;
    
    compatBar.appendChild(compatFill);
    cropCompat.appendChild(cropName);
    cropCompat.appendChild(compatBar);
    cropCompat.appendChild(compatText);
    container.appendChild(cropCompat);
}

// Function to get and display recommendations
function getRecommendations() {
    const soilType = document.getElementById('soilType').value;
    const primaryCrop = document.getElementById('primaryCrop').value;
    const recommendationCard = document.getElementById('recommendationCard');
    
    if (!soilType || !primaryCrop) {
        alert('Please select both soil type and primary crop');
        return;
    }

    const cropInfo = cropData[soilType].recommendations[primaryCrop];
    
    // Display primary crop and significance
    document.getElementById('primaryCropResult').innerHTML = 
        `<strong>${primaryCrop}</strong><br>${cropInfo.significance}`;
    
    // Clear and update secondary crops list
    const secondaryCropsList = document.getElementById('secondaryCropsList');
    secondaryCropsList.innerHTML = '';
    
    // Clear and update compatibility chart
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.innerHTML = '';

    // Add secondary crops and compatibility charts
    cropInfo.secondary.forEach(crop => {
        // Add to list
        const li = document.createElement('li');
        li.innerHTML = `<strong>${crop.name}</strong> - ${crop.compatibility}% compatible`;
        secondaryCropsList.appendChild(li);

        // Create compatibility bar
        createCompatibilityBar(crop, chartContainer);
    });

    // Show the recommendation card with animation
    recommendationCard.classList.remove('hidden');
    recommendationCard.style.opacity = '0';
    recommendationCard.style.transform = 'translateY(20px)';
    
    // Trigger animation
    setTimeout(() => {
        recommendationCard.style.opacity = '1';
        recommendationCard.style.transform = 'translateY(0)';
    }, 50);
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('soilType').addEventListener('change', updatePrimaryCrops);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .recommendation-card {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .compatibility-text {
            margin-left: 10px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});