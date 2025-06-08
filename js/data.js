// Resume Data

const experienceData = [
    {
        company: "Walmart",
        role: "Product Manager",
        location: "San Jose, CA, United States",
        period: "09/2021 – present",
        client: "Wal-Mart Stores | sam's club",
        keySkills: ["OKR Strategy", "Agile Roadmapping", "Technical Documentation", "Vendor Negotiation", "Cost Optimization", "Stakeholder Alignment", "Data Analysis", "AI/ML Implementation"],
        tools: ["JIRA", "Confluence", "Worldpay", "Looker", "SQL", "Machine Learning Platforms"],
        achievements: [
            "Defined and monitored OKRs and KPIs for the e-commerce payments team, resulting in a 15% reduction in payment authentication errors and a 10% increase in transaction speed.",
            "Spearheaded the creation of a product roadmap for the payments platform, incorporating customer feedback and industry trends, and collaborated with engineering and UX teams to deliver 15+ releases on schedule, reducing time spent by 18%.",
            "Optimized authentication workflow with Worldpay, reducing transaction fees by $1.2M annually, and implemented fraud detection tools that decreased chargebacks by 55% while maintaining 99.9% uptime with 200 orders per minute.",
            "Authored user stories, PRDs, and API specifications for cross-functional teams, reducing development errors by 27% and accelerating sprint cycles by 20% through clear product guidelines and business rules.",
            "Led the development of a replenishment product roadmap for sam's club that prioritized automation and predictive analytics, decreasing manual order processing by 30%.",
            "Utilized SQL and Tableau to analyze A/B tests and user behavior, influencing roadmap priorities that increased average order value (AOV) by 15% and reduced cart abandonment by 12%.",
            "Developed a Machine Learning algorithm to classify customers based on purchase and refund history, automating the refunds process and enhancing decision-making efficiency."
        ]
    },
    {
        company: "UST Global",
        role: "Lead Business Analyst",
        location: "Chennai, India",
        period: "05/2019 – 07/2021",
        client: "E&Y using SAP Mercury",
        achievements: [
            "Led the automation of purchase order creation in ServiceNow from SAP Mercury, streamlining the procurement process and improving efficiency.",
            "Delivered $15 million in annual cost savings by identifying and automating key manual processes across the organization.",
            "Developed comprehensive functional requirement specifications (FSRs) for critical business processes, including customer master, quotation processing, and sales order processing.",
            "Created detailed functional specifications for Reports, Interfaces, Conversions, Enhancements, and Forms (RICEFW) development.",
            "Prepared thorough unit test scripts and checklists to ensure the quality and accuracy of implemented functionalities within functional specifications.",
            "Successfully spearheaded cross-functional teams in the implementation of a new software system, achieving a 20% efficiency increase and $100,000 in annual cost savings."
        ]
    },
    {
        company: "Arrow Electronics",
        role: "Technical Analyst",
        location: "Denver, United States",
        period: "03/2018 – 01/2019",
        keySkills: ["SAP Hybris Migration", "Cost Reduction Strategies", "Conversion Rate Optimization (CRO)", "API Integrations", "Agile Product Ownership", "Technical Documentation"],
        metricsHighlight: ["$5M Saved", "11% Conversion Lift", "30% Latency Reduction", "45% Error Reduction"],
        achievements: [
            "Spearheaded the migration of an eCommerce platform to SAP Hybris from a micro-service architecture, enhancing system efficiency and scalability.",
            "Collaborated with business teams to align product development with the strategic roadmap, ensuring cohesive growth and strategic objectives were met.",
            "Launched a shipping consolidation feature, optimizing over 500,000 orders and deliveries, resulting in $5 million in annual cost savings.",
            "Designed and implemented a single-page checkout process, improving user experience, increasing conversion rates by 11%, and boosting revenue by 6%.",
            "Integrated third-party APIs for address validation and tracking, enhancing operational accuracy and customer satisfaction.",
            "Managed technical oversight for User Profile, Cart, and Checkout modules across multiple projects, ensuring seamless functionality and performance.",
            "Authored functional requirement specifications (FSRs) for critical processes, including customer management, quotations, and sales orders, streamlining operations and improving cross-team collaboration."
        ]
    },
    {
        company: "Arrow Electronics",
        role: "Senior Business Analyst",
        location: "Denver, United States",
        period: "01/2016 – 02/2018",
        achievements: [
            "Led cross-functional teams in implementing e-commerce solutions, resulting in improved user experience and increased online sales.",
            "Developed comprehensive business requirements and functional specifications for various projects, ensuring alignment with business objectives.",
            "Collaborated with stakeholders to identify opportunities for process improvement and cost reduction."
        ]
    },
    {
        company: "HCL America Inc",
        role: "Senior Business Analyst",
        location: "Dallas, United States",
        period: "04/2013 – 08/2015",
        client: "Century Link Inc",
        achievements: [
            "Led the development of an internal application for CenturyLink's customer support team, streamlining the onboarding process for internet, telephone, and digital TV services by managing grid connections and generating telephone numbers for customer selection during onboarding sessions.",
            "Spearheaded the creation of an eCommerce portal for an SD-WAN service company, delivering key features such as product catalogue, user registration, login, and order placement to enhance customer experience and facilitate online sales.",
            "Designed innovative solutions for grid management and telephone number generation at CenturyLink, improving the efficiency and effectiveness of the customer onboarding process.",
            "Formulated detailed functional user stories to guide UX and testing teams in design creation and test case preparation, ensuring alignment with project goals and seamless collaboration.",
            "Developed comprehensive use cases, user profiles, and requirement traceability matrices, maintaining clear communication across teams and ensuring all project requirements were met."
        ]
    },
    {
        company: "Photon Infotech Inc",
        role: "Senior Business Analyst",
        location: "Dallas, United States",
        period: "04/2013 – 08/2015",
        keySkills: ["Enterprise Retail Solutions", "Computer Vision Integration", "Cross-Functional Stakeholder Leadership", "A/B Testing Optimization"],
        metricsImpact: ["$12M Revenue Growth", "30M Users"],
        achievements: [
            "Partnered with Fortune 500 clients (Walgreens, Neiman Marcus) to deliver strategic business analysis, identifying $12M+ in omnichannel revenue opportunities through customer journey mapping and launching products first with USP",
            "Conceptualized native iOS/Android apps from scratch for Olive Garden and Capital Grille, featuring real-time menu customization, TO-GO ordering, table reservation and rewards synchronization. Achieved 4.8-star ratings across 500K+ downloads, driving 22% YoY growth in digital orders.",
            "Led the development of innovative and cutting-edge native iOS app for a major retailer, integrating advanced features such as relevant items, magic mirror, and image search to elevate the shopping experience and drive user interaction.",
            "Spearheaded the design and implementation of an adaptive and responsive digital platform for Walgreens, successfully transitioning to a new architecture that improved user experience across Walgreens.com and m.Walgreens.com, ensuring seamless functionality and enhanced accessibility."
        ]
    },
    {
        company: "Royal Bank of Scotland",
        role: "Analyst",
        location: "Chennai, India",
        period: "03/2011 – 04/2013",
        keySkills: ["Payment Gateways", "Identity & Access Management (IAM)", "Regulatory Compliance", "Cross-Functional Leadership"],
        metricsImpact: ["2M Transactions/Month", "Zero Audit Findings"],
        achievements: [
            "Spearheaded the design, development, and maintenance of the payments, user accounts management, and application security modules, enhancing system efficiency by 20% and reducing security incidents by 15%.",
            "Served as the go-to Subject-Matter Expert (SME) for payments, user accounts management, and application security, providing critical technical guidance to the development team and ensuring seamless integration of these modules.",
            "Ensured strict adherence to RBS Group's security and compliance standards through meticulous attention to detail and proactive risk management strategies, achieving zero compliance violations during my tenure."
        ]
    },
    {
        company: "eNoah iSolutions",
        role: "Business Analyst",
        location: "Chennai, India",
        period: "11/2009 – 02/2011",
        achievements: [
            "Spearheaded the design and development of a secure .NET project for Hooper Holmes, integrating insurance and medical records into company applications and EHR systems.",
            "Implemented efficient solutions to streamline processes and improve data accuracy within the organization."
        ]
    }
];

