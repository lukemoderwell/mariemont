import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import styles from "./Dashboard.module.scss";

export default function Home() {
  const API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE = new Airtable({ apiKey: API_KEY }).base("appebqul277Rnu6XP");
  const date = "2020-08-09";
  const [data, setData] = useState([]);
  const [totalViews, setTotalViews] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    BASE("Video")
      .select({
        // Selecting the first 3 records in Grid view:
        // maxRecords: 3,
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          let _data = [...data];
          let count = 0;
          records.forEach(function (record) {
            if (record.fields.Date === date) {
              _data.push(record.fields);
              count += record.fields.Views;
            }
            // console.log('Retrieved', record.fields);
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
          setData(_data);
          setTotalViews(count);
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  };
  debugger;
  console.log(data, totalViews);
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h4 className={styles.title}>Sermon Views</h4>
        <h4 className={styles.date} style={{ marginLeft: "auto" }}>
          August 9th, 2020
        </h4>
      </header>
      <div className={styles.main}>
        <div className={styles.totals}>
          <div className={styles.stat}>
            <p>Total</p>
            <span className={styles.count}>{totalViews}</span>
            <p className={styles.change}>+ 105 / last week</p>
          </div>
          <div className={styles.stat}>
            <p>Facebook</p>
            <span className={styles.count}>
              {data
                .filter((item) => item.Channel === "Facebook")
                .map((item) => item.Views)}
            </span>
            <p className={styles.change}>+ 101 / last week</p>
          </div>
          <div className={styles.stat}>
            <p>YouTube</p>
            <span className={styles.count}>
              {data
                .filter((item) => item.Channel === "YouTube")
                .map((item) => item.Views)}
            </span>
            <p className={styles.change}>- 1 / last week</p>
          </div>
          <div className={styles.stat}>
            <p>Website</p>
            <span className={styles.count}>
              {data
                .filter((item) => item.Channel === "Website")
                .map((item) => item.Views)}
            </span>
            <p className={styles.change}>+ 5 / last week</p>
          </div>
        </div>
        <div className={styles.summary}>
          <span className={styles.tag}>Summary</span>
          <p>
            There were <strong>{totalViews} views</strong> for{" "}
            <strong>Who Is The Holy Spirit?</strong> during the week of August
            9th — August 15th. This totals <strong>1014 views</strong> for the
            entire <strong>ReThink</strong> series starting July 5th.
          </p>
        </div>
      </div>
      <div className={styles.footer}>last synced on August 10th, 2020</div>
    </div>
  );
}
