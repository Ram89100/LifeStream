import React, { useState, useEffect } from 'react';
import data from "../../assets/data.json";
import axios from "../Api";

const Camps = () => {
    // ✅ Define state variables properly
    const [state, setState] = useState(0);
    const [district, setDistrict] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [filtered, setFiltered] = useState([]);

    // ✅ Make sure useEffect is aware of the state variables
    useEffect(() => {
        if (!data.states[state] || !data.states[state].districts[district]) return;

        const formattedDate = new Date(date).toISOString().split("T")[0]; // Ensures proper date format

        axios.get(`/camps/allCamps/${data.states[state].state}/${data.states[state].districts[district]}/${formattedDate}`)
            .then((r) => setFiltered(r.data))
            .catch(() => alert("Something went wrong"));
    }, [state, district, date, setFiltered]);  // ✅ Ensure dependencies are correct

    return (
        <div className='px-7'>
            <table cellPadding={7}>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="state" className="font-semibold leading-8">State:<font color="red">*</font></label>
                            <select name="state" id="state" value={state} onChange={(e) => { setState(Number(e.target.value)); setDistrict(0); }} className="w-full p-3 text-md border border-silver rounded">
                                {data.states?.map((e, i) => (
                                    <option key={i} value={i}>{e.state}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <label htmlFor="district" className="font-semibold leading-8">District:<font color="red">*</font></label>
                            <select name="district" id="district" value={district} onChange={(e) => setDistrict(Number(e.target.value))} className="w-full p-3 text-md border border-silver rounded">
                                {data.states[state]?.districts?.map((e, i) => (
                                    <option key={i} value={i}>{e}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <label htmlFor="date" className="font-semibold leading-8">Date:<font color="red">*</font></label>
                            <input type="date" value={date} className="w-full p-3 text-md border border-silver rounded"
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <table className='w-full text-center'>
                <thead>
                    <tr>
                        <th className="p-3 text-md border border-silver rounded">Date</th>
                        <th className="p-3 text-md border border-silver rounded">Camp Name</th>
                        <th className="p-3 text-md border border-silver rounded">Address</th>
                        <th className="p-3 text-md border border-silver rounded">State</th>
                        <th className="p-3 text-md border border-silver rounded">District</th>
                        <th className="p-3 text-md border border-silver rounded">Contact</th>
                        <th className="p-3 text-md border border-silver rounded">Conducted By</th>
                        <th className="p-3 text-md border border-silver rounded">Organized By</th>
                        <th className="p-3 text-md border border-silver rounded">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((e, index) => (
                        <tr key={index}>
                            <td className="p-3 text-md border border-silver rounded">{new Date(e.date).toLocaleDateString()}</td>
                            <td className="p-3 text-md border border-silver rounded">{e.name}</td>
                            <td className="p-3 text-md border border-silver rounded">{e.address}</td>
                            <td className="p-3 text-md border border-silver rounded">{e.state}</td>
                            <td className="p-3 text-md border border-silver rounded">{e.district}</td>
                            <td className="p-3 text-md border border-silver rounded">{e.contact}</td>
                            <td className="p-3 text-md border border-silver rounded">{e.bankId?.name || "N/A"}</td>
                            <td className="p-3 text-md border border-silver rounded">{e.organizer}</td>
                            <td className="p-3 text-md border border-silver rounded"><code>{e.startTime} - {e.endTime}</code></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Camps;