const toolsData = [
    // Product Management Tools
    { name: "JIRA", proficiency: "PROFESSIONAL", category: "Product Management", icon: "fa-jira" },
    { name: "Confluence", proficiency: "PROFESSIONAL", category: "Product Management", icon: "fa-book" },
    { name: "Aha!", proficiency: "PROFESSIONAL", category: "Product Management", icon: "fa-lightbulb" },
    { name: "ProductPlan", proficiency: "PROFESSIONAL", category: "Product Management", icon: "fa-project-diagram" },
    { name: "Miro", proficiency: "PROFESSIONAL", category: "Product Management", icon: "fa-object-group" },
    { name: "Asana", proficiency: "PROFESSIONAL", category: "Product Management", icon: "fa-tasks" },
    
    // Data & Analytics Tools
    { name: "SQL", proficiency: "PROFESSIONAL", category: "Data & Analytics", icon: "fa-database" },
    { name: "Tableau", proficiency: "PROFESSIONAL", category: "Data & Analytics", icon: "fa-chart-bar" },
    { name: "Looker", proficiency: "PROFESSIONAL", category: "Data & Analytics", icon: "fa-search" },
    { name: "DBeaver", proficiency: "PROFESSIONAL", category: "Data & Analytics", icon: "fa-database" },
    { name: "Power BI", proficiency: "LIMITED", category: "Data & Analytics", icon: "fa-chart-pie" },
    
    // AI & ML Tools
    { name: "TensorFlow", proficiency: "LIMITED", category: "AI & ML", icon: "fa-brain" },
    { name: "Machine Learning Platforms", proficiency: "LIMITED", category: "AI & ML", icon: "fa-robot" },
    { name: "Jupyter Notebooks", proficiency: "PROFESSIONAL", category: "AI & ML", icon: "fa-code" },
    { name: "Python ML Libraries", proficiency: "LIMITED", category: "AI & ML", icon: "fa-python" },
    
    // Design Tools
    { name: "Figma", proficiency: "LIMITED", category: "Design", icon: "fa-pencil-ruler" },
    { name: "Balsamiq", proficiency: "PROFESSIONAL", category: "Design", icon: "fa-pencil-alt" },
    { name: "Sketch", proficiency: "LIMITED", category: "Design", icon: "fa-pen-fancy" },
    
    // Enterprise Systems
    { name: "SAP Hybris", proficiency: "PROFESSIONAL", category: "Enterprise Systems", icon: "fa-shopping-cart" },
    { name: "SAP Mercury", proficiency: "LIMITED", category: "Enterprise Systems", icon: "fa-cogs" },
    { name: "ServiceNow", proficiency: "LIMITED", category: "Enterprise Systems", icon: "fa-server" },
    { name: "Worldpay", proficiency: "PROFESSIONAL", category: "Enterprise Systems", icon: "fa-credit-card" },
    
    // Quality & Testing
    { name: "HP QC", proficiency: "PROFESSIONAL", category: "Quality & Testing", icon: "fa-check-circle" },
    { name: "TestRail", proficiency: "LIMITED", category: "Quality & Testing", icon: "fa-vial" }
];

