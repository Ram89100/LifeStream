import React from "react";
import banner from "../../assets/banner.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.jpg";
import d1 from "../../assets/donation/d1.png";
import d2 from "../../assets/donation/d2.png";
import d3 from "../../assets/donation/d3.png";
import d4 from "../../assets/donation/d4.png";

const Home = () => {
    const bloodDonationType = [
        { blood: "A+", donate: "A+, AB+", receive: "A+, A-, O+, O-" },
        { blood: "O+", donate: "O+, A+, B+, AB+", receive: "O+, O-" },
        { blood: "B+", donate: "B+, AB+", receive: "B+, B-, O+, O-" },
        { blood: "AB+", donate: "AB+", receive: "Everyone" },
        { blood: "A-", donate: "A+, A-, AB+, AB-", receive: "A-, O-" },
        { blood: "O-", donate: "Everyone", receive: "O-" },
        { blood: "B-", donate: "B+, B-, AB+, AB-", receive: "B-, O-" },
        { blood: "AB-", donate: "AB+, AB-", receive: "AB-, A-, B-, O-" },
    ];
    const bloodDonationProcess = [
        {
            title: "Sign-Up",
            img: d1,
            description:
                "The first step is to register as a donor by providing your personal information, including contact details and medical history. You may also need to fill out additional forms or answer a few questions to verify your eligibility for blood donation, ensuring your safety and the recipient's well-being.",
        },
        {
            title: "Medical Screening",
            img: d2,
            description:
                "Prior to donating blood, donors undergo a health assessment to ensure they are fit for donation. This includes checking vital signs such as blood pressure, temperature, and hemoglobin levels. You will also be asked about recent travel, current medications, and other relevant health factors.",
        },
        {
            title: "The Donation",
            img: d3,
            description:
                "Once cleared, the donation process takes around 10 to 15 minutes. A pint of blood is collected using sterile equipment, and the process is supervised by experienced medical personnel to ensure the donor’s safety throughout the procedure.",
        },
        {
            title: "Saving Lives",
            img: d4,
            description:
                "After donation, the blood is carefully tested for safety and compatibility. It is then stored and distributed to hospitals and clinics where it is used to help patients in emergencies, surgeries, and medical treatments. Your single donation has the potential to save multiple lives, making a huge difference to those in need.",
        },
    ];

    return (
        <div className="dark:text-white-900">
            <img src={banner} alt="LifeStream Banner" />
            <div className="grid grid-cols-2 place-items-center mt-6 px-52">
                <div>
                    <img draggable={false} src={banner2} width="100%" alt="LifeStream" />
                </div>
                <div>
                    <p className="text-center font-bold text-4xl text-gray-dark dark:text-white-900">
                        "Donating blood is not only a generous act but a life-saving one."
                    </p>
                    <p className="text-center text-lg text-gray-dark dark:text-gray-light">
                        - Karl Landsteiner
                    </p>
                </div>
            </div>
            <h1 className="font-bold text-center text-blood my-4 text-lg underline">
                Why Donate Blood?
            </h1>
            <div className="flex px-20">
                <div>
                    <img src={banner3} width="100%" alt="Blood Donation" />
                    <p className="text-center">
                        <code>
                            Your body quickly replenishes the blood after donation. The process boosts the production of new blood cells, supporting your overall health and wellness.
                        </code>
                    </p>
                </div>
                <div>
                    <table className="w-max" cellPadding={5}>
                        <tr>
                            <td
                                colSpan={3}
                                className="border bg-blood text-white-900 text-center font-bold"
                            >
                                Blood Type Compatibility Chart
                            </td>
                        </tr>
                        <tr>
                            <th className="border w-max text-lg text-center">Blood Type</th>
                            <th className="border w-max text-lg text-center">
                                Eligible Donors
                            </th>
                            <th className="border w-max text-lg text-center">
                                Eligible Recipients
                            </th>
                        </tr>
                        {bloodDonationType.map((e) => {
                            return (
                                <tr key={e.blood}>
                                    <td className="border w-max text-lg text-center">
                                        {e.blood}
                                    </td>
                                    <td className="border w-max text-lg text-center">
                                        {e.donate}
                                    </td>
                                    <td className="border w-max text-lg text-center">
                                        {e.receive}
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </div>
            <p className="text-xl underline font-bold text-blood text-center mt-5 mb-5">
                The Donation Journey
            </p>
            <div className="grid grid-cols-2 place-items-center">
                {bloodDonationProcess.map((e, i) => (
                    <div className="border-metal shadow-md rounded-lg overflow-hidden max-w-[90%] select-none grid grid-cols-2" key={i}>
                        <div>
                            <img src={e.img} draggable={false} width="100%" alt={e.title} />
                        </div>
                        <div className="m-4">
                            <h1 className="font-bold text-lg text-midnight dark:text-white-900">
                                {i + 1} - {e.title}
                            </h1>
                            <p className="text-justify">{e.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <div className="w-full bg-blood text-white-900 h-max text-sm text-center font-bold">
                <code>
                    🩸 LifeStream @ {new Date().getFullYear()} 🩸 || Crafted with passion by
                     Ram 
                </code>
            </div>
        </div>
    );
};

export default Home;
