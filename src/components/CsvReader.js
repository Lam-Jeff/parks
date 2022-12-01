import  { useState, useEffect } from 'react';
import parks from '../link_parks.csv'
import { usePapaParse } from 'react-papaparse';

const CsvReader = (props) => {
  const { readString } = usePapaParse();
  const [csvFile, setCsvFile] = useState();

  
  
  useEffect(() => {

    var csvFilePath = parks;
      fetch(csvFilePath).then(rs => rs.text()).then(text => {
        readString(text, {
          worker: true,
          header: true,
          complete: (results) => {
            setCsvFile(results)
            props.parentCallback (csvFile)
          },
        });
      })

  }, [readString, csvFile, props]);
}


export default CsvReader