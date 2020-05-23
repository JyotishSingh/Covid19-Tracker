import React, { useEffect, useState } from 'react';
import './Charts.css'
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2'

function Charts({ data: { confirmed, recovered, deaths }, country }) {

    const [dailyData, setDailyData] = useState({})

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedData = await fetchDailyData();
            setDailyData(fetchedData);
        }
        fetchAPI();
    }, [])

    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(dailyData => dailyData.date),
                    datasets: [{
                        label: 'Infected',
                        data: dailyData.map(d => d.confirmed),
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        label: 'Deaths',
                        data: dailyData.map(d => d.deaths),
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }]
                }}
            />
        ) : null
    );

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,255)',
                            'rgba(0,255,0)',
                            'rgba(255,0,0)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` }

                }}
            />
        ) : null
    );

    return (
        <div className="container">
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts
