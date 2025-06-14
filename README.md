# Paolo Astrino - Data Analyst Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://paoloastrino.github.io)
[![Responsive](https://img.shields.io/badge/Design-Fully%20Responsive-brightgreen)](#)
[![Performance](https://img.shields.io/badge/Performance-95%2B-green)](#)

A professional, modern portfolio website showcasing Paolo Astrino's expertise in data analytics, machine learning, and business intelligence. Built with cutting-edge responsive design and modern web technologies.

## 🌟 Live Demo

**Visit:** [https://paoloastrino.github.io](https://paoloastrino.github.io)

- **Modern Black Theme** with professional design
- **Fully Responsive** - Perfect on any device
- **PWA Ready** - Installable web application
- **Advanced Typography** - Fluid scaling system

## 👨‍💼 About Paolo

**Data Analyst & Machine Learning Enthusiast** with strong analytical skills and programming expertise. Currently pursuing a Master's in Data Analytics for Business and Society at Ca' Foscari University Venice.

### 🎓 Education

- **Master's in Data Analytics** - Ca' Foscari University Venice (2024-2026)
- **Erasmus+ Program** - University of Göttingen, Germany (2024)
- **Bachelor's in Economics** - University of Padova (2020-2023)

### 💼 Professional Experience

- **Junior Data Analyst** - Adecco (2024-Present)
- **Credit Analyst** - Power 4U (2023-2024)

### 🏆 Certifications

- Machine Learning Specialization
- B2 English Certification (Cambridge)
- Safety Training Certifications

## 🚀 Portfolio Features

### 🎨 Modern Black Theme Design

- **Professional black background** with blue accents
- **Immediate loading** without white flash
- **Smooth animations** and interactions
- **Fully responsive design** with viewport-based scaling
- **Advanced responsive typography** using clamp() functions

### ⚡ Interactive Elements

- **Magnet Lines Animation** - Interactive magnetic field visualization in hero section
- **Scroll progress bar** showing page navigation
- **Theme toggle** (dark/light mode) with responsive sizing
- **Smooth scrolling** navigation
- **Contact form** with validation
- **Floating skill cards** in hero section

### 📱 Responsive Design Features

- **Revolutionary Viewport Scaling** - Zero hardcoded pixel values
- **Advanced Typography System** - Fluid text scaling with `clamp()` functions
- **Magnet Lines Animation** - Responsive interactive visualization that scales with viewport
- **Viewport-Based Dimensions** - Everything scales proportionally
- **Touch-Friendly Interactions** - Enhanced mobile experience

#### 🎨 Advanced CSS Techniques

**Modern Responsive Typography:**

```css
/* Hero Title - Scales from 3rem to 6rem based on viewport */
font-size: clamp(3rem, 8vw, 6rem);

/* Section Titles - Proportional scaling */
font-size: clamp(2rem, 4.5vw, 3rem);

/* Body Text - Smooth scaling */
font-size: clamp(0.875rem, 1.4vw, 0.95rem);
```

**Magnet Lines Animation Implementation:**

```css
/* Responsive container that scales with viewport */
.magnetLines-container {
  width: 120vmin;  /* Scales proportionally */
  height: 120vmin;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
}

/* Individual lines with responsive dimensions */
.magnetLines-container span {
  width: 1.5vmin;   /* Line thickness */
  height: 15vmin;   /* Line length */
  transform: rotate(var(--rotate)); /* Dynamic rotation */
}
```

### 📊 Professional Sections

1. **Hero Section** - Introduction with interactive magnet lines animation
2. **About** - Professional background and achievements
3. **Experience & Education** - Interactive timeline
4. **Projects** - Featured data analytics work
5. **Skills** - Technical expertise by category
6. **Contact** - Professional contact information

## 🛠️ Technical Skills Showcased

### Programming Languages

- **Python** (Pandas, NumPy, Matplotlib, Scikit-learn)
- **R** (Statistical analysis and modeling)
- **SQL** (PostgreSQL, MySQL, SQLite)
- **VBA** (Excel automation and macros)

### Data Visualization

- **Power BI** (Dashboard creation and reporting)
- **Tableau** (Data visualization and analytics)
- **Excel** (Advanced charting and analysis)
- **Python Libraries** (Matplotlib, Seaborn, Plotly)

### Machine Learning & Analytics

- **Statistical Modeling** (Regression, forecasting)
- **Data Mining** (Pattern recognition, clustering)
- **Business Intelligence** (KPI development, reporting)
- **Process Automation** (Workflow optimization)

## 📁 Project Structure

```
paoloastrino.github.io/
├── index.html                  # Main portfolio (modern black theme)
├── manifest.json               # PWA manifest for installable app
├── css/
│   ├── modern-styles.css      # Modern theme styles with responsive design
│   └── magnet_ines.css        # Magnet lines animation styles
├── js/
│   ├── portfolio.js           # Interactive functionality
│   └── magnet_lines_animation.js # Magnet lines animation logic
├── assets/
│   └── images/                # Favicon and brand assets
│       ├── favicon.svg        # Main favicon (32x32)
│       ├── apple-touch-icon.svg # iOS home screen icon (180x180)
│       └── icon-512.svg       # High-res icon for PWA (512x512)
├── CV/
│   ├── CV_PaoloAstrino_eng.tex
│   ├── CV_PaoloAstrino_eng.pdf
│   └── README.md
└── README.md                  # This file
```

## 🎨 Design Specifications

### Color Palette

- **Background**: `#0a0a0a` (Deep Black)
- **Text**: `#fafafa` (Near White)
- **Primary Accent**: `hsl(220, 100%, 55%)` (Professional Blue)
- **Cards**: `hsl(0, 0%, 8%)` (Dark Gray)
- **Borders**: `hsl(0, 0%, 20%)` (Medium Gray)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive Typography**: Fluid scaling using clamp() functions
- **Viewport-based sizing**: All text scales proportionally with screen size

### Responsive Design System

- **Mobile First**: < 768px optimized
- **Tablet Enhanced**: 768px - 1024px adaptive
- **Desktop Optimized**: > 1024px full experience
- **Fluid Scaling**: All elements use viewport-relative units
- **No Hardcoded Values**: Complete responsive implementation

## 🚀 Technologies Used

### Frontend Stack

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties)
- **JavaScript ES6+**: Interactive functionality
- **Font Awesome**: Professional iconography
- **Google Fonts**: Typography (Inter)

### Advanced Features

- **Intersection Observer API**: Scroll animations
- **CSS Custom Properties**: Theme system  
- **LocalStorage**: Theme persistence
- **Responsive Images**: Performance optimization
- **Progressive Enhancement**: Accessibility support
- **CSS clamp() Functions**: Advanced responsive typography
- **Viewport Units**: Fluid scaling system
- **Modern CSS Grid**: Flexible layout system
- **Interactive Animations**: Mouse-tracking magnet lines visualization
- **Vanilla JavaScript**: No dependencies, pure performance

### 🎨 Brand Identity & Favicon

- **Custom Favicon**: Personalized "P" logo with brand colors
- **Multi-Format Support**: SVG favicon for crisp display at any size
- **Cross-Platform**: Works on all browsers and devices
- **PWA Ready**: Web app manifest for installable experience
- **Brand Consistent**: Dark theme with blue gradient matching site design
- **Apple Touch Icon**: iOS home screen optimization
- **Professional**: Clean, modern typography and design

### Performance Optimizations

- **Lazy Loading**: Images and animations
- **Debounced Events**: Smooth scroll handling
- **CSS Containment**: Rendering optimization
- **Preload Fonts**: Faster text rendering

## 📱 Featured Projects

### 1. Credit Risk Analysis

- **Description**: Statistical modeling for credit risk assessment
- **Technologies**: Python, Pandas, Scikit-learn, Statistical Analysis
- **Impact**: Improved risk prediction accuracy for financial decisions

### 2. Process Automation Dashboard

- **Description**: Automated reporting system with interactive dashboards
- **Technologies**: VBA, Power BI, SQL, Excel
- **Impact**: Reduced manual reporting time by 75%

### 3. Machine Learning Analysis

- **Description**: Comprehensive data science project with ML algorithms
- **Technologies**: Python, Machine Learning, Data Visualization
- **Impact**: Delivered actionable insights for business optimization

## 🔗 Contact Information

- **Email**: [paoloastrino01@gmail.com](mailto:paoloastrino01@gmail.com)
- **Phone**: +39 3426202332
- **Location**: Padova, Italy
- **LinkedIn**: [Paolo Astrino](https://www.linkedin.com/in/paolo-astrino-9792061a3)
- **GitHub**: [paoloastrino](https://github.com/paoloastrino)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/paoloastrino/paoloastrino.github.io.git
   cd paoloastrino.github.io
   ```

2. **Open locally**:

   - Open `index.html` for the portfolio
   - Favicon will display in browser tab and bookmarks

3. **Live Server** (recommended):
   ```bash
   # Using VS Code Live Server extension
   # or Python simple server
   python -m http.server 8000
   ```

### Deployment

The portfolio is automatically deployed via **GitHub Pages**:

- Push changes to `main` branch
- GitHub Pages builds and deploys automatically
- Live at: `https://paoloastrino.github.io`

## 🎯 Key Achievements

- ✅ **Modern Black Theme**: Professional design with blue accents
- ✅ **Interactive Magnet Lines**: Custom mouse-tracking animation system
- ✅ **Custom Favicon**: Personalized "P" logo with brand consistency
- ✅ **PWA Ready**: Web app manifest for installable experience
- ✅ **Zero White Flash**: Immediate black loading experience
- ✅ **Fully Responsive**: Complete viewport-based scaling system
- ✅ **Advanced Typography**: Fluid text scaling with clamp() functions
- ✅ **Responsive Theme Toggle**: Proportional sizing across devices
- ✅ **Performance Optimized**: Fast loading and smooth interactions
- ✅ **Accessibility**: Screen reader support and keyboard navigation
- ✅ **SEO Optimized**: Meta tags and semantic HTML
- ✅ **Professional Content**: Complete data analyst profile
- ✅ **No Hardcoded Values**: 100% responsive implementation

## 📈 Performance Metrics

- **PageSpeed Score**: 95+ (Desktop), 90+ (Mobile)
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 2.0s

## 🤝 Contributing

While this is a personal portfolio, feedback and suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with improvements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Design Inspiration**: Modern creative agency portfolios
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Hosting**: GitHub Pages
- **Development**: Built with modern web standards

---

**Built with ❤️ by Paolo Astrino** | **Data Analyst & ML Enthusiast** | **2025**

## 🧲 Magnet Lines Animation

### ✨ Interactive Visualization System

The portfolio features a custom-built **Magnet Lines Animation** that creates an interactive magnetic field visualization in the hero section:

**Key Features:**
- **Mouse Tracking**: Lines rotate dynamically to follow cursor movement
- **Responsive Design**: Scales proportionally across all device sizes
- **Performance Optimized**: Vanilla JavaScript with hardware acceleration
- **Visual Appeal**: Creates engaging user interaction and professional aesthetic

**Technical Implementation:**
- **Grid System**: 8x8 responsive grid of interactive elements
- **CSS Custom Properties**: Dynamic rotation using `--rotate` variables
- **Viewport Scaling**: Uses `vmin` units for consistent sizing
- **Touch Compatible**: Works seamlessly on mobile devices

**Responsive Behavior:**
- **Desktop**: 120vmin container with 1.5vmin × 15vmin lines
- **Mobile**: 150vmin container with 0.75vmin × 12vmin lines
- **Real-time Scaling**: Maintains proportions across all screen sizes

This animation demonstrates advanced CSS and JavaScript integration while providing an engaging user experience that reflects the technical expertise showcased in the portfolio.
