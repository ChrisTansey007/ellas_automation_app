// File: flightDataHelpers.js

import { Flight, RawFlightData } from '../customHooks/interfaces'; 


export const convertDataToCSV = (data: Flight[]) => {
    console.log("Data in convertDataToCSV:", data);
    let csvContent = "Flight Number,Origin,Destination,Scheduled Time,Actual Time,Status\n";
    data.forEach(flight => {
        let rowContent = `${flight.flightNumber},${flight.origin},${flight.destination},${flight.scheduledTime},${flight.actualTime},${flight.status}`;
        csvContent += rowContent + "\n";
    });
    return csvContent;
};


export const downloadCSV = (csvContent: string, fileName: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


export const getCurrentTimestamp = () => {
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const suffixes = ["th", "st", "nd", "rd"];

    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const suffix = (day % 10) < 4 && Math.floor(day / 10) !== 1 ? suffixes[day % 10] : suffixes[0];
    const formattedHour = hour % 12 || 12; 
    const formattedMinute = String(minute).padStart(2, '0');
    const amPm = hour < 12 ? 'a.m.' : 'p.m.';

    return `${month} ${day}${suffix}, ${year} : ${formattedHour}:${formattedMinute} ${amPm}`;
};


export const transformFlightData = (rawData: RawFlightData[]): Flight[] => {
    return rawData.map(flight => {
        return {
            flightNumber: flight[0],
            origin: flight[1], 
            destination: flight[1], 
            scheduledTime: flight[2],
            actualTime: flight[3],
            status: flight[4]
        };
    }).filter(flight => flight.flightNumber !== 'Flight'); 
};
