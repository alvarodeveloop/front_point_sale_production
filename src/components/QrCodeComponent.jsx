import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import{
  Row,
  Col
} from 'react-bootstrap'
import QrReader from 'react-qr-scanner'
import { toast } from 'react-toastify'
let localStream = null
let find = false;
const QrCodeComponent = (props) => {

  useEffect(() => {
    const videoEl = document.querySelector('video')
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia

    if(navigator.getUserMedia){
      navigator.getUserMedia(
        { video: true },
        stream => {
          localStream = stream
        },
        err => toast.error('Error, debe enceder su cámara')
      )
    }else{
      console.log('error con el getUserMedia')
    }

    return () => {
      if(localStream){
        localStream.getTracks()[0].stop();
        localStream= null;
      }
      find = false;
    }
  },[])
  const errorScannerHandler = error =>{
    console.log(error);
  }

  const successScanHandler = data => {
    if(data && !find){
      find = true;
      props.catchQrCode(data);
      setTimeout(() => {
        find = false;
      },500);
    }
  }

  return (
    <Row className="align-items-center justify-content-center">
      <Col sm={12} md={12} lg={12} xs={12}>
        <QrReader
          delay={300}
          style={{height: 320,width: 400}}
          onError={errorScannerHandler}
          onScan={successScanHandler}
        />
      </Col>
    </Row>
  )
}

QrCodeComponent.propTypes = {
  catchQrCode : PropTypes.func,
}

export default QrCodeComponent

