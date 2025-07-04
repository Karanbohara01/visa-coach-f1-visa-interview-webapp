// components/SkillRatingBar.jsx
import { Progress } from "@/components/ui/progress";

// Helper to get color based on score (out of 10)
const getRatingColor = (score) => {
    if (score >= 8) return { bg: 'bg-green-500', text: 'text-green-600', fill: 'bg-green-100' };
    if (score >= 5) return { bg: 'bg-yellow-500', text: 'text-yellow-600', fill: 'bg-yellow-100' };
    return { bg: 'bg-red-500', text: 'text-red-600', fill: 'bg-red-100' };
};

export function SkillRatingBar({ Icon, name, value }) {
    const scoreOutOf10 = value || 0;
    const color = getRatingColor(scoreOutOf10);

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${color.text}`} />
                    {name}
                </h3>
                <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${color.fill} ${color.text}`}>
                    {scoreOutOf10.toFixed(1)} / 10
                </span>
            </div>
            <Progress value={scoreOutOf10 * 10} indicatorClassName={color.bg} className="h-2" />
        </div>
    );
}