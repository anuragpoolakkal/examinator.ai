"use client";
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<>{children}<ToastContainer /></>)
}