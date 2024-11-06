# D3 Lollipop Chart for Employment Trends

This project is an interactive data visualization built using D3.js v7, showcasing employment rate trends for countries worldwide from 1991 to 2022. The visualization enables users to compare male and female employment rates over time using an intuitive lollipop chart format.

Here's a short demo of the project in action:

<video width="600" controls>
  <source src="utils/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Features

### Overview
- The chart utilizes a lollipop chart format, where vertical lines topped with circles represent employment rates. Different colors are used to represent male and female employment rates, facilitating easy visual comparison between genders.
- The dataset includes comprehensive employment rate data for both males and females from 1991 to 2022 across various countries, loaded from `females_data.csv` and `males_data.csv` files.

### Interactive Elements
- **Dropdown Menu**: Users can select any country from a dropdown list. The chart updates dynamically to display the employment rates for the selected country.
- **Smooth Transitions**: The chart and axes transition smoothly to reflect new data when a different country is selected, enhancing the user experience.

### Chart Components
- **X- and Y-Axes**: The x-axis represents years from 1991 to 2022 using a time scale. The y-axis shows employment rates, dynamically scaled to the highest rate for the selected country with appropriate padding.
- **Legend**: Positioned at the top right corner of the chart, the legend uses color-coded labels to differentiate between male and female employment rates.
- **Axis Labels**: The x-axis is labeled as "Year," and the y-axis is labeled as "Employment Rate" (rotated for better readability).

### Technical Details
- The x-axis is constructed using `d3.scaleTime`, ensuring an accurate representation of time.
- The y-axis is created with `d3.scaleLinear` to scale the employment rate values effectively.
- Data is loaded and parsed using `d3.csv`, with numeric data formatting handled during data processing.

### Customization and Styling
- The chart is embedded in an SVG element.
- Appropriate margins and offsets are applied to ensure that all elements, including data points and labels, are properly visible within the visualization space.
- The colors used for male and female markers are distinct and easily distinguishable.

### Additional Enhancements
- A legend in the upper right corner explains the color representation for male and female employment rates.
- When changing the selected country, the lollipop chart and axes animate smoothly for a seamless user experience.

## Hosting the Project Locally

To host this project on your local machine, follow these steps:

### Prerequisites
- Visual Studio Code (VSCode)
- Git installed on your system

### Steps

1. **Clone the Repository**:
   - Open your terminal and run the following command:
   ```
   bash
   git clone https://github.com/SharanB7/D3-Lollipop-Chart-for-Employment-Trends.git
   ```

2. **Open the Project in VSCode**:
   - Navigate to the project directory and open it in VSCode:
   ```
   cd D3-Lollipop-Chart-for-Employment-Trends
   code .
   ```

3. **Install the "Live Server" Extension**:
   - Open Visual Studio Code.
   - Go to the Extensions tab or press `Ctrl+Shift+X` (Windows/Linux) / `Cmd+Shift+X` (Mac).
   - Search for "Live Server" and install it.

4. **Run the Project**:
   - Locate and open `index.html` in your project folder.
   - Right-click on the file and select "Open with Live Server".
   - Alternatively, click on the "Go Live" button at the bottom right corner of VSCode.

The project should now be hosted locally and accessible at `http://127.0.0.1:5500` (or another port specified by Live Server).