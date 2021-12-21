import React from "react";
import "../../App.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./ChangeReservation.css";
import AvailableFlights from "../../components/availableFlights/AvailableFlights";

export default function ChangeReservation() {
    const history = useHistory();
    const [flights, setFlights] = useState([]);

    const getAllFlights = async () => {
        try {
            const url = `http://localhost:8000/flights/all-flights`;
            const response = await axios.get(url);
            setFlights(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getAllFlights();
    }, []);

    const confirmHandler = () => {
        if (flights.length == 1) {
            history.newReturnFlight = flights[0];
            history.push("reserved-flights");
        }
    };
    return (
        <div>
            <AvailableFlights
                flights={flights}
                setFlights={setFlights}
                renewFlights={getAllFlights}
            />
            <br />
            <div style={{ textAlign: "center" }}>
                <button type="button" class="btn-confirm" onClick={confirmHandler}>
                    Choose Flight
                </button>
            </div>
        </div>
    );
}
