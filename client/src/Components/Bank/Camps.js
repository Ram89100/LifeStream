import React, { useState, useEffect } from "react";
import axios from "../Api";
import CampEdit from "./CampEdit";

const Camps = () => {
    const [data, setData] = useState([]);
    const [popup, setPopup] = useState(-1);
    const [state, setState] = useState("");  
    const [district, setDistrict] = useState("");  
    const [date, setDate] = useState("");  
    const [filtered, setFiltered] = useState([]); 

    useEffect(() => {
        if (data.states?.[state]?.districts?.[district]) {
            axios.get(`/camps/allCamps/${data.states[state].state}/${data.states[state].districts[district]}/${date}`)
                 .then((r) => setFiltered(r.data))
                 .catch((e) => alert("Something went wrong"));
        }
    }, [state, district, date]);

    return (
        <div className="mt-5 ml-5">
            <table className='rounded-md text-center'>
                <thead>
                    <tr>
                        <th className='border p-4 px-4'>Date</th>
                        <th className='border p-4 px-4'>Camp Name</th>
                        <th className='border p-4 px-4'>Address</th>
                        <th className='border p-4 px-4'>State</th>
                        <th className='border p-4 px-4'>District</th>
                        <th className='border p-4 px-4'>Organizer</th>
                        <th className='border p-4 px-4'>Contact</th>
                        <th className='border p-4 px-4'>Time</th>
                        <th className='border p-4 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((e, i) => (
                        <tr key={i}>
                            <td className='border p-3'>{new Date(e.date).toLocaleDateString()}</td>
                            <td className='border p-3'>{e.name}</td>
                            <td className='border p-3'>{e.address}</td>
                            <td className='border p-3'>{e.state}</td>
                            <td className='border p-3'>{e.district}</td>
                            <td className='border p-3'>{e.organizer}</td>
                            <td className='border p-3'>{e.contact}</td>
                            <td className='border p-3'><code>{e.startTime + "-" + e.endTime}</code></td>
                            <td className="border p-3">
                                <span className="text-purple cursor-pointer" onClick={() => setPopup(i)}>
                                    <i className="fa-solid fa-pen-to-square"></i> Edit
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {popup !== -1 && <CampEdit popup={popup} setPopup={setPopup} data={filtered[popup]} />}
        </div>
    );
};

export default Camps;
