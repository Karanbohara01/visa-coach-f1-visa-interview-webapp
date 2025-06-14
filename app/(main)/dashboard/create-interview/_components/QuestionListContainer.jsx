import React from 'react'

function QuestionListContainer({ questionList }) {
    return (
        <div className='flex gap-2 flex-col'>
            <h2 className="text-xl font-semibold text-primary mb-2"> Generated Interview Questions</h2>
            {questionList.map((item, index) => (
                <div
                    key={index}
                    className="p-5  rounded-md border border-gray-200   bg-gray-50  "
                >
                    <p className="text-lg font-medium text-gray-800 mb-2">
                        {index + 1}. {item.question}
                    </p>
                    <span className="inline-block text-sm font-semibold text-primary bg-blue-100 px-3 py-1 rounded-md">
                        {item.type}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default QuestionListContainer
