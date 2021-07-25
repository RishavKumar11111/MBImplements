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

exports.getEEDistricts = (userID) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select a."DistrictCode", "DistrictName", "PDSDistrictName" from "EEDistrictMapping" a inner join "LGDDistrict" b on a."DistrictCode" = b."DistrictCode" where "EEUserID" = $1`;
    const values = [userID];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getImplementStockDetails = ({ districtCode }, userID, financialYear) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "DistrictCode", "DistrictName", a."ImplementID", "ImplementName", "EnteredAvailableSurplusStocks", b."Status" from "Implement" a left join (select a."DistrictCode", "DistrictName", a."ImplementID", count("StockSerialNo") "EnteredAvailableSurplusStocks", a."Status" from "StockInitialisation" a inner join "LGDDistrict" b on a."DistrictCode" = b."DistrictCode" inner join "Implement" c on a."ImplementID" = c."ImplementID" where a."DistrictCode" = $1 and a."UserID" = $2 group by a."DistrictCode", "DistrictName", a."ImplementID", a."Status") b on a."ImplementID" = b."ImplementID" where "FinancialYear" = $3 and a."Status" = true order by "ImplementName"`;
    const values = [districtCode, userID, financialYear];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitStockAvailability = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = format(`insert into "StockInitialisation" ("DistrictCode", "ImplementID", "StockSerialNo", "Status", "FinancialYear", "AvailabilityDateTime", "IPAddress", "UserID") values %L returning *`, data);
    const response1 = await client.query(query1);
    const query2 = `select "DistrictCode", "DistrictName", a."ImplementID", "ImplementName", "EnteredAvailableSurplusStocks", b."Status" from "Implement" a left join (select a."DistrictCode", "DistrictName", a."ImplementID", count("StockSerialNo") "EnteredAvailableSurplusStocks", a."Status" from "StockInitialisation" a inner join "LGDDistrict" b on a."DistrictCode" = b."DistrictCode" inner join "Implement" c on a."ImplementID" = c."ImplementID" where a."DistrictCode" = $1 and a."UserID" = $2 group by a."DistrictCode", "DistrictName", a."ImplementID", a."Status") b on a."ImplementID" = b."ImplementID" order by "ImplementName"`;
    const values2 = [response1.rows[0].DistrictCode, response1.rows[0].UserID];
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

exports.getBlocks = ({ districtCode }) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "BlockCode", "BlockName" from "LGDBlock" where "DistrictCode" = $1`;
    const values = [districtCode];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getImplementsStockSerialNos = ({ districtCode }, userID) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select a."ImplementID", "ImplementName", "StockSerialNo" from "StockInitialisation" a inner join "Implement" b on a."ImplementID" = b."ImplementID" where "DistrictCode" = $1 and a."UserID" = $2 and "BlockCode" is null order by "ImplementName", "StockSerialNo"`;
    const values = [districtCode, userID];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitStockInitialisation = (obj, array) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `drop table if exists "StockInitialisationTemp"; create temp table "StockInitialisationTemp" ("ImplementID" integer not null, "StockSerialNo" character varying(30) not null, constraint "StockInitialisationTemp_pkey" primary key ("ImplementID", "StockSerialNo"))`;
    await client.query(query1);
    const query2 = format(`insert into "StockInitialisationTemp" ("ImplementID", "StockSerialNo") values %L returning *`, array);
    await client.query(query2);
    const query3 = `update "StockInitialisation" dt set "BlockCode" = $1, "InitialisationDateTime" = $2 from "StockInitialisationTemp" dtt where "DistrictCode" = $3  and "UserID" = $4 and dt."ImplementID" = dtt."ImplementID" and dt."StockSerialNo" = dtt."StockSerialNo" returning *`;
    const values3 = [obj.BlockCode, obj.InitialisationDateTime, obj.DistrictCode, obj.UserID];
    const response3 = await client.query(query3, values3);
    if (response3.rowCount === array.length) {
      const query4 = `select a."ImplementID", "ImplementName", "StockSerialNo" from "StockInitialisation" a inner join "Implement" b on a."ImplementID" = b."ImplementID" where "DistrictCode" = $1 and a."UserID" = $2 and "BlockCode" is null order by "ImplementName", "StockSerialNo"`;
      const values4 = [obj.DistrictCode, obj.UserID];
      const response4 = await client.query(query4, values4);
      await client.query('commit');
      resolve(response4.rows);
    } else {
      resolve(['error']);
    }
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});