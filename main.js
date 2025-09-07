// Main JavaScript file for RozgaarDwaar
// Handles navigation, general functionality, and page interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeLanguageToggle();
    initializeQuickActions();
    initializeAnimations();
    initializeResumeUpload();
    initializeJobSearch();
    initializeSkillAssessment();
    initializeInterviewPrep();
    
    // Load mock data
    loadMockData();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation
            const text = this.querySelector('span').textContent.toLowerCase();
            navigateToPage(text);
        });
    });
    
    // Set active page
    setActivePage(currentPage);
}

function navigateToPage(page) {
    const pageMap = {
        'home': 'index.html',
        'guidance': 'guidance.html',
        'interview prep': 'interview.html',
        'analytics': 'analytics.html',
        'schemes': 'schemes.html',
        'support': '#',
        'profile': 'profile.html'
    };
    
    const targetPage = pageMap[page];
    if (targetPage && targetPage !== '#') {
        window.location.href = targetPage;
    }
}

function setActivePage(currentPage) {
    const pageMap = {
        'index.html': 'home',
        'guidance.html': 'guidance',
        'interview.html': 'interview prep',
        'analytics.html': 'analytics',
        'schemes.html': 'schemes',
        'profile.html': 'profile'
    };
    
    const activePage = pageMap[currentPage];
    if (activePage) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.querySelector('span').textContent.toLowerCase() === activePage) {
                item.classList.add('active');
            }
        });
    }
}

// Language toggle functionality
function initializeLanguageToggle() {
    const langSelect = document.querySelector('.lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            toggleLanguage(selectedLang);
        });
    }
}

function toggleLanguage(lang) {
    const translations = {
        en: {
            'home': 'HOME',
            'guidance': 'GUIDANCE',
            'interview prep': 'INTERVIEW PREP',
            'analytics': 'ANALYTICS',
            'schemes': 'SCHEMES',
            'support': 'SUPPORT',
            'profile': 'PROFILE',
            'youth registration': 'Youth Registration',
            'login': 'Login',
            'dashboard overview': 'Dashboard Overview',
            'job opportunities': 'Job Opportunities',
            'sectors': 'Sectors',
            'states/uts': 'States/UTs',
            'districts': 'Districts',
            'qualifications': 'Qualifications'
        },
        hi: {
            'home': 'होम',
            'guidance': 'मार्गदर्शन',
            'interview prep': 'इंटरव्यू तैयारी',
            'analytics': 'विश्लेषण',
            'schemes': 'योजनाएं',
            'support': 'सहायता',
            'profile': 'प्रोफ़ाइल',
            'youth registration': 'युवा पंजीकरण',
            'login': 'लॉगिन',
            'dashboard overview': 'डैशबोर्ड अवलोकन',
            'job opportunities': 'नौकरी के अवसर',
            'sectors': 'क्षेत्र',
            'states/uts': 'राज्य/केंद्र शासित प्रदेश',
            'districts': 'जिले',
            'qualifications': 'योग्यताएं'
        }
    };
    
    // Update text content based on selected language
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Store language preference
    localStorage.setItem('selectedLanguage', lang);
}

// Quick Actions functionality
function initializeQuickActions() {
    // Resume Upload
    const uploadBtn = document.querySelector('.action-card .btn-action');
    if (uploadBtn && uploadBtn.textContent.includes('Upload')) {
        uploadBtn.addEventListener('click', function() {
            showResumeUploadModal();
        });
    }
    
    // Job Search
    const searchBtn = document.querySelector('.action-card .btn-action');
    if (searchBtn && searchBtn.textContent.includes('Search')) {
        searchBtn.addEventListener('click', function() {
            showJobSearchModal();
        });
    }
    
    // Skill Assessment
    const assessBtn = document.querySelector('.action-card .btn-action');
    if (assessBtn && assessBtn.textContent.includes('Assess')) {
        assessBtn.addEventListener('click', function() {
            showSkillAssessmentModal();
        });
    }
    
    // Interview Prep
    const interviewBtn = document.querySelector('.action-card .btn-action');
    if (interviewBtn && interviewBtn.textContent.includes('Practice')) {
        interviewBtn.addEventListener('click', function() {
            window.location.href = 'interview.html';
        });
    }
}

// Resume Upload functionality
function initializeResumeUpload() {
    // This will be handled by the ATS module
    console.log('Resume upload initialized');
}

