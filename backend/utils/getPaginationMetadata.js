const db = require("../config/db");

const getPaginationMetadata = async (
  page,
  limit,
  tableName,
  condition = null
) => {
  // Get the total count of items
  const totalCountResponse = await db.query(
    `SELECT COUNT(*) FROM ${tableName}${condition ? ` WHERE ${condition}` : ""}`
  );
  const totalCount = parseInt(totalCountResponse[0][0]["COUNT(*)"]);

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);

  return {
    currentPage: page,
    totalPages,
    totalCount,
    itemsPerPage: limit,
  };
};

module.exports = getPaginationMetadata;
