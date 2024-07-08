import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getUser, requestMeal } from '../utils/ApiFunctions';
import './RequestMeal.css';

const RequestMeal = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [quantity, setQuantity] = useState(1);
  const [empId, setEmpId] = useState();

  useEffect(() => {
    const now = new Date();
    if (startDate && now.toDateString() === startDate.toDateString()) {
      setSelectedMeals((prev) => ({
        ...prev,
        breakfast: now.getHours() < 3 ? prev.breakfast : false,
        lunch: now.getHours() < 9 ? prev.lunch : false,
        dinner: now.getHours() < 21 ? prev.dinner : false,
      }));
    }
  }, [startDate]);

  const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser(userId, token)
				console.log(userData);
				setEmpId(userData.empNo);

			} catch (error) {
				console.error(error)
			}
		}

		fetchUser()
	}, [userId])

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleMealChange = (e) => {
    const { name, checked } = e.target;
    setSelectedMeals((prev) => ({ ...prev, [name]: checked }));
  };

  const handleInputChange = (e) => {
    const qty = e.target.value;
    setQuantity(qty);
    console.log(qty);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error('Please select a valid date range.');
      return;
    }

    const mealRequests = [];
    const mealIdMap = {
      breakfast: 2,
      lunch: 1,
      dinner: 3
    };

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const date = new Date(d);
      const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; // Adjust for timezone
      Object.keys(selectedMeals).forEach((meal) => {
        if (selectedMeals[meal]) {
          const mealId = mealIdMap[meal];
          mealRequests.push({
            empId: empId, // Replace with actual employee ID
            mealId: mealId, // Adjust based on your backend requirements
            orderDate: dateString,
            isMealRequested: true,
            isMealIssued: false,
            issueDate: null,
            isHalfPaid: false,
            amountPaid: 0.0,
            qty: quantity
          });
        }
      });
    }

    try {
      console.log(mealRequests);
      await requestMeal(mealRequests);
      toast.success('Meal requests submitted successfully.');
    } catch (error) {
      toast.error('Failed to submit meal requests.');
    }
  };

  return (
    <div className="container2 mt-3 mb-5">
      <Toaster />
      <h2 className="mb-2">Request Meals</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Date Range</label>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Meals</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="breakfast"
              name="breakfast"
              checked={selectedMeals.breakfast}
              onChange={handleMealChange}
              disabled={startDate && new Date().toDateString() === startDate.toDateString() && new Date().getHours() >= 3}
            />
            <label className="form-check-label" htmlFor="breakfast">
              Breakfast
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="lunch"
              name="lunch"
              checked={selectedMeals.lunch}
              onChange={handleMealChange}
              disabled={startDate && new Date().toDateString() === startDate.toDateString() && new Date().getHours() >= 9}
            />
            <label className="form-check-label" htmlFor="lunch">
              Lunch
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="dinner"
              name="dinner"
              checked={selectedMeals.dinner}
              onChange={handleMealChange}
              disabled={startDate && new Date().toDateString() === startDate.toDateString() && new Date().getHours() >= 21}
            />
            <label className="form-check-label" htmlFor="dinner">
              Dinner
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="qty" className="form-label">
              Qty
            </label>
            <div>
              <input
                required
                type="number"
                className="form-control"
                id="qty"
                name="qty"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit Requests</button>
      </form>
    </div>
  );
};

export default RequestMeal;
