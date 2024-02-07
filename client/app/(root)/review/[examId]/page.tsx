"use client";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiFileText } from "react-icons/fi";

export default function Home() {
	const { examId } = useParams();

	return (
		<main className="w-screen h-screen bg-base-100 flex flex-col p-5 overflow-auto box-border">
			<div className="flex items-center text-xl font-semibold"><button className="btn btn-square mr-2" onClick={() => window.history.back()}><FiArrowLeft /></button><FiFileText className="mr-2" /> Review Evaluation</div>
		</main>
	);
}
