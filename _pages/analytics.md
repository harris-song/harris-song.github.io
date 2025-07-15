---
permalink: /analytics/
title: "Analytics Dashboard"
author_profile: false
---

# Analytics Dashboard

This page provides information about tracking resume downloads and site analytics.

## Resume Download Tracking

Your site now tracks resume downloads using Google Analytics 4. Here's what's being tracked:

### Events Tracked:
1. **Resume Downloads** - When someone clicks the "Download Resume" button
2. **CV Page Views** - When someone visits the CV page
3. **Page Views** - Standard page view tracking

### How to View Analytics:

1. **Go to Google Analytics**: Visit [analytics.google.com](https://analytics.google.com)
2. **Select your property**: `harris-song.github.io`
3. **Navigate to Reports** → **Engagement** → **Events**

### Key Metrics to Monitor:

#### Resume Downloads:
- **Event Name**: `download`
- **Event Category**: `resume`
- **Event Label**: `nlp.pdf`

#### CV Page Engagement:
- **Event Name**: `resume_download`
- **Event Category**: `engagement`
- **Event Label**: `nlp.pdf`

### Creating Custom Reports:

1. **Go to Explore** in Google Analytics
2. **Create a new exploration**
3. **Add dimensions**: Event name, Event category, Event label
4. **Add metrics**: Event count, Users
5. **Filter by**: Event category = "resume" OR Event category = "engagement"

### Sample Queries:

```sql
-- Resume downloads in the last 30 days
SELECT 
  event_name,
  event_category,
  event_label,
  COUNT(*) as download_count
FROM `your-project.analytics_123456789.events_*`
WHERE 
  event_category = 'resume'
  AND _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY))
GROUP BY event_name, event_category, event_label
ORDER BY download_count DESC
```

### Real-time Monitoring:

1. **Go to Reports** → **Realtime** → **Events**
2. **Filter by**: Event category = "resume"
3. **Monitor**: Live resume downloads as they happen

---

## Tracking Implementation Details

### Files Modified:
- `_pages/cv.md` - Added CV page with resume download link
- `_pages/about.md` - Added resume download link to about page
- `assets/js/resume-tracking.js` - Enhanced tracking JavaScript
- `_includes/head/custom.html` - Included tracking script

### Tracking Code:
```javascript
// Resume download tracking
gtag('event', 'download', {
    'event_category': 'resume',
    'event_label': 'nlp.pdf',
    'value': 1
});
```

---

*Last updated: {{ site.time | date: "%B %d, %Y" }}* 