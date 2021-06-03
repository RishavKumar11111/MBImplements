const format = require('pg-format');
const pool = require('../config/dbConfig');

exports.addActivityLog = async (action, attack, mode, userID, ipAddress, url, deviceType, os, browser) => {
  const client = await pool.connect().catch((err) => { console.log(`Unable to connect to the database: ${err}`); });
  try {
    const text = `insert into "ActivityLog" ("IPAddress", "UserID", "URL", "DeviceType", "OS", "Browser", "DateTime", "Action", "Attack", "Mode") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const values = [ipAddress, userID, url, deviceType, os, browser, 'now()', action, attack, mode];
    await client.query(text, values);
  } catch (e) {
    console.log(`Oops! An error occurred: ${e}`);
  } finally {
    client.release();
  }
};

exports.getAllImplements = () => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const response = await client.query(`select "ImplementID", "ImplementName" from "Implement" order by "ImplementName"`);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getDistrictTargets = ({ implementID, financialYear }) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const text = `select a."DistrictCode", "DistrictName", "Normal", "SCP", "TASP" from "LGDDistrict" a left join (select "DistrictCode", "Normal", "SCP", "TASP" from "DistrictTarget" where "ImplementID" = $1 and "FinancialYear" = $2) b on a."DistrictCode" = b."DistrictCode" order by a."DistrictCode"`;
    const values = [implementID, financialYear];
    const response = await client.query(text, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitDistrictTarget = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `select count(*) "Count" from "DistrictTarget" where "ImplementID" = $1 and "FinancialYear" = $2`;
    const values1 = [data[0][4], data[0][5]];
    const response1 = await client.query(query1, values1);
    if (parseInt(response1.rows[0].Count, 10) === 0) {
      const query2 = format(`insert into "DistrictTarget" ("DistrictCode", "Normal", "SCP", "TASP", "ImplementID", "FinancialYear", "IPAddress", "UserID", "DateTime") values %L returning *`, data);
      const response2 = await client.query(query2);
      const query3 = `select a."DistrictCode", "DistrictName", a."ImplementID", "ImplementName", a."FinancialYear", "Normal", "SCP", "TASP" from "DistrictTarget" a inner join "LGDDistrict" b on a."DistrictCode" = b."DistrictCode" inner join "Implement" c on a."ImplementID" = c."ImplementID" where a."ImplementID" = $1 and a."FinancialYear" = $2`;
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

exports.updateDistrictTarget = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `insert into "DistrictTargetLog" ("DistrictCode", "ImplementID", "FinancialYear", "Normal", "SCP", "TASP", "DateTime", "IPAddress", "UserID") select "DistrictCode", "ImplementID", "FinancialYear", "Normal", "SCP", "TASP", "DateTime", "IPAddress", "UserID" from "DistrictTarget" where "ImplementID" = $1 and "FinancialYear" = $2`;
    const values1 = [data[0][4], data[0][5]];
    await client.query(query1, values1);
    const query2 = `drop table if exists "DistrictTargetTemp"; create temp table "DistrictTargetTemp" ("DistrictCode" integer not null, "ImplementID" integer not null, "FinancialYear" character varying(10) not null, "Normal" integer not null, "SCP" integer not null, "TASP" integer not null, "DateTime" timestamp without time zone not null, "IPAddress" inet not null, "UserID" character varying(50) not null, constraint "DistrictTargetTemp_pkey" primary key ("DistrictCode", "ImplementID", "FinancialYear"))`;
    await client.query(query2);
    const query3 = format(`insert into "DistrictTargetTemp" ("DistrictCode", "Normal", "SCP", "TASP", "ImplementID", "FinancialYear", "IPAddress", "UserID", "DateTime") values %L returning *`, data);
    await client.query(query3);
    const query4 = `update "DistrictTarget" dt set "Normal" = dtt."Normal", "SCP" = dtt."SCP", "TASP" = dtt."TASP", "DateTime" = dtt."DateTime", "IPAddress" = dtt."IPAddress", "UserID" = dtt."UserID" from "DistrictTargetTemp" dtt where dt."DistrictCode" = dtt."DistrictCode" and dt."ImplementID" = dtt."ImplementID" and dt."FinancialYear" = dtt."FinancialYear" returning *`;
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
    const response = await client.query(`select "ImplementID", "ImplementName", "Cost", "DateTime" from "Implement" order by "ImplementName"`);
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
    const query1 = `update "Implement" set "Cost" = $1, "DateTime" = $2, "IPAddress" = $3, "FinancialYear" = $4, "UserID" = $5 where "ImplementID" = $6 returning *`;
    const values1 = [data.Cost, data.DateTime, data.IPAddress, data.FinancialYear, data.UserID, data.ImplementID];
    const response1 = await client.query(query1, values1);
    const query2 = `select "ImplementID", "ImplementName", "Cost", "DateTime" from "Implement" where "ImplementID" = $1`;
    const values2 = [response1.rows[0].ImplementID];
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

exports.updateImplementPrice = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `insert into "ImplementLog" ("ImplementID", "Cost", "FinancialYear", "SubsidyPercentage", "DateTime", "IPAddress", "UserID") select "ImplementID", "Cost", "FinancialYear", "SubsidyPercentage", "DateTime", "IPAddress", "UserID" from "Implement" where "ImplementID" = $1`;
    const values1 = [data.ImplementID];
    await client.query(query1, values1);
    const query2 = `update "Implement" set "Cost" = $1, "DateTime" = $2, "IPAddress" = $3, "FinancialYear" = $4, "UserID" = $5 where "ImplementID" = $6 returning *`;
    const values2 = [data.Cost, data.DateTime, data.IPAddress, data.FinancialYear, data.UserID, data.ImplementID];
    const response2 = await client.query(query2, values2);
    const query3 = `select "ImplementID", "ImplementName", "Cost", "DateTime" from "Implement" where "ImplementID" = $1`;
    const values3 = [response2.rows[0].ImplementID];
    const response3 = await client.query(query3, values3);
    await client.query('commit');
    resolve(response3.rows);
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});