import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function QRPage() {
  return (
    <div className="flex-center flex-col h-[100dvh] w-full">
      <h1>Scan to view on Mobile</h1>
      <Image src={"/payreviewqr.png"} alt="qr code" width={256} height={256} />
      <br />
      <p>
        <Link href="/upload">
          <Button>Or proceed via Desktop here</Button>
        </Link>
      </p>
    </div>
  );
}
