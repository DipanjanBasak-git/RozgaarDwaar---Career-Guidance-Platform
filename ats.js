// ATS (Applicant Tracking System) Score Predictor
// Simulates resume analysis and job matching functionality

class ATSScorePredictor {
    constructor() {
        this.keywords = {
            technical: ['javascript', 'python', 'java', 'react', 'node.js', 'sql', 'aws', 'git', 'docker', 'kubernetes'],
            soft: ['leadership', 'communication', 'teamwork', 'problem solving', 'project management', 'analytical'],
            education: ['bachelor', 'master', 'phd', 'degree', 'certification', 'diploma'],
            experience: ['years', 'experience', 'worked', 'developed', 'managed', 'led', 'created', 'implemented']
        };
        
        this.atsWeights = {
            keywords: 0.3,
            formatting: 0.2,
            experience: 0.25,
            education: 0.15,
            skills: 0.1
        };
    }
    
    // Calculate ATS score for a resume
    calculateATSScore(resumeText, jobDescription = '') {
        const scores = {
            keywords: this.calculateKeywordScore(resumeText, jobDescription),
            formatting: this.calculateFormattingScore(resumeText),
            experience: this.calculateExperienceScore(resumeText),
            education: this.calculateEducationScore(resumeText),
            skills: this.calculateSkillsScore(resumeText)
        };
        
        // Calculate weighted total
        let totalScore = 0;
        for (const [category, score] of Object.entries(scores)) {
            totalScore += score * this.atsWeights[category];
        }
        
        return {
            totalScore: Math.round(totalScore),
            breakdown: scores,
            recommendations: this.generateRecommendations(scores, resumeText)
        };
    }
    
    calculateKeywordScore(resumeText, jobDescription) {
        const text = resumeText.toLowerCase();
        const jobText = jobDescription.toLowerCase();
        
        let score = 0;
        let totalKeywords = 0;
        
        // Check for technical keywords
        for (const keyword of this.keywords.technical) {
            if (text.includes(keyword)) {
                score += 10;
                totalKeywords++;
            }
        }
        
        // Check for soft skills
        for (const keyword of this.keywords.soft) {
            if (text.includes(keyword)) {
                score += 5;
                totalKeywords++;
            }
        }
        
        // Check for job-specific keywords
        if (jobDescription) {
            const jobKeywords = this.extractKeywordsFromJob(jobDescription);
            for (const keyword of jobKeywords) {
                if (text.includes(keyword.toLowerCase())) {
                    score += 15;
                    totalKeywords++;
                }
            }
        }
        
        return Math.min(score, 100);
    }
    
    calculateFormattingScore(resumeText) {
        let score = 0;
        
        // Check for proper sections
        const sections = ['experience', 'education', 'skills', 'contact'];
        for (const section of sections) {
            if (resumeText.toLowerCase().includes(section)) {
                score += 20;
            }
        }
        
        // Check for bullet points
        if (resumeText.includes('•') || resumeText.includes('-') || resumeText.includes('*')) {
            score += 10;
        }
        
        // Check for consistent formatting
        const lines = resumeText.split('\n');
        const hasConsistentFormatting = lines.some(line => 
            line.trim().length > 0 && 
            (line.includes(':') || line.includes('|') || line.includes('•'))
        );
        
        if (hasConsistentFormatting) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }
    
    calculateExperienceScore(resumeText) {
        let score = 0;
        const text = resumeText.toLowerCase();
        
        // Check for experience indicators
        for (const keyword of this.keywords.experience) {
            if (text.includes(keyword)) {
                score += 15;
            }
        }
        
        // Check for quantifiable achievements
        const quantifiers = ['increased', 'decreased', 'improved', 'reduced', 'saved', 'generated'];
        for (const quantifier of quantifiers) {
            if (text.includes(quantifier)) {
                score += 10;
            }
        }
        
        // Check for numbers (indicating metrics)
        const hasNumbers = /\d+/.test(resumeText);
        if (hasNumbers) {
            score += 10;
        }
        
        return Math.min(score, 100);
    }
    
    calculateEducationScore(resumeText) {
        let score = 0;
        const text = resumeText.toLowerCase();
        
        // Check for education keywords
        for (const keyword of this.keywords.education) {
            if (text.includes(keyword)) {
                score += 20;
            }
        }
        
        // Check for specific degrees
        const degrees = ['bachelor', 'master', 'phd', 'btech', 'mtech', 'mba', 'bca', 'mca'];
        for (const degree of degrees) {
            if (text.includes(degree)) {
                score += 15;
            }
        }
        
        return Math.min(score, 100);
    }
    
