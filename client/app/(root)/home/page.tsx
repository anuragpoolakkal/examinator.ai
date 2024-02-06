"use client";
import Link from "next/link";
import { FiClock, FiEdit, FiExternalLink, FiFileText, FiHash, FiStar, FiType } from "react-icons/fi";

export default function Home() {
	return (
		<main className="flex flex-col p-5 overflow-y-auto w-full">
			<div className="flex items-center text-xl font-semibold"><FiFileText className="mr-2" /> Compiler Design (CODE)</div>
			<div className="flex flex-wrap mt-7">
				<div className="flex flex-col mr-10">
					<div className="flex items-center text-lg font-semibold mb-5"><FiFileText className="mr-2" /> Syllabus</div>
					<img className="w-24 h-24 border rounded-xl" src={"https://utfs.io/f/b3c9aead-d0d9-4910-9ec6-63138d686cb2-1sa31.jpeg"} />
				</div>
				<div className="divider lg:divider-horizontal"></div>
				<div className="flex flex-col mr-10">
					<div className="flex items-center text-lg font-semibold mb-5"><FiFileText className="mr-2" /> Course Outcomes</div>
					<img className="w-24 h-24 border rounded-xl" src={"https://utfs.io/f/b3c9aead-d0d9-4910-9ec6-63138d686cb2-1sa31.jpeg"} />
				</div>
				<div className="divider lg:divider-horizontal"></div>
				<div className="flex flex-col mr-10">
					<div className="flex items-center text-lg font-semibold mb-5"><FiFileText className="mr-2" /> Textbook</div>
					<img className="w-24 h-24 border rounded-xl" src={"https://utfs.io/f/b3c9aead-d0d9-4910-9ec6-63138d686cb2-1sa31.jpeg"} />
				</div>
				<div className="divider lg:divider-horizontal"></div>
				<div className="flex flex-col mr-10">
					<div className="flex items-center text-lg font-semibold mb-5"><FiFileText className="mr-2" /> Previous Question papers</div>
					<img className="w-24 h-24 border rounded-xl" src={"https://utfs.io/f/b3c9aead-d0d9-4910-9ec6-63138d686cb2-1sa31.jpeg"} />
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
						<th>Duration</th>
						<th>View</th>
					</tr>
				</thead>
				<tbody>
					{
						[...Array(5)].map((exam: any, index: number) => (
							<tr>
								<th>{index + 1}</th>
								<td>Series Test 1</td>
								<td>100</td>
								<td>1 hour</td>
								<td><Link href={"/exam/1234567"}><button className="btn btn-primary btn-square"><FiExternalLink /></button></Link></td>
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
					<input className="input input-bordered w-full" placeholder="Exam Name" type="text" onChange={(x) => { }} />
					<p className="flex items-center py-4"><FiClock className='mr-2' />Duration</p>
					<div className="flex items-center"><input className="input input-bordered" placeholder="Duration" type="number" onChange={(x) => { }} /><p className="ml-5">min</p></div>
					<p className="flex items-center py-4"><FiStar className='mr-2' />Total Marks</p>
					<input className="input input-bordered w-full" placeholder="Total marks" type="number" onChange={(x) => { }} />
					<p className="flex items-center py-4"><FiEdit className='mr-2' />Prompt (optional)</p>
					<textarea className="textarea textarea-bordered w-full" placeholder="Prompt"></textarea>
					<div className="modal-action">
						<label htmlFor="newexam_modal" className="btn">Cancel</label>
						<label htmlFor="newexam_modal" className="btn btn-primary" onClick={() => { }}>Create Exam</label>
					</div>
				</div>
				<label className="modal-backdrop" htmlFor="newexam_modal">Cancel</label>
				{/* <label ref={newDocumentModalRef} htmlFor="newexam_modal" hidden></label> */}
			</div>
		</main>
	);
}
