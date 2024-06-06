import React, { useState } from 'react';
import { getMealCountByDate } from '../utils/ApiFunctions';

const MealCountByDate = () => {
    const [date, setDate] = useState('');
    const [mealCounts, setMealCounts] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await getMealCountByDate(date);
            setMealCounts(response);
            setIsDataFetched(true);
            console.log(response);
        } catch (error) {
            console.error('Error fetching meal counts', error);
            setIsDataFetched(true);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Meal Counts By Date</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="date" className="col-form-label">Select Date:</label>
                    </div>
                    <div className="col-auto">
                        <input
                            type="date"
                            id="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Get Meal Counts</button>
                    </div>
                </div>
            </form>

            {isDataFetched && mealCounts.length === 0 ? (
                <div className="alert alert-info">No meals were ordered on this date.</div>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Meal Type</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mealCounts.map(([mealId, count], index) => (
                            <tr key={index}>
                                <td>{mealId === 1 ? "Lunch" : mealId === 2 ? "Breakfast" : mealId === 3 ? "Dinner" : "Unknown Meal"}</td>
                                <td>{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MealCountByDate;
