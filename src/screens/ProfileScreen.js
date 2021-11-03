import React, { useState } from 'react'
import './ProfileScreen.css';
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Nav from '../Nav'
import PlanScreen from './PlanScreen';

function ProfileScreen() {
    const user = useSelector(selectUser)
    const [getPlan,setGetPlan]=useState('')
    const getSubscriptionPlan =(plan) => {
        setGetPlan(plan)
    }
    return (
        <div className="profileScreen">
            <Nav/>
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="Netflix-avatar.png"
                    alt=""/>
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                        <h3>Plans {`${getPlan && `(Current Plan: ${getPlan})`}`}</h3>
                        <PlanScreen getSubscriptionPlan={getSubscriptionPlan}/>
                        <button onClick={()=> auth.signOut()} className="profileScreen__signOut">Sign Out</button>
                    </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
