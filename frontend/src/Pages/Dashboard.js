import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({})

    const fetchData = async (token) => {

        try {
            const result = await axios.get('https://authentication-backend-uz8u.onrender.com/api/userdata', {
                headers: {
                    'authorization': token
                }
            })
            if (result.data.success) {
                setData(result.data.data)
            }

        } catch (err) {
            localStorage.removeItem('userToken')
            navigate("/login")
            setTimeout(() => {
                toast.error(err.response.data.message, {
                    autoClose: 3000
                })
            }, 500)
        }
    }

    const LogoutFunction = () => {
        localStorage.removeItem('userToken')
        navigate("/login")
        setTimeout(() => {
            toast.success('Logout Successfully', {
                autoClose: 3000
            })
        }, 500)
    }

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (!token) navigate('/signup')
        fetchData(token)
    }, [])
    return (
        <>
            <div className='main-container-2'>
                <div className="dashboard-container">
                    <aside className="sidebar">
                        <div className="user-profile">
                            <img src="user-avatar.png" alt="User" className="avatar" />
                            <h3>User Name</h3>
                            <p>User Profile</p>
                        </div>
                        <nav className="menu">
                            <ul>
                                <li className="active">Dashboard</li>
                                <li>Inventory</li>
                                <li>Retreaders</li>
                                <li>Filters</li>
                                <li>Vehicle Allocation</li>
                                <li>Collection Request</li>
                                <li>Dispatch Request</li>
                                <li>Reports</li>
                                <li>Analytics</li>
                                <li onClick={LogoutFunction}>Logout</li>
                            </ul>
                        </nav>
                    </aside>

                    <main className="main-content">
                        <header className="main-header">
                            <h1>Dashboard</h1>
                            <div className="search-bar">
                                <input type="text" placeholder="Search..." />
                            </div>
                        </header>

                        <section className="summary-alerts">
                            <div className="summary">
                                <h2>Summary</h2>
                                <div className="summary-cards">
                                    {data.allSummary && data.allSummary.length > 0 &&
                                        data.allSummary.map((item, index) => (
                                            <div key={index} className="card">
                                                <h3>{item.name}</h3>
                                                <p>{item.value}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="alerts">
                                <h2>Alerts</h2>
                                <div className="alert-list">
                                    {data.allAlerts && data.allAlerts.length > 0 &&
                                        data.allAlerts.map((item, index) => (
                                            <div key={index} className="alert">{item.name} <span className="alert-count">{item.value}</span></div>
                                        ))
                                    }
                                </div>
                            </div>
                        </section>

                        <section className="table-section">
                            <h2>Pending Actions</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Action Category</th>
                                        <th>Tyre & S/N</th>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Vehicle No.</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.pendingAction && data.pendingAction.length > 0 &&
                                        data.pendingAction.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.date}</td>
                                                <td>{item.category}</td>
                                                <td>{item.typeSN}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.model}</td>
                                                <td>{item.vehicleNo}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </section>
                        <div style={{ width: '500px', height: '500px', display: 'flex', marginTop: '10px' }}>
                            <PieChart chartData={data?.chartData || []} chartLabel={data?.chartLabel || []} />
                            <MarketShareChart barLabel={data?.barLabel || []} barChart={data?.barChart || []} />
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

const PieChart = ({ chartLabel, chartData }) => {
    const data = {
        labels: chartLabel,
        datasets: [
            {
                label: '# of Votes',
                data: chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return <Pie data={data} options={options} />
};

const MarketShareChart = ({ barLabel, barChart }) => {
    const data = {
        labels: barLabel,
        datasets: barChart
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Market Shares',
                font: {
                    size: 20,
                },
                color: '#ff6347', // Tomato color for the title
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};


export default Dashboard