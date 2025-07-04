'use client';
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Plus, Video } from "lucide-react";
import { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import AssistantFloatingButton from "../dashboard/_components/AssistantFloatingButton";

function ScheduledInterview() {
  const { user } = useUser();  // destructure user here
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("User email:", user.email);
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    console.log("Fetching interviews for user:", user.email);
    const { data, error } = await supabase
      .from("interviews")
      .select("jobPosition, duration, interview_id, interview-feedback(userEmail)")
      .eq("userEmail", user.email)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching interviews:", error);
    } else {
      console.log("Fetched interviews:", data);
      setInterviewList(data);
    }
  };

  return <div className="mt-5 ">
    <AssistantFloatingButton />
    <h2 className="font-bold text-xl mb-4">Interview List with candidate feedback</h2>
    {interviewList?.length === 0 ? (
      <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white border border-gray-300 rounded-md">
        <Video className="p-1 text-primary bg-blue-50 h-10 w-10 rounded-md" />
        <h2 className="text-sm sm:text-base text-center">You don't have any interviews created.</h2>
        <Button aria-label="Create new interview" className="text-sm sm:text-base">
          <Plus className="mr-2" /> Create New Interview
        </Button>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {interviewList.map((interview, index) => (
          <InterviewCard interview={interview}
            viewDetails={true}
            key={index} />

        ))}
      </div>
    )}
  </div>;
}

export default ScheduledInterview;
