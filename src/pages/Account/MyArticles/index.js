import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {Button,Modal } from 'react-bootstrap';
import AddArticle from './AddArticle';


function MyArticles(){
    const [modalShow, setModalShow] = React.useState(false);
    return(
        <div>
        <Paper
        component="form"
        sx={{ display: 'flex', alignItems: 'center'}}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search my articles"
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DriveFolderUploadIcon onClick={() => setModalShow(true)}/>
        </IconButton>        
      </Paper>  
      
      <h1>My Articles</h1>

      <Modal
      show={modalShow}
      style={{zIndex:2000}}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddArticle setModalShow={setModalShow}/>
      </Modal.Body>
    </Modal>
        </div>
  )
}
export default MyArticles