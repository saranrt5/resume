// Visualizations for Interactive Resume

document.addEventListener('DOMContentLoaded', function() {
    // Initialize visualizations after the DOM is loaded
    createSkillRadarChart();
    createMetricsChart();
    createExperienceTimeline();
});

// Radar Chart for Skills
function createSkillRadarChart() {
    // Check if the skills-radar element exists
    const radarContainer = document.getElementById('skills-radar');
    if (!radarContainer) return;
    
    // Skill categories and values
    const skillData = [
        { axis: "Product Management", value: 0.95 },
        { axis: "Data Analysis", value: 0.90 },
        { axis: "Agile Methodologies", value: 0.95 },
        { axis: "Stakeholder Management", value: 0.90 },
        { axis: "Technical Documentation", value: 0.85 },
        { axis: "User Experience", value: 0.80 },
        { axis: "AI/ML Implementation", value: 0.85 },
        { axis: "Project Management", value: 0.95 }
    ];
    
    // Configuration for the Radar Chart
    const config = {
        w: 300,                  // Width of the chart
        h: 300,                  // Height of the chart
        margin: { top: 50, right: 50, bottom: 50, left: 50 }, // Margins
        levels: 5,               // How many levels or inner circles should there be drawn
        maxValue: 1,             // What is the value that the biggest circle will represent
        labelFactor: 1.25,       // How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60,           // The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35,       // The opacity of the area of the blob
        dotRadius: 4,            // The size of the colored circles of each blog
        opacityCircles: 0.1,     // The opacity of the circles of each blob
        strokeWidth: 2,          // The width of the stroke around each blob
        roundStrokes: true,      // If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.scaleOrdinal().range(["#1E3A8A"]) // Color function
    };
    
    // Call function to draw the Radar chart
    RadarChart(radarContainer, [skillData], config);
    
    // Function to draw the Radar Chart
    function RadarChart(id, data, options) {
        const cfg = options;
        
        // Create the SVG container
        const svg = d3.select(id)
            .append("svg")
            .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
            .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
            .attr("class", "radar");
        
        // Append a g element
        const g = svg.append("g")
            .attr("transform", `translate(${cfg.w/2 + cfg.margin.left}, ${cfg.h/2 + cfg.margin.top})`);
        
        // Circular grid
        const axisGrid = g.append("g").attr("class", "axisWrapper");
        
        // Draw the background circles
        axisGrid.selectAll(".levels")
            .data(d3.range(1, cfg.levels + 1).reverse())
            .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", d => (cfg.w/2) * d/cfg.levels)
            .style("fill", "#CDCDCD")
            .style("stroke", "#CDCDCD")
            .style("fill-opacity", cfg.opacityCircles);
        
        // Text indicating at what % each level is
        axisGrid.selectAll(".axisLabel")
            .data(d3.range(1, cfg.levels + 1).reverse())
            .enter().append("text")
            .attr("class", "axisLabel")
            .attr("x", 4)
            .attr("y", d => -d * (cfg.w/2) / cfg.levels)
            .attr("dy", "0.4em")
            .style("font-size", "10px")
            .attr("fill", "#737373")
            .text(d => Math.round(d * 100 / cfg.levels) + "%");
        
        // Create the straight lines radiating outward from the center
        const axis = axisGrid.selectAll(".axis")
            .data(skillData)
            .enter()
            .append("g")
            .attr("class", "axis");
        
        // Append the lines
        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => {
                return (cfg.w/2) * Math.cos(i * 2 * Math.PI / skillData.length);
            })
            .attr("y2", (d, i) => {
                return (cfg.w/2) * Math.sin(i * 2 * Math.PI / skillData.length);
            })
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");
        
        // Append the labels at each axis
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", (d, i) => {
                return (cfg.w/2 * cfg.labelFactor) * Math.cos(i * 2 * Math.PI / skillData.length);
            })
            .attr("y", (d, i) => {
                return (cfg.w/2 * cfg.labelFactor) * Math.sin(i * 2 * Math.PI / skillData.length);
            })
            .text(d => d.axis)
            .call(wrap, cfg.wrapWidth);
        
        // The radial line function
        const radarLine = d3.lineRadial()
            .curve(d3.curveLinearClosed)
            .radius(d => (cfg.w/2) * d.value)
            .angle((d, i) => i * 2 * Math.PI / skillData.length);
        
        // Create a wrapper for the blobs
        const blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");
        
        // Append the backgrounds
        blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", d => radarLine(d))
            .style("fill", (d, i) => cfg.color(i))
            .style("fill-opacity", cfg.opacityArea)
            .on('mouseover', function() {
                // Dim all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", 0.1);
                // Bring back the hovered over blob
                d3.select(this)
                    .transition().duration(200)
                    .style("fill-opacity", 0.7);
            })
            .on('mouseout', function() {
                // Bring back all blobs
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", cfg.opacityArea);
            });
        
        // Create the outlines
        blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", d => radarLine(d))
            .style("stroke-width", cfg.strokeWidth + "px")
            .style("stroke", (d, i) => cfg.color(i))
            .style("fill", "none")
            .style("filter", "url(#glow)");
        
        // Append the circles
        blobWrapper.selectAll(".radarCircle")
            .data(d => d)
            .enter().append("circle")
            .attr("class", "radarCircle")
            .attr("r", cfg.dotRadius)
            .attr("cx", (d, i) => (cfg.w/2) * d.value * Math.cos(i * 2 * Math.PI / skillData.length))
            .attr("cy", (d, i) => (cfg.w/2) * d.value * Math.sin(i * 2 * Math.PI / skillData.length))
            .style("fill", "#F59E0B")
            .style("fill-opacity", 0.8);
        
        // Wrapper for the invisible circles on top for the tooltip
        const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarCircleWrapper");
        
        // Append a set of invisible circles on top for the mouseover pop-up
        blobCircleWrapper.selectAll(".radarInvisibleCircle")
            .data(d => d)
            .enter().append("circle")
            .attr("class", "radarInvisibleCircle")
            .attr("r", cfg.dotRadius * 1.5)
            .attr("cx", (d, i) => (cfg.w/2) * d.value * Math.cos(i * 2 * Math.PI / skillData.length))
            .attr("cy", (d, i) => (cfg.w/2) * d.value * Math.sin(i * 2 * Math.PI / skillData.length))
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function(event, d) {
                const newX = parseFloat(d3.select(this).attr('cx')) - 10;
                const newY = parseFloat(d3.select(this).attr('cy')) - 10;
                
                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(Math.round(d.value * 100) + '%')
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on("mouseout", function() {
                tooltip.transition().duration(200)
                    .style("opacity", 0);
            });
        
        // Set up the small tooltip for when you hover over a circle
        const tooltip = g.append("text")
            .attr("class", "tooltip")
            .style("opacity", 0);
        
        // Helper function to wrap text
        function wrap(text, width) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.4, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }
    }
}

