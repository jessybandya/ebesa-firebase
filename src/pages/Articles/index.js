import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'

function Articles() {
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <SoftTypography>
    <h1>Articles</h1>
    </SoftTypography>
    <Footer/>
    </DashboardLayout>
  )
}

export default Articles