"use client";
import { useParams } from "next/navigation";

export default function Home() {
	const { valuationId } = useParams();

	return (
		<main className="w-screen h-screen bg-base-100 flex flex-col p-5 overflow-auto box-border">
			Review Page
		</main>
	);
}
