var svg, margin, inner_width, inner_height, flag, country, old_country,
     old_y_axis, male_data_max = {}, female_data_max = {},
     x_scale, old_y_scale, y_scale, x_axis, y_axis, y_ticks, old_y_ticks;

document.addEventListener('DOMContentLoaded', function () {
     Promise.all([d3.csv('data/females_data.csv'), d3.csv('data/males_data.csv')])
          .then(function (values) {
               console.log('Loaded the females_data.csv and males_data.csv');
               female_data = values[0];
               male_data = values[1];

               const countries = Object.keys(female_data[0]).slice(1);
               male_data.forEach(m => {
                    m['Year'] = new Date(m['Year'], 0);
                    countries.forEach(c => {
                         m[c] = +m[c];
                    });
               });

               var select = document.getElementById('country-select');
               countries.forEach(country => {
                    let option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    select.appendChild(option);
               });

               female_data.forEach(f => {
                    f['Year'] = new Date(f['Year'], 0);
                    countries.forEach(c => {
                         f[c] = +f[c];
                    });
               });

               countries.forEach(c => {
                    male_data_max[c] = Math.max(...male_data.map(m => m[c]));
                    female_data_max[c] = Math.max(...female_data.map(f => f[c]));
               });

               flag = false;

               svg = d3.select('#lollipopPlotSvg');
               const width = +svg.style('width').replace('px', '');
               const height = +svg.style('height').replace('px', '');

               margin = { top: 60, bottom: 40, left: 55, right: 25 };
               inner_width = width - (margin['left'] + margin['right']);
               inner_height = height - (margin['top'] + margin['bottom']);

               const year_extent = d3.extent(male_data, d => d['Year']);
               const year_start = new Date(year_extent[0].getFullYear() - 1, 0);
               const year_end = new Date(year_extent[1].getFullYear() + 1, 0);
               x_scale = d3.scaleTime()
                    .domain([year_start, year_end])
                    .range([0, inner_width]);

               drawLollipopChart();
          });
});

function drawLollipopChart() {

     old_country = flag ? country : null;
     flag = true;
     country = d3.select('#country-select').property('value');

     if (flag) {
          old_y_scale = d3.scaleLinear()
               .domain([0, Math.max(male_data_max[old_country], female_data_max[old_country])])
               .range([inner_height, 0]);
          old_y_ticks = y_ticks;
          old_y_axis = d3.axisLeft(old_y_scale)
               .ticks(old_y_ticks)
               .tickFormat(d3.format(".2f"));
     }

     y_scale = d3.scaleLinear()
          .domain([0, Math.max(male_data_max[country], female_data_max[country])])
          .range([inner_height, 0]);

     svg.select('g').remove();

     const g = svg.append('g')
          .attr('transform', 'translate(' + margin['left'] + ', ' + margin['top'] + ')');

     x_axis = d3.axisBottom(x_scale);
     g.append('g').call(x_axis)
          .attr('transform', 'translate(0,' + inner_height + ')');

     y_ticks = Math.floor(Math.max(male_data_max[country], female_data_max[country]) / 0.05);
     y_axis = d3.axisLeft(y_scale)
          .ticks(y_ticks)
          .tickFormat(d3.format(".2f"));
     g.append('g').call(flag ? old_y_axis : null)
          .transition()
          .delay(100)
          .duration(1000)
          .call(y_axis);

     g.append('g').selectAll('steelblue_circle')
          .data(male_data)
          .enter()
          .append('circle')
          .attr('cx', d => x_scale(d['Year']) - 5)
          .attr('cy', flag ? d => y_scale(d[old_country]) : y_scale(0))
          .attr('r', 4)
          .style('fill', 'steelblue')
          .transition()
          .delay(100)
          .duration(1000)
          .attr('cy', d => y_scale(d[country]));

     g.append('g').selectAll('steelblue_line')
          .data(male_data)
          .enter()
          .append('line')
          .attr('x1', d => x_scale(d['Year']) - 5)
          .attr('y1', y_scale(0))
          .attr('x2', d => x_scale(d['Year']) - 5)
          .attr('y2', flag ? d => y_scale(d[old_country]) : y_scale(0))
          .style('stroke', 'steelblue')
          .transition()
          .delay(100)
          .duration(1000)
          .attr('y2', d => y_scale(d[country]));

     g.append('g').selectAll('coral_circle')
          .data(female_data)
          .enter()
          .append('circle')
          .attr('cx', d => x_scale(d['Year']) + 5)
          .attr('cy', flag ? d => y_scale(d[old_country]) : y_scale(0))
          .attr('r', 4)
          .style('fill', 'coral')
          .transition()
          .delay(100)
          .duration(1000)
          .attr('cy', d => y_scale(d[country]));

     g.append('g').selectAll('coral_line')
          .data(female_data)
          .enter()
          .append('line')
          .attr('x1', d => x_scale(d['Year']) + 5)
          .attr('y1', y_scale(0))
          .attr('x2', d => x_scale(d['Year']) + 5)
          .attr('y2', flag ? d => y_scale(d[old_country]) : y_scale(0))
          .style('stroke', 'coral')
          .transition()
          .delay(100)
          .duration(1000)
          .attr('y2', d => y_scale(d[country]));

     g.append('g')
          .attr('class', 'legend');

     g.append('rect')
          .attr('x', 1100)
          .attr('y', -60)
          .attr('width', 20)
          .attr('height', 20)
          .attr('fill', 'steelblue');

     g.append('text')
          .attr('x', 1130)
          .attr('y', -45)
          .text('Male Employment Rate');

     g.append('rect')
          .attr('x', 1100)
          .attr('y', -35)
          .attr('width', 20)
          .attr('height', 20)
          .attr('fill', 'coral');

     g.append('text')
          .attr('x', 1130)
          .attr('y', -20)
          .text('Female Employment Rate');

     g.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', - inner_height / 2)
          .attr('y', - 40)
          .style('text-anchor', 'middle')
          .text('Employment Rate');

     g.append('text')
          .attr('x', inner_width / 2)
          .attr('y', inner_height + 35)
          .style('text-anchor', 'middle')
          .text('Year');

     console.log('trace:drawLolliPopChart()');
}