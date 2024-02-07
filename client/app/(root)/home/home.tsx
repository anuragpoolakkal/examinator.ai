"use client";
import { useContext, useEffect, useState } from "react";
import { FiPlus, FiUser, FiFileText, FiEdit, FiTrash, FiType, FiHash } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { MainContext } from "@/app/context/context";

export default function Home({
    children,
}: {
    children: React.ReactNode
}) {
    const { getCourses,
        courses,
        selectedCourse,
        setSelectedCourse,
        newCourseName,
        setNewCourseName,
        newCourseCode,
        setNewCourseCode,
        newCourseSyllabus,
        setNewCourseSyllabus,
        newCourseOutcomes,
        setNewCourseOutcomes,
        newCourseTextbook,
        setNewCourseTextbook,
        newCourseQuestionPapers,
        setNewCourseQuestionPapers,
        createCourse,
        getExams
    } = useContext(MainContext);

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        getCourses();
        setSelectedCourse(0);
        getExams();
    }, []);

    return (
        <main className="flex bg-base-100 h-screen w-screen max-sm:p-0" onClick={() => {
            // if (moreMenuOpen) setMoreMenuOpen(false);
        }}>
            {/* Sidebar */}
            <div className={'flex flex-col p-5 min-w-[275px] max-w-[15vw] h-full rounded-md ' + (!showMenu ? "max-sm:hidden " : "max-sm:fixed max-sm:w-full max-sm:h-full max-sm:max-w-none bg-base-100 max-sm:z-50 ")}>
                <div className="flex justify-between items-center max-sm:mb-4">
                    <Link href="/"><div className="mb-5 font-semibold max-sm:mb-3" onClick={() => { }}>🤖 ExaminatorAI 📝</div></Link>
                    <div className="hidden max-sm:flex justify-end mb-3">
                        <button className="btn btn-square btn-sm" onClick={() => setShowMenu(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>
                <label className='btn btn-primary' htmlFor={"newcourse_modal"} onClick={() => { }}><FiPlus /> NEW COURSE</label>
                <div className='p-0 my-2 h-full w-full overflow-hidden hover:overflow-y-auto'>
                    {courses?.map((course: any, i: number) => {
                        return <div className={(selectedCourse === i ? ' bg-base-200 ' : ' bg-transparent hover:bg-base-200 ') + 'cursor-pointer flex flex-col px-3 py-2 rounded-md w-full mb-1'} onClick={() => {
                            setSelectedCourse(i); setShowMenu(false);
                        }}>
                            <div className='flex justify-start items-center'>
                                <div className='w-fit mr-2'>
                                    <FiFileText />
                                </div>
                                <div className='flex flex-col items-start'>
                                    <p className='text-sm text-ellipsis line-clamp-1 font-semibold'>{course?.name}</p>
                                </div>
                            </div>
                            {selectedCourse === i ?
                                <div className='flex mt-2'>
                                    <label htmlFor='editevaluator_modal' className='cursor-pointer flex justify-center items-center w-full p-2 bg-base-300 rounded-md mr-1 hover:bg-gray-500 hover:text-white' onClick={() => { }}>
                                        <FiEdit /><p className='ml-2 text-xs'>Edit</p>
                                    </label>
                                    <label htmlFor='deleteevaluator_modal' className='cursor-pointer flex justify-center items-center w-full p-2 bg-base-300 rounded-md hover:bg-red-500 hover:text-white'>
                                        <FiTrash /><p className='ml-2 text-xs'>Delete</p>
                                    </label>
                                </div> : ""}
                        </div>
                    })
                    }
                </div>
                <hr />
                <div tabIndex={0} className='cursor-pointer dropdown dropdown-top flex items-center hover:bg-base-200 p-2 rounded-lg'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center'>
                            <div className="avatar placeholder mr-2">
                                <div className="bg-blue-700 text-white mask mask-squircle w-10">
                                    <span><FiUser /></span>
                                </div>
                            </div>
                            <p className='font-semibold'>{"AHAHA"}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main */}
            {children}
            {/* New Course Modal */}
            <input type="checkbox" id="newcourse_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="flex items-center font-bold text-lg"><FiFileText className="mr-1" /> New Course</h3>
                    <p className="flex items-center py-4"><FiType className='mr-2' />Course Name</p>
                    <input className="input input-bordered w-full" placeholder="Course Name" type="text" onChange={(x) => setNewCourseName(x.target.value)} value={newCourseName} />
                    <p className="flex items-center py-4"><FiHash className='mr-2' />Course Code</p>
                    <input className="input input-bordered w-full" placeholder="Course Code" type="text" onChange={(x) => setNewCourseCode(x.target.value)} value={newCourseCode} />
                    <p className="flex items-center py-4"><FiFileText className='mr-2' />Course Syllabus</p>
                    {newCourseSyllabus ?
                        <div className="flex flex-wrap">{
                            <img src={newCourseSyllabus} className="border cursor-pointer w-20 h-20 object-cover rounded-md mr-2 mb-2" onClick={() => window.open(newCourseSyllabus)} />
                        }</div>
                        : <UploadDropzone
                            endpoint="media"
                            onClientUploadComplete={(res) => {
                                var files = [];
                                for (const file of res) {
                                    files.push(file.url);
                                }

                                setNewCourseSyllabus(files[0]);
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />}
                    <p className="flex items-center py-4"><FiFileText className='mr-2' />Course Outcomes</p>
                    {newCourseOutcomes ?
                        <div className="flex flex-wrap">{
                            <img src={newCourseOutcomes} className="border cursor-pointer w-20 h-20 object-cover rounded-md mr-2 mb-2" onClick={() => window.open(newCourseOutcomes)} />
                        }</div>
                        : <UploadDropzone
                            endpoint="media"
                            onClientUploadComplete={(res) => {
                                var files = [];
                                for (const file of res) {
                                    files.push(file.url);
                                }

                                setNewCourseOutcomes(files[0]);
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />}
                    <p className="flex items-center py-4"><FiFileText className='mr-2' />Textbook</p>
                    {newCourseTextbook ?
                        <div className="flex flex-wrap">{
                            <img src={newCourseTextbook} className="border cursor-pointer w-20 h-20 object-cover rounded-md mr-2 mb-2" onClick={() => window.open(newCourseTextbook)} />
                        }</div>
                        : <UploadDropzone
                            endpoint="media"
                            onClientUploadComplete={(res) => {
                                var files = [];
                                for (const file of res) {
                                    files.push(file.url);
                                }

                                setNewCourseTextbook(files[0]);
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />}
                    <p className="flex items-center py-4"><FiFileText className='mr-2' />Previous Question Papers (optional)</p>
                    {newCourseQuestionPapers ?
                        <div className="flex flex-wrap">{
                            <img src={newCourseQuestionPapers} className="border cursor-pointer w-20 h-20 object-cover rounded-md mr-2 mb-2" onClick={() => window.open(newCourseQuestionPapers)} />
                        }</div>
                        :
                        <UploadDropzone
                            endpoint="media"
                            onClientUploadComplete={(res) => {
                                var files = [];
                                for (const file of res) {
                                    files.push(file.url);
                                }

                                setNewCourseQuestionPapers(files[0]);
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    }
                    <div className="modal-action">
                        <label htmlFor="newcourse_modal" className="btn">Cancel</label>
                        <label htmlFor="newcourse_modal" className="btn btn-primary" onClick={() => createCourse()}>Create Course</label>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="newcourse_modal">Cancel</label>
                {/* <label ref={newDocumentModalRef} htmlFor="newcourse_modal" hidden></label> */}
            </div>
            {/* Delete Evaluator Modal */}
            <input type="checkbox" id="deleteevaluator_modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="flex items-center font-bold text-lg"><FiTrash className="mr-1" /> Delete Evaluator</h3>
                    <p className="py-4">Are you sure want to delete this evaluator?</p>
                    <div className="modal-action">
                        <label htmlFor="deleteevaluator_modal" className="btn">Cancel</label>
                        <label htmlFor="deleteevaluator_modal" className="btn btn-error" onClick={() => { }}>Delete</label>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="deleteevaluator_modal">Cancel</label>
            </div>
        </main >
    );
}