"use client";
import { Context } from '@/app/context/context';
import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<Context>{children}<ToastContainer /></Context>)
}