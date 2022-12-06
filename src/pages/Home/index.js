import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth } from '../../firebase'
import { Grid } from '@mui/material'
import MiniStatisticsCard from '../../examples/Cards/StatisticsCards/MiniStatisticsCard'
import BuildByDevelopers from '../../layouts/dashboard/components/BuildByDevelopers'
import WorkWithTheRockets from '../../layouts/dashboard/components/WorkWithTheRockets'
import ReportsBarChart from '../../examples/Charts/BarCharts/ReportsBarChart'
import GradientLineChart from '../../examples/Charts/LineCharts/GradientLineChart'
import gradientLineChartData from '../../layouts/dashboard/data/gradientLineChartData'
import SoftBox from '../../components/SoftBox'
import Icon from "@mui/material/Icon";
import typography from '../../assets/theme/base/typography'
import reportsBarChartData from '../../layouts/dashboard/data/reportsBarChartData'
import Projects from '../../layouts/dashboard/components/Projects'
import OrdersOverview from '../../layouts/dashboard/components/OrderOverview'
import  { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Admin() {
  const authId = useSelector((state) => state.authId)
  const history = useNavigate("")
  const dispatch = useDispatch();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;



  const logout = () => {
    auth.signOut();
    history("/")
    dispatch(updateAuthId(''))
    window.location.reload();
}

  const myStyle={
      backgroundImage:"url(" +
  "images/bg/1.jpg"+")",
  height:'100px'
      };

  return (
    <DashboardLayout>
    <DashboardNavbar />

    <Carousel
    className='CarouselHome'
    >
      <Carousel.Item interval={1000} variant="dark">
        <img
          className="d-block w-100 imageSlider"
          src="images/bg/1.jpg"
          alt="First slide"
style={{
  filter:'brightness(30%)',
  borderRadius:15
}}
        />
        <Carousel.Caption>
        <div className="title-heading">
        {/* <h4 class="heading text-white mb-4 position-relative">Providing Brilliant <br> Ideas For Your <br> <span class="position-relative text-type-element" data-period="2000">Business</span></h4> */}
        <h4 className="heading text-white mb-4 position-relative">Providing Brilliant Ideas <br />For Your <span className="typewrite position-relative text-type-element" data-period={2000} data-type="[ &quot;Business&quot;, &quot;Startups&quot;, &quot;Digital Agency&quot;, &quot;Marketing&quot; ]" /></h4>
        <p className="text-white-50 mb-0 para-desc">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>
        <div className="mt-4 pt-2">
          <a href="#" className="btn btn-primary me-2">Get Started</a>
        </div>
      </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imageSlider"
          src="images/bg/1.jpg"
          alt="Second slide"
style={{
  filter:'brightness(30%)',
  borderRadius:15
}}
        />

        <Carousel.Caption>
        <div className="title-heading">
        {/* <h4 class="heading text-white mb-4 position-relative">Providing Brilliant <br> Ideas For Your <br> <span class="position-relative text-type-element" data-period="2000">Business</span></h4> */}
        <h4 className="heading text-white mb-4 position-relative">Providing Brilliant Ideas <br />For Your <span className="typewrite position-relative text-type-element" data-period={2000} data-type="[ &quot;Business&quot;, &quot;Startups&quot;, &quot;Digital Agency&quot;, &quot;Marketing&quot; ]" /></h4>
        <p className="text-white-50 mb-0 para-desc">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>
        <div className="mt-4 pt-2">
          <a href="#" className="btn btn-primary me-2">Get Started</a>
        </div>
      </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imageSlider"
          src="images/bg/1.jpg"
          alt="Third slide"
style={{
  filter:'brightness(30%)',
  borderRadius:15
}}
        />

        <Carousel.Caption>
        <div className="title-heading">
        {/* <h4 class="heading text-white mb-4 position-relative">Providing Brilliant <br> Ideas For Your <br> <span class="position-relative text-type-element" data-period="2000">Business</span></h4> */}
        <h4 className="heading text-white mb-4 position-relative">Providing Brilliant Ideas <br />For Your <span className="typewrite position-relative text-type-element" data-period={2000} data-type="[ &quot;Business&quot;, &quot;Startups&quot;, &quot;Digital Agency&quot;, &quot;Marketing&quot; ]" /></h4>
        <p className="text-white-50 mb-0 para-desc">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>
        <div className="mt-4 pt-2">
          <a href="#" className="btn btn-primary me-2">Get Started</a>
        </div>
      </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    {/* Project Start */}
    <section className="section bg-light" id="project">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="section-title text-center mb-4 pb-2">
              <h6 className="text-primary fw-semibold text-uppercase"></h6>
              <h4 className="title mb-3">Our Mission & Vission</h4>
            </div>
          </div>{/*end col*/}
        </div>{/*end row*/}

        <div className="row">
        <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
          <div className="card border-0 features feature-primary feature-clean rounded-lg p-4">
            <div className="icons bg-lg text-center">
              <i className="uil uil-adjust-circle d-block rounded-md h3 mb-0" />
            </div>
            <div className="content mt-4 pt-2">
              <a href="#" className="title text-dark h5">Grow Your Business</a>
              <p className="text-muted mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
            </div>
          </div>
        </div>{/*end col*/}
        <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
          <div className="card border-0 features feature-primary feature-clean rounded-lg active p-4">
            <div className="icons bg-lg text-center">
              <i className="uil uil-circuit d-block rounded-md h3 mb-0" />
            </div>
            <div className="content mt-4 pt-2">
              <a href="#" className="title text-dark h5">Drive More Sales</a>
              <p className="text-muted mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
            </div>
          </div>
        </div>{/*end col*/}
        <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
          <div className="card border-0 features feature-primary feature-clean rounded-lg p-4">
            <div className="icons bg-lg text-center">
              <i className="uil uil-fire d-block rounded-md h3 mb-0" />
            </div>
            <div className="content mt-4 pt-2">
              <a href="#" className="title text-dark h5">Handled By Expert</a>
              <p className="text-muted mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>
            </div>
          </div>
        </div>{/*end col*/}
      </div>{/*end row*/}

      </div>{/*end container*/}
    </section>{/*end section*/}
    {/* Project End */}
    {/* CTA Start */}
    <section className="section" style={{background: 'url("images/bg/cta.png") center'}}>
      <div className="bg-overlay" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="section-title text-center">
              <h4 className="title text-white mb-3">Ready to start your next web project now?</h4>
              <p className="text-white-50 mx-auto para-desc mb-0">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap v5 html page.</p>
              <div className="mt-4 pt-2">
                <a href="#" className="btn btn-primary">Get Started !</a>
              </div>
            </div>
          </div>{/*end col*/}
        </div>{/*end row*/}
      </div>{/*end container*/}
    </section>{/*end section*/}
    {/* CTA End */}

    <div className="container mt-5">
    <div className="row">
      <div className="col-md-3 col-6">
        <div className="counter-box position-relative text-center">
          <h3 className="mb-0 fw-semibold mt-2"><span className="counter-value" data-target={40}>3</span>+</h3>
          <span className="counter-head text-muted">Projects</span>
        </div>{/*end counter box*/}
      </div>{/*end col*/}
      <div className="col-md-3 col-6">
        <div className="counter-box position-relative text-center">
          <h3 className="mb-0 fw-semibold mt-2"><span className="counter-value" data-target={200}>5</span>+</h3>
          <span className="counter-head text-muted">Members</span>
        </div>{/*end counter box*/}
      </div>{/*end col*/}
      <div className="col-md-3 col-6">
        <div className="counter-box position-relative text-center">
          <h3 className="mb-0 fw-semibold mt-2"><span className="counter-value" data-target={457}>200</span>K</h3>
          <span className="counter-head text-muted">Events</span>
        </div>{/*end counter box*/}
      </div>{/*end col*/}
      <div className="col-md-3 col-6">
        <div className="counter-box position-relative text-center">
          <h3 className="mb-0 fw-semibold mt-2"><span className="counter-value" data-target={150}>100</span>+</h3>
          <span className="counter-head text-muted">Albums</span>
        </div>{/*end counter box*/}
      </div>{/*end col*/}
    </div>{/*end row*/}
  </div>{/*end container*/}

    {/* Start Team */}
    <section className="section bg-light" id="team">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="section-title text-center mb-4 pb-2">
              <h6 className="text-primary fw-semibold text-uppercase"></h6>
              <h4 className="title mb-3">Our Events</h4>
            </div>
          </div>{/*end col*/}
        </div>{/*end row*/}
        <div className="row">


        

        </div>{/*end row*/}
      </div>{/*end container*/}
    </section>{/*end section*/}
    {/* End Team */}



      <Footer />
    {/* Back to top */}
    <a href="#" onclick="topFunction()" id="back-to-top" className="back-to-top rounded-pill fs-5"><i data-feather="arrow-up" className="fea icon-sm icons align-middle" /></a>
    {/* Back to top */}
    {/* JAVASCRIPTS */}
    {/* Custom */}
    </DashboardLayout>
  )
}

export default Admin