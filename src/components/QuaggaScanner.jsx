import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
//import { barcode } from 'utils/scan'
import { Container, Row, Col } from 'react-bootstrap'
import 'styles/components/scan.scss'
import Quagga from 'quagga';
import { toast } from 'react-toastify'

const QuaggaScanner = (props) => {

  useEffect(() => {
    initQuagga()
    return () => {
      Quagga.stop()
    }
  }, [])

  const initQuagga = () => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#camera'),
        numOfWorkers: navigator.hardwareConcurrency,
        constraints: {
          width: 300,
          height: 300,
        },
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, function (err) {
      if (err) {
        toast.error('Error, revise que la cámara de su dispositivo este conectada')
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    let last_result = []
    Quagga.onDetected(data => {

      let last_code = data.codeResult.code
      last_result.push(last_code)
      if (last_result.length > 20) {
        let code = ordeByConcurrency(last_result)[0]
        props.catchCode(code)
      }
    })
  }

  const ordeByConcurrency = arr => {
    let count = {}
    arr.forEach(v => {
      if (!count[v]) {
        count[v] = 0
      }
      count[v]++
    })

    return Object.keys(count).sort((curtKey, nextKey) => {
      return count[curtKey] < count[nextKey]
    })
  }

  return (
    <div id="camera"></div>
  )
}

QuaggaScanner.propTypes = {
  catchCode: PropTypes.func.isRequired
}

export default QuaggaScanner
