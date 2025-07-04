import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewsList from './_components/LatestInterviewsList'
import AssistantFloatingButton from './_components/AssistantFloatingButton'

function Dashboard() {

    return (

        <div>
            <AssistantFloatingButton />
            {/* <WelcomeContainer /> */}
            <h2 className='text-2xl my-3 text-primary font-bold '>Dashboard</h2>
            <CreateOptions />
            <LatestInterviewsList />
        </div>
    )
}

export default Dashboard