    calculateSkillsScore(resumeText) {
        let score = 0;
        const text = resumeText.toLowerCase();
        
        // Check for skills section
        if (text.includes('skills') || text.includes('technical skills') || text.includes('competencies')) {
            score += 30;
        }
        
        // Check for programming languages
        const languages = ['javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust'];
        let languageCount = 0;
        for (const language of languages) {
            if (text.includes(language)) {
                languageCount++;
            }
        }
        
        score += Math.min(languageCount * 10, 40);
        
        // Check for tools and frameworks
        const tools = ['git', 'docker', 'kubernetes', 'aws', 'azure', 'react', 'angular', 'vue'];
        let toolCount = 0;
        for (const tool of tools) {
            if (text.includes(tool)) {
                toolCount++;
            }
        }
        
        score += Math.min(toolCount * 5, 30);
        
        return Math.min(score, 100);
    }
    
    extractKeywordsFromJob(jobDescription) {
        // Simple keyword extraction from job description
        const words = jobDescription.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3);
        
        // Return unique words that appear multiple times
        const wordCount = {};
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        return Object.keys(wordCount)
            .filter(word => wordCount[word] > 1)
            .slice(0, 10);
    }
    
    generateRecommendations(scores, resumeText) {
        const recommendations = [];
        
        if (scores.keywords < 70) {
            recommendations.push({
                category: 'Keywords',
                message: 'Add more relevant keywords from job descriptions to improve ATS compatibility.',
                priority: 'high'
            });
        }
        
        if (scores.formatting < 60) {
            recommendations.push({
                category: 'Formatting',
                message: 'Improve resume formatting with clear sections and bullet points.',
                priority: 'medium'
            });
        }
        
        if (scores.experience < 50) {
            recommendations.push({
                category: 'Experience',
                message: 'Add more quantifiable achievements and specific accomplishments.',
                priority: 'high'
            });
        }
        
        if (scores.skills < 60) {
            recommendations.push({
                category: 'Skills',
                message: 'Create a dedicated skills section with relevant technical and soft skills.',
                priority: 'medium'
            });
        }
        
        if (scores.education < 40) {
            recommendations.push({
                category: 'Education',
                message: 'Ensure education section is clearly formatted and includes relevant details.',
                priority: 'low'
            });
        }
        
        return recommendations;
    }
}

// Job Matching functionality
class JobMatcher {
    constructor() {
        this.matchWeights = {
            skills: 0.4,
            experience: 0.3,
            location: 0.15,
            education: 0.1,
            salary: 0.05
        };
    }
    
    calculateJobMatch(userProfile, job) {
        const scores = {
            skills: this.calculateSkillsMatch(userProfile.skills, job.skills),
            experience: this.calculateExperienceMatch(userProfile.experience, job.experience),
            location: this.calculateLocationMatch(userProfile.location, job.location),
            education: this.calculateEducationMatch(userProfile.education, job.requirements),
            salary: this.calculateSalaryMatch(userProfile.expectedSalary, job.salary)
        };
        
        // Calculate weighted total
        let totalScore = 0;
        for (const [category, score] of Object.entries(scores)) {
            totalScore += score * this.matchWeights[category];
        }
        
        return {
            matchScore: Math.round(totalScore),
            breakdown: scores,
            reasons: this.generateMatchReasons(scores, userProfile, job)
        };
    }
    
    calculateSkillsMatch(userSkills, jobSkills) {
        if (!userSkills || !jobSkills) return 0;
        
        const userSkillsLower = userSkills.map(skill => skill.toLowerCase());
        const jobSkillsLower = jobSkills.map(skill => skill.toLowerCase());
        
        let matchCount = 0;
        for (const jobSkill of jobSkillsLower) {
            if (userSkillsLower.some(userSkill => 
                userSkill.includes(jobSkill) || jobSkill.includes(userSkill)
            )) {
                matchCount++;
            }
        }
        
        return (matchCount / jobSkills.length) * 100;
    }
    
