import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CompareBar from '../CompareBar';
import WhatsAppButton from '../WhatsAppButton';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <CompareBar />
            <WhatsAppButton 
                phoneNumber="6282189905173" 
                message="Hi Flymora! I'm interested in your tour packages. Can you help me?"
            />
        </div>
    );
}
