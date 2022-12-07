import React from 'react'
import SoftTypography from '../../components/SoftTypography'
import Footer from '../../examples/Footer'
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { updateAuthId } from '../../redux/dataSlice'
import { auth, db } from '../../firebase'
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
import Typewriter from 'typewriter-effect';
import Events from '../../sub-components/Events'
import Articles from '../../sub-components/Articles'


function Admin() {
  const authId = useSelector((state) => state.authId)
  const history = useNavigate("")
  const dispatch = useDispatch();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [membersData, setMembers] = React.useState(0)
  const [articlesData, setArticles] = React.useState(0)
  const [eventsData, setEvents] = React.useState(0)
  const [albumsData, setAlbums] = React.useState(0)


  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setMembers(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('articles').onSnapshot((snapshot) => {
      setArticles(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('events').onSnapshot((snapshot) => {
      setEvents(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  React.useEffect(() => {
    db.collection('albums').onSnapshot((snapshot) => {
      setAlbums(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

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
    pause={false}
    className='CarouselHome'
    >
      <Carousel.Item interval={500} variant="dark"
      
      >
        <img
          className="d-block w-100 imageSlider"
          src="https://biosystems.files.wordpress.com/2016/07/processing.jpg"
          alt="First slide"
style={{
  filter:'brightness(30%)',
  borderRadius:15
}}
        />
        <Carousel.Caption>
        <div className="title-heading">
        {/* <h4 class="heading text-white mb-4 position-relative">Providing Brilliant <br> Ideas For Your <br> <span class="position-relative text-type-element" data-period="2000">Business</span></h4> */}
        <h4 className="heading text-white mb-4 position-relative">Environmental & Biosystems Engineering Student’s Association
        <span style={{color:'#43a047'}}>
        <Typewriter
        options={{
          strings: ['EBESA TEAM', 'EBESA- UoN'],
          autoStart: true,
          loop: true,
        }}
      />
        </span>
        </h4>
        <p className="text-white-50 mb-0 para-desc">Environmental & Biosystems Engineering Student’s Association. (University Of Nairobi)</p>
        <div className="mt-4 pt-2">
          <a href="#" className="btn btn-primary me-2">
          <Typewriter
          options={{
            strings: ['EBESA TEAM', 'EBESA- UoN'],
            autoStart: true,
            loop: true,
          }}
        />
          </a>
        </div>
      </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imageSlider"
          src="https://english.iut.ac.ir/sites/default/files/faculties/Biosystems-Engineering/Biosystems%20Engineering.jpg"
          alt="Second slide"
style={{
  filter:'brightness(30%)',
  borderRadius:15
}}
        />

        <Carousel.Caption>
        <div className="title-heading">
        {/* <h4 class="heading text-white mb-4 position-relative">Providing Brilliant <br> Ideas For Your <br> <span class="position-relative text-type-element" data-period="2000">Business</span></h4> */}
        <h4 className="heading text-white mb-4 position-relative">Environmental & Biosystems Engineering Student’s Association
        <span style={{color:'#43a047'}}>
        <Typewriter
        options={{
          strings: ['EBESA TEAM', 'EBESA- UoN'],
          autoStart: true,
          loop: true,
        }}
      />
        </span>
        </h4>
        <p className="text-white-50 mb-0 para-desc">Environmental & Biosystems Engineering Student’s Association. (University Of Nairobi)</p>
        <div className="mt-4 pt-2">
          <a href="#" className="btn btn-primary me-2">
          <Typewriter
          options={{
            strings: ['EBESA TEAM', 'EBESA- UoN'],
            autoStart: true,
            loop: true,
          }}
        />
          </a>
        </div>
      </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 imageSlider"
          src="https://www.wur.nl/upload/7344efc6-a0f0-4bf1-a18d-9a294c9630ef_farm_technology.jpg"
          alt="Third slide"
style={{
  filter:'brightness(30%)',
  borderRadius:15
}}
        />

        <Carousel.Caption>
        <div className="title-heading">
        {/* <h4 class="heading text-white mb-4 position-relative">Providing Brilliant <br> Ideas For Your <br> <span class="position-relative text-type-element" data-period="2000">Business</span></h4> */}
        <h4 className="heading text-white mb-4 position-relative">Environmental & Biosystems Engineering Student’s Association
        <span style={{color:'#43a047'}}>
        <Typewriter
        options={{
          strings: ['EBESA TEAM', 'EBESA- UoN'],
          autoStart: true,
          loop: true,
        }}
      />
        </span>
        </h4>
        <p className="text-white-50 mb-0 para-desc">Environmental & Biosystems Engineering Student’s Association. (University Of Nairobi)</p>
        <div className="mt-4 pt-2">
          <a href="#" className="btn btn-primary me-2">
          <Typewriter
          options={{
            strings: ['EBESA TEAM', 'EBESA- UoN'],
            autoStart: true,
            loop: true,
          }}
        />
          </a>
        </div>
      </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    {/* Project Start */}
    <hr />
    <section className="section bg-light" id="project">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="section-title text-center mb-1 pb-0">
              <h6 className="text-primary fw-semibold text-uppercase"></h6>
              <h4 className="title mb-3">Our Mission & Vission</h4>
            </div>
          </div>{/*end col*/}
        </div>{/*end row*/}

        <div className="row">
        <div className="col-lg-4 col-md-6 col-12 mt-0 pt-0">
          <div className="card border-0 features feature-primary feature-clean rounded-lg p-4" style={{border:'2px solid red'}}>
            <div className="content mt-4 pt-2">
              <a href="#" style={{color:'#43a047', fontWeight:'bold'}}>Networking</a>
              <p className="text-muted mt-3">Description</p>
            </div>
          </div>
        </div>{/*end col*/}
        <div className="col-lg-4 col-md-6 col-12 mt-0 pt-0">
          <div className="card border-0 features feature-primary feature-clean rounded-lg p-4" style={{border:'2px solid red'}}>
            <div className="content mt-4 pt-2">
              <a href="#" style={{color:'#43a047', fontWeight:'bold'}}>Academic Naturing</a>
              <p className="text-muted mt-3">Description</p>
            </div>
          </div>
        </div>{/*end col*/}
        <div className="col-lg-4 col-md-6 col-12 mt-0 pt-0">
          <div className="card border-0 features feature-primary feature-clean rounded-lg p-4" style={{border:'2px solid red'}}>
            <div className="content mt-4 pt-2">
              <a href="#" style={{color:'#43a047', fontWeight:'bold'}}>Projects stimulation</a>
              <p className="text-muted mt-3">Description</p>
            </div>
          </div>
        </div>{/*end col*/}
      </div>{/*end row*/}

      </div>{/*end container*/}
    </section>{/*end section*/}
    <hr />
    {/* Project End */}
    {/* CTA Start */}
    <section className="section" style={{background: 'url("images/ebesa1.jpg") center'}}>
      <div className="bg-overlay" />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="section-title text-center">
              <h4 className="title text-white mb-3">what is Ebesa in summury?</h4>
              <p className="text-white-50 mx-auto para-desc mb-0">EBESA is a student association under the Environment and Biosystems department formed to cater for our fellow students' needs.</p>
              <div className="mt-4 pt-2">
                <a href="#" className="btn btn-primary">
                <Typewriter
                options={{
                  strings: ['EBESA TEAM', 'EBESA- UoN'],
                  autoStart: true,
                  loop: true,
                }}
              />
                </a>
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
          <h3 className="mb-0 fw-semibold mt-2">{
            articlesData.length > 50 ? <>50+</> : <>{articlesData.length}</>
          }</h3>
          <span className="counter-head text-muted">Articles</span>
        </div>{/*end counter box*/}
      </div>{/*end col*/}
      <div className="col-md-3 col-6">
        <div className="counter-box position-relative text-center">
          <h3 className="mb-0 fw-semibold mt-2">
          <h3 className="mb-0 fw-semibold mt-2">{
            membersData.length > 50 ? <>50+</> : <>{membersData.length}</>
          }</h3>
          </h3>
          <span className="counter-head text-muted">Members</span>
        </div>{/*end counter box*/}
      </div>{/*end col*/}
      <div className="col-md-3 col-6">
        <div className="counter-box position-relative text-center">
          <h3 className="mb-0 fw-semibold mt-2">
          <h3 className="mb-0 fw-semibold mt-2">{
            eventsData.length > 50 ? <>50+</> : <>{eventsData.length}</>
          }</h3>
          </h3>
          <span className="counter-head text-muted">Events</span>
        </div>{/*end counter box*/}
      </div>{/*end col*/}
      <div className="col-md-3 col-6">
        <div className="counter-box position-relative text-center">
          <h3 className="mb-0 fw-semibold mt-2">
          <h3 className="mb-0 fw-semibold mt-2">{
            albumsData.length > 50 ? <>50+</> : <>{albumsData.length}</>
          }</h3>
          </h3>
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
            <div className="section-title text-center mb-1 pb-0">
              <h6 className="text-primary fw-semibold text-uppercase"></h6>
              <h4 className="title mb-3">Our Events</h4>
            </div>
          </div>{/*end col*/}
        </div>{/*end row*/}
        <div className="row">


         <Events />

        </div>{/*end row*/}
      </div>{/*end container*/}
    </section>{/*end section*/}
    {/* End Team */}


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