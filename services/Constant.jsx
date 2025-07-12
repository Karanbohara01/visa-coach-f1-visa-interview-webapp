
import { BriefcaseBusinessIcon, Calendar, BookMarked, Code2Icon, Crown, HelpCircle, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards, FileText } from "lucide-react";

export const SidebarOptions = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: "Scheduled Interview",
        icon: Calendar,
        path: '/scheduled-interview'
    },
    {
        name: "All Interview",
        icon: List,
        path: '/all-interview'
    },
    {
        name: "Blogs",
        icon: List,
        path: '/blog'
    },
    {
        name: "Question Library",  // <-- New link added
        icon: BookMarked,         // <-- Icon added
        path: '/question-library'
    },
    {
        name: "Documents",
        icon: FileText,
        path: '/documents'
    },
    {
        name: "Settings",
        icon: Settings,
        path: '/settings'
    },
    {
        name: "Get Help?",
        icon: HelpCircle,
        path: '/help'
    },
]



export const InterviewType = [
    {
        title: "Technical",
        icon: Code2Icon
    },
    {
        title: "Behavioral",
        icon: User2Icon
    },

    {
        title: "Experience",
        icon: BriefcaseBusinessIcon
    },

    {
        title: "Probelm Solving",
        icon: Puzzle
    },
    {
        title: "Leadership",
        icon: Crown
    },
]

export const QUESTION_PROMPT = `You are a seasoned technical interviewer.  
Using the inputs below, generate a high-quality, structured set of interview questions:

Job Title: {{jobTitle}}  
Job Description: {{jobDescription}}  
Interview Duration: {{duration}}  
Interview Type: {{type}}

📌 Your task:  
Review the job description to extract core responsibilities, required skills, and experience.  
Create a tailored set of interview questions based on the given duration.  
Align the tone and content with the format of a typical {{type}} interview.  
Ensure the question depth and count fit within the time constraints.

🌿 Format your response as a JSON array of question objects:  
format: interviewQuestions=[  
{  
  question:"",  
  type:"Technical/Behavioral/Experience/Problem Solving/Leadership"  
},  
...  
]

🎯 The objective is to deliver a focused, relevant, and time-efficient interview plan for the {{jobTitle}} role.`


// export const FEEDBACK_PROMPT = `{{conversation}}
// Depends on this Interview Conversation between assistant and user, Give me feedback for user interview. Give me rating out of 10 for technical Skills, Communication, Problem Solving, Experience. Also give me summery in 3 lines about the interview and one line to let me know whether is recommended for hire or not with msg. Give me response in JSON format
// {
//   feedback:{
//     rating:{
//       technicalSkills:5,
//       communication:6,
//       problemSolving:4,
//       experience:7
//     },
//     summery:<in 3 Lines>,
//     Recommendation:"",
//     RecommendationMsg:""
//   }
// }`


// export const FEEDBACK_PROMPT = `
// You are an AI hiring assistant. Based on the following interview conversation, provide structured feedback ONLY in this JSON format:

// {
//   "feedback": {
//     "rating": {
//       "technicalSkills": 0-10,
//       "communication": 0-10,
//       "problemSolving": 0-10,
//       "experience": 0-10
//     },
//     "summery": "<3-line summary>",
//     "Recommendation": "<Recommended / Not recommended>",
//     "RecommendationMsg": "<Brief justification>"
//   }
// }

// Only return a valid JSON object. Do not include explanations or markdown. 

// Conversation:
// {{conversation}}
// `;


export const FEEDBACK_PROMPT = `
You are a visa interview AI evaluator.

You MUST return ONLY a valid JSON object with this EXACT structure — nothing else:

{
  "feedback": {
    "rating": {
      "technicalSkills": 7,
      "communication": 8,
      "problemSolving": 6,
      "experience": 9
    },
    "summery": "The candidate communicated well and showed decent problem-solving skills. Technical responses were mostly accurate. Experience examples were specific and relevant.",
    "Recommendation": "Recommended for hire",
    "RecommendationMsg": "Strong experience and clear communication."
  }
}

DO NOT include any explanation, comments, or surrounding text.

Use the following conversation between user and AI to evaluate:
{{conversation}}
`;