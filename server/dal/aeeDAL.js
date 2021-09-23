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

exports.getManufacturerStockSerialNos = (userID) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "ManufacturerUserID", c."BlockCode", "BlockName", a."ImplementID", "ImplementName", "StockSerialNo", "MSEFinancialYear" from "ManufacturerStockEntry" a inner join "Implement" b on a."ImplementID" = b."ImplementID" inner join "ManufacturerDetails" c on a."ManufacturerUserID" = c."ManufacturerEmailID" inner join "LGDBlock" d on c."BlockCode" = d."BlockCode" inner join "LGDSubDivision" e on d."SubDivisionCode" = e."SubDivisionCode" inner join "AEESubDivisionMapping" f on e."SubDivisionCode" = f."SubDivisionCode" where f."AEEUserID" = $1 and a."Status" is null order by "ManufacturerUserID", c."BlockCode", "BlockName", a."ImplementID", "ImplementName", "StockSerialNo", "MSEFinancialYear"`;
    const values = [userID];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.approveRejectStockSerialNos = (arr) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `drop table if exists "ManufacturerStockEntryTemp"; create temp table "ManufacturerStockEntryTemp" ("ImplementID" integer not null, "StockSerialNo" character varying(30) not null, "MSEFinancialYear" character varying(10) not null, "ManufacturerUserID" character varying(50) not null, "Status" smallint not null, "AEEPDIFinancialYear" character varying(10) not null, "AEEPDIDateTime" timestamp without time zone not null, "AEEIPAddress" inet not null, "AEEUserID" character varying(50) not null, "RejectionReason" character varying(300) null, constraint "ManufacturerStockEntryTemp_pkey" primary key ("ImplementID", "StockSerialNo", "MSEFinancialYear"))`;
    await client.query(query1);
    const query2 = format(`insert into "ManufacturerStockEntryTemp" ("ImplementID", "StockSerialNo", "MSEFinancialYear", "ManufacturerUserID", "Status", "AEEPDIFinancialYear", "AEEPDIDateTime", "AEEIPAddress", "AEEUserID", "RejectionReason") values %L returning *`, arr);
    await client.query(query2);
    const query3 = `update "ManufacturerStockEntry" mse set "Status" = mset."Status", "AEEPDIFinancialYear" = mset."AEEPDIFinancialYear", "AEEPDIDateTime" = mset."AEEPDIDateTime", "AEEIPAddress" = mset."AEEIPAddress", "AEEUserID" = mset."AEEUserID", "RejectionReason" = mset."RejectionReason" from "ManufacturerStockEntryTemp" mset where mse."ImplementID" = mset."ImplementID" and mse."StockSerialNo" = mset."StockSerialNo" and mse."MSEFinancialYear" = mset."MSEFinancialYear" and mse."ManufacturerUserID" = mset."ManufacturerUserID" returning *`;
    const response3 = await client.query(query3);
    if (response3.rowCount === arr.length) {
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