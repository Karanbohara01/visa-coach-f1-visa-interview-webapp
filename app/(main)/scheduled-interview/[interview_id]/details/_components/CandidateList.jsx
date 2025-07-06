'use client';

import moment from "moment";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidateList({ candidateList }) {
  return (
    <div className="p-6 space-y-6 mt-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="font-bold text-xl text-gray-800">
        Attempts ({candidateList?.length || 0})
      </h2>
      {candidateList?.map((candidate, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center md:justify-between gap-4 p-4 bg-white rounded-lg   border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white font-bold rounded-full text-lg">
              {candidate?.userName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                {candidate?.userName || "Unknown User"}
              </h2>
              <p className="text-sm font-bold text-gray-500">
                Completed on: {moment(candidate?.created_at).format('MMM DD, YYYY')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-green-600">6/10</p>
            <CandidateFeedbackDialog candidate={candidate} />
          </div>

        </div>
      ))}
    </div>
  );
}

export default CandidateList;
