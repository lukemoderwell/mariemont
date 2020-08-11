import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
export default function Home() {
  const API_KEY = 'keyYjra1QW7nBEC4j';
  const BASE = new Airtable({apiKey: API_KEY}).base('appebqul277Rnu6XP');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    BASE('Video').select({
      // Selecting the first 3 records in Grid view:
      // maxRecords: 3,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        let _data = [...data];
        
        records.forEach(function(record) {
          data.push(record.fields);
          // console.log('Retrieved', record.fields);
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        setData(_data);
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
  }
  return (
    data !== [] && data.map(item => <p>{item.Views}</p>)
  )
}
