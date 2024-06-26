import axios from "axios";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { serverURL } from "../utils/utils";

const MainContext = createContext<any>(null);

function Context({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const [courses, setCourses] = useState<any>([]);
    const [selectedCourse, setSelectedCourse] = useState(-1);
    const [newCourseName, setNewCourseName] = useState("");
    const [newCourseCode, setNewCourseCode] = useState("");
    const [newCourseSyllabus, setNewCourseSyllabus] = useState("");
    const [newCourseOutcomes, setNewCourseOutcomes] = useState("");
    const [newCourseTextbook, setNewCourseTextbook] = useState("");
    const [newCourseQuestionPapers, setNewCourseQuestionPapers] = useState("");

    const [exams, setExams] = useState<any>([]);
    const [newExamName, setNewExamName] = useState("");
    const [newExamDuration, setNewExamDuration] = useState(0);
    const [newExamTotalMarks, setNewExamTotalMarks] = useState(0);
    const [newExamPrompt, setNewExamPrompt] = useState("");
    const [examData, setExamData] = useState<any>({});

    const getCourses = () => {
        const config = {
            method: "GET",
            url: `${serverURL}/courses`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
        };

        axios(config).then((response) => {
            setCourses(response.data.reverse());
            getExamsByCourseId(response.data[0]?._id);
        }).catch((error) => {
            toast.error("Something went wrong!");
        });
    }

    const createCourse = () => {
        const config = {
            method: "POST",
            url: `${serverURL}/courses`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                name: newCourseName,
                code: newCourseCode,
                syllabus: newCourseSyllabus,
                courseOutcome: newCourseOutcomes,
                textBook: newCourseTextbook,
                prevYearQns: newCourseQuestionPapers,
            }
        };

        axios(config).then((response) => {
            toast.success("Course created successfully!");
            setNewCourseName("");
            setNewCourseCode("");
            setNewCourseSyllabus("");
            setNewCourseOutcomes("");
            setNewCourseTextbook("");
            setNewCourseQuestionPapers("");
            getCourses();
        }).catch((error) => {
            toast.error("Something went wrong!");
        });
    }

    const getExams = () => {
        const config = {
            method: "POST",
            url: `${serverURL}/exams/byCourseId`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                courseId: courses[selectedCourse]?._id
            }
        };

        axios(config).then((response) => {
            setExams(response.data.reverse());
        }).catch((error) => {
            toast.error("Something went wrong!");
        });
    }

    const getExamsByCourseId = (courseId: string) => {
        const config = {
            method: "POST",
            url: `${serverURL}/exams/byCourseId`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                courseId: courseId
            }
        };

        axios(config).then((response) => {
            setExams(response.data.reverse());
        }).catch((error) => {
            toast.error("Something went wrong!");
        });
    }

    const [creatingExam, setCreatingExam] = useState(false);

    const createExam = () => {
        setCreatingExam(true);
        const config = {
            method: "POST",
            url: `${serverURL}/exams`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                courseId: courses[selectedCourse]?._id,
                name: newExamName,
                duration: newExamDuration,
                totalMarks: newExamTotalMarks,
                prompt: newExamPrompt
            }
        };

        axios(config).then((response) => {
            setCreatingExam(false);
            toast.success("Exam created successfully!");
            setNewExamName("");
            setNewExamDuration(0);
            setNewExamTotalMarks(0);
            setNewExamPrompt("");
            getExams();
            window.location.href = "/exam/" + response.data._id;
        }).catch((error) => {
            setCreatingExam(false);
            toast.error("Something went wrong!");
        });
    }

    const getExam = (examId: string) => {
        const config = {
            method: "GET",
            url: `${serverURL}/exams/${examId}`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
        };

        axios(config).then((response) => {
            setExamData(response.data);
        }).catch((error) => {
            toast.error("Something went wrong!");
        });
    }

    const [evaluating, setEvaluating] = useState(false);

    const evaluate = (examId: string, answerSheet: any) => {
        setEvaluating(true);
        const config = {
            method: "POST",
            url: `${serverURL}/valuators/valuate`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                examId: examId,
                answerSheet: answerSheet
            }
        };

        axios(config).then((response) => {
            setEvaluating(false);
            toast.success("Answer sheet evaluated successfully!");
            window.location.href = "/review/" + examId;
        }).catch((error) => {
            setEvaluating(false);
            toast.error("Something went wrong!");
        });
    }

    const [valuations, setValuations] = useState<any>([]);

    const getValuations = (examId: string) => {
        const config = {
            method: "POST",
            url: `${serverURL}/valuators/valuations`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": `application/json`,
            },
            data: {
                examId: examId,
            }
        };

        axios(config).then((response) => {
            setValuations(response.data);
        }).catch((error) => {
            toast.error("Something went wrong!");
        });
    }

    useEffect(() => {
        getExams();
    }, [selectedCourse]);

    return (
        <MainContext.Provider value={{
            getCourses,
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
            createExam,
            getExam,
            examData,
            evaluate,
            evaluating,
            valuations,
            getValuations,
            creatingExam,
            getExamsByCourseId
        }}>
            {children}
        </MainContext.Provider>
    );
}

export { MainContext, Context };