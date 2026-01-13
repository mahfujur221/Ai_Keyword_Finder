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
    
    // Event Listeners
    extractBtn.addEventListener('click', extractKeywords);
    clearBtn.addEventListener('click', clearText);
    sampleBtn.addEventListener('click', loadSampleText);
    highlightBtn.addEventListener('click', highlightKeywords);
    copyBtn.addEventListener('click', copyKeywords);
    exportBtn.addEventListener('click', exportKeywords);
    inputText.addEventListener('input', updateWordCount);
    
    // Initialize
    updateWordCount();
    
    // Functions
    function extractKeywords() {
        const text = inputText.value.trim();
        if (!text) {
            alert('Please enter some text to extract keywords.');
            return;
        }
        
        // Show loading state
        extractBtn.innerHTML = '<div class="loading"></div> Processing...';
        extractBtn.disabled = true;
        
        // Simulate processing time
        const startTime = performance.now();
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            const algorithm = document.getElementById('algorithm').value;
            const maxKeywords = parseInt(document.getElementById('maxKeywords').value);
            
            // In a real app, this would be an API call to a backend service
            const keywords = simulateKeywordExtraction(text, algorithm, maxKeywords);
            
            const endTime = performance.now();
            const processingTime = Math.round(endTime - startTime);
            
            displayKeywords(keywords);
            updateStats(text, keywords, processingTime);
            
            // Save to history
            saveToHistory(text, keywords);
            
            // Reset button
            extractBtn.innerHTML = '<i class="fas fa-magic"></i> Extract Keywords';
            extractBtn.disabled = false;
        }, 1500);
    }
    
    function simulateKeywordExtraction(text, algorithm, maxKeywords) {
        // This is a simplified simulation of keyword extraction
        // In a real application, this would use a proper NLP library or API
        
        // Clean and tokenize text
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 2);
        
        // Calculate word frequencies
        const wordFreq = {};
        words.forEach(word => {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
        });
        
        // Filter out common stopwords
        const stopwords = ['the', 'and', 'is', 'in', 'to', 'of', 'a', 'that', 'it', 'with', 'for', 'as', 'was', 'on', 'are', 'this', 'by', 'be', 'or', 'from', 'at', 'an', 'but', 'not', 'have', 'has', 'had', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'too', 'very', 'can', 'will', 'just', 'should', 'now'];
        
        const filteredWords = Object.keys(wordFreq)
            .filter(word => !stopwords.includes(word))
            .sort((a, b) => wordFreq[b] - wordFreq[a])
            .slice(0, maxKeywords * 2); // Get more than needed for variety
        
        // Generate keywords with scores
        const keywords = filteredWords.map((word, index) => {
            // Simulate different scoring based on algorithm
            let score = 0;
            switch(algorithm) {
                case 'tfidf':
                    score = 0.7 + (Math.random() * 0.3);
                    break;
                case 'rake':
                    score = 0.6 + (Math.random() * 0.4);
                    break;
                case 'textrank':
                    score = 0.8 + (Math.random() * 0.2);
                    break;
                case 'yake':
                    score = 0.5 + (Math.random() * 0.5);
                    break;
            }
            
            // Add some multi-word keywords for variety
            if (index % 3 === 0 && index + 1 < filteredWords.length) {
                const twoWordPhrase = `${word} ${filteredWords[index + 1]}`;
                return {
                    keyword: twoWordPhrase,
                    score: Math.min(0.95, score + 0.1)
                };
            }
            
            return {
                keyword: word,
                score: score
            };
        });
        
        // Sort by score and limit to maxKeywords
        return keywords
            .sort((a, b) => b.score - a.score)
            .slice(0, maxKeywords);
    }
    
    function displayKeywords(keywords) {
        currentKeywords = keywords;
        
        if (keywords.length === 0) {
            keywordsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>No keywords could be extracted from the provided text.</p>
                </div>
            `;
            return;
        }
        
        keywordsContainer.innerHTML = '';
        
        keywords.forEach(item => {
            const keywordEl = document.createElement('div');
            keywordEl.className = 'keyword';
            keywordEl.innerHTML = `
                ${item.keyword}
                <span class="score">${item.score.toFixed(2)}</span>
            `;
            keywordsContainer.appendChild(keywordEl);
        });
    }
    
    function updateStats(text, keywords, processingTime) {
        const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        wordCountEl.textContent = `Words: ${wordCount}`;
        keywordCountEl.textContent = `Keywords: ${keywords.length}`;
        processingTimeEl.textContent = `Time: ${processingTime}ms`;
    }
    
    function updateWordCount() {
        const text = inputText.value.trim();
        const wordCount = text ? text.split(/\s+/).length : 0;
        wordCountEl.textContent = `Words: ${wordCount}`;
    }
    
    function clearText() {
        inputText.value = '';
        updateWordCount();
    }
    
    function loadSampleText() {
        const randomIndex = Math.floor(Math.random() * sampleTexts.length);
        inputText.value = sampleTexts[randomIndex];
        updateWordCount();
    }
    
    function highlightKeywords() {
        if (currentKeywords.length === 0) {
            alert('Please extract keywords first.');
            return;
        }
        
        let text = inputText.value;
        currentKeywords.forEach(item => {
            const regex = new RegExp(`\\b${item.keyword}\\b`, 'gi');
            text = text.replace(regex, `<span class="highlight">${item.keyword}</span>`);
        });
        
        inputText.innerHTML = text;
    }
    
    function copyKeywords() {
        if (currentKeywords.length === 0) {
            alert('No keywords to copy.');
            return;
        }
        
        const keywordText = currentKeywords.map(item => item.keyword).join(', ');
        navigator.clipboard.writeText(keywordText)
            .then(() => {
                // Show success feedback
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy keywords to clipboard.');
            });
    }
    
    function exportKeywords() {
        if (currentKeywords.length === 0) {
            alert('No keywords to export.');
            return;
        }
        
        let csvContent = "Keyword,Score\n";
        currentKeywords.forEach(item => {
            csvContent += `"${item.keyword}",${item.score.toFixed(4)}\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'extracted_keywords.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    function saveToHistory(text, keywords) {
        const historyItem = {
            text: text,
            keywords: keywords,
            timestamp: new Date().toLocaleString()
        };
        
        extractionHistory.unshift(historyItem);
        
        // Keep only last 5 items
        if (extractionHistory.length > 5) {
            extractionHistory.pop();
        }
        
        renderHistory();
    }
    
    function renderHistory() {
        if (extractionHistory.length === 0) {
            historyContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <p>Your extraction history will appear here</p>
                </div>
            `;
            return;
        }
        
        historyContainer.innerHTML = '';
        
        extractionHistory.forEach((item, index) => {
            const historyEl = document.createElement('div');
            historyEl.className = 'history-item';
            historyEl.addEventListener('click', () => {
                inputText.value = item.text;
                updateWordCount();
                displayKeywords(item.keywords);
                updateStats(item.text, item.keywords, 0);
            });
            
            const keywordsPreview = item.keywords.slice(0, 3).map(k => k.keyword).join(', ');
            
            historyEl.innerHTML = `
                <div class="history-text">${item.text.substring(0, 100)}...</div>
                <div class="history-keywords">
                    ${item.keywords.slice(0, 5).map(k => 
                        `<div class="history-keyword">${k.keyword}</div>`
                    ).join('')}
                </div>
                <div style="margin-top: 10px; font-size: 0.8rem; color: var(--gray);">
                    <i class="far fa-clock"></i> ${item.timestamp}
                </div>
            `;
            
            historyContainer.appendChild(historyEl);
        });
    }
});