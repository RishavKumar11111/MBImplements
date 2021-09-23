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

exports.getUniqueFarmID = (userID) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "UniqueFarmID" from "ManufacturerDetails" where "ManufacturerEmailID" = $1`;
    const values = [userID];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getStockSerialNos = ({ implementID }, financialYear, userID) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "StockSerialNo" from "ManufacturerStockEntry" where "ImplementID" = $1 and "MSEFinancialYear" = $2 and "ManufacturerUserID" = $3 order by "StockSerialNo"`;
    const values = [implementID, financialYear, userID];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitStockSerialNos = (data1, data2) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `select "StockSerialNo" from "ManufacturerStockEntry" where "ImplementID" = $1 and "MSEFinancialYear" = $2 and "ManufacturerUserID" = $3 order by "StockSerialNo"`;
    const values1 = [data1[0][0], data1[0][3], data1[0][6]];
    const response1 = await client.query(query1, values1);
    const foundDuplicateStockSerialNos = data2.filter((x) => response1.rows.some((y) => x.StockSerialNo === y.StockSerialNo));
    if (parseInt(response1.rowCount, 10) === 0 || foundDuplicateStockSerialNos.length === 0) {
      const query2 = format(`insert into "ManufacturerStockEntry" ("ImplementID", "StockSerialNo", "PreferredSupplier", "MSEFinancialYear", "MSEDateTime", "ManufacturerIPAddress", "ManufacturerUserID") values %L returning *`, data1);
      const response2 = await client.query(query2);
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