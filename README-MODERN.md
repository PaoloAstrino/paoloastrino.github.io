# Paolo Astrino - Data Analyst Portfolio

A modern, responsive portfolio website showcasing Paolo Astrino's expertise in data analytics, machine learning, and business intelligence.

## 🎨 Design Features

### Color Scheme

- **Primary Colors**: Black, White, and Blue
- **Theme**: Professional data analyst aesthetic with modern UI/UX
- **Dark/Light Mode**: Full theme toggle functionality

### Visual Elements

- Modern hero section with floating skill cards
- Interactive animations and hover effects
- Gradient backgrounds and smooth transitions
- Responsive design for all devices

## 🚀 Technical Features

### Interactive Elements

- **Navigation**: Smooth scrolling with active section highlighting
- **Animations**: Intersection Observer API for scroll-based animations
- **Theme Toggle**: Dark/light mode with localStorage persistence
- **Scroll Progress**: Visual progress bar showing page scroll position
- **Cursor Trail**: Custom cursor effects (desktop only)
- **Floating Cards**: Animated skill showcase in hero section

### Responsive Design

- Mobile-first approach
- Optimized for tablets and desktop
- Touch-friendly interface elements
- Accessibility features included

### Performance Optimizations

- Lazy loading for animations
- Optimized CSS with CSS custom properties
- Modern JavaScript (ES6+)
- Reduced motion support for accessibility

## 📄 Portfolio Sections

### 1. Hero Section

- Professional introduction
- Key statistics (experience, technologies, certifications)
- Call-to-action buttons
- Floating skill cards animation

### 2. About Section

- Professional background
- Education and experience highlights
- Key achievements and certifications

### 3. Experience & Education Timeline

- **Work Experience**:
  - Credit Analyst at Power 4U (2023-2024)
  - Junior Data Analyst at Adecco (2024-Present)
- **Education**:
  - Master's in Data Analytics (Ca' Foscari University, 2024-2026)
  - Erasmus+ Program (University of Göttingen, 2024)
  - Bachelor's in Economics (University of Padova, 2020-2023)

### 4. Technical Skills

Organized by categories:

- **Programming**: Python, R, VBA
- **Data Visualization**: Power BI, Tableau
- **Databases**: SQL, PostgreSQL, MySQL, SQLite
- **Machine Learning**: Scikit-learn, TensorFlow, Pandas, NumPy

### 5. Featured Projects

- **Credit Risk Analysis**: Statistical modeling and risk assessment
- **Process Automation Dashboard**: VBA automation and Power BI dashboards
- **Machine Learning Analysis**: Python-based data science projects

### 6. Contact Information

- **Email**: paoloastrino01@gmail.com
- **Phone**: +39 3426202332
- **Location**: Padova, Italy
- **LinkedIn**: [Paolo Astrino](https://www.linkedin.com/in/paolo-astrino-9792061a3)
- **GitHub**: [paoloastrino](https://github.com/paoloastrino)

## 🛠️ Technologies Used

### Frontend

- **HTML5**: Semantic markup with modern structure
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript**: ES6+, Intersection Observer API, localStorage

### Design Framework

- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Inter typography
- **Custom CSS**: No framework dependencies for better performance

### File Structure

```
paoloastrino.github.io/
├── index.html              # Original portfolio design
├── index-modern.html       # Modern portfolio design
├── css/
│   ├── styles.css         # Original styles
│   └── modern-styles.css  # Modern design styles
├── js/
│   ├── script.js          # Original JavaScript
│   └── modern-script.js   # Enhanced JavaScript features
├── CV/
│   ├── CV_PaoloAstrino_eng.tex
│   ├── CV_PaoloAstrino_eng.pdf
│   └── README.md
└── assets/
    └── images/
```

## 🎯 Key Achievements

- **3+ years** of experience in data analysis and finance
- **10+ technologies** mastered in data analytics stack
- **3 certifications** including Machine Learning Specialization
- **Bilingual** proficiency (Italian/English)
- **International experience** through Erasmus+ program

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Features Implementation

### Theme Toggle

```javascript
// Persistent theme switching with localStorage
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
```

### Scroll Animations

```javascript
// Intersection Observer for performance-optimized animations
const observer = new IntersectionObserver(callback, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
});
```

### Color Variables

```css
:root {
  --primary: 220 100% 50%; /* Blue */
  --background: 0 0% 100%; /* White */
  --foreground: 0 0% 0%; /* Black */
}
```

## 📈 Future Enhancements

- [ ] Blog section for data analytics insights
- [ ] Project case studies with detailed breakdowns
- [ ] Interactive data visualizations
- [ ] Multi-language support (Italian/English)
- [ ] Contact form backend integration
- [ ] Analytics integration (Google Analytics)

## 📞 Contact

For questions about this portfolio or potential collaborations:

- **Email**: paoloastrino01@gmail.com
- **LinkedIn**: [Paolo Astrino](https://www.linkedin.com/in/paolo-astrino-9792061a3)
- **GitHub**: [paoloastrino](https://github.com/paoloastrino)

---

© 2025 Paolo Astrino. All rights reserved.
