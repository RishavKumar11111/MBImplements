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
    const query1 = `select "Normal", "SCP", "TASP" from "ImplementTarget" where "DistrictCode" = $1 and "ImplementID" = $2 and "FinancialYear" = $3 and ("Normal" > 0 or "SCP" > 0 or "TASP" > 0)`;
    const values1 = [data.DistrictCode, data.ImplementID, data.FinancialYear];
    const response1 = await client.query(query1, values1);
    if (response1.rowCount > 0) {
      const query2 = `select count("ReferenceNo") "FarmerBookingCount" from "FarmerBooking" where "FarmerCategory" = $1 and "DistrictCode" = $2 and "ImplementID" = $3 and "FinancialYear" = $4`;
      const values2 = [data.FarmerCategory, data.DistrictCode, data.ImplementID, data.FinancialYear];
      const response2 = await client.query(query2, values2);
      if ((data.FarmerCategory === 'General' && response2.rows[0].FarmerBookingCount < response1.rows[0].Normal) || (data.FarmerCategory === 'SC' && response2.rows[0].FarmerBookingCount < response1.rows[0].SCP) || (data.FarmerCategory === 'ST' && response2.rows[0].FarmerBookingCount < response1.rows[0].TASP)) {
        const query3 = `select count(*) "Count" from "FarmerBooking" where "FarmerID" = $1 and "ImplementID" = $2 and "FinancialYear" = $3`;
        const values3 = [data.FarmerID, data.ImplementID, data.FinancialYear];
        const response3 = await client.query(query3, values3);
        if (parseInt(response3.rows[0].Count, 10) === 0) {
          const query4 = `select coalesce(max(cast(substring("ReferenceNo", 15) as integer)), 0) + 1 "NewReferenceNoCount" from "FarmerBooking" where substring("ReferenceNo", 1, 14) = $1`;
          const values4 = [data.PartReferenceNo];
          const response4 = await client.query(query4, values4);
          const query5 = `insert into "FarmerBooking" ("ReferenceNo", "FarmerID", "FarmerName", "FarmerMobileNo", "FarmerCategory", "DistrictCode", "BlockCode", "GPCode", "VillageCode", "ImplementID", "FinancialYear", "DateTime", "IPAddress", "Status") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *`;
          const values5 = [data.PartReferenceNo + response4.rows[0].NewReferenceNoCount, data.FarmerID, data.FarmerName, data.FarmerMobileNo, data.FarmerCategory, data.DistrictCode, data.BlockCode, data.GPCode, data.VillageCode, data.ImplementID, data.FinancialYear, data.DateTime, data.IPAddress, data.Status];
          const response5 = await client.query(query5, values5);
          await client.query('commit');
          resolve(response5.rows);
        } else {
          resolve([{
            Error: 'The selected implement has already been booked by the same Farmer ID in the current financial year. Farmer Booking can only be done in the next financial year.'
          }]);
        }
      } else {
        resolve([{
          Error: 'No more Farmer Booking is allowed as the Target for the selected Implement in the selected District has been reached.'
        }]);
      }
    } else {
      resolve([{
        Error: 'Target has not been entered for the selected Implement in the selected District for this Financial Year. Please contact administrator.'
      }]);
    }
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.checkProprietorEmailIDAvailability = ({ proprietorEmailID }) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "ManufacturerEmailID" from "ManufacturerDetails" where "ManufacturerEmailID" = $1`;
    const values = [proprietorEmailID];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.checkUniqueFarmIDAvailability = ({ uniqueFarmID }) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    const query = `select "UniqueFarmID" from "ManufacturerDetails" where "UniqueFarmID" = $1`;
    const values = [uniqueFarmID];
    const response = await client.query(query, values);
    resolve(response.rows);
  } catch (e) {
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});

exports.submitManufacturerDetails = (data) => new Promise(async (resolve, reject) => {
  const client = await pool.connect().catch((err) => { reject(new Error(`Unable to connect to the database: ${err}`)); });
  try {
    await client.query('begin');
    const query1 = `select "ManufacturerEmailID" from "ManufacturerDetails" where "ManufacturerEmailID" = $1`;
    const values1 = [data.ManufacturerEmailID];
    const response1 = await client.query(query1, values1);
    if (response1.rowCount === 0) {
      const query2 = `select "UniqueFarmID" from "ManufacturerDetails" where "UniqueFarmID" = $1`;
      const values2 = [data.UniqueFarmID];
      const response2 = await client.query(query2, values2);
      if (response2.rowCount === 0) {
        const query3 = `insert into "ManufacturerDetails" ("ManufacturerEmailID", "ManufacturerName", "ManufacturerMobileNo", "ManufacturerAadhaarNo", "DistrictCode", "BlockCode", "ManufacturerAddress", "FarmName", "UniqueFarmID", "GSTINNo", "PANNo", "DICMSMERegistrationCertificate", "UdyogAadhaar", "BSIRegistrationCertificate", "OAICOSICOFMRDCRegistrationConsent", "ManufacturingUnitPhoto", "FinancialYear", "DateTime", "IPAddress", "Status", "RejectionReason") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) returning *`;
        const values3 = [data.ManufacturerEmailID, data.ManufacturerName, data.ManufacturerMobileNo, data.ManufacturerAadhaarNo, data.DistrictCode, data.BlockCode, data.ManufacturerAddress, data.FarmName, data.UniqueFarmID, data.GSTINNo, data.PANNo, data.DICMSMERegistrationCertificate, data.UdyogAadhaar, data.BSIRegistrationCertificate, data.OAICOSICOFMRDCRegistrationConsent, data.ManufacturingUnitPhoto, data.FinancialYear, data.DateTime, data.IPAddress, data.Status, data.RejectionReason];
        const response3 = await client.query(query3, values3);
        await client.query('commit');
        resolve(response3.rows);
      } else {
        resolve([{
          Error: 'Duplicate Unique Farm ID is found. Please register with a different Unique Farm ID.'
        }]);
      }
    } else {
      resolve([{
        Error: 'Duplicate Manufacturer Email ID is found. Please register with a different Manufacturer Email ID.'
      }]);
    }
  } catch (e) {
    await client.query('rollback');
    reject(new Error(`Oops! An error occurred: ${e}`));
  } finally {
    client.release();
  }
});