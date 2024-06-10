import Image from "next/image";
import React from "react";

export default function QRPage() {
  return (
    <div className="flex-center flex-col h-[100dvh]">
      <h1>Scan to view on Mobile</h1>
      <Image src={"/payreviewqr.png"} alt="qr code" width={256} height={256} />
    </div>
  );
}
