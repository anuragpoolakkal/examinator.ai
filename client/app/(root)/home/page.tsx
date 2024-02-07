"use client";
import { MainContext } from "@/app/context/context";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiClock, FiEdit, FiExternalLink, FiFileText, FiHash, FiStar, FiType } from "react-icons/fi";

export default function Home() {
	const {
		selectedCourse,
		courses,
		getExams,
		exams,
		newExamName,
		setNewExamName,
		newExamDuration,
		setNewExamDuration,
		newExamTotalMarks,
		setNewExamTotalMarks,
		newExamPrompt,
		setNewExamPrompt,
		createExam
	} = useContext(MainContext);

	return (
		<main className="flex flex-col p-5 overflow-y-auto w-full">
			<div className="flex items-center text-xl font-semibold"><FiFileText className="mr-2" /> {courses[selectedCourse]?.name} ({courses[selectedCourse]?.code})</div>
			<div className="flex flex-wrap mt-7">
				<div className="flex flex-col mr-10">
					<div className="flex items-center text-lg font-semibold mb-5"><FiFileText className="mr-2" /> Syllabus</div>
					<img className="w-24 h-24 border rounded-xl" src={courses[selectedCourse]?.syllabus} />
				</div>
				<div className="divider lg:divider-horizontal"></div>
				<div className="flex flex-col mr-10">
					<div className="flex items-center text-lg font-semibold mb-5"><FiFileText className="mr-2" /> Course Outcomes</div>
					<img className="w-24 h-24 border rounded-xl" src={courses[selectedCourse]?.courseOutcome} />
				</div>
				<div className="divider lg:divider-horizontal"></div>
				<div className="flex flex-col mr-10">
					<div className="flex items-center text-lg font-semibold mb-5"><FiFileText className="mr-2" /> Textbook</div>
					<img className="w-24 h-24 border rounded-xl" src={courses[selectedCourse]?.textBook} />
				</div>
				<div className="divider lg:divider-horizontal"></div>
				<div className="flex flex-col mr-10">
					<div className="flex items-center text-lg font-semibold mb-5"><FiFileText className="mr-2" /> Previous Question papers</div>
					<img className="w-24 h-24 border rounded-xl" src={courses[selectedCourse]?.prevYearQns} />
				</div>
			</div>
			<div className="mt-10 flex items-center text-xl font-semibold"><FiFileText className="mr-2" /> Exams</div>
			<div className="flex mt-5">
				<label htmlFor="newexam_modal" className="btn btn-primary">+ NEW EXAM</label>
			</div>
			<table className="table">
				{/* head */}
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Total Marks</th>
						<th>Questions</th>
						<th>Duration</th>
						<th>View</th>
					</tr>
				</thead>
				<tbody>
					{
						exams?.map((exam: any, index: number) => (
							<tr>
								<th>{index + 1}</th>
								<td>{exam?.name}</td>
								<td>{exam?.totalMarks}</td>
								<td>{exam?.questionPaper?.length ?? "-"}</td>
								<td>{exam?.duration} min</td>
								<td><Link href={"/exam/" + exam?._id}><button className="btn btn-primary btn-square"><FiExternalLink /></button></Link></td>
							</tr>
						))
					}
				</tbody>
			</table>
			{/* New Exam Modal */}
			<input type="checkbox" id="newexam_modal" className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box">
					<h3 className="flex items-center font-bold text-lg"><FiFileText className="mr-1" /> New Exam</h3>
					<p className="flex items-center py-4"><FiType className='mr-2' />Exam Name</p>
					<input className="input input-bordered w-full" placeholder="Exam Name" type="text" value={newExamName} onChange={(x) => { setNewExamName(x.target.value) }} />
					<p className="flex items-center py-4"><FiClock className='mr-2' />Duration</p>
					<div className="flex items-center"><input className="input input-bordered" placeholder="Duration" type="number" value={newExamDuration} onChange={(x) => { setNewExamDuration(parseInt(x.target.value)) }} /><p className="ml-5">min</p></div>
					<p className="flex items-center py-4"><FiStar className='mr-2' />Total Marks</p>
					<input className="input input-bordered w-full" placeholder="Total marks" type="number" value={newExamTotalMarks} onChange={(x) => { setNewExamTotalMarks(parseInt(x.target.value)) }} />
					<p className="flex items-center py-4"><FiEdit className='mr-2' />Prompt (optional)</p>
					<textarea className="textarea textarea-bordered w-full" placeholder="Prompt" value={newExamPrompt} onChange={(x) => setNewExamPrompt(x.target.value)}></textarea>
					<div className="modal-action">
						<label htmlFor="newexam_modal" className="btn">Cancel</label>
						<label htmlFor="newexam_modal" className="btn btn-primary" onClick={() => createExam()}>Create Exam</label>
					</div>
				</div>
				<label className="modal-backdrop" htmlFor="newexam_modal">Cancel</label>
				{/* <label ref={newDocumentModalRef} htmlFor="newexam_modal" hidden></label> */}
			</div>
		</main>
	);
}
