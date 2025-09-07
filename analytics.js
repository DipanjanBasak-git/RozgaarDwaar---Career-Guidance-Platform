// Analytics and Chart functionality for RozgaarDwaar
// Handles data visualization using Chart.js

class AnalyticsDashboard {
    constructor() {
        this.charts = {};
        this.chartColors = {
            primary: '#FF6B35',
            secondary: '#667eea',
            tertiary: '#43e97b',
            quaternary: '#fa709a',
            quinary: '#a8edea'
        };
    }
    
    // Initialize all charts on the analytics page
    initializeCharts() {
        this.createJobApplicationsChart();
        this.createSkillsProgressChart();
        this.createCertificationsChart();
        this.createSalaryInsightsChart();
        this.createUserEngagementChart();
        this.createJobCategoriesChart();
    }
    
    // Job Applications Over Time Chart
    createJobApplicationsChart() {
        const ctx = document.getElementById('jobApplicationsChart');
        if (!ctx) return;
        
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Applications Sent',
                data: [12, 19, 8, 15, 22, 18, 25, 30, 28, 35, 32, 40],
                borderColor: this.chartColors.primary,
                backgroundColor: this.chartColors.primary + '20',
                tension: 0.4,
                fill: true
            }, {
                label: 'Interviews Scheduled',
                data: [3, 5, 2, 4, 6, 5, 8, 10, 9, 12, 11, 15],
                borderColor: this.chartColors.secondary,
                backgroundColor: this.chartColors.secondary + '20',
                tension: 0.4,
                fill: true
            }, {
                label: 'Job Offers',
                data: [1, 2, 1, 2, 3, 2, 4, 5, 4, 6, 5, 8],
                borderColor: this.chartColors.tertiary,
                backgroundColor: this.chartColors.tertiary + '20',
                tension: 0.4,
                fill: true
            }]
        };
        
        this.charts.jobApplications = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Job Applications Progress',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
    }
    
    // Skills Progress Chart
    createSkillsProgressChart() {
        const ctx = document.getElementById('skillsProgressChart');
        if (!ctx) return;
        
        const data = {
            labels: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Communication', 'Leadership'],
            datasets: [{
                label: 'Current Level',
                data: [85, 70, 60, 55, 80, 45, 90, 75],
                backgroundColor: [
                    this.chartColors.primary,
                    this.chartColors.secondary,
                    this.chartColors.tertiary,
                    this.chartColors.quaternary,
                    this.chartColors.quinary,
                    this.chartColors.primary + '80',
                    this.chartColors.secondary + '80',
                    this.chartColors.tertiary + '80'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        };
        
        this.charts.skillsProgress = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Skills Assessment',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Certifications Completed Chart
    createCertificationsChart() {
        const ctx = document.getElementById('certificationsChart');
        if (!ctx) return;
        
        const data = {
            labels: ['Completed', 'In Progress', 'Not Started'],
            datasets: [{
                data: [8, 3, 5],
                backgroundColor: [
                    this.chartColors.tertiary,
                    this.chartColors.primary,
                    this.chartColors.secondary + '40'
                ],
                borderWidth: 0
            }]
        };
        
        this.charts.certifications = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Certifications Status',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Salary Insights Chart
    createSalaryInsightsChart() {
        const ctx = document.getElementById('salaryInsightsChart');
        if (!ctx) return;
        
        const data = {
            labels: ['0-2 years', '2-4 years', '4-6 years', '6-8 years', '8+ years'],
            datasets: [{
                label: 'Average Salary (LPA)',
                data: [4.5, 7.2, 10.8, 15.5, 22.3],
                backgroundColor: this.chartColors.primary + '80',
                borderColor: this.chartColors.primary,
                borderWidth: 2
            }]
        };
        
        this.charts.salaryInsights = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Salary Insights by Experience',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Salary (LPA)'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Experience Level'
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
    }
    
    // User Engagement Chart
    createUserEngagementChart() {
        const ctx = document.getElementById('userEngagementChart');
        if (!ctx) return;
        
        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Active Users',
                data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
                backgroundColor: this.chartColors.secondary + '40',
                borderColor: this.chartColors.secondary,
                borderWidth: 2,
                fill: true
            }]
        };
        
        this.charts.userEngagement = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Weekly User Engagement',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
    }
    
    // Job Categories Distribution Chart
    createJobCategoriesChart() {
        const ctx = document.getElementById('jobCategoriesChart');
        if (!ctx) return;
        
        const data = {
            labels: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Marketing', 'Others'],
            datasets: [{
                data: [35, 15, 12, 10, 8, 12, 8],
                backgroundColor: [
                    this.chartColors.primary,
                    this.chartColors.secondary,
                    this.chartColors.tertiary,
                    this.chartColors.quaternary,
                    this.chartColors.quinary,
                    this.chartColors.primary + '80',
                    this.chartColors.secondary + '60'
                ],
                borderWidth: 0
            }]
        };
        
        this.charts.jobCategories = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Job Categories Distribution',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Update chart data dynamically
    updateChart(chartName, newData) {
        if (this.charts[chartName]) {
            this.charts[chartName].data = newData;
            this.charts[chartName].update();
        }
    }
    
    // Destroy all charts
    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        this.charts = {};
    }
    
    // Generate analytics report
    generateAnalyticsReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalApplications: 245,
                interviewsScheduled: 18,
                jobOffers: 6,
                successRate: 24.5,
                skillsCompleted: 8,
                certificationsEarned: 5
            },
            trends: {
                applicationsTrend: 'increasing',
                skillsTrend: 'improving',
                engagementTrend: 'stable'
            },
            recommendations: [
                'Focus on improving technical skills in high-demand areas',
                'Increase networking activities to boost job opportunities',
                'Complete remaining certifications to enhance profile',
                'Practice more mock interviews to improve success rate'
            ]
        };
        
        return report;
    }
}

