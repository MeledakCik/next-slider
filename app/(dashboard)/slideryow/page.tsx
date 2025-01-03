"use client";

import dynamic from "next/dynamic";

const Tesslider = dynamic(() => import("@/components/tesslider/page"), { ssr: false });

export default function Page() {
    return <Tesslider />;
}
