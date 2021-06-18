const format = require('pg-format');
const pool = require('../config/dbConfig');

exports.addActivityLog = async (action, attack, mode, userID, ipAddress, url, deviceType, os, browser) => {
  const client = await pool.connect().catch((err) => { console.log(`Unable to connect to the database: ${err}`); });
  try {
    const query = `insert into "ActivityLog" ("IPAddress", "UserID", "URL", "DeviceType", "OS", "Browser", "DateTime", "Action", "Attack", "Mode") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const values = [ipAddress, userID, url, deviceType, os, browser, 'now()', action, attack, mode];
    await client.query(query, values);
  } catch (e) {
    console.log(`Oops! An error occurred: ${e}`);
  } finally {
    client.release();
  }
};

exports.getAllImplements = (financialYear) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "ImplementID", "ImplementName" from "Implement" where "FinancialYear" = $1 and "Status" = true order by "ImplementName"`;
    const values = [financialYear];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getImplementTargets = ({ implementID, financialYear }) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select a."DistrictCode", "DistrictName", "Normal", "SCP", "TASP" from "LGDDistrict" a left join (select "DistrictCode", "Normal", "SCP", "TASP" from "ImplementTarget" where "ImplementID" = $1 and "FinancialYear" = $2) b on a."DistrictCode" = b."DistrictCode" order by a."DistrictCode"`;
    const values = [implementID, financialYear];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitImplementTarget = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `select count(*) "Count" from "ImplementTarget" where "ImplementID" = $1 and "FinancialYear" = $2`;
    const values1 = [data[0][4], data[0][5]];
    const response1 = await client.query(query1, values1);
    if (parseInt(response1.rows[0].Count, 10) === 0) {
      const query2 = format(`insert into "ImplementTarget" ("DistrictCode", "Normal", "SCP", "TASP", "ImplementID", "FinancialYear", "IPAddress", "UserID", "DateTime") values %L returning *`, data);
      const response2 = await client.query(query2);
      const query3 = `select a."DistrictCode", "DistrictName", a."ImplementID", "ImplementName", a."FinancialYear", "Normal", "SCP", "TASP" from "ImplementTarget" a inner join "LGDDistrict" b on a."DistrictCode" = b."DistrictCode" inner join "Implement" c on a."ImplementID" = c."ImplementID" where a."ImplementID" = $1 and a."FinancialYear" = $2`;
      const values3 = [response2.rows[0].ImplementID, response2.rows[0].FinancialYear];
      const response3 = await client.query(query3, values3);
      await client.query('commit');
      resolve(response3.rows);
    } else {
      resolve([]);
    }
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.updateImplementTarget = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `insert into "ImplementTargetLog" ("DistrictCode", "ImplementID", "FinancialYear", "Normal", "SCP", "TASP", "DateTime", "IPAddress", "UserID") select "DistrictCode", "ImplementID", "FinancialYear", "Normal", "SCP", "TASP", "DateTime", "IPAddress", "UserID" from "ImplementTarget" where "ImplementID" = $1 and "FinancialYear" = $2`;
    const values1 = [data[0][4], data[0][5]];
    await client.query(query1, values1);
    const query2 = `drop table if exists "ImplementTargetTemp"; create temp table "ImplementTargetTemp" ("DistrictCode" integer not null, "ImplementID" integer not null, "FinancialYear" character varying(10) not null, "Normal" integer not null, "SCP" integer not null, "TASP" integer not null, "DateTime" timestamp without time zone not null, "IPAddress" inet not null, "UserID" character varying(50) not null, constraint "ImplementTargetTemp_pkey" primary key ("DistrictCode", "ImplementID", "FinancialYear"))`;
    await client.query(query2);
    const query3 = format(`insert into "ImplementTargetTemp" ("DistrictCode", "Normal", "SCP", "TASP", "ImplementID", "FinancialYear", "IPAddress", "UserID", "DateTime") values %L returning *`, data);
    await client.query(query3);
    const query4 = `update "ImplementTarget" it set "Normal" = itt."Normal", "SCP" = itt."SCP", "TASP" = itt."TASP", "DateTime" = itt."DateTime", "IPAddress" = itt."IPAddress", "UserID" = itt."UserID" from "ImplementTargetTemp" itt where it."DistrictCode" = itt."DistrictCode" and it."ImplementID" = itt."ImplementID" and it."FinancialYear" = itt."FinancialYear" returning *`;
    const response4 = await client.query(query4);
    await client.query('commit');
    resolve(response4.rows);
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getAllImplementPrices = () => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const response = await client.query(`select "ImplementID", "ImplementName", "Cost", "FinancialYear", "Status" from "Implement" order by "ImplementName"`);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitImplementPrice = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `select * from "Implement" where lower(replace("ImplementName", ' ', '')) = lower(replace($1, ' ', '')) and "FinancialYear" = $2`;
    const values1 = [data.ImplementName, data.FinancialYear];
    const response1 = await client.query(query1, values1);
    if (response1.rowCount === 0) {
      const query2 = `insert into "Implement" ("ImplementName", "Cost", "FinancialYear", "SubsidyPercentage", "DateTime", "IPAddress", "UserID", "Status") values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
      const values2 = [data.ImplementName, data.Cost, data.FinancialYear, data.SubsidyPercentage, data.DateTime, data.IPAddress, data.UserID, data.Status];
      const response2 = await client.query(query2, values2);
      await client.query('commit');
      resolve(response2.rows);
    } else {
      resolve([]);
    }
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.updateImplementPrice = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `insert into "ImplementLog" ("ImplementID", "Cost", "FinancialYear", "SubsidyPercentage", "DateTime", "IPAddress", "UserID", "Status") select "ImplementID", "Cost", "FinancialYear", "SubsidyPercentage", "DateTime", "IPAddress", "UserID", "Status" from "Implement" where "ImplementID" = $1 and "FinancialYear" = $2`;
    const values1 = [data.ImplementID, data.FinancialYear];
    await client.query(query1, values1);
    const query2 = `update "Implement" set "Cost" = $1, "DateTime" = $2, "IPAddress" = $3, "UserID" = $4 where "ImplementID" = $5 returning *`;
    const values2 = [data.Cost, data.DateTime, data.IPAddress, data.UserID, data.ImplementID];
    const response2 = await client.query(query2, values2);
    await client.query('commit');
    resolve(response2.rows);
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitActivatedImplements = (data) => new Promise(async (resolve, reject) => {
  console.log(data);
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `drop table if exists "ImplementTemp"; create temp table "ImplementTemp" ("ImplementID" integer not null, "Status" boolean not null, "DateTime" timestamp without time zone not null, "IPAddress" inet not null, "UserID" character varying(50) not null, constraint "ImplementTemp_pkey" primary key ("ImplementID"))`;
    await client.query(query1);
    const query2 = format(`insert into "ImplementTemp" ("ImplementID", "Status", "IPAddress", "UserID", "DateTime") values %L returning *`, data);
    await client.query(query2);
    const query3 = `update "Implement" i set "Status" = it."Status", "DateTime" = it."DateTime", "IPAddress" = it."IPAddress", "UserID" = it."UserID" from "ImplementTemp" it where i."ImplementID" = it."ImplementID" returning *`;
    const response3 = await client.query(query3);
    await client.query('commit');
    resolve(response3.rows);
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});