// Bar Chart for Key Metrics
function createMetricsChart() {
    // Check if the metrics-chart element exists
    const metricsContainer = document.getElementById('metrics-chart');
    if (!metricsContainer) return;
    
    // Metrics data - updated with more significant values
    const metricsData = [
        { category: "Cost Savings", value: 15, unit: "M+" },
        { category: "Revenue Growth", value: 12, unit: "M+" },
        { category: "Time-to-Market", value: 40, unit: "%" },
        { category: "Conversion Rate", value: 25, unit: "%" },
        { category: "Risk Reduction", value: 75, unit: "%" }
    ];
    
    // Set up dimensions and margins - increased size
    const margin = { top: 40, right: 40, bottom: 80, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    // Create SVG with increased size
    const svg = d3.select(metricsContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(metricsData.map(d => d.category))
        .padding(0.3); // Increased padding for wider bars
    
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .style("font-weight", "bold");
    
    // Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(metricsData, d => d.value) * 1.2])
        .range([height, 0]);
    
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px");
    
    // Add Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#1E3A8A")
        .text("Value");
    
    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#1E3A8A")
        .text("Key Performance Metrics");
    
    // Create a tooltip
    const tooltip = d3.select(metricsContainer)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("position", "absolute")
        .style("z-index", "10");
    
    // Three functions that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event, d) {
        tooltip
            .style("opacity", 1);
        d3.select(this)
            .style("opacity", 0.8);
    };
    
    const mousemove = function(event, d) {
        tooltip
            .html(`${d.category}: ${d.value}${d.unit}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    };
    
    const mouseleave = function(event, d) {
        tooltip
            .style("opacity", 0);
        d3.select(this)
            .style("opacity", 1);
    };
    
    // Bars with gradient fill
    const defs = svg.append("defs");
    
    // Create gradient for each bar
    metricsData.forEach((d, i) => {
        const gradientId = `gradient-${i}`;
        const gradient = defs.append("linearGradient")
            .attr("id", gradientId)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");
        
        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#0D9488")
            .attr("stop-opacity", 1);
        
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#1E3A8A")
            .attr("stop-opacity", 0.8);
    });
    
    // Bars with animation and gradient
    svg.selectAll("mybar")
        .data(metricsData)
        .enter()
        .append("rect")
        .attr("x", d => x(d.category))
        .attr("width", x.bandwidth())
        .attr("fill", (d, i) => `url(#gradient-${i})`)
        .attr("height", 0)
        .attr("y", height)
        .attr("rx", 5) // Rounded corners
        .attr("ry", 5) // Rounded corners
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value));
    
    // Add labels on top of bars
    svg.selectAll("mytext")
        .data(metricsData)
        .enter()
        .append("text")
        .attr("x", d => x(d.category) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 10)
        .attr("text-anchor", "middle")
        .text(d => `${d.value}${d.unit}`)
        .style("font-family", "'Montserrat', sans-serif")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#1E3A8A")
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100 + 400)
        .style("opacity", 1);
}

// Interactive Timeline for Experience
function createExperienceTimeline() {
    // Check if the experience-timeline element exists
    const timelineContainer = document.getElementById('experience-timeline');
    if (!timelineContainer) return;
    
    // Parse the dates for proper sorting and display
    const parseDate = d3.timeParse("%m/%Y");
    const formatDate = d3.timeFormat("%b %Y");
    
    // Process experience data with better date parsing
    const timelineData = experienceData.map(job => {
        const periodParts = job.period.split('–');
        let startDateStr = periodParts[0].trim();
        let endDateStr = periodParts[1].trim();
        
        // Handle different date formats
        if (startDateStr.includes('/')) {
            // Format: MM/YYYY
            const parts = startDateStr.split('/');
            if (parts[1].length === 2) {
                startDateStr = parts[0] + '/20' + parts[1];
            }
        }
        
        let startDate, endDate;
        
        try {
            startDate = parseDate(startDateStr);
            if (!startDate) {
                // Try alternative parsing
                const [month, year] = startDateStr.split('/');
                startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
            }
        } catch (e) {
            console.error('Error parsing start date:', startDateStr);
            startDate = new Date(2018, 0, 1); // Default fallback
        }
        
        if (endDateStr === 'present') {
            endDate = new Date();
        } else {
            try {
                if (endDateStr.includes('/')) {
                    const parts = endDateStr.split('/');
                    if (parts[1].length === 2) {
                        endDateStr = parts[0] + '/20' + parts[1];
                    }
                }
                endDate = parseDate(endDateStr);
                if (!endDate) {
                    const [month, year] = endDateStr.split('/');
                    endDate = new Date(parseInt(year), parseInt(month) - 1, 1);
                }
            } catch (e) {
                console.error('Error parsing end date:', endDateStr);
                endDate = new Date();
            }
        }
        
        return {
            ...job,
            startDate,
            endDate,
            formattedStart: formatDate(startDate),
            formattedEnd: endDateStr === 'present' ? 'Present' : formatDate(endDate)
        };
    }).sort((a, b) => a.startDate - b.startDate); // Sort by start date, oldest first
    
    console.log('Timeline data:', timelineData); // Debug log
    
    // Set up dimensions and margins
    const margin = { top: 50, right: 50, bottom: 80, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG with responsive sizing
    const svg = d3.select(timelineContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Define time scale
    const timeScale = d3.scaleTime()
        .domain([
            d3.min(timelineData, d => d.startDate),
            d3.max(timelineData, d => d.endDate)
        ])
        .range([0, width]);
    
    // Create the timeline axis
    const timelineAxis = d3.axisBottom(timeScale)
        .ticks(d3.timeYear.every(1))
        .tickFormat(d3.timeFormat("%Y"));
    
    // Append the timeline axis
    svg.append("g")
        .attr("class", "timeline-axis")
        .attr("transform", `translate(0,${height})`)
        .call(timelineAxis)
        .selectAll("text")
        .style("font-size", "12px")
        .style("font-weight", "bold");
    
    // Add title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#1E3A8A")
        .text("Career Progression Timeline");
    
    // Create job blocks with improved layout
    const jobHeight = 50;
    const jobSpacing = 20;
    const jobRows = [];
    
    // Assign rows to jobs to avoid overlap
    timelineData.forEach(job => {
        let rowIndex = 0;
        let placed = false;
        
        while (!placed) {
            if (!jobRows[rowIndex]) {
                jobRows[rowIndex] = [];
                placed = true;
                jobRows[rowIndex].push(job);
                job.row = rowIndex;
            } else {
                // Check if this job overlaps with any job in the current row
                const overlaps = jobRows[rowIndex].some(existingJob => {
                    return (job.startDate <= existingJob.endDate && job.endDate >= existingJob.startDate);
                });
                
                if (!overlaps) {
                    placed = true;
                    jobRows[rowIndex].push(job);
                    job.row = rowIndex;
                } else {
                    rowIndex++;
                }
            }
        }
    });
    
    // Create job blocks with improved styling
    const jobGroups = svg.selectAll(".job-group")
        .data(timelineData)
        .enter()
        .append("g")
        .attr("class", "job-group")
        .attr("transform", d => `translate(${timeScale(d.startDate)}, ${d.row * (jobHeight + jobSpacing) + 20})`);
    
    // Add job rectangles with gradient fill
    const defs = svg.append("defs");
    
    // Create gradient for job blocks
    const jobGradient = defs.append("linearGradient")
        .attr("id", "job-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    
    jobGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#1E3A8A")
        .attr("stop-opacity", 1);
    
    jobGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#0D9488")
        .attr("stop-opacity", 0.8);
    
    // Add job rectangles with animation
    jobGroups.append("rect")
        .attr("class", "job-rect")
        .attr("width", 0) // Start with width 0 for animation
        .attr("height", jobHeight)
        .attr("rx", 8)
        .attr("ry", 8)
        .style("fill", "url(#job-gradient)")
        .style("opacity", 0.9)
        .style("stroke", "#1E3A8A")
        .style("stroke-width", 1)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .attr("width", d => Math.max(timeScale(d.endDate) - timeScale(d.startDate), 120)) // Ensure minimum width
        .on("end", function(event, d) {
            // Add hover effects after animation
            d3.select(this)
                .on("mouseover", function(event, d) {
                    d3.select(this).style("opacity", 1);
                    
                    // Show tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    
                    tooltip.html(`
                        <strong>${d.role}</strong><br/>
                        ${d.company}${d.client ? ` (${d.client})` : ''}<br/>
                        ${d.formattedStart} - ${d.formattedEnd}<br/>
                        ${d.location}
                    `)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    d3.select(this).style("opacity", 0.9);
                    
                    // Hide tooltip
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        });
    
    // Add job labels with animation
    jobGroups.append("text")
        .attr("class", "job-label")
        .attr("x", 10)
        .attr("y", jobHeight / 2 - 8)
        .attr("dy", ".35em")
        .style("fill", "white")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200 + 500)
        .style("opacity", 1)
        .text(d => d.role);
    
    // Add company labels with animation
    jobGroups.append("text")
        .attr("class", "company-label")
        .attr("x", 10)
        .attr("y", jobHeight / 2 + 8)
        .attr("dy", ".35em")
        .style("fill", "white")
        .style("font-size", "10px")
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200 + 700)
        .style("opacity", 1)
        .text(d => d.company);
    
    // Add connecting lines between jobs
    for (let i = 0; i < timelineData.length - 1; i++) {
        const currentJob = timelineData[i];
        const nextJob = timelineData[i + 1];
        
        // Only connect if there's a reasonable gap
        if (nextJob.startDate > currentJob.endDate) {
            const currentEndX = timeScale(currentJob.endDate);
            const nextStartX = timeScale(nextJob.startDate);
            const currentY = currentJob.row * (jobHeight + jobSpacing) + 20 + jobHeight/2;
            const nextY = nextJob.row * (jobHeight + jobSpacing) + 20 + jobHeight/2;
            
            svg.append("path")
                .attr("d", `M${currentEndX},${currentY} 
                           C${currentEndX + 30},${currentY} 
                           ${nextStartX - 30},${nextY} 
                           ${nextStartX},${nextY}`)
                .attr("stroke", "#0D9488")
                .attr("stroke-width", 2)
                .attr("fill", "none")
                .attr("stroke-dasharray", "5,5")
                .style("opacity", 0)
                .transition()
                .duration(1000)
                .delay((i + 1) * 200 + 300)
                .style("opacity", 0.7);
        }
    }
    
    // Create tooltip with improved styling
    const tooltip = d3.select("body").append("div")
        .attr("class", "timeline-tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("border-radius", "8px")
        .style("padding", "12px")
        .style("box-shadow", "0 4px 8px rgba(0,0,0,0.2)")
        .style("pointer-events", "none")
        .style("font-size", "14px")
        .style("z-index", 1000);
    
    // Add milestone markers for key career achievements
    const milestones = [
        { date: new Date(2021, 8, 1), label: "Joined Walmart", icon: "star" },
        { date: new Date(2019, 4, 1), label: "Joined UST Global", icon: "briefcase" },
        { date: new Date(2018, 2, 1), label: "Joined Arrow Electronics", icon: "arrow-up" }
    ];
    
    // Add milestone markers
    svg.selectAll(".milestone")
        .data(milestones)
        .enter()
        .append("circle")
        .attr("class", "milestone")
        .attr("cx", d => timeScale(d.date))
        .attr("cy", height + 20)
        .attr("r", 6)
        .style("fill", "#F59E0B")
        .style("stroke", "white")
        .style("stroke-width", 2)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200 + 1000)
        .style("opacity", 1)
        .on("end", function(event, d) {
            // Add hover effects after animation
            d3.select(this)
                .on("mouseover", function(event, d) {
                    d3.select(this).attr("r", 8);
                    
                    // Show tooltip
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0.9);
                    
                    tooltip.html(`<strong>${d.label}</strong>`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function() {
                    d3.select(this).attr("r", 6);
                    
                    // Hide tooltip
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        });
}

