"use client";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiCheckCircle, FiClock, FiDownload, FiEdit, FiExternalLink, FiFileText, FiHash, FiKey, FiSettings, FiStar, FiType } from "react-icons/fi";

export default function Home() {
	const { examId } = useParams();

	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<main className="w-screen h-screen bg-base-100 flex flex-col p-5 overflow-auto box-border">
			<div className="flex items-center text-xl font-semibold"><button className="btn btn-square mr-2" onClick={() => window.history.back()}><FiArrowLeft /></button><FiFileText className="mr-2" /> Compiler Design (CODE) | Exam Name</div>
			<div className="flex w-full h-full mt-5">
				<div className="w-full flex flex-col">
					<div className="flex justify-between items-center">
						<div role="tablist" className="tabs tabs-boxed">
							<a onClick={() => setSelectedTab(0)} role="tab" className={"tab " + (selectedTab === 0 ? "tab-active" : "")}><FiFileText className="mr-2" /> Question Paper</a>
							<a onClick={() => setSelectedTab(1)} role="tab" className={"tab " + (selectedTab === 1 ? "tab-active" : "")}><FiKey className="mr-2" /> Answer Key</a>
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
					<div className="flex items-center text-xl font-semibold my-5"><FiFileText className="mr-2" /> Evaluate Answer Sheets</div>
					<UploadDropzone
						endpoint="media"
						onClientUploadComplete={(res) => {
							var files = [];
							for (const file of res) {
								files.push(file.url);
							}
							// setNewEvaluatorQuestionPapers([...files]);
						}}
						onUploadError={(error: Error) => {
							alert(`ERROR! ${error.message}`);
						}}
					/>
				</div>
			</div>
		</main>
	);
}
