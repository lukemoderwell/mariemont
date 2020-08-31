import React, {
  useEffect,
  useState
} from 'react';
import Airtable from 'airtable';
import styles from './Dashboard.module.scss';

export default function Home() {
  const API_KEY = process.env.AIRTABLE_API_KEY || process.env.GATSBY_AIRTABLE_API_KEY;
  const BASE = new Airtable({
    apiKey: API_KEY
  }).base('appebqul277Rnu6XP');
  const date = '2020-08-16';
  const lastDate = '2020-08-09';
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  const [previous, setPrevious] = useState({});

  const setCurrentViews = (data) => {
    let _current = {
      ...current
    };
    data.forEach((d) => {
      if (d.Date === date) {
        _current[d.Channel] = Number(d.Views);
      }
    });
    _current['total'] =
      _current['Facebook'] + _current['YouTube'] + _current['Website'];
    setCurrent(_current);
  };

  const setPreviousViews = (data) => {
    let _previous = {
      ...previous
    };
    data.forEach((d) => {
      if (d.Date === lastDate) {
        _previous[d.Channel] = Number(d.Views);
      }
    });
    _previous['total'] =
      _previous['Facebook'] + _previous['YouTube'] + _previous['Website'];
    setPrevious(_previous);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    BASE('Video')
      .select({
        view: 'Grid view',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          const _data = [...data];
          records.forEach(function (record) {
            _data.push(record.fields);
            // console.log('Retrieved', record.fields);
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
          setData(_data);
          setCurrentViews(_data);
          setPreviousViews(_data);
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        },
      );
  };
  return ( <
    div className = {
      styles.dashboard
    } >
    <
    header className = {
      styles.header
    } >
    <
    h4 className = {
      styles.title
    } > Sermon Views < /h4> <
    h4 className = {
      styles.date
    }
    style = {
      {
        marginLeft: 'auto'
      }
    } >
    August 16 th, 2020 <
    /h4> <
    /header> <
    div className = {
      styles.main
    } >
    <
    div className = {
      styles.totals
    } >
    <
    div className = {
      styles.stat
    } >
    <
    p > Total < /p> <
    span className = {
      styles.count
    } > {
      current.total
    } < /span> <
    p className = {
      styles.change
    } > {
      current.total - previous.total
    }
    / last week <
    /p> <
    /div> <
    div className = {
      styles.stat
    } >
    <
    p > Facebook < /p> <
    span className = {
      styles.count
    } > {
      current.Facebook
    } < /span> <
    p className = {
      styles.change
    } > {
      current.Facebook - previous.Facebook
    }
    / last week <
    /p> <
    /div> <
    div className = {
      styles.stat
    } >
    <
    p > YouTube < /p> <
    span className = {
      styles.count
    } > {
      current.YouTube
    } < /span> <
    p className = {
      styles.change
    } > {
      current.YouTube - previous.YouTube
    }
    / last week <
    /p> <
    /div> <
    div className = {
      styles.stat
    } >
    <
    p > Website < /p> <
    span className = {
      styles.count
    } > {
      current.Website
    } < /span> <
    p className = {
      styles.change
    } > {
      current.Website - previous.Website
    }
    / last week <
    /p> <
    /div> <
    /div> <
    div className = {
      styles.summary
    } >
    <
    span className = {
      styles.tag
    } > Summary < /span> <
    p >
    There were < strong > {
      current.total
    }
    views < /strong> for{' '} <
    strong > Who Is The Holy Spirit ? < /strong> during the week of August
    9 th— August 15 th.This totals < strong > 1014 views < /strong> for the
    entire < strong > ReThink < /strong> series starting July 5th. <
    /p> <
    /div> <
    /div> <
    div className = {
      styles.footer
    } > last synced on August 17 th, 2020 < /div> <
    /div>
  );
}
