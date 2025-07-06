
'use client'
import { Button } from '@/components/ui/button';
import { ArrowRight, Copy, Send, Video } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { toast } from 'sonner';

function InterviewCard({ interview, viewDetails = false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast('Copied to clipboard');
  };

  const onSend = () => {
    window.location.href =
      `mailto:karanbohara216@gmail.com?subject=VisaCoach F1 Visa Interview Link&body=Interview Link: ${url}`;
  };

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm   transition-all duration-300 w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Row 1: Job Position and Created Date */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate max-w-[60%]">
            {interview.jobPosition || "N/A"}
          </h2>
          <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            {moment(interview?.created_at).format("MMM Do, YYYY")}
          </span>
        </div>

        {/* Row 2: Duration and Number of Candidates */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-700">
          <span className="font-semibold flex items-center gap-1">
            <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {interview.duration || "N/A"} minutes
          </span>
          <span className="font-semibold flex items-center gap-1">
            <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v2h5m-2-2a3 3 0 005.356 1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {interview['interview-feedback']?.length || 0} Attempts
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {!viewDetails ? (
            <>
              <Button
                onClick={copyLink}
                variant="outline"
                className="flex items-center gap-2 px-4 py-2 border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors w-full sm:w-auto"
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
              <Button
                onClick={onSend}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors w-full sm:w-auto"
              >
                <Video className="h-4 w-4" />
                Join
              </Button>
            </>
          ) : (
            <Link href={'/scheduled-interview/' + interview?.interview_id + "/details"}>
              <Button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-md text-sm font-semibold hover:from-purple-600 hover:to-purple-700 transition-all w-full sm:w-auto"
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;