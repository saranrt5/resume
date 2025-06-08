// Main JavaScript for Interactive Resume

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Navigation active state
    setupNavigation();
    
    // Progress bar
    setupProgressBar();
    
    // Animate metrics counters
    setupMetricsCounters();
    
    // Animate skill bars
    setupSkillBars();
    
    // Populate and animate experience timeline
    setupExperienceTimeline();
    
    // Populate tools grid
    setupToolsGrid();
    
    // Setup section animations
    setupSectionAnimations();
});

// Navigation active state
function setupNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });
}

// Progress bar
function setupProgressBar() {
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        document.getElementById('progressBar').style.width = scrollPercent + '%';
    });
}

// Animate metrics counters
function setupMetricsCounters() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        const counter = card.querySelector('.counter');
        const targetValue = parseInt(card.dataset.value);
        
        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
                animateCounter(counter, targetValue);
            },
            once: true
        });
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target > 100 ? 10 : 1;
    const duration = 1500; // ms
    const steps = Math.ceil(target / increment);
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current > target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, stepTime);
}

// Animate skill bars
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.dataset.width;
        
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            onEnter: () => {
                bar.style.width = width;
            },
            once: true
        });
    });
}

// Populate and animate experience timeline
function setupExperienceTimeline() {
    const timelineItems = document.querySelector('.timeline-items');
    
    // Populate timeline items
    experienceData.forEach((job, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';
        
        const timelineDot = document.createElement('div');
        timelineDot.className = 'timeline-dot';
        
        // Check if this job has ML/AI related achievements AND is UST Global
        const hasAIML = job.company === "UST Global" && job.achievements.some(achievement => 
            achievement.toLowerCase().includes('machine learning') || 
            achievement.toLowerCase().includes('ml') || 
            achievement.toLowerCase().includes('ai') || 
            achievement.toLowerCase().includes('artificial intelligence') ||
            achievement.toLowerCase().includes('predictive analytics')
        );
        
        // Add AI/ML badge if applicable
        const aimlBadge = hasAIML ? `<div class="aiml-badge">AI/ML</div>` : '';
        
        // Create timeline content
        timelineContent.innerHTML = `
            <div class="timeline-period">${job.period}</div>
            <div class="timeline-role">${job.role}</div>
            <div class="timeline-company">${job.company}</div>
            <div class="timeline-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</div>
            ${job.client ? `<div class="timeline-client"><strong>Client:</strong> ${job.client}</div>` : ''}
            ${aimlBadge}
            <div class="timeline-achievements">
                <h4>Key Achievements</h4>
                <ul>
                    ${job.achievements.slice(0, 3).map(achievement => {
                        // Highlight AI/ML related achievements only for UST Global
                        let highlightedAchievement = achievement;
                        if (job.company === "UST Global") {
                            highlightedAchievement = achievement
                                .replace(/machine learning/gi, '<span class="highlight">Machine Learning</span>')
                                .replace(/artificial intelligence/gi, '<span class="highlight">Artificial Intelligence</span>')
                                .replace(/\bAI\b/g, '<span class="highlight">AI</span>')
                                .replace(/\bML\b/g, '<span class="highlight">ML</span>')
                                .replace(/predictive analytics/gi, '<span class="highlight">Predictive Analytics</span>');
                        }
                        return `<li>${highlightedAchievement}</li>`;
                    }).join('')}
                </ul>
                ${job.achievements.length > 3 ? `
                <div class="show-more" data-job-index="${index}">
                    <span>Show more</span> <i class="fas fa-chevron-down"></i>
                </div>
                <div class="hidden-achievements" style="display: none;">
                    <ul>
                        ${job.achievements.slice(3).map(achievement => {
                            // Highlight AI/ML related achievements only for UST Global
                            let highlightedAchievement = achievement;
                            if (job.company === "UST Global") {
                                highlightedAchievement = achievement
                                    .replace(/machine learning/gi, '<span class="highlight">Machine Learning</span>')
                                    .replace(/artificial intelligence/gi, '<span class="highlight">Artificial Intelligence</span>')
                                    .replace(/\bAI\b/g, '<span class="highlight">AI</span>')
                                    .replace(/\bML\b/g, '<span class="highlight">ML</span>')
                                    .replace(/predictive analytics/gi, '<span class="highlight">Predictive Analytics</span>');
                            }
                            return `<li>${highlightedAchievement}</li>`;
                        }).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
        
        timelineItem.appendChild(timelineContent);
        timelineItem.appendChild(timelineDot);
        timelineItems.appendChild(timelineItem);
        
        // Add animation
        ScrollTrigger.create({
            trigger: timelineItem,
            start: 'top 80%',
            onEnter: () => {
                timelineItem.classList.add('visible');
            },
            once: true
        });
    });
    
    // Add event listeners for "Show more" buttons
    document.querySelectorAll('.show-more').forEach(button => {
        button.addEventListener('click', function() {
            const hiddenAchievements = this.nextElementSibling;
            const icon = this.querySelector('i');
            const text = this.querySelector('span');
            
            if (hiddenAchievements.style.display === 'none') {
                hiddenAchievements.style.display = 'block';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                text.textContent = 'Show less';
            } else {
                hiddenAchievements.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                text.textContent = 'Show more';
            }
        });
    });
}

// Populate tools grid
function setupToolsGrid() {
    const toolsGrid = document.querySelector('.tools-grid');
    
    // Group tools by category
    const toolsByCategory = toolsData.reduce((acc, tool) => {
        if (!acc[tool.category]) {
            acc[tool.category] = [];
        }
        acc[tool.category].push(tool);
        return acc;
    }, {});
    
    // Create category sections
    Object.entries(toolsByCategory).forEach(([category, tools]) => {
        const categorySection = document.createElement('div');
        categorySection.className = 'bento-item tools-category';
        
        categorySection.innerHTML = `
            <h3>${category}</h3>
            <div class="tools-list"></div>
        `;
        
        const toolsList = categorySection.querySelector('.tools-list');
        
        // Add tools to category
        tools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            
            // Map proficiency to dots
            const proficiencyDots = {
                'PROFESSIONAL': 5,
                'LIMITED': 3,
                'BASIC': 1
            };
            
            const dots = proficiencyDots[tool.proficiency] || 3;
            
            // Create proficiency dots HTML
            let dotsHTML = '';
            for (let i = 0; i < 5; i++) {
                dotsHTML += `<div class="proficiency-dot ${i < dots ? 'filled' : ''}"></div>`;
            }
            
            toolCard.innerHTML = `
                <div class="tool-icon">
                    <i class="fas ${tool.icon}"></i>
                </div>
                <div class="tool-name">${tool.name}</div>
                <div class="tool-proficiency">
                    ${dotsHTML}
                </div>
            `;
            
            toolsList.appendChild(toolCard);
        });
        
        toolsGrid.appendChild(categorySection);
    });
}

// Setup section animations
function setupSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        // Animate section title
        const title = section.querySelector('.section-title');
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    once: true
                },
                y: 30,
                opacity: 0,
                duration: 0.8
            });
        }
        
        // Animate bento items
        const bentoItems = section.querySelectorAll('.bento-item');
        if (bentoItems.length) {
            gsap.from(bentoItems, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    once: true
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15
            });
        }
    });
}

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

