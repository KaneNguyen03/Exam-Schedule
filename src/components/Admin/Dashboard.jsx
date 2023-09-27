import PropTypes from 'prop-types';

const Dashboard = ({
  classrooms,
  courses,
  teachers,
  students,
  examschedules,
  examslots,
  majors,
  semesters,

}) => {
  return (
    <div>
      <div className=" text-slate-800 font-semibold text-3xl">DashBoard</div>
      <div className="grid grid-cols-2 gap-4 pt-7 m-1">
        <div className="border  border-black rounded-lg cursor-pointer w-64 font-medium text-base ">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-13 w-14 bg-pink-800 rounded-lg"
              >
                <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </span>
            <div>
              <h4>Proctoring</h4>
              <p>{teachers?.length}</p>
            </div>
          </div>
        </div>
        <div className=" border  border-black rounded-lg cursor-pointer w-64 font-medium text-base  ">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-13 w-14 bg-green-800 rounded-lg"
              >
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            <div>
              <h4>StudentList</h4>
              <p>{students?.length}</p>
            </div>
          </div>
        </div>
        <div className=" border  border-black rounded-lg cursor-pointer w-64 font-medium text-base  ">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-14 h-13 bg-red-800 rounded-lg"
              >
                <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </span>
            <div>
              <h4>Exam rooms</h4>
              <p>{classrooms?.length}</p>
            </div>
          </div>
        </div>

        <div className="border  border-black rounded-lg cursor-pointer w-64 font-medium text-base ">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-14 h-13 bg-violet-800 rounded-lg"
              >
                <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </span>
            <div>
              <h4>Semester</h4>
              <p>{semesters?.length}</p>
            </div>
          </div>
        </div>
        <div className="border  border-black rounded-lg cursor-pointer w-64 font-medium text-base ">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-13 w-14 bg-blue-800 rounded-lg"
              >
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </span>
            <div>
              <h4>Number of Courses</h4>
              <p>{courses?.length}</p>
            </div>
          </div>
        </div>
        <div className="border  border-black rounded-lg cursor-pointer w-64 font-medium text-base ">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-14 h-13 bg-cyan-800 rounded-lg"
              >
                <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </span>
            <div>
              <h4>Major</h4>
              <p>{majors?.length}</p>
            </div>
          </div>
        </div>
        <div className="border  border-black rounded-lg cursor-pointer w-64 font-medium text-base ">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-13 w-14 bg-yellow-800 rounded-lg"
              >
                <path d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
              </svg>
            </span>
            <div>
              <h4>Exam Slot</h4>
              <p>{examslots?.length}</p>
            </div>
          </div>
        </div>
        <div className=" border  border-black rounded-lg cursor-pointer w-64 font-medium text-base   ">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-13 w-14 bg-purple-800 rounded-lg"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </span>
            <div>
              <h4>Exam Schedule</h4>
              <p>{examschedules?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Dashboard.propTypes = {
  classrooms: PropTypes.array,
  courses: PropTypes.array,
  teachers: PropTypes.array,
  students: PropTypes.array,
  examschedules: PropTypes.array,
  examslots: PropTypes.array,
  majors: PropTypes.array,
  semesters: PropTypes.array,
};

export default Dashboard;
