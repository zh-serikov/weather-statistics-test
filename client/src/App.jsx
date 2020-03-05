import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import styles from './App.module.css'
import Button from 'components/button'
import Graph from 'components/graph'

import { TYPE } from 'helpers/constants'
import Errors from 'helpers/errors'


function generateYears(start, end) {
  const years = Array(end - start + 1)
                .fill()
                .map((_, idx) => ({'label': start + idx, 'value': start + idx}))

  return years
}

function filterData(state, from, to) {
  const filtered = state.filter((item) => {
    const n = Number(item.t.substring(0, 4))

    if (n !== NaN) return from <= n && n <= to
  })

  return [...filtered]
}

function App() {
  const [mode, setMode] = useState(TYPE.TEMPERATURE)

  const [startYears, setStartYears] = useState(generateYears(1881, 2006))
  const [endYears, setEndYears] = useState(generateYears(1881, 2006))
  const [date, setDate] = useState({ start: 1881, end: 2006 })

  const [data, setData] = useState([])

  useEffect(() => {
    // fetch initial data: temperature
    fetch('/api/get_temperature_data')
      .then(res => res.json())
      .then(json => setData(json))
      .catch((err) => Errors.handleNetworkError(err))
  }, [])

  useEffect(() => {
    fetchFilteredData(mode, date.start, date.end)
  }, [mode])

  useEffect(() => {
    setStartYears(generateYears(1881, date.end))
    setEndYears(generateYears(date.start, 2006))

    fetchFilteredData(mode, date.start, date.end)

  }, [date])

  const fetchFilteredData = (mode, start, end) => {
    if (mode === TYPE.TEMPERATURE) {
      fetch('/api/get_temperature_data')
        .then(res => res.json())
        .then(json => setData(filterData(json, start, end)))
        .catch((err) => Errors.handleNetworkError(err))
    }
    else if (mode === TYPE.PRECIPITATION) {
      fetch('/api/get_precipitation_data')
        .then(res => res.json())
        .then(json => setData(filterData(json, start, end)))
        .catch((err) => Errors.handleNetworkError(err))
    }
  }
  
  const handleChangeYear = (o, d) => 
    setDate(state => ({ ...state, [d.name]: o.value }))


  return (
    <div className={styles.layout}>
      <div className={styles['buttons-group']}>
        <Button text='Температура' onClick={() => setMode(TYPE.TEMPERATURE)} isActive={mode === TYPE.TEMPERATURE} />

        <Button text='Осадки' onClick={() => setMode(TYPE.PRECIPITATION)} isActive={mode === TYPE.PRECIPITATION} />
      </div>
      <div className={styles.container}>
        <div className={styles['input-select_group']}>
          <Select 
            name='start'
            options={startYears} 
            onChange={handleChangeYear}
            defaultValue={startYears[0]} 
            className={styles['input-select']} 
          />
          <Select 
            name='end'
            options={endYears} 
            onChange={handleChangeYear}
            defaultValue={endYears[endYears.length - 1]} 
            className={styles['input-select']} 
          />
        </div>
        <div className={styles.content}>
          <Graph mode={mode} data={data} />
        </div>
      </div>
    </div>
  )
}

export default App
