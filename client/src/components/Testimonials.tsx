"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        content: "This platform completely transformed my career trajectory. The courses are not only incredibly detailed but also structured in a way that makes complex topics easy to grasp. The blend of theory and practical examples helped me build real-world skills that I now use daily in my role.",
        image: "https://images.pexels.com/photos/7915359/pexels-photo-7915359.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "John Doe",
        role: "Software Engineer at TechCorp",
    },
    {
        content: "Taking the AI course was a life-changing experience for me. The course materials were expertly crafted, with clear explanations and engaging examples that demystified advanced AI concepts. I also appreciated the mentorship and community support, which kept me motivated throughout my learning journey.",
        image: "https://images.pexels.com/photos/8442511/pexels-photo-8442511.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "Jane Smith",
        role: "Data Scientist at DataWave",
    },
    {
        content: "The platform exceeded my expectations in every way. The hands-on projects and comprehensive resources allowed me to apply what I was learning immediately. The instructors are top-notch, and the real-world scenarios provided during the course gave me a competitive edge.",
        image: "https://images.pexels.com/photos/30387751/pexels-photo-30387751/free-photo-of-young-woman-posing-on-a-cloudy-day-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "Jennifer Lee",
        role: "Cloud Architect at SkyNet Solutions",
    },
];

const Testimonials = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="landing__testimonials"
        >
            <h2 className="landing__testimonials-title">What Our Subscribers Are Saying</h2>
            <p className="landing__testimonials-description">
                Hear from professionals who have achieved success through our platform.  
            </p>
            <div className="landing__testimonials-grid">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ amount: 0.4 }}
                        className="landing__testimonial-card"
                    >
                        <p className="landing__testimonial-content">{`"${testimonial.content}"`}</p>
                        <div className="landing__testimonial-author-info">
                            <Image 
                                src={testimonial.image}
                                alt={testimonial.author}
                                width={100}
                                height={100}
                                objectFit="cover"
                                className="landing__testimonial-author-image"
                            />
                            <div>
                                <p className="landing__testimonial-author">{testimonial.author}</p>
                                <p className="landing__testimonial-role">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default Testimonials;