"use strict";

import d3 from 'd3';

export function series(props, horizontal) {
  var {
    data,
    chartSeries,
    x,
    y,
    categoricalColors
  } = props;

  categoricalColors = categoricalColors || d3.scale.category10();

  var chartSeriesData = chartSeries.map((f, i) => {

    // set a color if not set
    f.color = f.color || categoricalColors(i);

    // set name if not set
    f.name = f.name || f.field;

    // mapping throught data set x, y data
    var mapping = data.map(d => {
      if(!d._style) d._style = {}

      if(!horizontal) {
        return {
          x: x(d),
          y: y(d[f.field]),
          color: f.color,
          name: f.name,
          field: f.field,
          _style: d._style
        }
      }else {
        return {
          y: y(d),
          x: x(d[f.field]),
          color: f.color,
          name: f.name,
          field: f.field,
          _style: d._style
        }
      }
    })

    return Object.assign(f, {data: mapping});
  })

  return chartSeriesData;
}
