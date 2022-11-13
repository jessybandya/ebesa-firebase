import React, { useEffect, useState } from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import { useSelector } from 'react-redux'
import { db } from '../../firebase'

function Account() {
  const authId = useSelector((state) => state.authId);

  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    db.collection('users').doc(`${authId}`).onSnapshot((doc) => {
      setCurrentUser(doc.data());
    });
}, [])
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <SoftTypography>
    <h1>{currentUser?.firstName} {currentUser?.lastName}</h1>
    </SoftTypography>
    <Footer/>
    </DashboardLayout>
  )
}

export default Account