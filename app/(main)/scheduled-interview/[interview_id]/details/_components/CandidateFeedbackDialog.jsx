import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Mail, MessageSquare, Star, User } from "lucide-react";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;
  const isRecommended = feedback?.Recommendation !== 'Not Recommended';

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-4 py-2 text-sm font-medium text-purple-600 border-purple-600 hover:bg-purple-50 hover:shadow-sm transition-all"
        >
          View Detailed Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl   rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Candidate Evaluation Report
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-6 mt-4 ">
              {/* Candidate Header */}
              <div className="flex items-center justify-between  p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white font-bold rounded-full text-xl">
                    {candidate?.userName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      {candidate?.userName || "Unknown User"}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Mail className="w-4 h-4 mr-1 text-gray-400" />
                      {candidate?.userEmail}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-lg font-bold text-gray-800">6.8</span>
                    <span className="text-gray-500">/10</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full mt-1 ${isRecommended
                    ? 'text-green-600 bg-green-50'
                    : 'text-red-600 bg-red-50'
                    }`}>
                    {feedback?.Recommendation || "Evaluation Pending"}
                  </span>
                </div>
              </div>

              {/* Skill Assessment */}
              <div className="mt-4">
                <h2 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-500" />
                    Skill Assessment
                  </span>
                  <span className="text-sm font-normal text-gray-500">
                    Overall: {(
                      (feedback?.rating?.technicalSkills +
                        feedback?.rating?.communication +
                        feedback?.rating?.problemSolving +
                        feedback?.rating?.experience) / 4
                    ).toFixed(1)}/10
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Technical Skills",
                      value: feedback?.rating?.technicalSkills * 10 || 0,
                      icon: "💻"
                    },
                    {
                      name: "Communication",
                      value: feedback?.rating?.communication * 10 || 0,
                      icon: "🗣️"
                    },
                    {
                      name: "Problem Solving",
                      value: feedback?.rating?.problemSolving * 10 || 0,
                      icon: "🧩"
                    },
                    {
                      name: "Experience",
                      value: feedback?.rating?.experience * 10 || 0,
                      icon: "📚"
                    }
                  ].map((skill, index) => (
                    <div key={index} className="p-4 bg-white border border-gray-100 rounded-lg shadow-xs hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          {skill.name}
                        </h3>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-purple-50 text-purple-600">
                          {skill.value / 10}/10
                        </span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Summary */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  Performance Summary
                </h2>
                <p className="text-sm text-gray-700">
                  {feedback?.summery || "No summary available."}
                </p>
              </div>

              {/* Recommendation */}
              <div className={`mt-6 p-4 rounded-lg border ${isRecommended
                ? 'bg-green-50 border-green-100'
                : 'bg-red-50 border-red-100'
                }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`font-bold flex items-center gap-2 ${isRecommended ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {isRecommended ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                      Recommendation
                    </h2>
                    <p className={`text-sm mt-1 ${isRecommended ? 'text-green-700' : 'text-red-700'
                      }`}>
                      {feedback?.RecommendationMsg}
                    </p>
                  </div>
                  <Button className={`flex items-center gap-2 ${isRecommended
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                    }`}>
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;