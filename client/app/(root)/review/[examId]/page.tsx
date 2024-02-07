"use client";
import { MainContext } from "@/app/context/context";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FiArrowLeft, FiFile, FiFileText, FiKey, FiPrinter, FiUser } from "react-icons/fi";

export default function Home() {
	const { examId } = useParams();

	const { getValuations, valuations } = useContext(MainContext);

	const [selectedStudent, setSelectedStudent] = useState(0);
	const [selectedTab, setSelectedTab] = useState(2);

	useEffect(() => {
		getValuations(examId);
	}, []);

	return (
		<main className="w-screen h-screen bg-base-100 flex flex-col p-5 overflow-auto box-border">
			<div className="print flex items-center text-xl font-semibold"><button className="btn btn-square mr-2" onClick={() => window.history.back()}><FiArrowLeft /></button><FiFileText className="mr-2" /> Review Evaluation</div>
			<div className="print flex items-center mt-5">
				<p className="flex items-center mr-5"><FiUser className="mr-2" /> Student:</p>
				<select className="select select-bordered w-full max-w-xs" value={selectedStudent} onChange={(x) => setSelectedStudent(parseInt(x.target.value))}>
					{
						valuations?.valuations?.map((valuation: any, index: number) => {
							return (
								<option key={index} value={index}>{index + 1}. {valuation?.data?.student_name}</option>
							);
						})
					}
				</select>
			</div>
			<div className="flex w-full h-full mt-5">
				<div className="w-full flex flex-col">
					<div className="print flex justify-between items-center">
						<div role="tablist" className="tabs tabs-boxed">
							<a onClick={() => setSelectedTab(2)} role="tab" className={"tab " + (selectedTab === 2 ? "tab-active" : "")}><FiFileText className="mr-2" /> Answer Sheet</a>
							<a onClick={() => setSelectedTab(0)} role="tab" className={"tab " + (selectedTab === 0 ? "tab-active" : "")}><FiFileText className="mr-2" /> Question Paper</a>
							<a onClick={() => setSelectedTab(1)} role="tab" className={"tab " + (selectedTab === 1 ? "tab-active" : "")}><FiKey className="mr-2" /> Answer Key</a>
						</div>
						<button className="btn btn-primary" onClick={() => window.print()}><FiPrinter /> Download / Print</button>
					</div>
					<div className="overflow-y-auto mt-5">
						{
							selectedTab === 0 ? <div className="flex flex-col">
								<div className="flex flex-col items-center w-full mt-10">
									<p className="text-2xl mb-2">{valuations?.exam?.name}</p>
									<p className="text-xl font-semibold">Course Code: {valuations?.exam?.course?.code}</p>
									<p className="text-xl font-semibold">Course Name: {valuations?.exam?.course?.name}</p>
									<div className="flex justify-between w-full mb-5">
										<p className="text-lg">Max Marks: {valuations?.exam?.totalMarks}</p>
										<p className="text-lg">Duration: {valuations?.exam?.duration} min</p>
									</div>
								</div>
								{
									valuations?.exam?.questionPaper?.map((question: any, index: number) => {
										return (
											<div key={index} className="flex my-4">
												<p className="text-lg">{index + 1}. {question?.question}</p>
												<p className="text-lg mx-10">({question?.marks})</p>
											</div>
										);
									})
								}
							</div> : selectedTab === 1 ? <div className="flex flex-col">
								<div className="flex flex-col items-center w-full mt-10">
									<p className="text-2xl mb-2">{valuations?.exam?.name}</p>
									<p className="text-xl font-semibold">Course Code: {valuations?.exam?.course?.code}</p>
									<p className="text-xl font-semibold">Course Name: {valuations?.exam?.course?.name}</p>
									<p className="text-2xl font-semibold my-5">ANSWER KEYS</p>
									<div className="flex justify-between w-full mb-5">
										<p className="text-lg">Max Marks: {valuations?.exam?.totalMarks}</p>
										<p className="text-lg">Duration: {valuations?.exam?.duration} min</p>
									</div>
								</div>
								{
									valuations?.exam?.answerKey?.map((question: any, index: number) => {
										return (
											<div key={index} className="flex my-4">
												<p className="text-lg">{index + 1}. {question?.answer}</p>
											</div>
										);
									})
								}
							</div> : valuations?.valuations ? <img src={valuations?.valuations[selectedStudent]?.answerSheet} /> : ""
						}
					</div>
				</div>
				<div className="print divider divider-horizontal"></div>
				<div className="print w-full flex flex-col">
				</div>
			</div>
		</main>
	);
}
