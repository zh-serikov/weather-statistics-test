import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './Graph.module.css'
import cx from 'classnames'
import worker_script from './worker.js'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Boost from 'highcharts/modules/boost'

import { TYPE } from 'helpers/constants'
Boost(Highcharts)

const Graph = ({ mode, data }) => {
  const chart = useRef()

  const [options, setOptions] = useState({
    title: {
      text: 'Температура',
      align: 'left',
    },
    chart: {
      height: '500',
      width: '2000',
    },
    scrollablePlotArea: {
      minWidth: '500',
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    boost: {
      useGPUTranslations: true,
      usePreallocated: true,
    },
    plotOptions: {
      series: {
        enableMouseTracking: true
      }
    },
    xAxis: {
        events: {
          afterSetExtremes: function() {
            // var chart = this.chart;
            // chart.toggleResetZoom();
          }
        },
      },
    tooltip: {
      animation: false
    },
    series: [
      {
        data: data.map(item => item.v),
      },
    ],
  })

  useEffect(() => {
    let title
    if (mode === TYPE.TEMPERATURE) title = 'Температура'
    else if (mode === TYPE.PRECIPITATION) title = 'Осадки'

    setOptions({
      title: { text: title },
    })
  }, [mode])

  useEffect(() => {
    // if (chart && chart.current) {
      // console.log(chart.current.chart)
    // }
    setOptions({
      series: [{ data: data.map(item => item.v) }],
    })
  }, [data])

  return (
    <div className={styles.wrapper}>
      <HighchartsReact ref={chart} highcharts={Highcharts} options={options} />
    </div>
  )
}

Graph.propTypes = {
  mode: PropTypes.number,
  data: PropTypes.array,
}

export default Graph
