import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth } from '../../firebase'

function Admin() {
  const authId = useSelector((state) => state.authId)
  const history = useNavigate("")
  const dispatch = useDispatch();

  if(authId !== process.env.REACT_APP_ADMIN_AUTHID && !authId){
     history("/")
  }

  const logout = () => {
    auth.signOut();
    history("/")
    dispatch(updateAuthId(''))
    window.location.reload();
}
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <SoftTypography>
    <h1 style={{cursor:'pointer'}} onClick={logout}>Admin, Logout</h1>
    </SoftTypography>
    <Footer/>
    </DashboardLayout>
  )
}

export default Admin