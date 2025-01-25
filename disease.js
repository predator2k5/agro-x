let model;
let plantDiseaseInfo = {
    'healthy': {
        description: 'The plant appears to be healthy.',
        suggestions: 'Continue with regular maintenance and care.'
    },
    'bacterial': {
        description: 'Possible bacterial infection detected.',
        suggestions: 'Consider using copper-based bactericides. Remove infected leaves.'
    },
    'viral': {
        description: 'Possible viral infection detected.',
        suggestions: 'Remove infected plants to prevent spread. Control insect vectors.'
    },
    'fungal': {
        description: 'Possible fungal infection detected.',
        suggestions: 'Apply appropriate fungicide. Improve air circulation.'
    }
};

// Initialize the application
async function init() {
    try {
        // Show loading message
        updateResult('Loading model... Please wait...', true);
        
        // Load MobileNet model
        model = await mobilenet.load();
        
        // Update status
        updateResult('Model loaded successfully. Ready to analyze images.', false);
        
        // Initialize event listeners
        initializeEventListeners();
    } catch (error) {
        console.error('Error initializing:', error);
        updateResult('Error loading model. Please refresh the page.', false);
    }
}

function initializeEventListeners() {
    const imageUpload = document.getElementById('imageUpload');
    const predictBtn = document.getElementById('predictBtn');
    const preview = document.getElementById('preview');
    const fileName = document.getElementById('fileName');

    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                predictBtn.disabled = false;
            }
            reader.readAsDataURL(file);
        }
    });

    predictBtn.addEventListener('click', analyzeImage);
}

async function analyzeImage() {
    const preview = document.getElementById('preview');
    const loader = document.getElementById('loader');
    const predictBtn = document.getElementById('predictBtn');

    try {
        // Show loader
        loader.classList.remove('hidden');
        predictBtn.disabled = true;

        // Get predictions
        const predictions = await model.classify(preview);
        
        // Process and display results
        displayResults(predictions);
    } catch (error) {
        console.error('Error during analysis:', error);
        updateResult('Error analyzing image. Please try again.', false);
    } finally {
        // Hide loader
        loader.classList.add('hidden');
        predictBtn.disabled = false;
    }
}

function displayResults(predictions) {
    const resultDiv = document.getElementById('result');
    const suggestionsDiv = document.getElementById('suggestions');
    
    // Create results HTML
    let resultsHTML = '<h3>Analysis Results:</h3><ul>';
    predictions.forEach(prediction => {
        resultsHTML += `
            <li>${prediction.className} - 
                Confidence: ${(prediction.probability * 100).toFixed(2)}%</li>
        `;
    });
    resultsHTML += '</ul>';
    
    // Determine plant condition based on predictions
    const condition = determineCondition(predictions);
    
    // Display results and suggestions
    resultDiv.innerHTML = resultsHTML;
    suggestionsDiv.innerHTML = `
        <h3>Diagnosis & Recommendations:</h3>
        <p>${plantDiseaseInfo[condition].description}</p>
        <p><strong>Suggestions:</strong> ${plantDiseaseInfo[condition].suggestions}</p>
    `;
}

function determineCondition(predictions) {
    // Simple logic to determine plant condition based on predictions
    const topPrediction = predictions[0].className.toLowerCase();
    
    if (topPrediction.includes('healthy')) return 'healthy';
    if (topPrediction.includes('bacterial')) return 'bacterial';
    if (topPrediction.includes('virus')) return 'viral';
    return 'fungal'; // default to fungal if no other matches
}

function updateResult(message, isLoading) {
    const result = document.getElementById('result');
    result.innerHTML = `<p>${message}</p>`;
    if (isLoading) {
        result.innerHTML += '<i class="fas fa-spinner fa-spin"></i>';
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', init);