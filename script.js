document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const inputText = document.getElementById('inputText');
    const extractBtn = document.getElementById('extractBtn');
    const clearBtn = document.getElementById('clearBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    const highlightBtn = document.getElementById('highlightBtn');
    const copyBtn = document.getElementById('copyBtn');
    const exportBtn = document.getElementById('exportBtn');
    const keywordsContainer = document.getElementById('keywordsContainer');
    const historyContainer = document.getElementById('historyContainer');
    const wordCountEl = document.getElementById('wordCount');
    const keywordCountEl = document.getElementById('keywordCount');
    const processingTimeEl = document.getElementById('processingTime');
    
    // Sample texts
    const sampleTexts = [
        `Machine learning is a subset of artificial intelligence that focuses on building systems that learn from data. Instead of being explicitly programmed, these systems use algorithms to identify patterns and make decisions. Deep learning is a specialized form of machine learning that uses neural networks with many layers.`,
        `Natural language processing (NLP) is a field of artificial intelligence that enables computers to understand, interpret, and manipulate human language. NLP combines computational linguistics with statistical, machine learning, and deep learning models.`,
        `Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels.`
    ];
    
    let extractionHistory = [];
    let currentKeywords = [];