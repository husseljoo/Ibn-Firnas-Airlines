import React from "react";
import "./ReservedFlights.css";
import "../../App.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReservedFlightCard from "../../components/reservedFlights/reservedFlightsCard";

export default function ReservedFlight() {
    let location = useLocation();

    const locationPath = location.pathname.split("/");
    // const username = locationPath[locationPath.length - 1];
    const [username, setUsername] = useState("husseljo");

    // const [data, setData] = useState([[]]);
    const [data, setData] = useState([
        {
            flight_number: "ABC-123",
            departure_reservation_id: { no_of_adults: 9, no_of_children: 7 },
            booking_id: 12,
            no_of_adults: 2,
            no_of_children: 3,
        },
        {
            flight_number: "ABC-123",
            departure_reservation_id: { no_of_adults: 9, no_of_children: 7 },
            booking_id: 7,
            no_of_adults: 1,
            no_of_children: 1,
        },
        {
            flight_number: "ABC-123",
            departure_reservation_id: { no_of_adults: 9, no_of_children: 7 },
            booking_id: 2,
            no_of_adults: 4,
            no_of_children: 2,
        },
    ]);

    const getReservationAxios = async () => {
        try {
            const response = await axios.get("http://localhost:8000/trips/all-trips");
            setData(response.data);
            setUsername(response.data[0].username);
        } catch (err) {
            console.log(err);
        }
    };
    console.log("DATA IS: ", data);

    useEffect(() => {
        getReservationAxios();
    }, []);

    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    };

    const submitHandler = (flightNumber) => {
        routeChange(`../reservation-details`);
    };

    // return (
    //     <div>
    //         <div> User of this trip: {username}</div>
    //         {data.map((data) => {
    //             return (
    //                 <div styles={{ alignContent: "center" }}>
    // <ReservedFlightCard data={data.departure_reservation_id} />
    // <ReservedFlightCard data={data.return_reservation_id} />
    //                 </div>
    //             );
    //         })}
    //     </div>
    // );
    // }
    return (
        <div>
            <div> User of this trip: {username}</div>
            {data.map((data, index) => {
                return (
                    <div styles={{ alignContent: "center" }}>
                        <br />
                        <br />
                        <h1>Trip {index + 1}</h1>
                        <h2>
                            <Icon icon="tabler:brand-booking" />
                            Cabin Class: {data.departure_reservation_id.cabin_class}
                        </h2>
                        <h2>
                            <Icon icon="el:adult" />
                            Number of Adults: {data.departure_reservation_id.no_of_adults}
                        </h2>
                        <h2>
                            <Icon icon="mdi:human-male-child" />
                            Number of Children: {data.departure_reservation_id.no_of_children}
                        </h2>
                        <h1>
                            {" "}
                            Departure Flight:{" "}
                            {/* {data.departure_reservation_id.flight_id.flight_number} */}
                        </h1>
                        <ReservedFlightCard data={data.departure_reservation_id} />
                        <h1>
                            {" "}
                            Return Flight:{" "}
                            {/* {data.return_reservation_id.flight_id.flight_number} */}
                        </h1>
                        <ReservedFlightCard data={data.return_reservation_id} />
                    </div>
                );
            })}
        </div>
    );
}
