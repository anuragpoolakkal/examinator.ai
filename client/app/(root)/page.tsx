"use client";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<main className="flex items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tr from-[#6c63ff] to-[#20bee9]">
			ExaminatorAI
			<button className="btn btn-primary">HEHEHHE</button>
		</main>
	);
}
