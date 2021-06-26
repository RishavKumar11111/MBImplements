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

exports.getDistricts = () => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "DistrictCode", "DistrictName", "PDSDistrictName" from "LGDDistrict"`;
    const response = await client.query(query);
    resolve(response.rows);
  } catch (e) {
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

exports.getGPs = ({ blockCode }) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "GPCode", "GPName" from "LGDGP" where "BlockCode" = $1`;
    const values = [blockCode];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getVillages = ({ gpCode }) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "VillageCode", "VillageName" from "LGDVillage" where "GPCode" = $1`;
    const values = [gpCode];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getFarmerAddress = ({ villageCode }) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select a."DistrictCode", "DistrictName", "PDSDistrictName", a."BlockCode", "BlockName", a."GPCode", "GPName", "VillageCode", "VillageName" from "LGDVillage" a inner join "LGDGP" b on a."GPCode" = b."GPCode" inner join "LGDBlock" c on b."BlockCode" = c."BlockCode" inner join "LGDDistrict" d on c."DistrictCode" = d."DistrictCode" where "VillageCode" = $1`;
    const values = [villageCode];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.getImplementDetails = (financialYear) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "ImplementID", "ImplementName", "Cost", "SubsidyPercentage" from "Implement" where "Status" = true and "FinancialYear" = $1 order by "ImplementName"`;
    const values = [financialYear];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitFarmerBooking = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `select coalesce(max(cast(substring("ReferenceNo", 15) as integer)), 0) + 1 "NewReferenceNoCount" from "FarmerBooking" where substring("ReferenceNo", 1, 14) = $1`;
    const values1 = [data.PartReferenceNo];
    const response1 = await client.query(query1, values1);
    const query2 = `insert into "FarmerBooking" ("ReferenceNo", "FarmerID", "FarmerName", "FarmerMobileNo", "DistrictCode", "BlockCode", "GPCode", "VillageCode", "ImplementID", "FinancialYear", "DateTime", "IPAddress", "Status") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *`;
    const values2 = [data.PartReferenceNo + response1.rows[0].NewReferenceNoCount, data.FarmerID, data.FarmerName, data.FarmerMobileNo, data.DistrictCode, data.BlockCode, data.GPCode, data.VillageCode, data.ImplementID, data.FinancialYear, data.DateTime, data.IPAddress, data.Status];
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