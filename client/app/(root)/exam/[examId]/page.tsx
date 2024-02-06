"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiCheckCircle, FiClock, FiDownload, FiEdit, FiExternalLink, FiFileText, FiHash, FiKey, FiSettings, FiStar, FiType } from "react-icons/fi";

export default function Home() {
	const { examId } = useParams();

	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<main className="w-screen h-screen bg-base-100 flex flex-col p-5 overflow-auto box-border">
			<div className="flex items-center text-xl font-semibold"><FiFileText className="mr-2" /> Compiler Design (CODE) | Exam Name</div>
			<div className="flex w-full h-full mt-5">
				<div className="w-full flex flex-col">
					<div className="flex justify-between items-center">
						<div role="tablist" className="tabs tabs-boxed">
							<a onClick={() => setSelectedTab(0)} role="tab" className={"tab " + (selectedTab === 0 ? "tab-active" : "")}><FiFileText className="mr-2" /> Question Paper</a>
							<a onClick={() => setSelectedTab(1)} role="tab" className={"tab " + (selectedTab === 1 ? "tab-active" : "")}><FiKey className="mr-2" /> Answer Key</a>
							<a onClick={() => setSelectedTab(2)} role="tab" className={"tab " + (selectedTab === 2 ? "tab-active" : "")}><FiSettings className="mr-2" /> Evaluate</a>
						</div>
						<button className="btn btn-primary"><FiDownload /> Download</button>
					</div>
					<div className="overflow-y-auto">
						<img className="mt-5 w-full h-full" src={"https://utfs.io/f/b3c9aead-d0d9-4910-9ec6-63138d686cb2-1sa31.jpeg"} />
					</div>
				</div>
				<div className="divider divider-horizontal"></div>
				<div className="w-full flex flex-col">
					<div className="flex justify-between"><button className="btn btn-primary"><FiCheckCircle /> Review Answer Sheets</button>
						<button className="btn btn-primary"><FiFileText /> View Mark Sheet</button>
					</div>
				</div>
			</div>
		</main>
	);
}