function showResumeUploadModal() {
    // Create modal for resume upload
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Upload Resume</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="upload-area">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Drag and drop your resume here or click to browse</p>
                    <input type="file" id="resumeFile" accept=".pdf,.doc,.docx" style="display: none;">
                    <button class="btn-browse">Browse Files</button>
                </div>
                <div class="upload-info">
                    <p><strong>Supported formats:</strong> PDF, DOC, DOCX</p>
                    <p><strong>Max file size:</strong> 5MB</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-close">Cancel</button>
                <button class="btn-primary" id="uploadResume">Upload & Analyze</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.btn-browse').addEventListener('click', () => {
        modal.querySelector('#resumeFile').click();
    });
    
    modal.querySelector('#uploadResume').addEventListener('click', () => {
        const file = modal.querySelector('#resumeFile').files[0];
        if (file) {
            processResumeUpload(file);
            document.body.removeChild(modal);
        } else {
            alert('Please select a file first!');
        }
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function processResumeUpload(file) {
    // Show loading state
    showNotification('Uploading and analyzing resume...', 'info');
    
    // Simulate file processing
    setTimeout(() => {
        // Mock ATS score calculation
        const atsScore = Math.floor(Math.random() * 30) + 70; // 70-100
        
        showNotification(`Resume uploaded successfully! ATS Score: ${atsScore}%`, 'success');
        
        // Update user data
        if (window.mockData && window.mockData.users) {
            const currentUser = window.mockData.users[0]; // Assuming first user is current
            currentUser.resumeUploaded = true;
            currentUser.atsScore = atsScore;
        }
        
        // Show detailed analysis
        showATSResults(atsScore);
    }, 2000);
}

function showATSResults(score) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>ATS Score Analysis</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="ats-score-display">
                    <div class="score-circle">
                        <div class="score-number">${score}%</div>
                        <div class="score-label">ATS Score</div>
                    </div>
                </div>
                <div class="ats-recommendations">
                    <h4>Recommendations to improve your score:</h4>
                    <ul>
                        <li>Add more relevant keywords from job descriptions</li>
                        <li>Include quantifiable achievements</li>
                        <li>Optimize formatting for ATS systems</li>
                        <li>Add skills section with industry-standard terms</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary modal-close">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Job Search functionality
function showJobSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Search Jobs</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="search-filters">
                    <div class="filter-group">
                        <label>Job Title</label>
                        <input type="text" id="jobTitle" placeholder="e.g., Software Developer">
                    </div>
                    <div class="filter-group">
                        <label>Location</label>
                        <select id="location">
                            <option value="">All Locations</option>
                            <option value="delhi">Delhi</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Experience</label>
                        <select id="experience">
                            <option value="">All Levels</option>
                            <option value="fresher">Fresher</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5+">5+ years</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Job Type</label>
                        <select id="jobType">
                            <option value="">All Types</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-close">Cancel</button>
                <button class="btn-primary" id="searchJobs">Search Jobs</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('#searchJobs').addEventListener('click', () => {
        const filters = {
            title: modal.querySelector('#jobTitle').value,
            location: modal.querySelector('#location').value,
            experience: modal.querySelector('#experience').value,
            type: modal.querySelector('#jobType').value
        };
        
        searchJobs(filters);
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function searchJobs(filters) {
    showNotification('Searching for jobs...', 'info');
    
    setTimeout(() => {
        const results = mockData.jobs.filter(job => {
            let matches = true;
            
            if (filters.title && !job.title.toLowerCase().includes(filters.title.toLowerCase())) {
                matches = false;
            }
            
            if (filters.location && job.location.toLowerCase() !== filters.location) {
                matches = false;
            }
            
            if (filters.type && job.type.toLowerCase() !== filters.type) {
                matches = false;
            }
            
            return matches;
        });
        
        showNotification(`Found ${results.length} matching jobs!`, 'success');
        
        // Store search results for display
        localStorage.setItem('jobSearchResults', JSON.stringify(results));
        
        // Redirect to jobs page or show results
        if (results.length > 0) {
            showJobResults(results);
        }
    }, 1500);
}

function showJobResults(jobs) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>Job Search Results (${jobs.length})</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="job-results">
                    ${jobs.map(job => `
                        <div class="job-card">
                            <div class="job-header">
                                <h4>${job.title}</h4>
                                <span class="job-company">${job.company}</span>
                            </div>
                            <div class="job-details">
                                <span class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                                <span class="job-salary"><i class="fas fa-rupee-sign"></i> ${job.salary}</span>
                                <span class="job-type">${job.type}</span>
                            </div>
                            <div class="job-description">
                                ${job.description.substring(0, 150)}...
                            </div>
                            <div class="job-actions">
                                <button class="btn-primary" onclick="applyForJob(${job.id})">Apply Now</button>
                                <button class="btn-secondary" onclick="viewJobDetails(${job.id})">View Details</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Skill Assessment functionality
function showSkillAssessmentModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Skill Assessment</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="skill-assessment">
                    <p>Select your current skill level for each area:</p>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary modal-close">Cancel</button>
                <button class="btn-primary" id="assessSkills">Get Assessment</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('#assessSkills').addEventListener('click', () => {
        showSkillAssessmentResults();
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showSkillAssessmentResults() {
    
    
    showNotification('Analyzing your skills...', 'info');
    
    setTimeout(() => {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Skill Assessment Results</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="skill-ratings">
                        <h4>Your Current Ratings:</h4>
                        <ul>
                            ${Array.from(document.querySelectorAll('.skill-category label'))
                                .map((label, index) => 
                                    `<li>${label.textContent}: ${skillValues[index]} stars</li>`)
                                .join('')}
                        </ul>
                    </div>
                    <div class="skill-gaps">
                        <h4>Recommended Skills to Develop:</h4>
                        <ul>
                    <div class="recommended-courses">
                        <h4>Recommended Courses:</h4>
                        <div class="course-list">
                            <div class="course-item">
                                <h5>AWS Fundamentals</h5>
                                <p>Learn cloud computing basics</p>
                                <span class="course-duration">4 weeks</span>
                            </div>
                            <div class="course-item">
                                <h5>Python for Data Science</h5>
                                <p>Master data analysis with Python</p>
                                <span class="course-duration">6 weeks</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="window.location.href='guidance.html'">View All Courses</button>
                    <button class="btn-secondary modal-close">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }, 2000);
}

// Animation initialization
function initializeAnimations() {
    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Load mock data
function loadMockData() {
    // Load mock data from external file
    const script = document.createElement('script');
    script.src = 'data/mockData.js';
    script.onload = function() {
        console.log('Mock data loaded successfully');
        // Initialize any components that depend on mock data
        updateDashboardStats();
    };
    document.head.appendChild(script);
}

// Update dashboard statistics
function updateDashboardStats() {
    if (window.mockData && window.mockData.analytics) {
        const stats = window.mockData.analytics.userStats;
        
        // Update stat numbers with animation
        animateNumber('.stat-card.primary .stat-number', stats.totalUsers);
        animateNumber('.stat-card.secondary .stat-number', 25); // Sectors
        animateNumber('.stat-card.tertiary .stat-number', 36); // States/UTs
        animateNumber('.stat-card.quaternary .stat-number', 734); // Districts
        animateNumber('.stat-card.quinary .stat-number', 5); // Qualifications
    }
}

function animateNumber(selector, targetNumber) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const startNumber = 0;
    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    let currentNumber = startNumber;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        if (targetNumber >= 1000) {
            element.textContent = Math.floor(currentNumber / 1000) + 'K+';
        } else {
            element.textContent = Math.floor(currentNumber);
        }
    }, 16);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Job application functions
function applyForJob(jobId) {
    const job = mockData.jobs.find(j => j.id === jobId);
    if (job) {
        showNotification(`Applied for ${job.title} at ${job.company}!`, 'success');
        
        // Add to user's applied jobs
        if (window.mockData && window.mockData.users) {
            const currentUser = window.mockData.users[0];
            if (!currentUser.appliedJobs) {
                currentUser.appliedJobs = [];
            }
            currentUser.appliedJobs.push({
                jobId: jobId,
                appliedDate: new Date().toISOString(),
                status: 'pending'
            });
        }
    }
}

function viewJobDetails(jobId) {
    const job = mockData.jobs.find(j => j.id === jobId);
    if (job) {
        // Create detailed job view modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h3>${job.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="job-detail-header">
                        <h4>${job.company}</h4>
                        <div class="job-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                            <span><i class="fas fa-rupee-sign"></i> ${job.salary}</span>
                            <span><i class="fas fa-clock"></i> ${job.type}</span>
                        </div>
                    </div>
                    <div class="job-description-full">
                        <h5>Job Description</h5>
                        <p>${job.description}</p>
                    </div>
                    <div class="job-requirements">
                        <h5>Requirements</h5>
                        <ul>
                            <li>Experience: ${job.experience}</li>
                            <li>Skills: ${job.skills.join(', ')}</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="applyForJob(${job.id})">Apply Now</button>
                    <button class="btn-secondary modal-close">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}

// Initialize interview prep
function initializeInterviewPrep() {
    // This will be handled by the interview page
    console.log('Interview prep initialized');
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export functions for use in other files
window.RozgaarDwaar = {
    showNotification,
    applyForJob,
    viewJobDetails,
    formatNumber,
    formatDate
};
