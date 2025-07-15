// Resume Download Tracking for Google Analytics 4
document.addEventListener('DOMContentLoaded', function() {
    // Track resume downloads
    const resumeLinks = document.querySelectorAll('a[href*="nlp.pdf"]');
    
    resumeLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Send custom event to Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'resume',
                    'event_label': 'nlp.pdf',
                    'value': 1
                });
            }
            
            // Also track as a custom event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'resume_download', {
                    'event_category': 'engagement',
                    'event_label': 'nlp.pdf',
                    'custom_parameter_1': 'resume_download',
                    'custom_parameter_2': window.location.pathname
                });
            }
        });
    });
    
    // Track CV page views
    if (window.location.pathname === '/cv/' || window.location.pathname === '/cv') {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                'event_category': 'cv_page',
                'event_label': 'cv_page_view',
                'custom_parameter_1': 'cv_page_visit'
            });
        }
    }
}); 