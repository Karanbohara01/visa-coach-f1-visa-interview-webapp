'use client'
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CandidateList from "./_components/CandidateList";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";

function InterviewDetails() {
  const {interview_id } = useParams();
  const {user} = useUser();
    const [interviewDetail, setInterviewDetail] = useState([]);
  

  useEffect (()=>{
    user && GetInterviewDetail();
  },[user])


  const GetInterviewDetail = async()=>{
     console.log("Fetching interviews for user:", user.email);
        const { data, error } = await supabase
          .from("interviews")
          .select(`jobPosition, duration, jobDescription,type,questionList, interview_id,created_at, interview-feedback(userEmail,userName,feedback,created_at)`)
          .eq("userEmail", user.email)
          .eq('interview_id',interview_id)
           
    
        if (error) {
          console.error("Error fetching interviews:", error);
        } else {
          console.log("Fetched interviews:", data);
          setInterviewDetail(data[0]);
        }

  }
  return (
    <div className="mt-2">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDetailContainer interviewDetail = {interviewDetail}/>
      <CandidateList candidateList = {interviewDetail?. ['interview-feedback']} />
      </div>
  )
}

export default InterviewDetails