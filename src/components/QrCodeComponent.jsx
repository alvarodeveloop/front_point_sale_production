import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import{
  Row,
  Col
} from 'react-bootstrap'
//simport * as Instascan from 'instascan'
import { toast } from 'react-toastify'
let localStream = null

const QrCodeComponent = (props) => {

  useEffect(() => {

    const videoEl = document.getElementById('preview')
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia

    if(navigator.getUserMedia){
      navigator.getUserMedia(
        { video: true },
        stream => {
          videoEl.srcObject = stream
          localStream = stream

        },
        err => toast.error('Error, debe enceder su cámara')
      )
    }else{
      console.log('error con el getUserMedia')
    }

    return () => {
      let vid = document.getElementById('preview')
      vid.pause();
      vid.src = "";
      if(localStream){
        localStream.getTracks()[0].stop();
        localStream= null
      }
    }
  },[])

  return (
    <Row className="align-items-center justify-content-center">
      <Col sm={12} md={12} lg={12} xs={12}>
        <video id="preview" width="500px" height="300px" autoPlay muted></video>
        <canvas id="my_canvas" style={{ position:'absolute', top: '0px', left: '120px'}} width="500px" height="300px"></canvas>
        <div className="line" id="line" style={{visibility: 'hidden'}}></div>
        <div className="line1" id="line1" style={{visibility: 'hidden'}}></div>
      </Col>
    </Row>
  )
}

export default QrCodeComponent