    calculateExperienceMatch(userExperience, jobExperience) {
        // Simple experience matching based on years
        const userYears = this.extractYearsFromExperience(userExperience);
        const jobYears = this.extractYearsFromExperience(jobExperience);
        
        if (userYears >= jobYears) {
            return 100;
        } else if (userYears >= jobYears * 0.5) {
            return 75;
        } else {
            return 50;
        }
    }
    
    calculateLocationMatch(userLocation, jobLocation) {
        if (!userLocation || !jobLocation) return 50;
        
        const userLoc = userLocation.toLowerCase();
        const jobLoc = jobLocation.toLowerCase();
        
        if (userLoc === jobLoc) {
            return 100;
        } else if (jobLoc.includes('remote') || jobLoc.includes('work from home')) {
            return 90;
        } else if (userLoc.includes(jobLoc) || jobLoc.includes(userLoc)) {
            return 80;
        } else {
            return 30;
        }
    }
    
    calculateEducationMatch(userEducation, jobRequirements) {
        if (!userEducation || !jobRequirements) return 50;
        
        const userEdu = userEducation.toLowerCase();
        const jobReq = jobRequirements.toLowerCase();
        
        // Check for degree level matches
        if (userEdu.includes('master') && jobReq.includes('master')) {
            return 100;
        } else if (userEdu.includes('bachelor') && jobReq.includes('bachelor')) {
            return 100;
        } else if (userEdu.includes('diploma') && jobReq.includes('diploma')) {
            return 100;
        } else {
            return 70;
        }
    }
    
    calculateSalaryMatch(userExpectedSalary, jobSalary) {
        // Simple salary matching
        if (!userExpectedSalary || !jobSalary) return 50;
        
        const userSalary = this.extractSalaryFromString(userExpectedSalary);
        const jobSalaryRange = this.extractSalaryFromString(jobSalary);
        
        if (userSalary <= jobSalaryRange) {
            return 100;
        } else if (userSalary <= jobSalaryRange * 1.2) {
            return 80;
        } else {
            return 60;
        }
    }
    
    extractYearsFromExperience(experience) {
        if (!experience) return 0;
        
        const match = experience.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }
    
    extractSalaryFromString(salaryString) {
        if (!salaryString) return 0;
        
        const match = salaryString.match(/(\d+)/);
        return match ? parseInt(match[1]) * 100000 : 0; // Assuming LPA format
    }
    
    generateMatchReasons(scores, userProfile, job) {
        const reasons = [];
        
        if (scores.skills > 80) {
            reasons.push('Strong skills match with job requirements');
        } else if (scores.skills < 50) {
            reasons.push('Consider developing skills mentioned in job requirements');
        }
        
        if (scores.experience > 80) {
            reasons.push('Experience level matches job requirements');
        } else if (scores.experience < 50) {
            reasons.push('Gain more experience in relevant areas');
        }
        
        if (scores.location > 80) {
            reasons.push('Location preference aligns with job location');
        } else if (scores.location < 50) {
            reasons.push('Consider remote work or relocation');
        }
        
        return reasons;
    }
}

// Initialize ATS and Job Matching functionality
document.addEventListener('DOMContentLoaded', function() {
    window.ATSScorePredictor = ATSScorePredictor;
    window.JobMatcher = JobMatcher;
    
    // Initialize ATS score predictor
    window.atsPredictor = new ATSScorePredictor();
    window.jobMatcher = new JobMatcher();
});

// Utility functions for ATS and job matching
function analyzeResumeWithATS(resumeText, jobDescription = '') {
    if (!window.atsPredictor) {
        console.error('ATS Score Predictor not initialized');
        return null;
    }
    
    return window.atsPredictor.calculateATSScore(resumeText, jobDescription);
}

function matchUserWithJob(userProfile, job) {
    if (!window.jobMatcher) {
        console.error('Job Matcher not initialized');
        return null;
    }
    
    return window.jobMatcher.calculateJobMatch(userProfile, job);
}

function getTopMatchingJobs(userProfile, jobs, limit = 5) {
    if (!window.jobMatcher || !jobs) {
        return [];
    }
    
    const jobMatches = jobs.map(job => ({
        job: job,
        match: window.jobMatcher.calculateJobMatch(userProfile, job)
    }));
    
    return jobMatches
        .sort((a, b) => b.match.matchScore - a.match.matchScore)
        .slice(0, limit);
}

// Export functions for use in other files
window.ATS = {
    analyzeResumeWithATS,
    matchUserWithJob,
    getTopMatchingJobs
};
