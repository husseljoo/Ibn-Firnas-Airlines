import React from "react";
import { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BookingSeat from "../../components/bookingSeat/BookingSeat";
import createRows from "../../components/bookingSeat/createRows";
export default function SeatPicker() {
    const history = useHistory();
    const [choosingDep, setChosingDep] = useState(true);
    const [departureSeats, setDepartureSeats] = useState([]);
    const [returnSeats, setReturnSeats] = useState([]);
    const [buttonText, setButtonText] = useState(
        "Continue to Return Flight Seating"
    );

    let departureTripInfo,
        returnTripInfo = {
            departureFlightNumber: "",
            returnFlightNumber: "",
            cabinClass: "",
            requestedSeats: 0,
        };

    let requestedSeatsLocal = 4;
    if (history.trip_info) {
        requestedSeatsLocal = history.trip_info.requestedSeats;
        const {
            departureFlightNumber,
            returnFlightNumber,
            cabinClass,
            adultsNumber,
            childrenNumber,
            requestedSeats,
        } = history.trip_info;
        const allInfo = { cabinClass, requestedSeats };

        departureTripInfo = { ...allInfo, flightNumber: departureFlightNumber };
        returnTripInfo = { ...allInfo, flightNumber: returnFlightNumber };
    }

    const pickSeatsHandler = () => {
        if (choosingDep) {
            if (departureSeats.length >= requestedSeatsLocal) {
                setButtonText("Continue Booking");
                setChosingDep((prevState) => !prevState);
            }
        } else if (returnSeats.length >= requestedSeatsLocal) {
            const tripInfo = {
                ...history.trip_info,
                departureSeats: departureSeats,
                returnSeats: returnSeats,
            };
            console.log("DEPARTURE_SEATS", departureSeats);
            console.log("RETURN_SEATS", returnSeats);
            history.trip_info = tripInfo;
            history.push("/reservation-details");
        }
    };
    console.log("returnSeats", returnSeats);
    console.log("departureSeats", departureSeats);

    if (history.trip_info) {
        return (
            <>
                {choosingDep && (
                    <BookingSeat
                        tripInfo={departureTripInfo}
                        title="Departure"
                        setSelected={setDepartureSeats}
                    />
                )}
                {!choosingDep && (
                    <BookingSeat
                        tripInfo={returnTripInfo}
                        title="Return"
                        setSelected={setReturnSeats}
                    />
                )}

                <div style={{ textAlign: "center" }}>
                    <button type="button" class="btn-confirm" onClick={pickSeatsHandler}>
                        {buttonText}
                    </button>
                </div>
            </>
        );
    } else {
        history.push("/booking");
        return <></>;
    }
}
