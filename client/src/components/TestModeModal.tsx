"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const TestModeModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false);
        }, 10000); // Auto-close after 30 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                    <motion.div 
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
                        className="bg-customgreys-secondarybg p-6 rounded-md flex flex-col gap-3 w-[26rem] max-w-[90%]"
                    >
                        <h3 className="text-lg text-white-100 font-semibold">Test Mode</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2 items-center">
                                <p>
                                    Notice: This application is currently in test mode. You may use dummy card details to complete transactions for testing purposes.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-white-100 font-semibold">Test Card Details:</p>
                                <div>
                                    <p>Card number: 4242 4242 4242 4242</p>
                                    <p>Expiration date: 03/33</p>
                                    <p>Security code: 333</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions">
                            <Button
                                className="mt-4 px-4 py-2 bg-primary-700 hover:bg-primary-700/80 text-white rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TestModeModal;