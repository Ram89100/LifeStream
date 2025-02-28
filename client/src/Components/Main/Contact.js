import React from 'react';
import contactImg from "../../assets/contactImg.png";

const Contact = () => {
    const data = [
        {
            title: "LifeStream Support", body: [
                "123, MG Road",
                "Bengaluru, Karnataka, India, 560001",
                "+91 9876543210",
                "support@lifestream.com"
            ]
        },
        {
            title: "Administrative Inquiries", body: [
                "456, Brigade Road",
                "Bengaluru, Karnataka, India, 560002",
                "+91 9876543211",
                "admin@lifestream.com"
            ]
        },
        {
            title: "Other Administrative Queries", body: [
                "789, Koramangala",
                "Bengaluru, Karnataka, India, 560034",
                "+91 9876543212",
                "otheradmin@lifestream.com"
            ]
        }
    ];

    return (
        <div className='px-64'><br />
            <h1 className='text-center text-3xl font-bold'>Contact Details</h1><br />
            <div className='flex justify-around'>
                <div>
                    {
                        data.map((e) => {
                            return (
                                <>
                                    <p className='text-xl font-bold underline'>{e.title}</p><br />
                                    <code>
                                        {e.body.map((k) => {
                                            return <p className='text-md'>{k}</p>
                                        })}
                                    </code><br />
                                </>
                            )
                        })
                    }
                </div>
                <div>
                    <img src={contactImg} draggable={false} width="80%" alt="Contact Image" />
                </div>
            </div>
        </div>
    );
}

export default Contact;
