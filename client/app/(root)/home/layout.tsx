"use client";
import React from 'react';
import Home from './home';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<><Home>{children}</Home><ToastContainer /></>)
}