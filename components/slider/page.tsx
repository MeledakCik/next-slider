'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface PlaceholderData {
    fullname: string;
    nominal: string;
    tgl: string;
    jumlahPm: string;
}

export default function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        { id: 1, title: 'Kebersamaan Kita Di', name: 'Rumah Zakat', description: 'Setiap momen bersama sahabat memberikan kebahagiaan untuk mereka yang membutuhkan.', image: 'https://blog.bwa.id/wp-content/uploads/2023/10/Karikatur-zakat-pria-ke-pria-scaled.jpg' },
        { id: 2, title: 'Assalamualaikum', fullname: 'Kak Ahmad Rizki' },
        { id: 3, title: 'Tidak Terasa Waktu Bergerak Cepat' },
        { id: 4, title: 'Tahun 2024', description: 'Adalah momen yang istimewa untuk mempersiapkan masa depan.' },
        { id: 5, title: 'Dengan berbagi sebanyak', jumlahPm: '2000000', tahun: 'Tahun Ini' },
        { id: 6, title: 'Kamu paling besar berbagi pada', tgl: '2024-01-19', nominal: '200000', description: 'Terimakasih, tiada kata yang tepat selain doa terbaik' },
    ];

    const encryptData = useCallback((data: string) => btoa(data), []);
    const decryptData = useCallback((data: string) => {
        try {
            return atob(data);
        } catch {
            return data;
        }
    }, []);

    const insertDataToUrl = useCallback((jsonData: Record<string, string>) => {
        const url = new URL(window.location.href);
        for (const key in jsonData) {
            url.searchParams.set(key, encryptData(jsonData[key]));
        }
        window.history.replaceState(null, "", url.toString());
    }, [encryptData]);

    const getQueryParam = useCallback((param: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get(param);
        return value ? decryptData(value) : "";
    }, [decryptData]);

    const populatePlaceholders = useCallback(() => {
        const placeholders: PlaceholderData = {
            fullname: getQueryParam("fullname") || "Pengguna",
            nominal: formatNominal(getQueryParam("nominal")) || "0",
            tgl: formatDate(getQueryParam("tgl")) || "Hari ini",
            jumlahPm: getQueryParam("jumlahPm") || "banyak",
        };
        console.log(placeholders); // Gunakan jika placeholders diperlukan
    }, [getQueryParam]);

    const formatNominal = (nominal: string) => {
        return nominal ? Number(nominal).toLocaleString("id-ID") : "0";
    };

    const formatDate = (tanggal: string) => {
        if (!tanggal) return "Hari ini";
        const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return new Date(tanggal).toLocaleDateString("id-ID", options);
    };

    useEffect(() => {
        const jsonData = {
            fullname: "Ahmad Rizki",
            nominal: "200000",
            tgl: "2024-01-01",
            jumlahPm: "10",
        };

        if (!window.location.search) {
            insertDataToUrl(jsonData);
        }
        populatePlaceholders();

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [insertDataToUrl, populatePlaceholders, slides.length]);

    return (
        <div className="relative flex justify-center items-center w-full min-h-screen bg-gray-100 overflow-hidden">
            {/* Slides */}
            <div className="relative w-full max-w-4xl h-96 bg-white rounded-lg shadow-lg">
                <div className="absolute top-0 w-full h-2 flex space-x-2">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`flex-1 bg-gray-300 ${index === currentIndex ? 'bg-orange-500' : ''} transition-all duration-500`}
                        />
                    ))}
                </div>

                <div className="relative w-full h-full">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute w-full h-full flex flex-col justify-center items-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <h3 className="text-4xl font-extrabold text-orange-500 mb-2">{slide.title}</h3>
                            {slide.image && <Image src={slide.image} alt={slide.title} width={500} height={500} className="object-cover rounded-lg shadow-lg" />}
                            {slide.description && <p className="mt-4 text-gray-700 text-center max-w-lg">{slide.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
