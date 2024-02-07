"use client";
import { MainContext } from "@/app/context/context";
import { UploadDropzone } from "@/app/utils/uploadthing";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FiArrowLeft, FiCheckCircle, FiClock, FiDownload, FiEdit, FiExternalLink, FiFileText, FiHash, FiKey, FiPrinter, FiSettings, FiStar, FiType } from "react-icons/fi";

export default function Home() {
	const { examId } = useParams();

	const [selectedTab, setSelectedTab] = useState(0);

	const { getExam, examData } = useContext(MainContext);

	useEffect(() => {
		getExam(examId);
	}, [examId]);

	return (
		<main className="w-screen h-screen bg-base-100 flex flex-col p-5 overflow-auto box-border">
			<div className="print flex items-center text-xl font-semibold"><button className="btn btn-square mr-2" onClick={() => window.history.back()}><FiArrowLeft /></button><FiFileText className="mr-2" /> {examData?.name} | {examData?.course?.name} ({examData?.course?.code})</div>
			<div className="flex w-full h-full mt-5">
				<div className="w-full flex flex-col">
					<div className="print flex justify-between items-center">
						<div role="tablist" className="tabs tabs-boxed">
							<a onClick={() => setSelectedTab(0)} role="tab" className={"tab " + (selectedTab === 0 ? "tab-active" : "")}><FiFileText className="mr-2" /> Question Paper</a>
							<a onClick={() => setSelectedTab(1)} role="tab" className={"tab " + (selectedTab === 1 ? "tab-active" : "")}><FiKey className="mr-2" /> Answer Key</a>
						</div>
						<button className="btn btn-primary" onClick={()=>window.print()}><FiPrinter /> Download / Print</button>
					</div>
					<div className="overflow-y-auto">
						{
							selectedTab === 0 ? <div className="flex flex-col">
								<div className="flex flex-col items-center w-full mt-10"	>
									<p className="text-2xl mb-2">{examData?.name}</p>
									<p className="text-xl font-semibold">Course Code: {examData?.course?.code}</p>
									<p className="text-xl font-semibold">Course Name: {examData?.course?.name}</p>
									<div className="flex justify-between w-full mb-5">
										<p className="text-lg">Max Marks: {examData?.totalMarks}</p>
										<p className="text-lg">Duration: {examData?.duration} min</p>
									</div>
								</div>
								{
									examData?.questionPaper?.map((question: any, index: number) => {
										return (
											<div key={index} className="flex my-4">
												<p className="text-lg">{index + 1}. {question?.question}</p>
												<p className="text-lg mx-10">({question?.marks})</p>
											</div>
										);
									})
								}
							</div> : <div className="flex flex-col">
								<div className="flex flex-col items-center w-full mt-10">
									<p className="text-2xl mb-2">{examData?.name}</p>
									<p className="text-xl font-semibold">Course Code: {examData?.course?.code}</p>
									<p className="text-xl font-semibold">Course Name: {examData?.course?.name}</p>
									<p className="text-2xl font-semibold my-5">ANSWER KEYS</p>
									<div className="flex justify-between w-full mb-5">
										<p className="text-lg">Max Marks: {examData?.totalMarks}</p>
										<p className="text-lg">Duration: {examData?.duration} min</p>
									</div>
								</div>
								{
									examData?.answerKey?.map((question: any, index: number) => {
										return (
											<div key={index} className="flex my-4">
												<p className="text-lg">{index + 1}. {question?.answer}</p>
											</div>
										);
									})
								}
							</div>
						}
					</div>
				</div>
				<div className="print divider divider-horizontal"></div>
				<div className="print w-full flex flex-col">
					<div className="flex justify-between"><Link href={"/review/123456"}><button className="btn btn-primary"><FiCheckCircle /> Review Answer Sheets</button></Link>
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