// Salary Insights functionality
class SalaryInsights {
    constructor() {
        this.salaryData = window.mockData?.salaryData || {};
    }
    
    // Get salary insights for a specific role
    getSalaryInsights(role, location = 'all', experience = 'all') {
        const insights = {
            role: role,
            location: location,
            experience: experience,
            salaryRange: this.getSalaryRange(role, experience),
            marketTrend: this.getMarketTrend(role),
            negotiationTips: this.getNegotiationTips(role),
            skillsImpact: this.getSkillsImpact(role)
        };
        
        return insights;
    }
    
    getSalaryRange(role, experience) {
        // Find role in salary data
        for (const category in this.salaryData) {
            if (this.salaryData[category][role]) {
                const data = this.salaryData[category][role];
                return {
                    min: data.min,
                    max: data.max,
                    average: data.avg,
                    currency: 'INR'
                };
            }
        }
        
        // Default salary range if role not found
        return {
            min: 300000,
            max: 800000,
            average: 550000,
            currency: 'INR'
        };
    }
    
    getMarketTrend(role) {
        const trends = {
            'Software Developer': 'growing',
            'Data Analyst': 'stable',
            'Digital Marketing': 'growing',
            'Banking Officer': 'stable'
        };
        
        return trends[role] || 'stable';
    }
    
    getNegotiationTips(role) {
        const tips = [
            'Research market rates for similar roles in your location',
            'Highlight your unique skills and achievements',
            'Be prepared to discuss your value proposition',
            'Consider non-monetary benefits like flexible hours or learning opportunities',
            'Practice your negotiation conversation beforehand'
        ];
        
        return tips;
    }
    
    getSkillsImpact(role) {
        const skillsImpact = {
            'Software Developer': {
                'Cloud Computing': '+15%',
                'AI/ML': '+20%',
                'DevOps': '+12%',
                'Mobile Development': '+10%'
            },
            'Data Analyst': {
                'Python': '+18%',
                'Machine Learning': '+25%',
                'Tableau': '+12%',
                'SQL': '+8%'
            }
        };
        
        return skillsImpact[role] || {};
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics dashboard
    window.analyticsDashboard = new AnalyticsDashboard();
    window.salaryInsights = new SalaryInsights();
    
    // Initialize charts if on analytics page
    if (window.location.pathname.includes('analytics.html')) {
        setTimeout(() => {
            window.analyticsDashboard.initializeCharts();
        }, 500);
    }
});

// Export functions for use in other files
window.Analytics = {
    getAnalyticsReport: () => window.analyticsDashboard?.generateAnalyticsReport(),
    getSalaryInsights: (role, location, experience) => window.salaryInsights?.getSalaryInsights(role, location, experience),
    updateChart: (chartName, data) => window.analyticsDashboard?.updateChart(chartName, data)
};
