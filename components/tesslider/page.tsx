'use client';

import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';  // For AES encryption

interface PlaceholderData {
    fullname: string;
    penerima_manfaat: string;
    pro_ramadhan: string;
    pro_qurban: string;
    nominal: string;
    tgl: string;
    jumlahPm: string;
    tahun: string;
    pro_Favorit: string;
}

const secretKey = 'your-strong-secret-key';  // Store in environment variable

export default function VideoStories() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [placeholders, setPlaceholders] = useState<PlaceholderData>({
        fullname: "Pengguna",
        pro_qurban: "Pengguna",
        pro_Favorit: "Pengguna",
        pro_ramadhan: "Pengguna",
        penerima_manfaat: "Pengguna",
        nominal: "0",
        tgl: "Hari ini",
        jumlahPm: "banyak",
        tahun: "2024",
    });


    const encryptData = (data: string) => {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    };

    const decryptData = (data: string) => {
        try {
            const bytes = CryptoJS.AES.decrypt(data, secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } catch {
            return '';
        }
    };

    const formatNominal = (nominal: string) => {
        const numericNominal = Number(nominal.replace(/[^0-9.-]+/g, ""));
        return isNaN(numericNominal) ? "0" : numericNominal.toLocaleString();
    };

    const formatDate = (tanggal: string) => {
        const date = new Date(tanggal);
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString("id-ID", options);
    };

    const insertDataToUrl = (jsonData: Record<string, string>) => {
        const url = new URL(window.location.href);
        for (const key in jsonData) {
            if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
                url.searchParams.set(key, encryptData(jsonData[key]));
            }
        }
        window.history.replaceState(null, "", url.toString());
    };

    const getQueryParam = (param: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get(param);
        return value ? decryptData(value) : "";
    };

    const populatePlaceholders = () => {
        const newPlaceholders: PlaceholderData = {
            fullname: getQueryParam("fullname") || "Pengguna",
            pro_qurban: getQueryParam("pro_qurban") || "Pengguna",
            pro_ramadhan: getQueryParam("pro_ramadhan") || "Pengguna",
            pro_Favorit: getQueryParam("pro_Favorit") || "Pengguna",
            penerima_manfaat: getQueryParam("penerima_manfaat") || "Pengguna",
            nominal: getQueryParam("nominal")
                ? formatNominal(getQueryParam("nominal"))
                : "0",
            tgl: getQueryParam("tgl") ? formatDate(getQueryParam("tgl")) : "Hari ini",
            jumlahPm: getQueryParam("jumlahPm") || "banyak",
            tahun: new Date().getFullYear().toString(),
        };
        setPlaceholders(newPlaceholders);
    };

    useEffect(() => {
        const jsonData = {
            fullname: " Ahmad Rizki",
            penerima_manfaat: "kasyaf",
            pro_ramadhan: "Yoww",
            pro_qurban: "Yoi",
            nominal: " 2000000",
            pro_Favorit: "Mantap",
            tgl: " 2024-01-01",
            jumlahPm: " 10",
        };

        if (!window.location.search) {
            insertDataToUrl(jsonData);
        }
        populatePlaceholders();
    }, []);

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '16px',
    };

    const storyContentStyle: React.CSSProperties = {
        position: 'absolute',
        display: 'flex',
        fontSize: '20px',
        top: '400px',
        maxWidth: '400px',
        flexDirection: 'column',
        zIndex: 10,
        color: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    };


    const stories = [
        {
            id: 1,
            type: 'video',
            url: '/bg1.mp4',
            duration: 5000,
        },
        {
            id: 2,
            type: 'video',
            url: '/bg2.mp4',
            duration: 7000,
        },
        {
            id: 3,
            type: 'video',
            url: '/bg3.mp4',
            duration: 7000,
        },
        {
            id: 4,
            type: 'video',
            url: '/bg4.mp4',
            duration: 7000,
        },
        {
            id: 5,
            type: 'video',
            url: '/bg5.mp4',
            duration: 8000,
        },
        {
            id: 6,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Assalamualaikum ',
                description: 'Sahabat ' + placeholders.fullname,
            },
        },
        {
            id: 7,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Tidak Terasa ',
                description: 'Waktu Bergerak Cepat',
            },
        },
        {
            id: 8,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Tidak Terasa Waktu Bergerak Cepat',
            },
        },
        {
            id: 9,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Tahun 2024',
                description: 'Merupakan momen yang istimewa bagi kebersamaan kita dalam menebar manfaat bagi sesama',
            },
        },
        {
            id: 10,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Kita telah membahagikan ' + placeholders.penerima_manfaat,
                description: 'Penerima Manfaat',
            },
        },
        {
            id: 11,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Dan kamu jadi salah satu bagian yang membahagiakan mereka',
            },
        },
        {
            id: 12,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Kamu berbagi sebanyak ' + placeholders.nominal + ' tahun ini',
            },
        },
        {
            id: 13,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Dan paling besar berbagi pada ' + placeholders.tgl,
                description: ' sebanyak ' + placeholders.nominal
            },
        },
        {
            id: 14,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Dan paling sering berbagi pada program ' + placeholders.pro_Favorit,
            },
        },
        {
            id: 15,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Program Ramdahan ' + placeholders.pro_ramadhan,
            },
        },
        {
            id: 16,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: 'Program Qurban ' + placeholders.pro_qurban,
            },
        },
        {
            id: 17,
            type: 'video',
            url: '/bglanjutan.mp4',
            duration: 4000,
            content: {
                title: "Terimakasih, tiada kata yang tepat selain do'a terbaik",
                description_italic: "Jazakumullah khairan katsiran",
            },
        },
        {
            id: 18,
            type: 'image',
            url: '/bgakhir.png',
            duration: 4000,
        },
    ];

    const handleAllStoriesEnd = () => {
        window.location.href = 'https://www.rumahzakat.org/';
    };


    return (
        <div style={containerStyle}>
            <Stories
                width="450px"
                height="850px"
                stories={stories}
                currentIndex={currentIndex}
                onStoryChange={setCurrentIndex}
                onAllStoriesEnd={handleAllStoriesEnd} 
            />
            {stories.map((story, index) => (
                <div
                    key={story.id}
                    style={{
                        ...storyContentStyle,
                        display: index === currentIndex ? 'block' : 'none',
                    }}
                >
                    {story.content && (
                        <div
                            className={`absolute right-[50px] font-extrabold h-[750px] w-[300px] max-w-[300px] transition-all duration-500 ease-in-out ${index === currentIndex ? 'fade-in' : 'fade-out'
                                }`}
                        >
                            <h2 className="text-2xl mb-2">{story.content.title}</h2>
                            {story.content.description && <h2 className="text-lg mb-2">{story.content.description}</h2>}
                            {story.content.description_italic && <h3 className="italic text-sm top-[200px]">{story.content.description_italic}</h3>}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
