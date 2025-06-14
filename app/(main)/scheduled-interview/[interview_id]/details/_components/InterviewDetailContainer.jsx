'use client'
import { Calendar, Clock } from "lucide-react"
import moment from "moment"

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-md border border-gray-200  transition-all duration-300 w-full max-w-full mx-auto mt-2">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate">
        {interviewDetail?.jobPosition || "N/A"}
      </h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-600">Duration</h3>
          <p className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <Clock className="h-4 w-4 text-primary" />
            {interviewDetail?.duration || "N/A"} minutes
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-600">Created on</h3>
          <p className="flex items-center gap-2 text-sm font-medium text-gray-800">
            <Calendar className="h-4 w-4 text-primary" />
            {moment(interviewDetail?.created_at).format('MMM DD, YYYY')}
          </p>
        </div>
        {interviewDetail?.type && (
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-gray-600">Type</h3>
            <p className="flex items-center gap-2 text-sm font-medium text-gray-800">
              <Clock className="h-4 w-4 text-primary" />
              {interviewDetail?.type ? JSON.parse(interviewDetail?.type)[0] : "N/A"}
            </p>
          </div>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Job Description</h2>
        <p className="mt-2 text-sm text-gray-700 leading-6 bg-gray-50 p-3 rounded-md">
          {interviewDetail?.jobDescription || "No description available"}
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Interview Questions</h2>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {interviewDetail?.questionList?.length > 0 ? (
            interviewDetail.questionList.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-gray-800 bg-gray-50 p-3 rounded-md hover:bg-primary/5 transition-colors duration-200"
              >
                <span className="font-semibold text-primary">{index + 1}.</span>
                <p>{item?.question || "N/A"}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No questions available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default InterviewDetailContainer